import { describe, it, expect, vi, beforeEach } from 'vitest';
import crypto from 'crypto';
import { NextRequest } from 'next/server';
import {
  generateDuitkuRequestSignature,
  verifyDuitkuCallbackSignature,
  createDuitkuInvoice,
  checkDuitkuTransaction,
} from '../src/lib/duitku';
import { POST as createPayment } from '../src/app/api/payment/create/route';
import { POST as callbackPayment } from '../src/app/api/payment/callback/route';
import { GET as statusPayment } from '../src/app/api/payment/status/[merchantOrderId]/route';
import { db } from '../src/lib/db';
import { auth } from '../src/auth';

vi.mock('../src/auth', () => ({
  auth: vi.fn(),
}));

vi.mock('../src/lib/db', () => ({
  db: {
    package: {
      findUnique: vi.fn(),
    },
    userPackage: {
      findUnique: vi.fn(),
      create: vi.fn(),
      upsert: vi.fn(),
    },
    transaction: {
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
    $transaction: vi.fn(async (cb: (tx: any) => Promise<any>) => {
      const tx = {
        transaction: {
          update: vi.fn(),
        },
        userPackage: {
          upsert: vi.fn(),
        },
      };
      return cb(tx);
    }),
  },
}));

describe('Duitku Signature Engine & Helpers', () => {
  const merchantCode = 'D1234';
  const apiKey = 'secret_api_key_123';
  const merchantOrderId = 'INV-1732280000000-ABC';
  const amount = 25000;

  beforeEach(() => {
    vi.restoreAllMocks();
    process.env.DUITKU_MERCHANT_CODE = merchantCode;
    process.env.DUITKU_API_KEY = apiKey;
    process.env.DUITKU_ENV = 'sandbox';
  });

  it('generates correct MD5 hash for request signature: MD5(merchantCode + merchantOrderId + amount + apiKey)', () => {
    const signature = generateDuitkuRequestSignature(merchantCode, merchantOrderId, amount, apiKey);
    expect(signature).toHaveLength(32);
    const expected = crypto
      .createHash('md5')
      .update(`${merchantCode}${merchantOrderId}${amount}${apiKey}`)
      .digest('hex');
    expect(signature).toBe(expected);
  });

  it('verifies valid callback signature: MD5(merchantCode + amount + merchantOrderId + apiKey)', () => {
    const validHash = crypto
      .createHash('md5')
      .update(`${merchantCode}${amount}${merchantOrderId}${apiKey}`)
      .digest('hex');

    const isValid = verifyDuitkuCallbackSignature(
      {
        merchantCode,
        amount: String(amount),
        merchantOrderId,
        signature: validHash,
        reference: 'D1234REF999',
        resultCode: '00',
      },
      apiKey
    );

    expect(isValid).toBe(true);
  });

  it('rejects tampered or mismatched callback signatures', () => {
    const isValid = verifyDuitkuCallbackSignature(
      {
        merchantCode,
        amount: String(amount),
        merchantOrderId,
        signature: 'tampered_fake_signature_hash_12345',
        reference: 'D1234REF999',
        resultCode: '00',
      },
      apiKey
    );

    expect(isValid).toBe(false);
  });

  it('verifies callback signature case-insensitively', () => {
    const validHash = crypto
      .createHash('md5')
      .update(`${merchantCode}${amount}${merchantOrderId}${apiKey}`)
      .digest('hex')
      .toUpperCase();

    const isValid = verifyDuitkuCallbackSignature(
      {
        merchantCode,
        amount: String(amount),
        merchantOrderId,
        signature: validHash,
        reference: 'D1234REF999',
        resultCode: '00',
      },
      apiKey
    );

    expect(isValid).toBe(true);
  });

  it('rejects callback signature when signature is empty or missing', () => {
    const isValid = verifyDuitkuCallbackSignature(
      {
        merchantCode,
        amount: String(amount),
        merchantOrderId,
        signature: '',
        reference: 'D1234REF999',
        resultCode: '00',
      },
      apiKey
    );

    expect(isValid).toBe(false);
  });

  it('createDuitkuInvoice throws error when credentials are not configured', async () => {
    process.env.DUITKU_MERCHANT_CODE = '';
    process.env.DUITKU_API_KEY = '';

    await expect(
      createDuitkuInvoice({
        paymentAmount: 25000,
        merchantOrderId: 'INV-1',
        productDetails: 'Paket Test',
        email: 'test@example.com',
        customerVaName: 'User Test',
        callbackUrl: 'http://localhost/callback',
        returnUrl: 'http://localhost/return',
        expiryPeriod: 1440,
      })
    ).rejects.toThrow('Duitku credentials (DUITKU_MERCHANT_CODE, DUITKU_API_KEY) are not configured.');
  });

  it('createDuitkuInvoice sends correct payload and returns invoice response', async () => {
    const mockResponse = {
      merchantCode: 'D1234',
      reference: 'REF-999',
      paymentUrl: 'https://sandbox.duitku.com/pay/REF-999',
      vaNumber: '888800012345',
      qrString: '00020101021226...',
      amount: '25000',
      statusCode: '00',
      statusMessage: 'SUCCESS',
    };

    const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as any);

    const result = await createDuitkuInvoice(
      {
        paymentAmount: 25000,
        merchantOrderId: 'INV-1',
        productDetails: 'Paket Test',
        email: 'test@example.com',
        customerVaName: 'User Test',
        callbackUrl: 'http://localhost/callback',
        returnUrl: 'http://localhost/return',
        expiryPeriod: 1440,
      },
      'SP'
    );

    expect(fetchSpy).toHaveBeenCalledWith(
      'https://sandbox.duitku.com/webapi/api/merchant/v2/inquiry',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
    );
    expect(result.reference).toBe('REF-999');
    expect(result.paymentUrl).toBe('https://sandbox.duitku.com/pay/REF-999');
  });

  it('checkDuitkuTransaction queries transactionStatus with signature', async () => {
    const mockStatusResponse = {
      merchantOrderId: 'INV-1',
      reference: 'REF-999',
      amount: '25000',
      fee: '1000',
      statusCode: '00',
      statusMessage: 'SUCCESS',
    };

    const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockStatusResponse,
    } as any);

    const result = await checkDuitkuTransaction('INV-1');
    expect(fetchSpy).toHaveBeenCalledWith(
      'https://sandbox.duitku.com/webapi/api/merchant/transactionStatus',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
    );
    expect(result.statusCode).toBe('00');
  });
});

