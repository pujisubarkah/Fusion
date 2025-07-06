import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Ambil semua data jenis kelamin
export async function GET() {
  try {
    const data = await prisma.jns_kelamin.findMany();
    return NextResponse.json(data);
  } catch (error) {
    console.error('GET jns_kelamin error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengambil data jenis kelamin.' },
      { status: 500 }
    );
  }
}
