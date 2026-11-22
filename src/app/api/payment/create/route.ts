import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { createDuitkuInvoice } from '@/lib/duitku';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Silakan login terlebih dahulu untuk melakukan pembelian paket.' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { packageId, paymentMethod } = body;

    if (!packageId) {
      return NextResponse.json({ error: 'packageId wajib disertakan.' }, { status: 400 });
    }

    const targetPackage = await db.package.findUnique({
      where: { id: packageId },
    });

    if (!targetPackage || !targetPackage.isActive) {
      return NextResponse.json({ error: 'Paket tryout tidak ditemukan atau non-aktif.' }, { status: 404 });
    }

    // Cek apakah user sudah memiliki akses paket ini
    const existingEntitlement = await db.userPackage.findUnique({
      where: {
        userId_packageId: {
          userId: session.user.id,
          packageId: targetPackage.id,
        },
      },
    });

    if (existingEntitlement) {
      return NextResponse.json(
        { error: 'Anda sudah memiliki akses ke paket ini.' },
        { status: 400 }
      );
    }

    const priceToPay = targetPackage.promoPrice ?? targetPackage.price;
    if (priceToPay <= 0 || targetPackage.isFree) {
      // Jika paket gratis, berikan akses langsung tanpa gateway
      await db.userPackage.create({
        data: {
          userId: session.user.id,
          packageId: targetPackage.id,
          source: 'FREE_PROMO',
        },
      });

      return NextResponse.json({
        success: true,
        isFree: true,
        message: 'Paket berhasil diaktifkan ke akun Anda secara gratis.',
      });
    }

    const merchantOrderId = `BS-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    const origin = process.env.NEXTAUTH_URL || 'https://bedahsoal.muhshi.my.id';
    const callbackUrl = process.env.DUITKU_CALLBACK_URL || `${origin}/api/payment/callback`;
    const returnUrl = process.env.DUITKU_RETURN_URL || `${origin}/dashboard`;

    // Buat invoice ke Duitku
    const invoice = await createDuitkuInvoice(
      {
        paymentAmount: priceToPay,
        merchantOrderId,
        productDetails: `Paket CBT: ${targetPackage.title}`,
        email: session.user.email || 'customer@bedahsoal.id',
        customerVaName: session.user.name || 'Peserta BedahSoal',
        callbackUrl,
        returnUrl,
        expiryPeriod: 1440, // 24 jam
      },
      paymentMethod
    );

    // Catat transaksi dengan status PENDING
    const transaction = await db.transaction.create({
      data: {
        userId: session.user.id,
        packageId: targetPackage.id,
        merchantOrderId,
        duitkuReference: invoice.reference,
        amount: priceToPay,
        paymentMethod: paymentMethod || 'ONLINE_PAYMENT',
        status: 'PENDING',
        paymentUrl: invoice.paymentUrl,
        expiredAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });

    return NextResponse.json({
      success: true,
      transactionId: transaction.id,
      merchantOrderId,
      amount: priceToPay,
      paymentUrl: invoice.paymentUrl,
      vaNumber: invoice.vaNumber,
      qrString: invoice.qrString,
      expiredAt: transaction.expiredAt,
    });
  } catch (error: any) {
    console.error('[API_PAYMENT_CREATE_ERROR]', error);
    return NextResponse.json(
      { error: error.message || 'Gagal membuat transaksi pembayaran.' },
      { status: 500 }
    );
  }
}
