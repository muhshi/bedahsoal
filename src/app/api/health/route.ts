import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const startTime = Date.now();
  try {
    // Ping PostgreSQL
    await db.$queryRaw`SELECT 1`;
    const latencyMs = Date.now() - startTime;

    return NextResponse.json(
      {
        status: 'ok',
        service: 'cbt-platform',
        database: 'connected',
        latencyMs,
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      {
        status: 'degraded',
        service: 'cbt-platform',
        database: 'disconnected',
        error: errorMessage,
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
