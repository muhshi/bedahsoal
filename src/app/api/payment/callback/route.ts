import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyDuitkuCallbackSignature, getDuitkuConfig } from '@/lib/duitku';
import { DuitkuCallbackPayload } from '@/types/duitku';

export async function POST(req: NextRequest) {
  try {
    // Duitku sends form-urlencoded or JSON
    const contentType = req.headers.get('content-type') || '';
    let payload: DuitkuCallbackPayload;

    if (contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await req.formData();
      payload = {
        merchantCode: formData.get('merchantCode') as string,
        amount: formData.get('amount') as string,
        merchantOrderId: formData.get('merchantOrderId') as string,
        signature: formData.get('signature') as string,
        reference: formData.get('reference') as string,
        resultCode: formData.get('resultCode') as string,
        paymentCode: (formData.get('paymentCode') as string) || undefined,
        additionalParam: (formData.get('additionalParam') as string) || undefined,
      };
    } else {
      payload = await req.json();
    }

    const { apiKey } = getDuitkuConfig();
    const isSignatureValid = verifyDuitkuCallbackSignature(payload, apiKey);

    if (!isSignatureValid) {
      console.warn('[DUITKU_CALLBACK_INVALID_SIGNATURE]', payload);
      return NextResponse.json({ error: 'Invalid MD5 signature' }, { status: 400 });
    }

    const { merchantOrderId, resultCode, reference } = payload;

    const transaction = await db.transaction.findUnique({
      where: { merchantOrderId },
    });

    if (!transaction) {
      return NextResponse.json({ error: 'Transaksi tidak ditemukan' }, { status: 404 });
    }

    // Idempotensi: Jika transaksi sudah tercatat SUCCESS sebelumnya, jangan gandakan entitlement
    if (transaction.status === 'SUCCESS') {
      return NextResponse.json({ message: 'Callback sudah pernah diproses sebelumnya (Idempotent).' });
    }

    // ResultCode "00" menandakan pembayaran berhasil
    if (resultCode === '00') {
      await db.$transaction(async (tx) => {
        // 1. Update status transaksi menjadi SUCCESS
        await tx.transaction.update({
          where: { id: transaction.id },
          data: {
            status: 'SUCCESS',
            duitkuReference: reference || transaction.duitkuReference,
            paidAt: new Date(),
          },
        });

        // 2. Berikan hak akses UserPackage secara atomik
        await tx.userPackage.upsert({
          where: {
            userId_packageId: {
              userId: transaction.userId,
              packageId: transaction.packageId,
            },
          },
          update: {
            source: 'PURCHASE',
            grantedAt: new Date(),
          },
          create: {
            userId: transaction.userId,
            packageId: transaction.packageId,
            source: 'PURCHASE',
          },
        });
      });

      return NextResponse.json({ status: 'SUCCESS', message: 'Entitlement granted successfully' });
    } else {
      // Pembayaran gagal / kedaluwarsa
      await db.transaction.update({
        where: { id: transaction.id },
        data: {
          status: 'FAILED',
        },
      });

      return NextResponse.json({ status: 'FAILED', message: 'Transaction marked as failed' });
    }
  } catch (error: any) {
    console.error('[API_PAYMENT_CALLBACK_ERROR]', error);
    return NextResponse.json({ error: error.message || 'Internal error' }, { status: 500 });
  }
}
