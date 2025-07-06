// app/api/pegawai/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pegawai = await prisma.pegawai.findUnique({
    where: { id: parseInt(id) },
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

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const updated = await prisma.pegawai.update({
    where: { id: parseInt(id) },
    data: body,
  });
  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const deleted = await prisma.pegawai.delete({
    where: { id: parseInt(id) },
  });
  return NextResponse.json(deleted);
}
