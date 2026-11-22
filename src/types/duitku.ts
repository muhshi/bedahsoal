// ============================================================
// Duitku Payment Gateway Types & Contracts
// ============================================================

export interface DuitkuCreateInvoiceRequest {
  paymentAmount: number;
  merchantOrderId: string;
  productDetails: string;
  email: string;
  phoneNumber?: string;
  customerVaName: string;
  callbackUrl: string;
  returnUrl: string;
  expiryPeriod: number; // in minutes
}

export interface DuitkuCreateInvoiceResponse {
  merchantCode: string;
  reference: string;
  paymentUrl: string;
  vaNumber?: string;
  qrString?: string;
  amount: string;
  statusCode: string;
  statusMessage: string;
}

export interface DuitkuCallbackPayload {
  merchantCode: string;
  amount: string;
  merchantOrderId: string;
  signature: string;
  reference: string;
  resultCode: string; // "00" = SUCCESS, "01" = FAILED
  paymentCode?: string;
  additionalParam?: string;
}

export interface DuitkuCheckTransactionResponse {
  merchantOrderId: string;
  reference: string;
  amount: string;
  fee: string;
  statusCode: string; // "00" = SUCCESS, "01" = PENDING, "02" = CANCELED/EXPIRED
  statusMessage: string;
}
