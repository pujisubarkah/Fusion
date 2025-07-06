import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Ambil semua data jenjang
export async function GET() {
  try {
    const data = await prisma.jenjang.findMany();
    return NextResponse.json(data);
  } catch (error) {
    console.error('GET jenjang error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengambil data jenjang.' },
      { status: 500 }
    );
  }
}
