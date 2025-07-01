"use client";
import React, { useState } from "react";
import { FiUsers, FiBarChart2, FiPieChart, FiUserPlus, FiX } from "react-icons/fi";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useRouter } from "next/navigation";

const jenjangData = [
  { name: "Pertama", value: 5 },
  { name: "Muda", value: 75 },
  { name: "Madya", value: 45 },
  { name: "Utama", value: 10 },
];
const COLORS = ["#2563eb", "#f472b6", "#fbbf24", "#22c55e"];
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

export default function JenjangAKPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const router = useRouter();

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProfile(null);
  };

  return (
    <div className="p-8 flex flex-col gap-10 bg-gradient-to-br from-blue-50 via-white to-yellow-50 min-h-screen">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 mb-4">
        <div className="bg-gradient-to-br from-blue-200 to-blue-100 rounded-2xl p-8 flex items-center gap-6 shadow-lg border-2 border-blue-200">
          <FiUsers className="text-4xl text-blue-700 drop-shadow" />
          <div>
            <div className="text-3xl font-extrabold text-blue-900">{jenjangData.reduce((a,b)=>a+b.value,0)}</div>
            <div className="text-blue-800 font-semibold">Total AK</div>
          </div>
        </div>
        {jenjangData.map((j, idx) => (
          <div key={j.name} className={`bg-gradient-to-br from-blue-100 to-white rounded-2xl p-8 flex items-center gap-6 shadow-lg border-2 border-blue-200`}>
            {idx===0 && <FiBarChart2 className="text-4xl text-blue-600 drop-shadow" />}
            {idx===1 && <FiPieChart className="text-4xl text-pink-600 drop-shadow" />}
            {idx===2 && <FiBarChart2 className="text-4xl text-yellow-600 drop-shadow" />}
            {idx===3 && <FiPieChart className="text-4xl text-green-600 drop-shadow" />}
            <div>
              <div className="text-3xl font-extrabold" style={{ color: COLORS[idx] }}>{j.value}</div>
              <div className="font-semibold text-blue-800">Jenjang {j.name}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Grafik Bar Jenjang */}
      <div className="bg-white/90 rounded-2xl shadow-xl p-8 flex flex-col items-center border-t-4 border-2 border-blue-200 relative overflow-hidden">
        <h3 className="font-bold text-xl mb-4 text-blue-900 z-10">Bar Chart Jumlah AK per Jenjang</h3>
        <div className="w-full h-64 flex items-center justify-center text-gray-400 z-10">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={jenjangData}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#2563eb">
                {jenjangData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Button Input */}
      <div className="flex justify-end mb-4">
        <button className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded-lg shadow border-2 border-blue-200 transition" onClick={() => alert('Fitur tambah data belum diimplementasikan.')}> <FiUserPlus /> Tambah Data Analis Kebijakan </button>
      </div>

      {/* Table */}
      <div className="bg-white/90 rounded-2xl shadow-xl p-8 overflow-x-auto border-2 border-blue-200">
        <h3 className="font-bold text-xl mb-4 text-blue-700">Tabel Data Jenjang AK</h3>
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
            {dataTable.map((row, idx) => (
              <tr key={row.nama} className="hover:bg-blue-50">
                <td className="py-2 px-4 border-b border-blue-50 text-blue-900">{idx+1}</td>
                <td className="py-2 px-4 border-b border-blue-50 text-blue-700 font-semibold cursor-pointer underline" onClick={() => router.push(`/user/jumlah-ak/${row.id}`)}>{row.nama}</td>
                <td className="py-2 px-4 border-b border-blue-50 text-blue-900">{row.jenjang}</td>
                <td className="py-2 px-4 border-b border-blue-50 text-blue-900">{row.instansi}</td>
                <td className="py-2 px-4 border-b border-blue-50 text-blue-900">{row.provinsi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Profil */}
      {showModal && selectedProfile && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative">
            <button className="absolute top-3 right-3 text-gray-500 hover:text-red-500" onClick={handleCloseModal}><FiX size={24} /></button>
            <h2 className="text-2xl font-bold mb-2 text-blue-800">Profil Analis Kebijakan</h2>
            <div className="mb-2"><span className="font-semibold text-blue-700">Nama:</span> {selectedProfile.nama}</div>
            <div className="mb-2"><span className="font-semibold text-blue-700">NIP:</span> {selectedProfile.nip}</div>
            <div className="mb-2"><span className="font-semibold text-blue-700">Email:</span> {selectedProfile.email}</div>
            <div className="mb-2"><span className="font-semibold text-blue-700">Jenjang:</span> {selectedProfile.jenjang}</div>
            <div className="mb-2"><span className="font-semibold text-blue-700">Instansi:</span> {selectedProfile.instansi}</div>
            <div className="mb-2"><span className="font-semibold text-blue-700">Provinsi:</span> {selectedProfile.provinsi}</div>
          </div>
        </div>
      )}
    </div>
  );
}
