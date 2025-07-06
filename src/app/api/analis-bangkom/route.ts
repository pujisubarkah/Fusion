import { NextRequest, NextResponse } from 'next/server';

// Mock data untuk list analis bangkom
const mockAnalisBangkomList = [
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

export async function GET(request: NextRequest) {
  try {
    // Simulasi delay untuk loading state
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const jenjang = searchParams.get('jenjang');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    let filteredData = [...mockAnalisBangkomList];
    
    // Filter berdasarkan search query
    if (search) {
      filteredData = filteredData.filter(item =>
        item.nama.toLowerCase().includes(search.toLowerCase()) ||
        item.nip.includes(search) ||
        item.email?.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Filter berdasarkan jenjang
    if (jenjang) {
      filteredData = filteredData.filter(item =>
        item.jenjang?.nm_jenjang === jenjang
      );
    }
    
    // Pagination
    const total = filteredData.length;
    const paginatedData = filteredData.slice(offset, offset + limit);
    
    return NextResponse.json({
      data: paginatedData,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      }
    });
  } catch (error) {
    console.error('Error fetching analis bangkom list:', error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Simulasi delay untuk loading state
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Validate required fields
    const requiredFields = ['nama', 'nip', 'email', 'jenjang_id', 'instansi_id'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Field ${field} wajib diisi` },
          { status: 400 }
        );
      }
    }
    
    // Create new analis bangkom (dalam implementasi nyata, ini akan insert ke database)
    const newId = Math.max(...mockAnalisBangkomList.map(item => item.id)) + 1;
    const newAnalisBangkom = {
      id: newId,
      ...body,
      // Set default values if not provided
      photo: null,
      Jabfung_id: 1,
      // Add relational data based on IDs (dalam implementasi nyata, ini akan di-join dari database)
      jns_kelamin: { id: body.jns_kelamin_id, jns_kelamin: body.jns_kelamin_id === 1 ? "Laki-laki" : "Perempuan" },
      jabfung: { id: 1, fungsional: "Analis Pengembangan Kompetensi" },
      golongan: { id: body.golongan_id, golongan: "III/c" },
      instansi: { id: body.instansi_id, nama_instansi: "Default Instansi" },
      jalur: { id: body.jalur_id, jalur_pengangkatan: "CPNS" },
      jenjang: { id: body.jenjang_id, nm_jenjang: "Pertama" },
      pendidikan: { id: body.pendidikan_id, pendidikan: "S1" }
    };
    
    mockAnalisBangkomList.push(newAnalisBangkom);
    
    return NextResponse.json({
      message: "Data analis bangkom berhasil ditambahkan",
      data: newAnalisBangkom
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating analis bangkom:', error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