describe('POST /api/payment/create Route Handler', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.DUITKU_MERCHANT_CODE = 'D1234';
    process.env.DUITKU_API_KEY = 'secret_api_key_123';
  });

  it('returns 401 if user is not authenticated', async () => {
    vi.mocked(auth).mockResolvedValueOnce(null as any);

    const req = new NextRequest('http://localhost:3000/api/payment/create', {
      method: 'POST',
      body: JSON.stringify({ packageId: 'pkg-1' }),
    });

    const res = await createPayment(req);
    expect(res.status).toBe(401);
    const data = await res.json();
    expect(data.error).toContain('login');
  });

  it('returns 400 if packageId is missing', async () => {
    vi.mocked(auth).mockResolvedValueOnce({
      user: { id: 'u1', email: 'test@user.com', name: 'User Test' },
    } as any);

    const req = new NextRequest('http://localhost:3000/api/payment/create', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    const res = await createPayment(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe('packageId wajib disertakan.');
  });

  it('returns 404 if package does not exist or is inactive', async () => {
    vi.mocked(auth).mockResolvedValueOnce({
      user: { id: 'u1', email: 'test@user.com' },
    } as any);
    vi.mocked(db.package.findUnique).mockResolvedValueOnce(null);

    const req = new NextRequest('http://localhost:3000/api/payment/create', {
      method: 'POST',
      body: JSON.stringify({ packageId: 'pkg-unknown' }),
    });

    const res = await createPayment(req);
    expect(res.status).toBe(404);
  });

  it('returns 400 if user already owns package entitlement', async () => {
    vi.mocked(auth).mockResolvedValueOnce({
      user: { id: 'u1', email: 'test@user.com' },
    } as any);
    vi.mocked(db.package.findUnique).mockResolvedValueOnce({
      id: 'pkg-1',
      title: 'Paket SKD VIP',
      price: 50000,
      isActive: true,
      isFree: false,
    } as any);
    vi.mocked(db.userPackage.findUnique).mockResolvedValueOnce({
      id: 'up-1',
      userId: 'u1',
      packageId: 'pkg-1',
    } as any);

    const req = new NextRequest('http://localhost:3000/api/payment/create', {
      method: 'POST',
      body: JSON.stringify({ packageId: 'pkg-1' }),
    });

    const res = await createPayment(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toContain('sudah memiliki akses');
  });

  it('activates free package directly without creating Duitku transaction', async () => {
    vi.mocked(auth).mockResolvedValueOnce({
      user: { id: 'u1', email: 'test@user.com' },
    } as any);
    vi.mocked(db.package.findUnique).mockResolvedValueOnce({
      id: 'pkg-free',
      title: 'Paket Gratis',
      price: 0,
      isActive: true,
      isFree: true,
    } as any);
    vi.mocked(db.userPackage.findUnique).mockResolvedValueOnce(null);
    vi.mocked(db.userPackage.create).mockResolvedValueOnce({
      id: 'up-free',
      userId: 'u1',
      packageId: 'pkg-free',
      source: 'FREE_PROMO',
    } as any);

    const req = new NextRequest('http://localhost:3000/api/payment/create', {
      method: 'POST',
      body: JSON.stringify({ packageId: 'pkg-free' }),
    });

    const res = await createPayment(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.isFree).toBe(true);
    expect(db.userPackage.create).toHaveBeenCalledWith({
      data: {
        userId: 'u1',
        packageId: 'pkg-free',
        source: 'FREE_PROMO',
      },
    });
  });

  it('creates Duitku invoice and records PENDING transaction for paid package', async () => {
    vi.mocked(auth).mockResolvedValueOnce({
      user: { id: 'u1', email: 'test@user.com', name: 'User Test' },
    } as any);
    vi.mocked(db.package.findUnique).mockResolvedValueOnce({
      id: 'pkg-paid',
      title: 'Paket SKD Pro',
      price: 49000,
      promoPrice: 29000,
      isActive: true,
      isFree: false,
    } as any);
    vi.mocked(db.userPackage.findUnique).mockResolvedValueOnce(null);

    const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        merchantCode: 'D1234',
        reference: 'DUITKU-REF-123',
        paymentUrl: 'https://sandbox.duitku.com/pay/123',
        vaNumber: '9999000123',
        qrString: '00020101...',
        statusCode: '00',
        statusMessage: 'SUCCESS',
      }),
    } as any);

    vi.mocked(db.transaction.create).mockResolvedValueOnce({
      id: 'tx-1',
      userId: 'u1',
      packageId: 'pkg-paid',
      merchantOrderId: 'BS-12345-ABC',
      amount: 29000,
      status: 'PENDING',
      paymentUrl: 'https://sandbox.duitku.com/pay/123',
      expiredAt: new Date(),
    } as any);

    const req = new NextRequest('http://localhost:3000/api/payment/create', {
      method: 'POST',
      body: JSON.stringify({ packageId: 'pkg-paid', paymentMethod: 'QRIS' }),
    });

    const res = await createPayment(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.amount).toBe(29000);
    expect(data.paymentUrl).toBe('https://sandbox.duitku.com/pay/123');
    expect(db.transaction.create).toHaveBeenCalled();
  });
});

