import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { ExamMode } from '@prisma/client';

export async function POST(request: NextRequest) {
  try {
    let body: any = {};
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Format body request tidak valid' },
        { status: 400 }
      );
    }

    const { tryoutId, userName, mode } = body;

    if (!tryoutId) {
      return NextResponse.json(
        { error: 'Parameter tryoutId diperlukan' },
        { status: 400 }
      );
    }

    // 1. Verify tryout exists
    const tryout = await db.tryout.findUnique({
      where: { id: tryoutId },
    });

    if (!tryout) {
      return NextResponse.json(
        { error: 'Tryout tidak ditemukan' },
        { status: 404 }
      );
    }

    // 2. Resolve guest / demo user
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

    // 3. Create fresh ExamSession with server-authoritative timer
    const startedAt = new Date();
    const durationMinutes = tryout.durationMinutes || 60;
    const deadline = new Date(startedAt.getTime() + durationMinutes * 60 * 1000);
    const examMode: ExamMode = mode === 'LATIHAN' ? 'LATIHAN' : 'SIMULASI';

    const session = await db.examSession.create({
      data: {
        userId: user.id,
        tryoutId: tryout.id,
        mode: examMode,
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
