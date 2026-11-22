import crypto from 'crypto';
import {
  DuitkuCreateInvoiceRequest,
  DuitkuCreateInvoiceResponse,
  DuitkuCallbackPayload,
  DuitkuCheckTransactionResponse,
} from '@/types/duitku';

const DUITKU_SANDBOX_BASE_URL = 'https://sandbox.duitku.com/webapi/api/merchant';
const DUITKU_PROD_BASE_URL = 'https://passport.duitku.com/webapi/api/merchant';

export function getDuitkuConfig() {
  const merchantCode = process.env.DUITKU_MERCHANT_CODE || '';
  const apiKey = process.env.DUITKU_API_KEY || '';
  const env = (process.env.DUITKU_ENV || 'sandbox').toLowerCase();
  const baseUrl = env === 'production' ? DUITKU_PROD_BASE_URL : DUITKU_SANDBOX_BASE_URL;

  return { merchantCode, apiKey, env, baseUrl };
}

export function generateDuitkuRequestSignature(
  merchantCode: string,
  merchantOrderId: string,
  amount: number,
  apiKey: string
): string {
  const raw = `${merchantCode}${merchantOrderId}${amount}${apiKey}`;
  return crypto.createHash('md5').update(raw).digest('hex');
}

export function verifyDuitkuCallbackSignature(
  payload: DuitkuCallbackPayload,
  apiKey: string
): boolean {
  const { merchantCode, amount, merchantOrderId, signature } = payload;
  const raw = `${merchantCode}${amount}${merchantOrderId}${apiKey}`;
  const calculated = crypto.createHash('md5').update(raw).digest('hex');
  return calculated.toLowerCase() === (signature || '').toLowerCase();
}

export async function createDuitkuInvoice(
  params: DuitkuCreateInvoiceRequest,
  paymentMethod?: string
): Promise<DuitkuCreateInvoiceResponse> {
  const { merchantCode, apiKey, baseUrl } = getDuitkuConfig();
  if (!merchantCode || !apiKey) {
    throw new Error('Duitku credentials (DUITKU_MERCHANT_CODE, DUITKU_API_KEY) are not configured.');
  }

  const signature = generateDuitkuRequestSignature(
    merchantCode,
    params.merchantOrderId,
    params.paymentAmount,
    apiKey
  );

  const payload: Record<string, any> = {
    merchantCode,
    paymentAmount: params.paymentAmount,
    merchantOrderId: params.merchantOrderId,
    productDetails: params.productDetails,
    email: params.email,
    phoneNumber: params.phoneNumber || '',
    customerVaName: params.customerVaName,
    callbackUrl: params.callbackUrl,
    returnUrl: params.returnUrl,
    signature,
    expiryPeriod: params.expiryPeriod || 1440, // default 24 jam (in minutes)
  };

  if (paymentMethod) {
    payload.paymentMethod = paymentMethod;
  }

  const response = await fetch(`${baseUrl}/v2/inquiry`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok || (data.statusCode && data.statusCode !== '00')) {
    throw new Error(data.statusMessage || 'Failed to create Duitku invoice');
  }

  return data as DuitkuCreateInvoiceResponse;
}

export async function checkDuitkuTransaction(
  merchantOrderId: string
): Promise<DuitkuCheckTransactionResponse> {
  const { merchantCode, apiKey, baseUrl } = getDuitkuConfig();
  const raw = `${merchantCode}${merchantOrderId}${apiKey}`;
  const signature = crypto.createHash('md5').update(raw).digest('hex');

  const response = await fetch(`${baseUrl}/transactionStatus`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      merchantCode,
      merchantOrderId,
      signature,
    }),
  });

  const data = await response.json();
  return data as DuitkuCheckTransactionResponse;
}
