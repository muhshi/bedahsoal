import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auth } from '@/auth';
import { ExamMode } from '@prisma/client';

export async function POST(request: NextRequest) {
  try {
    let body: Record<string, unknown> = {};
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Format body request tidak valid' },
        { status: 400 }
      );
    }

    const tryoutId = typeof body.tryoutId === 'string' ? body.tryoutId : null;
    const userName = typeof body.userName === 'string' ? body.userName : undefined;
    const mode = typeof body.mode === 'string' ? body.mode : undefined;

    if (!tryoutId) {
      return NextResponse.json(
        { error: 'Parameter tryoutId diperlukan' },
        { status: 400 }
      );
    }

    // 1. Verify tryout exists and is still published
    const tryout = await db.tryout.findUnique({
      where: { id: tryoutId },
    });

    if (!tryout) {
      return NextResponse.json(
        { error: 'Tryout tidak ditemukan' },
        { status: 404 }
      );
    }

    if (tryout.isActive === false) {
      return NextResponse.json(
        { error: 'Tryout ini tidak tersedia' },
        { status: 403 }
      );
    }

    // 2. Resolve authenticated user or fallback to guest / demo user
    let userId: string | undefined;
    try {
      const authSession = await auth();
      userId = authSession?.user?.id;
    } catch {
      // In testing environments or unmounted headers context
      userId = undefined;
    }

    if (!userId) {
      const user = await db.user.upsert({
        where: { id: 'user-demo-1' },
        update: {
          name: userName || 'Peserta Mandiri',
        },
        create: {
          id: 'user-demo-1',
          email: 'demo@bedahsoal.id',
          name: userName || 'Peserta Mandiri',
          role: 'USER',
        },
      });
      userId = user.id;
    }

    // 3. Enforce package entitlement for paid tryouts
    if (tryout.packageId && db.package && db.userPackage) {
      const pkg = await db.package.findUnique({
        where: { id: tryout.packageId },
        select: { id: true, isFree: true, price: true, isActive: true },
      });

      if (pkg && (pkg.isActive === false || (!pkg.isFree && pkg.price > 0))) {
        if (pkg.isActive === false) {
          return NextResponse.json(
            { error: 'Paket ini tidak tersedia' },
            { status: 403 }
          );
        }

        const entitlement = await db.userPackage.findUnique({
          where: {
            userId_packageId: { userId, packageId: pkg.id },
          },
          select: { id: true },
        });

        if (!entitlement) {
          return NextResponse.json(
            { error: 'Paket belum dimiliki. Selesaikan pembayaran terlebih dahulu.' },
            { status: 403 }
          );
        }
      }
    }

    // 4. Determine attempt number. Only the first simulation attempt is ranked.
    const previousAttempts =
      typeof db.examSession.count === 'function'
        ? await db.examSession.count({
            where: { userId, tryoutId: tryout.id },
          })
        : 0;
    const attemptNumber = previousAttempts + 1;

    const startedAt = new Date();
    const durationMinutes = tryout.durationMinutes || 60;
    const deadline = new Date(startedAt.getTime() + durationMinutes * 60 * 1000);
    const examMode: ExamMode = mode === 'LATIHAN' ? 'LATIHAN' : 'SIMULASI';

    const session = await db.examSession.create({
      data: {
        userId,
        tryoutId: tryout.id,
        mode: examMode,
        attemptNumber,
        rankEligible: examMode === 'SIMULASI' && attemptNumber === 1,
        status: 'IN_PROGRESS',
        startedAt,
        deadline,
        totalScore: 0,
        isPassed: false,
      },
    });

    return NextResponse.json(
      {
        success: true,
        sessionId: session.id,
        examUrl: `/exam/${session.id}`,
        title: tryout.title,
        durationMinutes,
        totalQuestions: tryout.totalQuestions,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error starting new exam session:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan sistem saat memulai sesi ujian' },
      { status: 500 }
    );
  }
}
