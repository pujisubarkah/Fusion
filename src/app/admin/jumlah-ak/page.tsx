"use client";
import React, { useState, useEffect } from "react";
import { FiUsers, FiUserPlus, FiX } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from "recharts";
import { useRouter } from "next/navigation";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const JENJANG_BADGE = {
  "Pertama": "bg-blue-100 text-blue-700 border-blue-300",
  "Muda": "bg-green-100 text-green-700 border-green-300",
  "Madya": "bg-red-100 text-red-700 border-red-300",
  "Utama": "bg-sky-100 text-sky-700 border-sky-300",
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

// Define the Profile type for selectedProfile
type Profile = {
  id: string;
  nama: string;
  nip: string;
  email: string;
  jenjang: string;
  instansi: string;
  provinsi: string;
};

export default function JenjangAKPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [pegawai, setPegawai] = useState<PegawaiAPI[]>([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 20;
  const router = useRouter();

  // Filter states
  const [filterNama, setFilterNama] = useState("");
  const [filterJenjang, setFilterJenjang] = useState("");
  const [filterProvinsi, setFilterProvinsi] = useState("");

  useEffect(() => {
    fetch("/api/pegawai")
      .then((res) => res.json())
      .then((data) => setPegawai(data));
  }, []);

  // Hitung summary dan chart dari data pegawai
  const jenjangList = ["Pertama", "Muda", "Madya", "Utama"];
  const jenjangData = jenjangList.map((nm) => ({
    name: nm,
    value: pegawai.filter((p) => p.jenjang?.nm_jenjang === nm).length,
  }));
  const totalAK = pegawai.length;
  const COLORS = ["#2563eb", "#22c55e", "#f87171", "#0ea5e9"];

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
    (!filterJenjang || row.jenjang === filterJenjang) &&
    (!filterProvinsi || row.provinsi === filterProvinsi)
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const pagedData = filteredData.slice((page-1)*rowsPerPage, page*rowsPerPage);

  // Reset page to 1 if filter changes
  useEffect(() => { setPage(1); }, [filterNama, filterJenjang, filterProvinsi]);

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProfile(null);
  };

  return (
    <div className="p-8 flex flex-col gap-10 min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 relative">
      {/* Floating Add Button */}
      <button
        className="fixed bottom-8 right-8 z-40 flex items-center gap-2 bg-gradient-to-r from-blue-600 to-green-500 hover:scale-105 transition-transform text-white font-bold px-6 py-3 rounded-full shadow-2xl border-4 border-white/60 backdrop-blur-lg hover:shadow-blue-400/50"
        onClick={() => alert('Fitur tambah data belum diimplementasikan.')}
      >
        <FiUserPlus className="text-2xl" /> Tambah Data
      </button>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 mb-4">
        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center gap-2 shadow-xl border-2 border-blue-200 hover:scale-105 transition-transform">
          <FiUsers className="text-3xl text-blue-700 drop-shadow mb-1" />
          <div className="text-3xl font-extrabold text-blue-900 animate-pulse">{totalAK}</div>
          <div className="text-blue-800 font-semibold text-xs text-center">Total AK</div>
        </div>
        {jenjangData.map((j, idx) => {
          return (
            <div key={j.name} className="bg-gradient-to-br from-white/80 to-green-50 rounded-2xl p-6 flex flex-col items-center gap-2 shadow-xl border-2 border-blue-200 hover:scale-105 transition-transform">
              <JenjangStars count={idx+1} />
              <div className="text-2xl font-extrabold" style={{ color: COLORS[idx] }}>{j.value}</div>
              <div className="font-semibold text-blue-800 text-xs text-center">{j.name}</div>
            </div>
          );
        })}
      </div>

      {/* Grafik Bar & Pie Jenjang */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="bg-white/90 rounded-2xl shadow-xl p-8 flex flex-col items-center border-t-4 border-2 border-blue-200 relative overflow-hidden hover:shadow-blue-200/80 transition-shadow">
          <h3 className="font-bold text-xl mb-4 text-blue-900 z-10">Bar Chart Jumlah AK per Jenjang</h3>
          <div className="w-full h-64 flex items-center justify-center text-gray-400 z-10">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={jenjangData}>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#2563eb">
                  {jenjangData.map((entry, index) => (
                    <Cell key={`cell-bar-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Pie Chart */}
        <div className="bg-white/90 rounded-2xl shadow-xl p-8 flex flex-col items-center border-t-4 border-2 border-blue-200 relative overflow-hidden hover:shadow-green-200/80 transition-shadow">
          <h3 className="font-bold text-xl mb-4 text-green-700 z-10">Pie Chart Komposisi Jenjang AK</h3>
          <div className="w-full h-64 flex items-center justify-center text-gray-400 z-10">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <defs>
                  <linearGradient id="pie-blue" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity={0.9}/>
                    <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.7}/>
                  </linearGradient>
                  <linearGradient id="pie-green" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity={0.9}/>
                    <stop offset="100%" stopColor="#bbf7d0" stopOpacity={0.7}/>
                  </linearGradient>
                  <linearGradient id="pie-red" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#f87171" stopOpacity={0.9}/>
                    <stop offset="100%" stopColor="#fecaca" stopOpacity={0.7}/>
                  </linearGradient>
                  <linearGradient id="pie-sky" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.9}/>
                    <stop offset="100%" stopColor="#bae6fd" stopOpacity={0.7}/>
                  </linearGradient>
                </defs>
                <Pie
                  data={jenjangData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  <Cell fill="url(#pie-blue)" />
                  <Cell fill="url(#pie-green)" />
                  <Cell fill="url(#pie-red)" />
                  <Cell fill="url(#pie-sky)" />
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-green-700 font-medium text-sm">Komposisi AK didominasi jenjang Muda dan Madya.</div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/90 rounded-2xl shadow-xl p-8 overflow-x-auto border-2 border-blue-200">
        <h3 className="font-bold text-xl mb-4 text-blue-700">Tabel Data Jenjang AK</h3>
        {/* Filter Bar */}
        <div className="flex flex-wrap gap-4 mb-6 items-center">
          <input
            type="text"
            placeholder="Cari nama..."
            className="px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 bg-white/80 shadow"
            value={filterNama}
            onChange={e => setFilterNama(e.target.value)}
            style={{ minWidth: 180 }}
          />
          <select
            className="px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 bg-white/80 shadow"
            value={filterJenjang}
            onChange={e => setFilterJenjang(e.target.value)}
          >
            <option value="">Semua Jenjang</option>
            {jenjangList.map(j => <option key={j} value={j}>{j}</option>)}
          </select>
          <select
            className="px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 bg-white/80 shadow"
            value={filterProvinsi}
            onChange={e => setFilterProvinsi(e.target.value)}
          >
            <option value="">Semua Provinsi</option>
            {[...new Set(dataTable.map(d => d.provinsi).filter(Boolean))].sort().map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold shadow hover:bg-blue-600 transition"
            onClick={() => {
              setFilterNama("");
              setFilterJenjang("");
              setFilterProvinsi("");
            }}
          >Reset</button>
        </div>
        <table className="min-w-full text-left border border-blue-200 rounded-xl overflow-hidden">
          <thead className="bg-blue-100 border-b-2 border-blue-200">
            <tr>
              <th className="py-2 px-4 border-b border-blue-100 text-blue-900">No</th>
              <th className="py-2 px-4 border-b border-blue-100 text-blue-900">Nama</th>
              <th className="py-2 px-4 border-b border-blue-100 text-blue-900">Jenjang</th>
              <th className="py-2 px-4 border-b border-blue-100 text-blue-900">Instansi</th>
              <th className="py-2 px-4 border-b border-blue-100 text-blue-900">Provinsi</th>
            </tr>
          </thead>
          <tbody>
            {pagedData.map((row, idx) => (
              <tr key={row.nama} className={`hover:bg-blue-50 transition-colors ${idx%2===1?"bg-blue-50/60":""}`}> 
                <td className="py-2 px-4 border-b border-blue-50 text-blue-900">{(page-1)*rowsPerPage+idx+1}</td>
                <td
                  className="py-2 px-4 border-b border-blue-50 text-blue-700 font-semibold cursor-pointer underline"
                  onClick={() => router.push(`/admin/jumlah-ak/${row.id}`)}
                >
                  {row.nama}
                </td>
                <td className="py-2 px-4 border-b border-blue-50">
                  <span className={`inline-block px-3 py-1 rounded-full border text-xs font-bold shadow-sm ${JENJANG_BADGE[row.jenjang as keyof typeof JENJANG_BADGE]}`}>{row.jenjang}</span>
                </td>
                <td className="py-2 px-4 border-b border-blue-50 text-blue-900">{row.instansi}</td>
                <td className="py-2 px-4 border-b border-blue-50 text-blue-900">{row.provinsi}</td>
              </tr>
            ))}
          </tbody>
        </table>
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

      {/* Modal Profil */}
      {showModal && selectedProfile && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white/95 rounded-2xl shadow-2xl p-8 w-full max-w-md relative backdrop-blur-xl border-4 border-blue-100">
            <button className="absolute top-3 right-3 text-blue-500 hover:text-red-500 bg-white/70 rounded-full p-1 shadow" onClick={handleCloseModal}><FiX size={24} /></button>
            <div className="flex flex-col items-center mb-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-green-400 flex items-center justify-center text-white text-4xl font-bold shadow-lg mb-2">
                {selectedProfile.nama.split(' ').map(n=>n[0]).join('').toUpperCase()}
              </div>
              <h2 className="text-2xl font-bold mb-1 text-blue-800">{selectedProfile.nama}</h2>
              <div className="text-green-600 text-sm font-medium mb-2">{selectedProfile.jenjang}</div>
            </div>
            <div className="mb-2"><span className="font-semibold text-blue-700">NIP:</span> {selectedProfile.nip}</div>
            <div className="mb-2"><span className="font-semibold text-blue-700">Email:</span> {selectedProfile.email}</div>
            <div className="mb-2"><span className="font-semibold text-blue-700">Instansi:</span> {selectedProfile.instansi}</div>
            <div className="mb-2"><span className="font-semibold text-blue-700">Provinsi:</span> {selectedProfile.provinsi}</div>
          </div>
        </div>
      )}
    </div>
  );
}
