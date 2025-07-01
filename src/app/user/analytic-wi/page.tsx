"use client";
import React from "react";
import { FiUsers, FiTrendingUp } from "react-icons/fi";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from "recharts";

// Data prediksi jumlah WI per tahun
const predictionData = [
  { year: 2024, jumlah: 135 },
  { year: 2025, jumlah: 142 },
  { year: 2026, jumlah: 150 },
  { year: 2027, jumlah: 158 },
  { year: 2028, jumlah: 167 },
];

// Komposisi jenjang WI (dummy)
const jenjangData = [
  { name: "Pertama", value: 12 },
  { name: "Muda", value: 55 },
  { name: "Madya", value: 48 },
  { name: "Utama", value: 20 },
];
const COLORS = ["#6366f1", "#a21caf", "#fbbf24", "#22d3ee"];

function ProgressRing({ percent }: { percent: number }) {
  const radius = 36;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percent / 100) * circumference;
  return (
    <svg height={radius * 2} width={radius * 2} className="block mx-auto">
      <circle
        stroke="#e0e7ff"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="#a21caf"
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference + ' ' + circumference}
        style={{ strokeDashoffset, transition: 'stroke-dashoffset 1s' }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <text x="50%" y="54%" textAnchor="middle" fill="#a21caf" fontSize="1.2rem" fontWeight="bold">{percent}%</text>
    </svg>
  );
}

export default function AnalyticWIPage() {
  const totalWI = predictionData[0].jumlah;
  const prediksiAkhir = predictionData[predictionData.length-1].jumlah;
  const growth = ((prediksiAkhir - totalWI) / totalWI * 100).toFixed(1);

  return (
    <div className="p-8 flex flex-col gap-10 min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-4">
        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center gap-2 shadow-xl border-2 border-indigo-200">
          <FiUsers className="text-3xl text-indigo-700 mb-1" />
          <div className="text-3xl font-extrabold text-indigo-900 animate-fade-in-up">{totalWI}</div>
          <div className="text-indigo-800 font-semibold text-xs text-center">WI Saat Ini (2024)</div>
        </div>
        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center gap-2 shadow-xl border-2 border-purple-200">
          <FiTrendingUp className="text-3xl text-purple-700 mb-1" />
          <div className="text-3xl font-extrabold text-purple-900 animate-fade-in-up">{prediksiAkhir}</div>
          <div className="text-purple-800 font-semibold text-xs text-center">Prediksi WI 2028</div>
        </div>
        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center gap-2 shadow-xl border-2 border-pink-200">
          <div className="mb-1"><ProgressRing percent={parseFloat(growth)} /></div>
          <div className="text-pink-700 font-semibold text-xs text-center">Growth 2024-2028</div>
        </div>
      </div>

      {/* Insight Naratif */}
      <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl p-6 shadow border-l-4 border-indigo-300 text-indigo-900 text-lg font-medium">
        Berdasarkan tren pertumbuhan, jumlah Widyaiswara diprediksi meningkat dari <b>{totalWI}</b> pada 2024 menjadi <b>{prediksiAkhir}</b> pada 2028, dengan pertumbuhan sekitar <b>{growth}%</b> dalam 5 tahun ke depan.
      </div>

      {/* Grafik Prediksi & Komposisi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Area Chart Prediksi */}
        <div className="bg-white/80 rounded-2xl shadow-2xl p-8 flex flex-col items-center border-t-4 border-2 border-indigo-200 relative overflow-hidden">
          <h3 className="font-bold text-xl mb-4 text-indigo-900 z-10">Prediksi Jumlah WI per Tahun</h3>
          <div className="w-full h-64 flex items-center justify-center z-10">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={predictionData}>
                <defs>
                  <linearGradient id="colorWI" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a21caf" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Area type="monotone" dataKey="jumlah" stroke="#a21caf" fill="url(#colorWI)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Donut Chart Komposisi Jenjang */}
        <div className="bg-white/80 rounded-2xl shadow-2xl p-8 flex flex-col items-center border-t-4 border-2 border-purple-200 relative overflow-hidden">
          <h3 className="font-bold text-xl mb-4 text-purple-700 z-10">Komposisi Jenjang WI (2024)</h3>
          <div className="w-full h-64 flex items-center justify-center z-10">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={jenjangData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
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
          <div className="mt-2 text-purple-700 font-medium text-sm">Sebagian besar WI berada pada jenjang Muda dan Madya.</div>
        </div>
      </div>

      {/* Tabel Prediksi */}
      <div className="bg-white/80 rounded-2xl shadow-xl p-8 overflow-x-auto border-2 border-indigo-200">
        <h3 className="font-bold text-xl mb-4 text-indigo-700">Tabel Prediksi Jumlah WI</h3>
        <table className="min-w-full text-left border border-indigo-200 rounded-xl overflow-hidden">
          <thead className="bg-indigo-100 border-b-2 border-indigo-200">
            <tr>
              <th className="py-2 px-4 border-b border-indigo-100 text-indigo-900">Tahun</th>
              <th className="py-2 px-4 border-b border-indigo-100 text-indigo-900">Jumlah WI</th>
            </tr>
          </thead>
          <tbody>
            {predictionData.map((row, idx) => (
              <tr key={row.year} className={`hover:bg-indigo-50 transition-colors ${idx%2===1?"bg-white/60":""}`}> 
                <td className="py-2 px-4 border-b border-indigo-50 text-indigo-900">{row.year}</td>
                <td className="py-2 px-4 border-b border-indigo-50 text-indigo-700 font-semibold">{row.jumlah}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
