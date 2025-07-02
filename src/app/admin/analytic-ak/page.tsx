"use client";
import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from "recharts";
import { FiBarChart2, FiPieChart, FiTrendingUp, FiTrendingDown, FiMapPin } from "react-icons/fi";
import CountUp from "react-countup";

// Define a color palette for chart cells
const COLORS = ["#2563eb", "#38bdf8", "#fbbf24", "#f87171", "#34d399", "#a78bfa", "#f472b6", "#facc15", "#60a5fa", "#f472b6"];

export default function AnalyticAKPage() {
  type Summary = {
    pendidikan: Record<string, number>;
    jenjang: Record<string, number>;
    golongan: Record<string, number>;
    instansi: Record<string, number>;
    jalur: Record<string, number>;
    jenis_kelamin: Record<string, number>;
    tahun: Record<string, number>;
  };
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/pegawai/summary")
      .then((res) => res.json())
      .then((data) => {
        setSummary(data);
        setLoading(false);
      });
  }, []);

  if (loading || !summary) return <div className="p-8">Loading...</div>;

  // Helper: convert object to array for recharts
  const toChartData = (obj: Record<string, number>) =>
    Object.entries(obj).map(([name, value]) => ({ name, value })).filter(d => d.name !== "Tidak Diketahui");

  // Chart data
  const kelaminData = toChartData(summary.jenis_kelamin);
  const tahunData = toChartData(summary.tahun).sort((a, b) => a.name.localeCompare(b.name));
  const jalurData = toChartData(summary.jalur);
  const instansiData = toChartData(summary.instansi).sort((a, b) => b.value - a.value).slice(0, 10); // top 10
  const pendidikanData = toChartData(summary.pendidikan);

  // Summary
  const totalProv = Object.keys(summary.instansi).length;
  const totalAKAllProv = Object.values(summary.instansi).reduce((a, b) => a + b, 0);
  const provTerbanyak = instansiData.length > 0 ? instansiData[0].name : "-";
  const growth = 8; // Dummy, replace with real calculation if available
  const isGrowthUp = growth >= 0;

  if (loading) return <div className="p-8">Loading...</div>;

  // Chart data mapping
  const barData = tahunData;
  const pieData = kelaminData;
  // Provinsi data for table and chart (hanya total, tidak ada breakdown jenjang)
  const provinsiData = instansiData.map(inst => ({ provinsi: inst.name, total: inst.value }));

  return (
    <div className="p-8 flex flex-col gap-10 bg-gradient-to-br from-blue-100 via-white to-blue-300 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-900 mb-2">Data Analytic Analis Kebijakan</h1>

      {/* Growth Indicator */}
      <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-xl shadow border border-blue-200 w-fit mb-4">
        {isGrowthUp ? (
          <FiTrendingUp className="text-green-600 text-xl" />
        ) : (
          <FiTrendingDown className="text-red-600 text-xl" />
        )}
        <span className={`font-bold ${isGrowthUp ? "text-green-700" : "text-red-700"}`}>{growth}%</span>
        <span className="text-blue-800 ml-1">pertumbuhan AK tahun ini</span>
      </div>
      {/* Stat Card Jalur Pengangkatan & Pendidikan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Statcard Jalur Pengangkatan */}
        <div className="bg-blue-100 rounded-2xl p-6 flex flex-col items-center gap-2 shadow-xl border-2 border-blue-200">
          <h4 className="font-bold text-blue-800 text-lg mb-2">Jalur Pengangkatan Terbanyak</h4>
          <div className="text-3xl font-extrabold text-blue-900 mb-1">
            {jalurData.length > 0 ? jalurData[0].name : '-'}
          </div>
          <div className="text-blue-700 font-semibold">
            {jalurData.length > 0 ? (
              <CountUp end={jalurData[0].value} duration={1.2} separator="." />
            ) : 0} AK
          </div>
        </div>
        {/* Statcard Pendidikan */}
        <div className="bg-blue-100 rounded-2xl p-6 flex flex-col items-center gap-2 shadow-xl border-2 border-blue-200">
          <h4 className="font-bold text-blue-800 text-lg mb-2">Pendidikan Terbanyak</h4>
          <div className="text-3xl font-extrabold text-blue-900 mb-1">
            {pendidikanData.length > 0 ? pendidikanData[0].name : '-'}
          </div>
          <div className="text-blue-700 font-semibold">
            {pendidikanData.length > 0 ? (
              <CountUp end={pendidikanData[0].value} duration={1.2} separator="." />
            ) : 0} AK
          </div>
        </div>

      {/* Line Chart Trend */}
      <div className="bg-white/90 rounded-2xl shadow-xl p-8 flex flex-col items-center border-t-4 border-blue-400 relative overflow-hidden">
        <h3 className="font-bold text-xl mb-4 text-blue-800 z-10">Tren Total AK per Tahun</h3>
        <div className="w-full h-64 flex items-center justify-center text-gray-400 z-10">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={tahunData}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} dot={{ r: 6, fill: '#2563eb' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 text-blue-700 font-medium text-sm">Lonjakan tertinggi pada tahun dengan jumlah AK terbanyak.</div>
      </div>

      {/* Bar & Pie Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/90 rounded-2xl shadow-xl p-8 flex flex-col items-center border-t-4 border-blue-300 relative overflow-hidden">
          <h3 className="font-bold text-xl mb-4 text-blue-900 z-10">Bar Chart AK per Tahun</h3>
          <div className="w-full h-64 flex items-center justify-center text-gray-400 z-10">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#2563eb">
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-blue-700 font-medium text-sm">Pertumbuhan stabil setiap tahun, dengan kenaikan signifikan di 2024.</div>
        </div>
        <div className="bg-white/90 rounded-2xl shadow-xl p-8 flex flex-col items-center border-t-4 border-blue-200 relative overflow-hidden">
          <h3 className="font-bold text-xl mb-4 text-blue-700 z-10">Pie Chart Jenjang AK</h3>
          <div className="w-full h-64 flex items-center justify-center text-gray-400 z-10">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-blue-700 font-medium text-sm">Komposisi didominasi oleh jenjang Muda.</div>
        </div>
      </div>

      {/* Analytic per Provinsi: Summary, Grafik, Tabel */}
      <div className="bg-white/90 rounded-2xl shadow-xl p-8 mt-8 border-t-4 border-blue-500 relative overflow-hidden flex flex-col gap-8">
        {/* Summary Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
          <div className="flex items-center gap-3 bg-blue-50 border-l-4 border-blue-400 rounded-xl p-4 shadow">
            <FiMapPin className="text-blue-500 text-2xl" />
            <div>
              <div className="text-xs text-blue-700 font-semibold">Total Instansi</div>
              <div className="text-xl font-bold text-blue-900">
                <CountUp end={totalProv} duration={1.2} separator="." />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-blue-50 border-l-4 border-blue-400 rounded-xl p-4 shadow">
            <FiBarChart2 className="text-blue-500 text-2xl" />
            <div>
              <div className="text-xs text-blue-700 font-semibold">Total AK</div>
              <div className="text-xl font-bold text-blue-900">
                <CountUp end={totalAKAllProv} duration={1.2} separator="." />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-blue-50 border-l-4 border-blue-400 rounded-xl p-4 shadow">
            <FiPieChart className="text-blue-500 text-2xl" />
            <div>
              <div className="text-xs text-blue-700 font-semibold">Provinsi Terbanyak</div>
              <div className="text-xl font-bold text-blue-900">
                {provTerbanyak}
              </div>
            </div>
          </div>
        </div>
        {/* Grafik Bar Horizontal */}
        <div className="w-full h-80 flex items-center justify-center text-gray-400 z-10">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={provinsiData}
              layout="vertical"
              margin={{ left: 30, right: 30, top: 10, bottom: 10 }}
            >
              <XAxis type="number" allowDecimals={false} />
              <YAxis dataKey="provinsi" type="category" width={120} />
              <Tooltip />
              <Bar dataKey="total" fill="#2563eb">
                {provinsiData.map((_, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Tabel Data */}
        <div className="overflow-x-auto mt-2">
          <h3 className="font-bold text-lg mb-2 text-blue-700">10 Instansi dengan AK terbanyak</h3>
          <table className="min-w-full text-sm text-blue-900 border border-blue-200 rounded-xl overflow-hidden">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-4 py-2 text-left">Instansi</th>
                <th className="px-4 py-2 text-right">Total AK</th>
              </tr>
            </thead>
            <tbody>
              {provinsiData.map((row, idx) => {
                return (
                  <tr key={row.provinsi} className={idx % 2 === 0 ? "bg-white" : "bg-blue-50"}>
                    <td className="px-4 py-2">{row.provinsi}</td>
                    <td className="px-4 py-2 text-right font-semibold">
                      <CountUp end={row.total} duration={1.2} separator="." />
                    </td>
                  </tr>
                );
              })}
              {/* Total row */}
              <tr className="bg-blue-200 font-bold">
                <td className="px-4 py-2 text-right">Total</td>
                <td className="px-4 py-2 text-right font-semibold">
                  <CountUp end={provinsiData.reduce((a,b)=>a+b.total,0)} duration={1.2} separator="." />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      
      </div>
    </div>
  );
}