describe('POST /api/payment/callback Route Handler', () => {
  const merchantCode = 'D1234';
  const apiKey = 'secret_api_key_123';
  const merchantOrderId = 'BS-ORD-999';
  const amount = '29000';

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.DUITKU_MERCHANT_CODE = merchantCode;
    process.env.DUITKU_API_KEY = apiKey;
  });

  it('rejects callback with invalid MD5 signature', async () => {
    const req = new NextRequest('http://localhost:3000/api/payment/callback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        merchantCode,
        amount,
        merchantOrderId,
        signature: 'invalid_signature_hash',
        reference: 'REF-1',
        resultCode: '00',
      }),
    });

    const res = await callbackPayment(req);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe('Invalid MD5 signature');
  });

  it('returns 404 if transaction is not found in database', async () => {
    const validSignature = crypto
      .createHash('md5')
      .update(`${merchantCode}${amount}${merchantOrderId}${apiKey}`)
      .digest('hex');

    vi.mocked(db.transaction.findUnique).mockResolvedValueOnce(null);

    const req = new NextRequest('http://localhost:3000/api/payment/callback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        merchantCode,
        amount,
        merchantOrderId,
        signature: validSignature,
        reference: 'REF-1',
        resultCode: '00',
      }),
    });

    const res = await callbackPayment(req);
    expect(res.status).toBe(404);
  });

  it('is idempotent when transaction is already marked SUCCESS', async () => {
    const validSignature = crypto
      .createHash('md5')
      .update(`${merchantCode}${amount}${merchantOrderId}${apiKey}`)
      .digest('hex');

    vi.mocked(db.transaction.findUnique).mockResolvedValueOnce({
      id: 'tx-1',
      status: 'SUCCESS',
      merchantOrderId,
    } as any);

    const req = new NextRequest('http://localhost:3000/api/payment/callback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        merchantCode,
        amount,
        merchantOrderId,
        signature: validSignature,
        reference: 'REF-1',
        resultCode: '00',
      }),
    });

    const res = await callbackPayment(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.message).toContain('Idempotent');
    expect(db.$transaction).not.toHaveBeenCalled();
  });

  it('atomically marks transaction SUCCESS and upserts UserPackage on resultCode 00', async () => {
    const validSignature = crypto
      .createHash('md5')
      .update(`${merchantCode}${amount}${merchantOrderId}${apiKey}`)
      .digest('hex');

    vi.mocked(db.transaction.findUnique).mockResolvedValueOnce({
      id: 'tx-1',
      userId: 'u1',
      packageId: 'pkg-1',
      status: 'PENDING',
      merchantOrderId,
    } as any);

    const txMock = {
      transaction: { update: vi.fn() },
      userPackage: { upsert: vi.fn() },
    };
    vi.mocked(db.$transaction).mockImplementationOnce(async (cb: any) => cb(txMock));

    const req = new NextRequest('http://localhost:3000/api/payment/callback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        merchantCode,
        amount,
        merchantOrderId,
        signature: validSignature,
        reference: 'REF-1',
        resultCode: '00',
      }),
    });

    const res = await callbackPayment(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.status).toBe('SUCCESS');
    expect(txMock.transaction.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 'tx-1' },
        data: expect.objectContaining({ status: 'SUCCESS' }),
      })
    );
    expect(txMock.userPackage.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          userId_packageId: { userId: 'u1', packageId: 'pkg-1' },
        },
      })
    );
  });

  it('marks transaction FAILED when resultCode is not 00', async () => {
    const validSignature = crypto
      .createHash('md5')
      .update(`${merchantCode}${amount}${merchantOrderId}${apiKey}`)
      .digest('hex');

    vi.mocked(db.transaction.findUnique).mockResolvedValueOnce({
      id: 'tx-1',
      status: 'PENDING',
      merchantOrderId,
    } as any);

    const req = new NextRequest('http://localhost:3000/api/payment/callback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        merchantCode,
        amount,
        merchantOrderId,
        signature: validSignature,
        reference: 'REF-1',
        resultCode: '01', // Failed
      }),
    });

    const res = await callbackPayment(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.status).toBe('FAILED');
    expect(db.transaction.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 'tx-1' },
        data: { status: 'FAILED' },
      })
    );
  });

  it('accepts application/x-www-form-urlencoded callback payload', async () => {
    const validSignature = crypto
      .createHash('md5')
      .update(`${merchantCode}${amount}${merchantOrderId}${apiKey}`)
      .digest('hex');

    vi.mocked(db.transaction.findUnique).mockResolvedValueOnce({
      id: 'tx-form-1',
      userId: 'u1',
      packageId: 'pkg-1',
      status: 'PENDING',
      merchantOrderId,
    } as any);

    const txMock = {
      transaction: { update: vi.fn() },
      userPackage: { upsert: vi.fn() },
    };
    vi.mocked(db.$transaction).mockImplementationOnce(async (cb: any) => cb(txMock));

    const formData = new URLSearchParams({
      merchantCode,
      amount,
      merchantOrderId,
      signature: validSignature,
      reference: 'REF-FORM-1',
      resultCode: '00',
    });

    const req = new NextRequest('http://localhost:3000/api/payment/callback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString(),
    });

    const res = await callbackPayment(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.status).toBe('SUCCESS');
    expect(txMock.transaction.update).toHaveBeenCalled();
  });
});

