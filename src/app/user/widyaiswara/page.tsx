"use client";
import React, { useState } from "react";
import { FiUsers, FiBarChart2, FiUserPlus, FiX, FiAward, FiStar, FiUserCheck } from "react-icons/fi";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from "recharts";

const jenjangData = [
  { name: "Pertama", value: 5 },
  { name: "Muda", value: 75 },
  { name: "Madya", value: 45 },
  { name: "Utama", value: 10 },
];
const COLORS = ["#6366f1", "#a21caf", "#fbbf24", "#22d3ee"];
const dataTable: Profile[] = [
  { id: "1", nama: "Budi Santoso", jenjang: "Madya", instansi: "Kemenkeu", provinsi: "DKI Jakarta", nip: "19780101 200501 1 001", email: "budi@kemenkeu.go.id" },
  { id: "2", nama: "Siti Aminah", jenjang: "Muda", instansi: "Kemendikbud", provinsi: "Jawa Barat", nip: "19800202 200601 2 002", email: "siti@kemdikbud.go.id" },
  { id: "3", nama: "Andi Wijaya", jenjang: "Madya", instansi: "Kemenkes", provinsi: "Jawa Timur", nip: "19790505 200701 1 003", email: "andi@kemenkes.go.id" },
  { id: "4", nama: "Rina Dewi", jenjang: "Pertama", instansi: "Kemenhub", provinsi: "Bali", nip: "19830510 201001 2 004", email: "rina@kemenhub.go.id" },
  { id: "5", nama: "Dewi Lestari", jenjang: "Utama", instansi: "Kemenko PMK", provinsi: "Sumatera Utara", nip: "19761212 199901 2 005", email: "dewi@kemenkopmk.go.id" },
];

type Profile = {
  id: string;
  nama: string;
  jenjang: string;
  instansi: string;
  provinsi: string;
  nip: string;
  email: string;
};

const JENJANG_ICON = [FiStar, FiAward, FiBarChart2, FiUserCheck];
const JENJANG_BADGE = {
  "Pertama": "bg-indigo-100 text-indigo-700 border-indigo-300",
  "Muda": "bg-purple-100 text-purple-700 border-purple-300",
  "Madya": "bg-yellow-100 text-yellow-700 border-yellow-300",
  "Utama": "bg-cyan-100 text-cyan-700 border-cyan-300",
};

