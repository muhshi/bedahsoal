import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { checkDuitkuTransaction } from '@/lib/duitku';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ merchantOrderId: string }> }
) {
  try {
    const { merchantOrderId } = await params;

    if (!merchantOrderId) {
      return NextResponse.json(
        { error: 'merchantOrderId wajib disertakan.' },
        { status: 400 }
      );
    }

    const transaction = await db.transaction.findUnique({
      where: { merchantOrderId },
      include: {
        package: {
          select: {
            id: true,
            title: true,
            price: true,
            promoPrice: true,
          },
        },
      },
    });

    if (!transaction) {
      return NextResponse.json(
        { error: 'Transaksi tidak ditemukan.' },
        { status: 404 }
      );
    }

    // Jika status masih PENDING, sinkronkan status ke Duitku
    let currentStatus = transaction.status;
    let paidAt = transaction.paidAt;

    if (transaction.status === 'PENDING') {
      try {
        const duitkuStatus = await checkDuitkuTransaction(merchantOrderId);
        if (duitkuStatus && duitkuStatus.statusCode === '00') {
          // Update ke SUCCESS dan berikan hak akses paket secara atomik
          const now = new Date();
          await db.$transaction(async (tx) => {
            await tx.transaction.update({
              where: { id: transaction.id },
              data: {
                status: 'SUCCESS',
                duitkuReference: duitkuStatus.reference || transaction.duitkuReference,
                paidAt: now,
              },
            });

            await tx.userPackage.upsert({
              where: {
                userId_packageId: {
                  userId: transaction.userId,
                  packageId: transaction.packageId,
                },
              },
              update: {
                source: 'PURCHASE',
                grantedAt: now,
              },
              create: {
                userId: transaction.userId,
                packageId: transaction.packageId,
                source: 'PURCHASE',
              },
            });
          });

          currentStatus = 'SUCCESS';
          paidAt = now;
        } else if (duitkuStatus && duitkuStatus.statusCode === '02') {
          // 02 = CANCELED/EXPIRED
          await db.transaction.update({
            where: { id: transaction.id },
            data: { status: 'EXPIRED' },
          });
          currentStatus = 'EXPIRED';
        }
      } catch (err) {
        console.warn('[DUITKU_STATUS_POLL_WARNING] Gagal memeriksa status Duitku:', err);
      }
    }

    return NextResponse.json({
      status: currentStatus,
      merchantOrderId: transaction.merchantOrderId,
      amount: transaction.amount,
      paymentMethod: transaction.paymentMethod,
      paidAt,
      expiredAt: transaction.expiredAt,
      package: transaction.package,
    });
  } catch (error: any) {
    console.error('[API_PAYMENT_STATUS_ERROR]', error);
    return NextResponse.json(
      { error: error.message || 'Gagal memeriksa status transaksi.' },
      { status: 500 }
    );
  }
}
