// app/api/pegawai/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const pegawai = await prisma.pegawai.findUnique({
    where: { id: parseInt(params.id) },
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

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  const updated = await prisma.pegawai.update({
    where: { id: parseInt(params.id) },
    data: body,
  });
  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const deleted = await prisma.pegawai.delete({
    where: { id: parseInt(params.id) },
  });
  return NextResponse.json(deleted);
}