describe('GET /api/payment/status/[merchantOrderId] Route Handler', () => {
  const merchantOrderId = 'BS-ORD-123';

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.DUITKU_MERCHANT_CODE = 'D1234';
    process.env.DUITKU_API_KEY = 'secret_api_key_123';
  });

  it('returns 404 if transaction is not found', async () => {
    vi.mocked(db.transaction.findUnique).mockResolvedValueOnce(null);

    const req = new NextRequest(`http://localhost:3000/api/payment/status/${merchantOrderId}`);
    const res = await statusPayment(req, {
      params: Promise.resolve({ merchantOrderId }),
    });

    expect(res.status).toBe(404);
  });

  it('returns current transaction status when already SUCCESS', async () => {
    vi.mocked(db.transaction.findUnique).mockResolvedValueOnce({
      id: 'tx-1',
      merchantOrderId,
      amount: 29000,
      status: 'SUCCESS',
      paymentMethod: 'QRIS',
      paidAt: new Date('2026-11-22T10:00:00Z'),
      expiredAt: new Date('2026-11-23T10:00:00Z'),
      package: {
        id: 'pkg-1',
        title: 'Paket Pro',
        price: 29000,
        promoPrice: null,
      },
    } as any);

    const req = new NextRequest(`http://localhost:3000/api/payment/status/${merchantOrderId}`);
    const res = await statusPayment(req, {
      params: Promise.resolve({ merchantOrderId }),
    });

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.status).toBe('SUCCESS');
    expect(data.amount).toBe(29000);
  });

  it('syncs with Duitku when transaction is PENDING and updates to SUCCESS if Duitku reports 00', async () => {
    vi.mocked(db.transaction.findUnique).mockResolvedValueOnce({
      id: 'tx-1',
      userId: 'u1',
      packageId: 'pkg-1',
      merchantOrderId,
      amount: 29000,
      status: 'PENDING',
      paymentMethod: 'QRIS',
      paidAt: null,
      expiredAt: new Date('2026-11-23T10:00:00Z'),
      package: {
        id: 'pkg-1',
        title: 'Paket Pro',
        price: 29000,
        promoPrice: null,
      },
    } as any);

    // Mock Duitku check transaction returning SUCCESS ("00")
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        merchantOrderId,
        reference: 'DUITKU-REF-999',
        amount: '29000',
        fee: '1000',
        statusCode: '00',
        statusMessage: 'SUCCESS',
      }),
    } as any);

    const txMock = {
      transaction: { update: vi.fn() },
      userPackage: { upsert: vi.fn() },
    };
    vi.mocked(db.$transaction).mockImplementationOnce(async (cb: any) => cb(txMock));

    const req = new NextRequest(`http://localhost:3000/api/payment/status/${merchantOrderId}`);
    const res = await statusPayment(req, {
      params: Promise.resolve({ merchantOrderId }),
    });

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.status).toBe('SUCCESS');
    expect(txMock.transaction.update).toHaveBeenCalled();
    expect(txMock.userPackage.upsert).toHaveBeenCalled();
  });

  it('updates transaction to EXPIRED when Duitku reports statusCode 02', async () => {
    vi.mocked(db.transaction.findUnique).mockResolvedValueOnce({
      id: 'tx-exp-1',
      merchantOrderId,
      amount: 29000,
      status: 'PENDING',
      package: { id: 'pkg-1', title: 'Paket Pro' },
    } as any);

    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        merchantOrderId,
        reference: 'DUITKU-REF-EXP',
        amount: '29000',
        fee: '0',
        statusCode: '02', // Canceled/Expired
        statusMessage: 'EXPIRED',
      }),
    } as any);

    const req = new NextRequest(`http://localhost:3000/api/payment/status/${merchantOrderId}`);
    const res = await statusPayment(req, {
      params: Promise.resolve({ merchantOrderId }),
    });

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.status).toBe('EXPIRED');
    expect(db.transaction.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 'tx-exp-1' },
        data: { status: 'EXPIRED' },
      })
    );
  });

  it('returns PENDING when Duitku reports statusCode 01 (still waiting for payment)', async () => {
    vi.mocked(db.transaction.findUnique).mockResolvedValueOnce({
      id: 'tx-pend-1',
      merchantOrderId,
      amount: 29000,
      status: 'PENDING',
      package: { id: 'pkg-1', title: 'Paket Pro' },
    } as any);

    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        merchantOrderId,
        reference: 'DUITKU-REF-WAIT',
        amount: '29000',
        fee: '0',
        statusCode: '01', // Pending
        statusMessage: 'PENDING',
      }),
    } as any);

    const req = new NextRequest(`http://localhost:3000/api/payment/status/${merchantOrderId}`);
    const res = await statusPayment(req, {
      params: Promise.resolve({ merchantOrderId }),
    });

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.status).toBe('PENDING');
  });
});
