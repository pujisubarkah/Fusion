import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Tipe summary agar tidak error index signature
interface Summary {
  pendidikan: Record<string, number>;
  jenjang: Record<string, number>;
  golongan: Record<string, number>;
  instansi: Record<string, number>;
  jalur: Record<string, number>;
  jenis_kelamin: Record<string, number>;
  tahun: Record<string, number>;
}

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

  const summary: Summary = {
    pendidikan: {},
    jenjang: {},
    golongan: {},
    instansi: {},
    jalur: {},
    jenis_kelamin: {},
    tahun: {},
  };

  pegawai.forEach((p) => {
    // Pendidikan
    const pend = p.pendidikan?.pendidikan || 'Tidak Diketahui';
    summary.pendidikan[pend] = (summary.pendidikan[pend] || 0) + 1;

    // Jenjang
    const jenj = p.jenjang?.nm_jenjang || 'Tidak Diketahui';
    summary.jenjang[jenj] = (summary.jenjang[jenj] || 0) + 1;

    // Golongan
    const gol = p.golongan?.golongan || 'Tidak Diketahui';
    summary.golongan[gol] = (summary.golongan[gol] || 0) + 1;

    // Instansi
    const inst = p.instansi?.nama_instansi || 'Tidak Diketahui';
    summary.instansi[inst] = (summary.instansi[inst] || 0) + 1;

    // Jalur
    const jalur = p.jalur?.jalur_pengangkatan || 'Tidak Diketahui';
    summary.jalur[jalur] = (summary.jalur[jalur] || 0) + 1;

    // Jenis Kelamin
    const kelamin = p.jns_kelamin?.jns_kelamin || 'Tidak Diketahui';
    summary.jenis_kelamin[kelamin] = (summary.jenis_kelamin[kelamin] || 0) + 1;

    // Tahun dari nomor_surat (4 digit terakhir)

const noSurat = p.nomor_surat || '';
const match = noSurat.match(/(\d{4})$/);
let tahun = match ? match[1] : 'Tidak Diketahui';

const tahunNum = parseInt(tahun);
if (isNaN(tahunNum) || tahunNum < 2016 || tahunNum > 2023) {
  tahun = 'Tidak Diketahui';
}

summary.tahun[tahun] = (summary.tahun[tahun] || 0) + 1;

  });

  return NextResponse.json(summary);
}
