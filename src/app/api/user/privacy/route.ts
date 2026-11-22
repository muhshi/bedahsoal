import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/lib/db';

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Silakan login terlebih dahulu untuk mengubah pengaturan privasi.' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { isNamePublic } = body;

    if (typeof isNamePublic !== 'boolean') {
      return NextResponse.json(
        { error: 'Field isNamePublic harus berupa boolean (true/false).' },
        { status: 400 }
      );
    }

    const updatedUser = await db.user.update({
      where: { id: session.user.id },
      data: { isNamePublic },
      select: {
        id: true,
        name: true,
        isNamePublic: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: isNamePublic
        ? 'Nama lengkap Anda kini ditampilkan secara publik di papan peringkat.'
        : 'Nama Anda kini disamarkan secara privat di papan peringkat.',
      user: updatedUser,
    });
  } catch (error: any) {
    console.error('[API_USER_PRIVACY_ERROR]', error);
    return NextResponse.json(
      { error: error.message || 'Gagal memperbarui pengaturan privasi.' },
      { status: 500 }
    );
  }
}
