// app/api/pegawai/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // pastikan path sesuai

// GET semua pegawai
export async function GET() {
  const pegawai = await prisma.pegawai.findMany({
    include: {
      jns_kelamin: true,
      jabfung: true,
      golongan: true,
      instansi: true,
      jalur: true,
      jenjang: true,
      pendidikan: true,
    },
  });
  return NextResponse.json(pegawai);
}

// POST buat pegawai baru
export async function POST(request: Request) {
  const body = await request.json();
  const pegawai = await prisma.pegawai.create({ data: body });
  return NextResponse.json(pegawai);
}
