import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Ambil semua data pendidikan
export async function GET() {
  try {
    const data = await prisma.pendidikan.findMany();
    return NextResponse.json(data);
  } catch (error) {
    console.error('GET pendidikan error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengambil data pendidikan.' },
      { status: 500 }
    );
  }
}
