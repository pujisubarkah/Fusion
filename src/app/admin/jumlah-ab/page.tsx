"use client";
import React, { useState, useEffect } from "react";
import { FiUserPlus, FiX, FiCalendar, FiBookOpen } from "react-icons/fi";
import { FaStar, FaLaptopCode } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, AreaChart, Area } from "recharts";
import { useRouter } from "next/navigation";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const JENJANG_BADGE = {
  "Pertama": "bg-blue-100 text-blue-700 border-blue-300",
  "Muda": "bg-emerald-100 text-emerald-700 border-emerald-300",
  "Madya": "bg-amber-100 text-amber-700 border-amber-300",
  "Utama": "bg-purple-100 text-purple-700 border-purple-300",
};

// Dummy data untuk analis bangkom
const dummyAnalisBangkom = [
  { id: 1, nama: "Dr. Andi Firmansyah", nip: "198501012010011001", email: "andi.firmansyah@kemenkeu.go.id", jenjang: "Utama", instansi: "Pusdiklat Keuangan", umur: 45, spesialisasi: "Analisis Pengembangan SDM", phone: "081234567890" },
  { id: 2, nama: "Prof. Sari Wulandari", nip: "197803152005012002", email: "sari.wulandari@kemenkeu.go.id", jenjang: "Utama", instansi: "Pusdiklat Keuangan", umur: 52, spesialisasi: "Manajemen Kompetensi", phone: "081234567891" },
  { id: 3, nama: "Drs. Bambang Prasetyo", nip: "198112102008011003", email: "bambang.prasetyo@kemenkeu.go.id", jenjang: "Madya", instansi: "Pusdiklat Keuangan", umur: 42, spesialisasi: "Pengembangan Karir", phone: "081234567892" },
  { id: 4, nama: "Dr. Rina Melati", nip: "198505202012012004", email: "rina.melati@kemenkeu.go.id", jenjang: "Madya", instansi: "Pusdiklat Keuangan", umur: 39, spesialisasi: "Assessment Center", phone: "081234567893" },
  { id: 5, nama: "M.Pd. Hendra Kusuma", nip: "199002152015011005", email: "hendra.kusuma@kemenkeu.go.id", jenjang: "Muda", instansi: "Pusdiklat Keuangan", umur: 34, spesialisasi: "Analisis Beban Kerja", phone: "081234567894" },
  { id: 6, nama: "S.Psi. Maya Indira", nip: "199208082018012006", email: "maya.indira@kemenkeu.go.id", jenjang: "Muda", instansi: "Pusdiklat Keuangan", umur: 32, spesialisasi: "Analisis Jabatan", phone: "081234567895" },
  { id: 7, nama: "S.E. Andi Setiawan", nip: "199512252020011007", email: "andi.setiawan@kemenkeu.go.id", jenjang: "Pertama", instansi: "Pusdiklat Keuangan", umur: 29, spesialisasi: "Evaluasi Kinerja", phone: "081234567896" },
  { id: 8, nama: "S.Kom. Devi Rahma", nip: "199607102022012008", email: "devi.rahma@kemenkeu.go.id", jenjang: "Pertama", instansi: "Pusdiklat Keuangan", umur: 28, spesialisasi: "Sistem Informasi SDM", phone: "081234567897" },
  { id: 9, nama: "Dr. Ir. Budi Hartono", nip: "197601012000011009", email: "budi.hartono@kemenkeu.go.id", jenjang: "Utama", instansi: "Pusdiklat Keuangan", umur: 48, spesialisasi: "Perencanaan SDM", phone: "081234567898" },
  { id: 10, nama: "M.Si. Lestari Dewi", nip: "198304172010012010", email: "lestari.dewi@kemenkeu.go.id", jenjang: "Madya", instansi: "Pusdiklat Keuangan", umur: 41, spesialisasi: "Analisis Kompetensi", phone: "081234567899" },
  { id: 11, nama: "S.H. Rudi Santoso", nip: "198909202015011011", email: "rudi.santoso@kemenkeu.go.id", jenjang: "Muda", instansi: "Pusdiklat Keuangan", umur: 35, spesialisasi: "Regulatory Compliance", phone: "081234567800" },
  { id: 12, nama: "M.Pd. Indira Putri", nip: "199103122018012012", email: "indira.putri@kemenkeu.go.id", jenjang: "Muda", instansi: "Pusdiklat Keuangan", umur: 33, spesialisasi: "Learning & Development", phone: "081234567801" },
  { id: 13, nama: "S.T. Fajar Ramadhan", nip: "199406152021011013", email: "fajar.ramadhan@kemenkeu.go.id", jenjang: "Pertama", instansi: "Pusdiklat Keuangan", umur: 30, spesialisasi: "Data Analytics", phone: "081234567802" },
  { id: 14, nama: "S.Psi. Ratna Sari", nip: "199510252022012014", email: "ratna.sari@kemenkeu.go.id", jenjang: "Pertama", instansi: "Pusdiklat Keuangan", umur: 29, spesialisasi: "Talent Management", phone: "081234567803" },
  { id: 15, nama: "Dr. Hadi Nugroho", nip: "197802282005011015", email: "hadi.nugroho@kemenkeu.go.id", jenjang: "Madya", instansi: "Pusdiklat Keuangan", umur: 46, spesialisasi: "Organizational Development", phone: "081234567804" },
];

