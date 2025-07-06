import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Ambil semua data instansi
export async function GET() {
  try {
    const data = await prisma.instansi.findMany();
    return NextResponse.json(data);
  } catch (error) {
    console.error('GET instansi error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengambil data instansi.' },
      { status: 500 }
    );
  }
}
