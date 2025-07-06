import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Ambil semua data jalur pengangkatan
export async function GET() {
  try {
    const data = await prisma.jalur.findMany();
    return NextResponse.json(data);
  } catch (error) {
    console.error('GET jalur error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengambil data jalur pengangkatan.' },
      { status: 500 }
    );
  }
}