function JenjangStars({ count }: { count: number }) {
  return (
    <span className="flex mb-1 text-yellow-400 text-2xl drop-shadow">
      {Array.from({ length: count }).map((_, i) => (
        <FaStar key={i} className={i > 0 ? "-ml-2" : ""} />
      ))}
    </span>
  );
}

export default function AnalisBangkomPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [analisBangkom, setAnalisBangkom] = useState(dummyAnalisBangkom);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const router = useRouter();

  // State untuk form tambah data
  const [form, setForm] = useState({
    nama: "",
    nip: "",
    email: "",
    jenjang: "Pertama",
    instansi: "Pusdiklat Keuangan",
    umur: "",
    spesialisasi: "",
    phone: "",
  });
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [errorAdd, setErrorAdd] = useState("");

  // Filter states
  const [filterNama, setFilterNama] = useState("");
  const [filterJenjang, setFilterJenjang] = useState("");
  const [filterUmur, setFilterUmur] = useState("");

  // Hitung summary dan chart dari data analis bangkom
  const jenjangList = ["Pertama", "Muda", "Madya", "Utama"];
  const jenjangData = jenjangList.map((nm) => ({
    name: nm,
    value: analisBangkom.filter((w) => w.jenjang === nm).length,
  }));
  const totalAnalisBangkom = analisBangkom.length;
  const COLORS = ["#2563eb", "#10b981", "#f59e0b", "#8b5cf6"];

  // Data untuk chart umur (group by age ranges)
  const ageRanges = [
    { range: "25-30", min: 25, max: 30 },
    { range: "31-35", min: 31, max: 35 },
    { range: "36-40", min: 36, max: 40 },
    { range: "41-45", min: 41, max: 45 },
    { range: "46-50", min: 46, max: 50 },
    { range: "51-55", min: 51, max: 55 },
  ];

  const umurData = ageRanges.map((range) => ({
    name: range.range,
    value: analisBangkom.filter((w) => w.umur >= range.min && w.umur <= range.max).length,
  }));

  // Data untuk tabel
  const dataTable = analisBangkom.map((w) => ({
    id: w.id,
    nama: w.nama,
    jenjang: w.jenjang,
    instansi: w.instansi,
    umur: w.umur,
    spesialisasi: w.spesialisasi,
    nip: w.nip,
    email: w.email,
    phone: w.phone,
  }));

  // Filtered data
  const filteredData = dataTable.filter(row =>
    (!filterNama || row.nama.toLowerCase().includes(filterNama.toLowerCase())) &&
    (!filterJenjang || row.jenjang === filterJenjang) &&
    (!filterUmur || (
      filterUmur === "25-35" ? (row.umur >= 25 && row.umur <= 35) :
      filterUmur === "36-45" ? (row.umur >= 36 && row.umur <= 45) :
      filterUmur === "46-55" ? (row.umur >= 46 && row.umur <= 55) : true
    ))
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const pagedData = filteredData.slice((page-1)*rowsPerPage, page*rowsPerPage);

  // Reset page to 1 if filter changes
  useEffect(() => { setPage(1); }, [filterNama, filterJenjang, filterUmur]);

  // Calculate average age
  const averageAge = Math.round(analisBangkom.reduce((sum, w) => sum + w.umur, 0) / analisBangkom.length);

  return (
    <div className="p-8 flex flex-col gap-10 min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Subtle Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gray-50"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-20 left-20 w-96 h-96 bg-[#C2E7F6]/40 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-40 w-72 h-72 bg-blue-50/60 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Modern Header Section */}
      <div className="relative group">
        <div className="relative bg-white rounded-xl p-8 shadow-sm border border-gray-200 transform hover:scale-[1.01] transition-all duration-500">
          <div className="flex items-center justify-between">
            <div className="relative">
              <h1 className="text-4xl font-black text-blue-600 mb-3">
                💼 Data Analis Bangkom
              </h1>
              <p className="text-gray-600 text-lg font-medium">Kelola data analis pengembangan kompetensi dengan sistem modern</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-emerald-600 text-sm font-medium">Real-time Data</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <div className="text-right">
                <div className="text-4xl font-black text-blue-600">{totalAnalisBangkom}</div>
                <div className="text-sm text-gray-600 font-medium">Total Analis Bangkom</div>
                <div className="text-xs text-emerald-600 font-semibold mt-1">↗ +12% bulan ini</div>
              </div>
              <div className="relative group cursor-pointer">
                <div className="w-20 h-20 bg-[#C2E7F6] rounded-xl flex items-center justify-center shadow-sm transform group-hover:rotate-6 transition-all duration-300 border border-gray-200">
                  <FaLaptopCode className="text-blue-600 text-3xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Floating Add Button */}
      <button
        className="fixed bottom-8 right-8 z-50 group"
        onClick={() => setShowAddModal(true)}
      >
        <div className="relative">
          {/* Main Button */}
          <div className="relative flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg border border-gray-200 transform transition-all duration-300 group-hover:scale-105">
            <FiUserPlus className="text-2xl" />
            <span className="hidden sm:block">Tambah Analis Bangkom</span>
          </div>
          
          {/* Floating Text Hint */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
            <div className="bg-gray-800/90 text-white text-xs px-3 py-2 rounded-lg shadow-lg">
              Klik untuk menambah analis bangkom baru
            </div>
            <div className="w-2 h-2 bg-gray-800/90 transform rotate-45 -mt-1 mx-auto"></div>
          </div>
        </div>
      </button>

      {/* Modern Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-6 gap-6 mb-8">
        {/* Total Analis Bangkom Card */}
        <div className="relative group">
          <div className="relative bg-white rounded-xl p-6 flex flex-col items-center gap-3 shadow-sm border border-gray-200 transform hover:scale-105 transition-all duration-500">
            <div className="relative">
              <FaLaptopCode className="relative text-4xl text-blue-600" />
            </div>
            <div className="text-4xl font-black text-blue-600">{totalAnalisBangkom}</div>
            <div className="text-gray-700 font-bold text-sm text-center">Total Analis Bangkom</div>
            <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Jenjang Cards */}
        {jenjangData.map((j, idx) => {
          const cardColors = [
            'text-blue-600',
            'text-emerald-600', 
            'text-amber-600',
            'text-purple-600'
          ];
          
          return (
            <div key={j.name} className="relative group">
              <div className="relative bg-white rounded-xl p-6 flex flex-col items-center gap-3 shadow-sm border border-gray-200 transform hover:scale-105 transition-all duration-500">
                <div className="relative">
                  <JenjangStars count={idx+1} />
                </div>
                <div className={`text-3xl font-black ${cardColors[idx]}`}>{j.value}</div>
                <div className="font-bold text-gray-700 text-sm text-center">{j.name}</div>
                <div className="text-xs text-gray-500 font-medium">Jenjang {idx + 1}</div>
              </div>
            </div>
          );
        })}

        {/* Average Age Card */}
        <div className="relative group">
          <div className="relative bg-white rounded-xl p-6 flex flex-col items-center gap-3 shadow-sm border border-gray-200 transform hover:scale-105 transition-all duration-500">
            <div className="relative">
              <FiCalendar className="relative text-4xl text-emerald-600" />
            </div>
            <div className="text-4xl font-black text-emerald-600">{averageAge}</div>
            <div className="text-gray-700 font-bold text-sm text-center">Rata-rata Umur</div>
            <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Modern Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Jenjang Distribution Chart */}
        <div className="relative group">
          <div className="relative bg-white rounded-xl shadow-sm p-8 border border-gray-200 overflow-hidden transform hover:scale-[1.02] transition-all duration-500">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <h3 className="font-black text-2xl text-blue-600">
                  📊 Distribusi Jenjang Analis Bangkom
                </h3>
              </div>
              
              <div className="w-full h-72 flex items-center justify-center relative">
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={jenjangData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="name" className="text-sm font-medium" />
                    <YAxis allowDecimals={false} className="text-sm" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255,255,255,0.95)',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                      {jenjangData.map((entry, index) => (
                        <Cell key={`cell-bar-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Age Distribution Chart */}
        <div className="relative group">
          <div className="relative bg-white rounded-xl shadow-sm p-8 border border-gray-200 overflow-hidden transform hover:scale-[1.02] transition-all duration-500">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                <h3 className="font-black text-2xl text-emerald-600">
                  📈 Distribusi Umur Analis Bangkom
                </h3>
              </div>
              
              <div className="w-full h-72 flex items-center justify-center relative">
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={umurData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="name" className="text-sm font-medium" />
                    <YAxis allowDecimals={false} className="text-sm" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255,255,255,0.95)',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#10b981" 
                      fill="url(#ageGradient)" 
                      strokeWidth={3}
                    />
                    <defs>
                      <linearGradient id="ageGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 text-center">
                <div className="inline-flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">Mayoritas analis bangkom berusia 31-45 tahun</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Table Section */}
      <div className="relative group">
        <div className="relative bg-white rounded-xl shadow-sm p-8 border border-gray-200 overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <h3 className="font-black text-2xl text-emerald-600">
                📋 Tabel Data Analis Bangkom
              </h3>
              <div className="ml-auto flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-emerald-700">{filteredData.length} data ditemukan</span>
              </div>
            </div>

            {/* Enhanced Filter Bar */}
            <div className="flex flex-wrap gap-4 mb-8 items-center p-6 bg-gray-50 rounded-xl border border-gray-200">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="🔍 Cari nama analis bangkom..."
                  className="relative px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-700 bg-white shadow-sm font-medium transition-all duration-300"
                  value={filterNama}
                  onChange={e => setFilterNama(e.target.value)}
                  style={{ minWidth: 200 }}
                />
              </div>
              
              <div className="relative group">
                <select
                  className="relative px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-700 bg-white shadow-sm font-medium transition-all duration-300 cursor-pointer"
                  value={filterJenjang}
                  onChange={e => setFilterJenjang(e.target.value)}
                >
                  <option value="">🎯 Semua Jenjang</option>
                  {jenjangList.map(j => <option key={j} value={j}>⭐ {j}</option>)}
                </select>
              </div>

              <div className="relative group">
                <select
                  className="relative px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-700 bg-white shadow-sm font-medium transition-all duration-300 cursor-pointer"
                  value={filterUmur}
                  onChange={e => setFilterUmur(e.target.value)}
                >
                  <option value="">📅 Semua Umur</option>
                  <option value="25-35">👶 25-35 tahun</option>
                  <option value="36-45">🧑 36-45 tahun</option>
                  <option value="46-55">👨 46-55 tahun</option>
                </select>
              </div>
              
              {/* Reset Filter Button */}
              <button
                onClick={() => {
                  setFilterNama('');
                  setFilterJenjang('');
                  setFilterUmur('');
                }}
                className="relative group ml-auto"
              >
                <div className="relative px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-lg shadow-sm transform transition-all duration-300">
                  ✨ Reset Filter
                </div>
              </button>
            </div>

            {/* Modern Table */}
            <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-200">
              <table className="min-w-full text-left border-collapse bg-white">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="py-4 px-6 font-bold text-sm tracking-wider">👤 Nama</th>
                    <th className="py-4 px-6 font-bold text-sm tracking-wider">🏆 Jenjang</th>
                    <th className="py-4 px-6 font-bold text-sm tracking-wider">📅 Umur</th>
                    <th className="py-4 px-6 font-bold text-sm tracking-wider">📚 Spesialisasi</th>
                    <th className="py-4 px-6 font-bold text-sm tracking-wider">🏢 Instansi</th>
                  </tr>
                </thead>
                <tbody>
                  {pagedData.map((row, idx) => (
                    <tr 
                      key={row.nama} 
                      className={`
                        group transition-all duration-300 hover:bg-[#C2E7F6]/30 cursor-pointer
                        ${idx % 2 === 1 ? "bg-gray-50" : "bg-white"}
                        hover:border-l-4 hover:border-blue-500
                      `}
                      title={`Klik untuk melihat detail ${row.nama}`}
                      onClick={() => router.push(`/admin/jumlah-ab/${row.id}`)}
                    > 
                      <td className="py-4 px-6 font-bold text-blue-700 group-hover:text-blue-600 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {row.nama.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1">
                            <div className="font-bold flex items-center gap-2">
                              {row.nama}
                              <FaLaptopCode className="w-4 h-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="text-xs text-gray-500">ID: {row.id} • Analis</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`
                          inline-flex items-center gap-1 px-3 py-2 rounded-full border text-xs font-bold shadow-sm
                          ${JENJANG_BADGE[row.jenjang as keyof typeof JENJANG_BADGE]}
                        `}>
                          <JenjangStars count={jenjangList.indexOf(row.jenjang) + 1} />
                          {row.jenjang}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-700">
                        <div className="flex items-center gap-2">
                          <FiCalendar className="text-sm text-emerald-500" />
                          <span className="font-bold">{row.umur} tahun</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-700">
                        <div className="flex items-center gap-2">
                          <FiBookOpen className="text-sm text-purple-500" />
                          <div className="max-w-xs truncate">{row.spesialisasi}</div>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-700">
                        <div className="max-w-xs truncate">{row.instansi}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => setPage((p) => Math.max(1, p-1))} aria-disabled={page === 1} />
            </PaginationItem>
            <span className="px-4 py-2 text-blue-700 font-semibold select-none">Halaman {page} dari {totalPages}</span>
            <PaginationItem>
              <PaginationNext onClick={() => setPage((p) => Math.min(totalPages, p+1))} aria-disabled={page === totalPages} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {/* Modal Tambah Data */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative border border-gray-200 transform transition-all duration-300">
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 bg-gray-100 hover:bg-red-50 rounded-full p-2 shadow-sm transition-all duration-200" 
              onClick={() => setShowAddModal(false)}
            >
              <FiX size={20} />
            </button>
            
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <FaLaptopCode className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl font-bold text-blue-600">
                Tambah Data Analis Bangkom
              </h2>
              <p className="text-gray-600 text-sm mt-2">Lengkapi form di bawah untuk menambah data analis bangkom baru</p>
            </div>

            {/* Form */}
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setLoadingAdd(true);
                setErrorAdd("");
                try {
                  // Simulasi API call
                  await new Promise(resolve => setTimeout(resolve, 1500));
                  
                  const newAnalisBangkom = {
                    id: analisBangkom.length + 1,
                    nama: form.nama,
                    nip: form.nip,
                    email: form.email,
                    jenjang: form.jenjang,
                    instansi: form.instansi,
                    umur: parseInt(form.umur),
                    spesialisasi: form.spesialisasi,
                    phone: form.phone,
                  };
                  
                  setAnalisBangkom([...analisBangkom, newAnalisBangkom]);
                  setShowAddModal(false);
                  setForm({ 
                    nama: "", 
                    nip: "", 
                    email: "", 
                    jenjang: "Pertama", 
                    instansi: "Pusdiklat Keuangan", 
                    umur: "", 
                    spesialisasi: "", 
                    phone: "" 
                  });
                } catch {
                  setErrorAdd("Gagal menambah data");
                } finally {
                  setLoadingAdd(false);
                }
              }}
              className="space-y-4"
            >
              {/* Nama */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Nama Lengkap</label>
                <input 
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 bg-white shadow-sm" 
                  required 
                  placeholder="Masukkan nama lengkap" 
                  value={form.nama} 
                  onChange={e=>setForm(f=>({...f, nama: e.target.value}))} 
                />
              </div>

              {/* NIP & Umur Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">NIP</label>
                  <input 
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 bg-white shadow-sm" 
                    required 
                    placeholder="Masukkan NIP" 
                    value={form.nip} 
                    onChange={e=>setForm(f=>({...f, nip: e.target.value}))} 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Umur</label>
                  <input 
                    type="number"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 bg-white shadow-sm" 
                    required 
                    placeholder="Umur" 
                    min="25"
                    max="65"
                    value={form.umur} 
                    onChange={e=>setForm(f=>({...f, umur: e.target.value}))} 
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Email</label>
                <input 
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 bg-white shadow-sm" 
                  required 
                  type="email"
                  placeholder="contoh@kemenkeu.go.id" 
                  value={form.email} 
                  onChange={e=>setForm(f=>({...f, email: e.target.value}))} 
                />
              </div>

              {/* Jenjang & Phone Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Jenjang</label>
                  <select 
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 bg-white shadow-sm" 
                    value={form.jenjang} 
                    onChange={e=>setForm(f=>({...f, jenjang: e.target.value}))}
                  >
                    {jenjangList.map(j=>(<option key={j} value={j}>{j}</option>))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">No. HP</label>
                  <input 
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 bg-white shadow-sm" 
                    required 
                    placeholder="08xxxxxxxxxx" 
                    value={form.phone} 
                    onChange={e=>setForm(f=>({...f, phone: e.target.value}))} 
                  />
                </div>
              </div>

              {/* Spesialisasi & Instansi Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Spesialisasi</label>
                  <input 
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 bg-white shadow-sm" 
                    required 
                    placeholder="Bidang spesialisasi" 
                    value={form.spesialisasi} 
                    onChange={e=>setForm(f=>({...f, spesialisasi: e.target.value}))} 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Instansi</label>
                  <input 
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 bg-white shadow-sm" 
                    required 
                    placeholder="Nama instansi" 
                    value={form.instansi} 
                    onChange={e=>setForm(f=>({...f, instansi: e.target.value}))} 
                  />
                </div>
              </div>

              {/* Error Message */}
              {errorAdd && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm font-medium flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  {errorAdd}
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-4">
                <button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-4 font-bold text-lg shadow-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed" 
                  disabled={loadingAdd}
                >
                  {loadingAdd ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Menyimpan...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <FaLaptopCode className="text-xl" />
                      Simpan Data
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
