"use client";
import React, { useState, useEffect } from "react";
import { FiUsers, FiUserPlus, FiX } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from "recharts";
import { useRouter } from "next/navigation";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const JENJANG_BADGE = {
  "Pertama": "bg-blue-100 text-blue-700 border-blue-300",
  "Muda": "bg-emerald-100 text-emerald-700 border-emerald-300",
  "Madya": "bg-amber-100 text-amber-700 border-amber-300",
  "Utama": "bg-purple-100 text-purple-700 border-purple-300",
};

// Tambahkan tipe PegawaiAPI
interface PegawaiAPI {
  id: string;
  nama: string;
  nip: string;
  email: string;
  jenjang?: { nm_jenjang: string };
  instansi?: { nama_instansi: string; provinsi?: string };
}

function JenjangStars({ count }: { count: number }) {
  return (
    <span className="flex mb-1 text-yellow-400 text-2xl drop-shadow">
      {Array.from({ length: count }).map((_, i) => (
        <FaStar key={i} className={i > 0 ? "-ml-2" : ""} />
      ))}
    </span>
  );
}

export default function JenjangAKPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [pegawai, setPegawai] = useState<PegawaiAPI[]>([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 20;
  const router = useRouter();

  // State untuk form tambah data
  const [form, setForm] = useState({
    nama: "",
    nip: "",
    email: "",
    jenjang: "Pertama",
    instansi: "",
    provinsi: "",
  });
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [errorAdd, setErrorAdd] = useState("");

  // Filter states
  const [filterNama, setFilterNama] = useState("");
  const [filterJenjang, setFilterJenjang] = useState("");

  useEffect(() => {
    fetch("/api/pegawai")
      .then((res) => res.json())
      .then((data) => setPegawai(data)); // data adalah array pegawai
  }, []);

  // Hitung summary dan chart dari data pegawai
  const jenjangList = ["Pertama", "Muda", "Madya", "Utama"];
  const jenjangData = jenjangList.map((nm) => ({
    name: nm,
    value: pegawai.filter((p) => p.jenjang?.nm_jenjang === nm).length,
  }));
  const totalAK = pegawai.length;
  const COLORS = ["#2563eb", "#10b981", "#f59e0b", "#8b5cf6"];

  // Data untuk tabel
  const dataTable = pegawai.map((p) => ({
    id: p.id,
    nama: p.nama,
    jenjang: p.jenjang?.nm_jenjang || "-",
    instansi: p.instansi?.nama_instansi || "-",
    provinsi: p.instansi?.provinsi || "-",
    nip: p.nip,
    email: p.email,
  }));

  // Filtered data
  const filteredData = dataTable.filter(row =>
    (!filterNama || row.nama.toLowerCase().includes(filterNama.toLowerCase())) &&
    (!filterJenjang || row.jenjang === filterJenjang)
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const pagedData = filteredData.slice((page-1)*rowsPerPage, page*rowsPerPage);

  // Reset page to 1 if filter changes
  useEffect(() => { setPage(1); }, [filterNama, filterJenjang]);

  return (
    <div className="p-8 flex flex-col gap-10 min-h-screen relative overflow-hidden bg-gray-50">
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
      <div className="relative">
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="relative">
              <h1 className="text-5xl font-black text-blue-600 mb-3">
                🚀 Data Jenjang AK
              </h1>
              <p className="text-gray-700 text-xl font-medium">Kelola data Analis Kebijakan </p>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-emerald-600 text-sm font-medium">Real-time Data</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <div className="text-right">
                <div className="text-4xl font-black text-blue-600">{totalAK}</div>
                <div className="text-sm text-gray-600 font-medium">Total Pegawai AK</div>
                <div className="text-xs text-emerald-600 font-semibold mt-1">↗ +12% bulan ini</div>
              </div>
              <div className="w-20 h-20 bg-blue-500 rounded-xl flex items-center justify-center shadow-sm">
                <FiUsers className="text-white text-3xl" />
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
          <div className="relative flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105">
            <FiUserPlus className="text-2xl" />
            <span className="hidden sm:block">Tambah Data</span>
          </div>
          
          {/* Floating Text Hint */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
            <div className="bg-gray-800/90 text-white text-xs px-3 py-2 rounded-lg shadow-lg">
              Klik untuk menambah pegawai baru
            </div>
            <div className="w-2 h-2 bg-gray-800/90 transform rotate-45 -mt-1 mx-auto"></div>
          </div>
        </div>
      </button>

      {/* Modern Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 mb-8">
        {/* Total AK Card */}
        <div className="bg-white rounded-xl p-6 flex flex-col items-center gap-3 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
          <FiUsers className="text-4xl text-blue-600" />
          <div className="text-4xl font-black text-blue-600">{totalAK}</div>
          <div className="text-blue-800 font-bold text-sm text-center">Total AK</div>
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
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
            <div key={j.name} className="bg-white rounded-xl p-6 flex flex-col items-center gap-3 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
              <JenjangStars count={idx+1} />
              <div className={`text-3xl font-black ${cardColors[idx]}`}>{j.value}</div>
              <div className="font-bold text-gray-700 text-sm text-center">{j.name}</div>
              <div className="text-xs text-gray-500 font-medium">Jenjang {idx + 1}</div>
            </div>
          );
        })}
      </div>

      {/* Ultra Modern Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 3D-style Bar Chart */}
        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 overflow-hidden transform hover:scale-[1.02] transition-all duration-500">
            {/* Floating decorative elements */}
            <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute bottom-6 left-6 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-20 animate-pulse delay-300"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-ping"></div>
                <h3 className="font-black text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  📊 Distribusi AK per Jenjang
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
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                        backdropFilter: 'blur(10px)'
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

        {/* 3D-style Pie Chart */}
        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 overflow-hidden transform hover:scale-[1.02] transition-all duration-500">
            {/* Floating decorative elements */}
            <div className="absolute top-6 left-4 w-4 h-4 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full opacity-30 animate-float"></div>
            <div className="absolute bottom-4 right-6 w-5 h-5 bg-gradient-to-r from-purple-400 to-violet-500 rounded-full opacity-30 animate-float delay-500"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full animate-ping"></div>
                <h3 className="font-black text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  🥧 Proporsi Jenjang AK
                </h3>
              </div>
              
              <div className="w-full h-72 flex items-center justify-center relative">
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={jenjangData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {jenjangData.map((entry, index) => (
                        <Cell key={`cell-pie-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255,255,255,0.95)',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                        backdropFilter: 'blur(10px)'
                      }}
                    />
                    <Legend 
                      wrapperStyle={{
                        paddingTop: '20px',
                        fontSize: '14px',
                        fontWeight: '600'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 text-center">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-purple-100 px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">Komposisi AK didominasi jenjang Muda dan Madya</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ultra Modern Table Section */}
      <div className="relative group">
        <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
        <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 overflow-hidden">
          {/* Floating decorative elements */}
          <div className="absolute top-4 right-4 w-6 h-6 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-6 left-6 w-4 h-4 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full opacity-20 animate-pulse delay-300"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full animate-ping"></div>
              <h3 className="font-black text-2xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                📋 Tabel Data Jenjang AK
              </h3>
              <div className="ml-auto flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-emerald-700">{filteredData.length} data ditemukan</span>
              </div>
            </div>

            {/* Enhanced Filter Bar */}
            <div className="flex flex-wrap gap-4 mb-8 items-center p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-200">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <input
                  type="text"
                  placeholder="🔍 Cari nama pegawai..."
                  className="relative px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 bg-white/90 shadow-lg font-medium transition-all duration-300 hover:shadow-xl"
                  value={filterNama}
                  onChange={e => setFilterNama(e.target.value)}
                  style={{ minWidth: 200 }}
                />
              </div>
              
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <select
                  className="relative px-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-green-900 bg-white/90 shadow-lg font-medium transition-all duration-300 hover:shadow-xl cursor-pointer"
                  value={filterJenjang}
                  onChange={e => setFilterJenjang(e.target.value)}
                >
                  <option value="">🎯 Semua Jenjang</option>
                  {jenjangList.map(j => <option key={j} value={j}>⭐ {j}</option>)}
                </select>
              </div>
              
              {/* Reset Filter Button */}
              <button
                onClick={() => {
                  setFilterNama('');
                  setFilterJenjang('');
                }}
                className="relative group ml-auto"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-amber-600 rounded-lg blur opacity-50 group-hover:opacity-70 transition duration-300"></div>
                <div className="relative px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
                  ✨ Reset Filter
                </div>
              </button>
            </div>

            {/* Ultra Modern Table */}
            <div className="overflow-x-auto rounded-2xl shadow-2xl">
              <table className="min-w-full text-left border-collapse bg-white/80 backdrop-blur-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
                    <th className="py-4 px-6 font-bold text-sm tracking-wider">👤 Nama (Klik untuk Detail)</th>
                    <th className="py-4 px-6 font-bold text-sm tracking-wider">🏆 Jenjang</th>
                    <th className="py-4 px-6 font-bold text-sm tracking-wider">🏢 Instansi</th>
                  </tr>
                </thead>
                <tbody>
                  {pagedData.map((row, idx) => (
                    <tr 
                      key={row.nama} 
                      className={`
                        group transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:shadow-lg hover:scale-[1.01] cursor-pointer
                        ${idx % 2 === 1 ? "bg-gradient-to-r from-gray-50/50 to-blue-50/30" : "bg-white/60"}
                        hover:border-l-4 hover:border-blue-500
                      `}
                      onClick={() => {
                        // Route ke halaman detail berdasarkan ID
                        router.push(`/admin/jumlah-ak/${row.id}`);
                      }}
                      title={`Klik untuk melihat detail ${row.nama}`}
                    > 
                      <td className="py-4 px-6 font-bold text-blue-700 group-hover:text-indigo-600 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {row.nama.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1">
                            <div className="font-bold flex items-center gap-2">
                              {row.nama}
                              <svg className="w-4 h-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </div>
                            <div className="text-xs text-gray-500">ID: {row.id} • Klik untuk detail</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`
                          inline-flex items-center gap-1 px-3 py-2 rounded-full border text-xs font-bold shadow-lg transform transition-all duration-300 group-hover:scale-110
                          ${JENJANG_BADGE[row.jenjang as keyof typeof JENJANG_BADGE]}
                        `}>
                          <JenjangStars count={jenjangList.indexOf(row.jenjang) + 1} />
                          {row.jenjang}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
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
          <div className="bg-gradient-to-br from-white via-blue-50/90 to-green-50/90 rounded-3xl shadow-2xl p-8 w-full max-w-lg relative backdrop-blur-xl border-2 border-white/20 transform transition-all duration-300 scale-100 hover:scale-[1.02]">
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 bg-white/80 hover:bg-red-50 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110" 
              onClick={() => setShowAddModal(false)}
            >
              <FiX size={20} />
            </button>
            
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FiUserPlus className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-green-600 bg-clip-text text-transparent">
                Tambah Data Pegawai
              </h2>
              <p className="text-gray-600 text-sm mt-2">Lengkapi form di bawah untuk menambah data pegawai baru</p>
            </div>

            {/* Form */}
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setLoadingAdd(true);
                setErrorAdd("");
                try {
                  const res = await fetch("/api/pegawai", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      nama: form.nama,
                      nip: form.nip,
                      email: form.email,
                      jenjang: { nm_jenjang: form.jenjang },
                      instansi: { nama_instansi: form.instansi, provinsi: form.provinsi },
                    }),
                  });
                  if (!res.ok) throw new Error("Gagal menambah data");
                  setShowAddModal(false);
                  setForm({ nama: "", nip: "", email: "", jenjang: "Pertama", instansi: "", provinsi: "" });
                  // Refresh data
                  fetch("/api/pegawai").then(r=>r.json()).then(setPegawai);
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
                  className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-300/30 focus:border-blue-400 transition-all duration-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md" 
                  required 
                  placeholder="Masukkan nama lengkap" 
                  value={form.nama} 
                  onChange={e=>setForm(f=>({...f, nama: e.target.value}))} 
                />
              </div>

              {/* NIP */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">NIP</label>
                <input 
                  className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-300/30 focus:border-blue-400 transition-all duration-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md" 
                  required 
                  placeholder="Masukkan NIP" 
                  value={form.nip} 
                  onChange={e=>setForm(f=>({...f, nip: e.target.value}))} 
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Email</label>
                <input 
                  className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-300/30 focus:border-blue-400 transition-all duration-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md" 
                  required 
                  type="email"
                  placeholder="contoh@email.com" 
                  value={form.email} 
                  onChange={e=>setForm(f=>({...f, email: e.target.value}))} 
                />
              </div>

              {/* Jenjang */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Jenjang</label>
                <select 
                  className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-300/30 focus:border-blue-400 transition-all duration-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md" 
                  value={form.jenjang} 
                  onChange={e=>setForm(f=>({...f, jenjang: e.target.value}))}
                >
                  {jenjangList.map(j=>(<option key={j} value={j}>{j}</option>))}
                </select>
              </div>

              {/* Instansi & Provinsi Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Instansi</label>
                  <input 
                    className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-300/30 focus:border-blue-400 transition-all duration-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md" 
                    required 
                    placeholder="Nama instansi" 
                    value={form.instansi} 
                    onChange={e=>setForm(f=>({...f, instansi: e.target.value}))} 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Provinsi</label>
                  <input 
                    className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-300/30 focus:border-blue-400 transition-all duration-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md" 
                    required 
                    placeholder="Nama provinsi" 
                    value={form.provinsi} 
                    onChange={e=>setForm(f=>({...f, provinsi: e.target.value}))} 
                  />
                </div>
              </div>

              {/* Error Message */}
              {errorAdd && (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3 text-red-700 text-sm font-medium flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  {errorAdd}
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-4">
                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white rounded-xl px-6 py-4 font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100" 
                  disabled={loadingAdd}
                >
                  {loadingAdd ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Menyimpan...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <FiUserPlus className="text-xl" />
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
