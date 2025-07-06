import { NextRequest, NextResponse } from 'next/server';

// Mock data untuk analis bangkom (dalam implementasi nyata, ini akan dari database)
const mockAnalisBangkom = [
  {
    id: 1,
    nip: "198801012010121001",
    niakn: "AB001",
    nama: "Dr. Ahmad Fauzi, S.Kom, M.T",
    jns_kelamin_id: 1,
    golongan_id: 12,
    jalur_id: 1,
    jenjang_id: 4,
    instansi_id: 1,
    phone: "081234567890",
    email: "ahmad.fauzi@bangkom.id",
    nomor_surat: "SK/001/2024",
    tmt_pangkat: "2024-01-01",
    tmt_surat: "2024-01-15",
    unit_kerja: "Bidang Pengembangan Kompetensi Digital",
    photo: null,
    Jabfung_id: 1,
    pendidikan_id: 5,
    jns_kelamin: { id: 1, jns_kelamin: "Laki-laki" },
    jabfung: { id: 1, fungsional: "Analis Pengembangan Kompetensi Madya" },
    golongan: { id: 12, golongan: "III/d" },
    instansi: { id: 1, nama_instansi: "Lembaga Administrasi Negara" },
    jalur: { id: 1, jalur_pengangkatan: "CPNS" },
    jenjang: { id: 4, nm_jenjang: "Madya" },
    pendidikan: { id: 5, pendidikan: "S2" }
  },
  {
    id: 2,
    nip: "198905152011012002",
    niakn: "AB002",
    nama: "Siti Nurhaliza, S.Pd, M.M",
    jns_kelamin_id: 2,
    golongan_id: 11,
    jalur_id: 1,
    jenjang_id: 3,
    instansi_id: 2,
    phone: "081234567891",
    email: "siti.nurhaliza@bangkom.id",
    nomor_surat: "SK/002/2024",
    tmt_pangkat: "2024-02-01",
    tmt_surat: "2024-02-15",
    unit_kerja: "Bidang Inovasi Pembelajaran",
    photo: null,
    Jabfung_id: 2,
    pendidikan_id: 5,
    jns_kelamin: { id: 2, jns_kelamin: "Perempuan" },
    jabfung: { id: 2, fungsional: "Analis Pengembangan Kompetensi Muda" },
    golongan: { id: 11, golongan: "III/c" },
    instansi: { id: 2, nama_instansi: "Kementerian Pendidikan dan Kebudayaan" },
    jalur: { id: 1, jalur_pengangkatan: "CPNS" },
    jenjang: { id: 3, nm_jenjang: "Muda" },
    pendidikan: { id: 5, pendidikan: "S2" }
  },
  {
    id: 3,
    nip: "199203102015031003",
    niakn: "AB003",
    nama: "Budi Santoso, S.T, M.Eng",
    jns_kelamin_id: 1,
    golongan_id: 10,
    jalur_id: 2,
    jenjang_id: 2,
    instansi_id: 3,
    phone: "081234567892",
    email: "budi.santoso@bangkom.id",
    nomor_surat: "SK/003/2024",
    tmt_pangkat: "2024-03-01",
    tmt_surat: "2024-03-15",
    unit_kerja: "Bidang Teknologi Informasi",
    photo: null,
    Jabfung_id: 3,
    pendidikan_id: 5,
    jns_kelamin: { id: 1, jns_kelamin: "Laki-laki" },
    jabfung: { id: 3, fungsional: "Analis Pengembangan Kompetensi Pertama" },
    golongan: { id: 10, golongan: "III/b" },
    instansi: { id: 3, nama_instansi: "Kementerian Komunikasi dan Informatika" },
    jalur: { id: 2, jalur_pengangkatan: "Pindahan" },
    jenjang: { id: 2, nm_jenjang: "Pertama" },
    pendidikan: { id: 5, pendidikan: "S2" }
  }
];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idString } = await params;
    const id = parseInt(idString);
    
    // Simulasi delay untuk loading state
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const analisBangkom = mockAnalisBangkom.find(item => item.id === id);
    
    if (!analisBangkom) {
      return NextResponse.json(
        { error: "Analis Bangkom tidak ditemukan" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(analisBangkom);
  } catch (error) {
    console.error('Error fetching analis bangkom:', error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idString } = await params;
    const id = parseInt(idString);
    const body = await request.json();
    
    // Simulasi delay untuk loading state
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const analisBangkomIndex = mockAnalisBangkom.findIndex(item => item.id === id);
    
    if (analisBangkomIndex === -1) {
      return NextResponse.json(
        { error: "Analis Bangkom tidak ditemukan" },
        { status: 404 }
      );
    }
    
    // Update data (dalam implementasi nyata, ini akan update database)
    const updatedData = {
      ...mockAnalisBangkom[analisBangkomIndex],
      ...body,
      // Preserve relational data structure
      id: id
    };
    
    mockAnalisBangkom[analisBangkomIndex] = updatedData;
    
    return NextResponse.json({
      message: "Data analis bangkom berhasil diperbarui",
      data: updatedData
    });
  } catch (error) {
    console.error('Error updating analis bangkom:', error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