export default function WidyaiswaraPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProfile(null);
  };

  return (
    <div className="p-8 flex flex-col gap-10 min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100 relative">
      {/* Floating Add Button */}
      <button
        className="fixed bottom-8 right-8 z-40 flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-105 transition-transform text-white font-bold px-6 py-3 rounded-full shadow-2xl border-4 border-white/60 backdrop-blur-lg hover:shadow-indigo-400/50"
        onClick={() => alert('Fitur tambah data belum diimplementasikan.')}
      >
        <FiUserPlus className="text-2xl" /> Tambah Data
      </button>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 mb-4">
        <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center gap-2 shadow-xl border-2 border-indigo-200 hover:scale-105 transition-transform">
          <FiUsers className="text-3xl text-indigo-700 drop-shadow mb-1" />
          <div className="text-3xl font-extrabold text-indigo-900 animate-pulse">{jenjangData.reduce((a,b)=>a+b.value,0)}</div>
          <div className="text-indigo-800 font-semibold text-xs text-center">Total Widyaiswara</div>
        </div>
        {jenjangData.map((j, idx) => {
          const Icon = JENJANG_ICON[idx];
          return (
            <div key={j.name} className="bg-gradient-to-br from-white/80 to-purple-100 rounded-2xl p-6 flex flex-col items-center gap-2 shadow-xl border-2 border-indigo-200 hover:scale-105 transition-transform">
              <Icon className={`text-3xl drop-shadow mb-1 ${idx===0?"text-indigo-600":idx===1?"text-purple-600":idx===2?"text-yellow-500":"text-cyan-600"}`} />
              <div className="text-2xl font-extrabold" style={{ color: COLORS[idx] }}>{j.value}</div>
              <div className="font-semibold text-indigo-800 text-xs text-center">{j.name}</div>
            </div>
          );
        })}
      </div>

      {/* Grafik Bar & Pie Jenjang */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="bg-white/80 rounded-2xl shadow-2xl p-8 flex flex-col items-center border-t-4 border-2 border-indigo-200 relative overflow-hidden hover:shadow-indigo-200/80 transition-shadow">
          <h3 className="font-bold text-xl mb-4 text-indigo-900 z-10">Bar Chart Jumlah Widyaiswara per Jenjang</h3>
          <div className="w-full h-64 flex items-center justify-center text-gray-400 z-10">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={jenjangData}>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#6366f1">
                  {jenjangData.map((entry, index) => (
                    <Cell key={`cell-bar-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Pie Chart */}
        <div className="bg-white/80 rounded-2xl shadow-2xl p-8 flex flex-col items-center border-t-4 border-2 border-purple-200 relative overflow-hidden hover:shadow-purple-200/80 transition-shadow">
          <h3 className="font-bold text-xl mb-4 text-purple-700 z-10">Pie Chart Komposisi Jenjang</h3>
          <div className="w-full h-64 flex items-center justify-center text-gray-400 z-10">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={jenjangData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {jenjangData.map((entry, index) => (
                    <Cell key={`cell-pie-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-purple-700 font-medium text-sm">Komposisi didominasi jenjang Muda dan Madya.</div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/80 rounded-2xl shadow-xl p-8 overflow-x-auto border-2 border-indigo-200">
        <h3 className="font-bold text-xl mb-4 text-indigo-700">Tabel Data Widyaiswara</h3>
        <table className="min-w-full text-left border border-indigo-200 rounded-xl overflow-hidden">
          <thead className="bg-indigo-100 border-b-2 border-indigo-200">
            <tr>
              <th className="py-2 px-4 border-b border-indigo-100 text-indigo-900">No</th>
              <th className="py-2 px-4 border-b border-indigo-100 text-indigo-900">Nama</th>
              <th className="py-2 px-4 border-b border-indigo-100 text-indigo-900">Jenjang</th>
              <th className="py-2 px-4 border-b border-indigo-100 text-indigo-900">Instansi</th>
              <th className="py-2 px-4 border-b border-indigo-100 text-indigo-900">Provinsi</th>
            </tr>
          </thead>
          <tbody>
            {dataTable.map((row, idx) => (
              <tr key={row.nama} className={`hover:bg-indigo-50 transition-colors ${idx%2===1?"bg-white/60":""}`}> 
                <td className="py-2 px-4 border-b border-indigo-50 text-indigo-900">{idx+1}</td>
                <td className="py-2 px-4 border-b border-indigo-50 text-indigo-700 font-semibold cursor-pointer underline" onClick={() => { setSelectedProfile(row); setShowModal(true); }}>{row.nama}</td>
                <td className="py-2 px-4 border-b border-indigo-50">
                  <span className={`inline-block px-3 py-1 rounded-full border text-xs font-bold shadow-sm ${JENJANG_BADGE[row.jenjang as keyof typeof JENJANG_BADGE]}`}>{row.jenjang}</span>
                </td>
                <td className="py-2 px-4 border-b border-indigo-50 text-indigo-900">{row.instansi}</td>
                <td className="py-2 px-4 border-b border-indigo-50 text-indigo-900">{row.provinsi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Profil */}
      {showModal && selectedProfile && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white/90 rounded-2xl shadow-2xl p-8 w-full max-w-md relative backdrop-blur-xl border-4 border-indigo-100">
            <button className="absolute top-3 right-3 text-indigo-500 hover:text-red-500 bg-white/70 rounded-full p-1 shadow" onClick={handleCloseModal}><FiX size={24} /></button>
            <div className="flex flex-col items-center mb-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white text-4xl font-bold shadow-lg mb-2">
                {selectedProfile.nama.split(' ').map(n=>n[0]).join('').toUpperCase()}
              </div>
              <h2 className="text-2xl font-bold mb-1 text-indigo-800">{selectedProfile.nama}</h2>
              <div className="text-indigo-600 text-sm font-medium mb-2">{selectedProfile.jenjang}</div>
            </div>
            <div className="mb-2"><span className="font-semibold text-indigo-700">NIP:</span> {selectedProfile.nip}</div>
            <div className="mb-2"><span className="font-semibold text-indigo-700">Email:</span> {selectedProfile.email}</div>
            <div className="mb-2"><span className="font-semibold text-indigo-700">Instansi:</span> {selectedProfile.instansi}</div>
            <div className="mb-2"><span className="font-semibold text-indigo-700">Provinsi:</span> {selectedProfile.provinsi}</div>
          </div>
        </div>
      )}
    </div>
  );
}
