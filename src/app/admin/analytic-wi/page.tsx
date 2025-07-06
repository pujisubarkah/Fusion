"use client";
import React, { useState } from "react";
import dynamic from 'next/dynamic';
import { 
  FiUsers, FiBarChart, FiGlobe,
  FiCalendar, FiBookOpen, FiStar,
  FiFilter, FiRefreshCw, FiDownload
} from "react-icons/fi";
import { FaChalkboardTeacher, FaGraduationCap } from "react-icons/fa";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, 
  PieChart, Pie, Legend, AreaChart, Area, Line,
  ComposedChart, CartesianGrid, ScatterChart, Scatter, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from "recharts";

// Dynamic import for the map component (client-side only)
const GeospatialMap = dynamic(() => import('@/components/GeospatialMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="text-gray-500">Loading map...</div>
    </div>
  )
});

// Dummy data widyaiswara dengan informasi lengkap untuk analytics
const widyaiswaraAnalyticsData = [
  { id: 1, nama: "Dr. Ahmad Wijaya", jenjang: "Utama", gender: "Laki-laki", provinsi: "DKI Jakarta", kota: "Jakarta Pusat", umur: 45, pengalaman: 20, totalPelatihan: 150, rating: 4.8, spesialisasi: "Manajemen Keuangan", lat: -6.2088, lng: 106.8456 },
  { id: 2, nama: "Prof. Siti Nurhaliza", jenjang: "Utama", gender: "Perempuan", provinsi: "DKI Jakarta", kota: "Jakarta Selatan", umur: 52, pengalaman: 25, totalPelatihan: 200, rating: 4.9, spesialisasi: "Akuntansi", lat: -6.2615, lng: 106.8106 },
  { id: 3, nama: "Drs. Bambang Sutrisno", jenjang: "Madya", gender: "Laki-laki", provinsi: "Jawa Barat", kota: "Bandung", umur: 42, pengalaman: 15, totalPelatihan: 120, rating: 4.7, spesialisasi: "Perpajakan", lat: -6.9175, lng: 107.6191 },
  { id: 4, nama: "Dr. Rina Kartika", jenjang: "Madya", gender: "Perempuan", provinsi: "Jawa Timur", kota: "Surabaya", umur: 39, pengalaman: 12, totalPelatihan: 95, rating: 4.6, spesialisasi: "Kebijakan Fiskal", lat: -7.2575, lng: 112.7521 },
  { id: 5, nama: "M.Pd. Hendra Gunawan", jenjang: "Muda", gender: "Laki-laki", provinsi: "Jawa Tengah", kota: "Semarang", umur: 34, pengalaman: 8, totalPelatihan: 75, rating: 4.5, spesialisasi: "Teknologi Pembelajaran", lat: -6.9667, lng: 110.4167 },
  { id: 6, nama: "S.Pd. Maya Sari", jenjang: "Muda", gender: "Perempuan", provinsi: "Yogyakarta", kota: "Yogyakarta", umur: 32, pengalaman: 6, totalPelatihan: 60, rating: 4.4, spesialisasi: "Psikologi Pendidikan", lat: -7.7956, lng: 110.3695 },
  { id: 7, nama: "S.E. Andi Pratama", jenjang: "Pertama", gender: "Laki-laki", provinsi: "Sumatera Utara", kota: "Medan", umur: 29, pengalaman: 4, totalPelatihan: 40, rating: 4.3, spesialisasi: "Ekonomi Pembangunan", lat: 3.5952, lng: 98.6722 },
  { id: 8, nama: "S.Kom. Devi Anggraini", jenjang: "Pertama", gender: "Perempuan", provinsi: "Sumatera Selatan", kota: "Palembang", umur: 28, pengalaman: 3, totalPelatihan: 35, rating: 4.2, spesialisasi: "Sistem Informasi", lat: -2.9761, lng: 104.7754 },
  { id: 9, nama: "Dr. Ir. Budi Santoso", jenjang: "Utama", gender: "Laki-laki", provinsi: "Kalimantan Timur", kota: "Balikpapan", umur: 48, pengalaman: 18, totalPelatihan: 140, rating: 4.7, spesialisasi: "Manajemen Proyek", lat: -1.2379, lng: 116.8529 },
  { id: 10, nama: "M.Si. Lestari Wulandari", jenjang: "Madya", gender: "Perempuan", provinsi: "Sulawesi Selatan", kota: "Makassar", umur: 41, pengalaman: 11, totalPelatihan: 85, rating: 4.5, spesialisasi: "Statistik Ekonomi", lat: -5.1477, lng: 119.4327 },
  { id: 11, nama: "S.H. Rudi Hermawan", jenjang: "Muda", gender: "Laki-laki", provinsi: "Bali", kota: "Denpasar", umur: 35, pengalaman: 7, totalPelatihan: 65, rating: 4.4, spesialisasi: "Hukum Administrasi", lat: -8.6705, lng: 115.2126 },
  { id: 12, nama: "M.Pd. Indira Sari", jenjang: "Muda", gender: "Perempuan", provinsi: "Nusa Tenggara Barat", kota: "Mataram", umur: 33, pengalaman: 5, totalPelatihan: 50, rating: 4.3, spesialisasi: "Kurikulum", lat: -8.5833, lng: 116.1167 },
  { id: 13, nama: "S.T. Fajar Nugroho", jenjang: "Pertama", gender: "Laki-laki", provinsi: "Papua", kota: "Jayapura", umur: 30, pengalaman: 4, totalPelatihan: 30, rating: 4.1, spesialisasi: "Teknologi Informasi", lat: -2.5489, lng: 140.7017 },
  { id: 14, nama: "S.Psi. Ratna Dewi", jenjang: "Pertama", gender: "Perempuan", provinsi: "Maluku", kota: "Ambon", umur: 29, pengalaman: 3, totalPelatihan: 25, rating: 4.0, spesialisasi: "Pengembangan SDM", lat: -3.6954, lng: 128.1814 },
  { id: 15, nama: "Dr. Hadi Wijaksono", jenjang: "Madya", gender: "Laki-laki", provinsi: "Riau", kota: "Pekanbaru", umur: 46, pengalaman: 14, totalPelatihan: 110, rating: 4.6, spesialisasi: "Audit Keuangan", lat: 0.5071, lng: 101.4478 },
  { id: 16, nama: "M.Kom. Dewi Anggraeni", jenjang: "Muda", gender: "Perempuan", provinsi: "Lampung", kota: "Bandar Lampung", umur: 31, pengalaman: 5, totalPelatihan: 45, rating: 4.2, spesialisasi: "Sistem Informasi", lat: -5.4292, lng: 105.2610 },
  { id: 17, nama: "S.E. Rizki Pratama", jenjang: "Pertama", gender: "Laki-laki", provinsi: "Aceh", kota: "Banda Aceh", umur: 27, pengalaman: 2, totalPelatihan: 20, rating: 4.0, spesialisasi: "Ekonomi Syariah", lat: 5.5577, lng: 95.3222 },
  { id: 18, nama: "Dr. Sari Wulandari", jenjang: "Utama", gender: "Perempuan", provinsi: "Sumatera Barat", kota: "Padang", umur: 50, pengalaman: 22, totalPelatihan: 180, rating: 4.8, spesialisasi: "Manajemen Publik", lat: -0.9471, lng: 100.4172 },
  { id: 19, nama: "M.Si. Teguh Santoso", jenjang: "Madya", gender: "Laki-laki", provinsi: "Kalimantan Selatan", kota: "Banjarmasin", umur: 40, pengalaman: 10, totalPelatihan: 80, rating: 4.4, spesialisasi: "Ekonomi Daerah", lat: -3.3194, lng: 114.5906 },
  { id: 20, nama: "S.Pd. Nina Kartika", jenjang: "Muda", gender: "Perempuan", provinsi: "Jambi", kota: "Jambi", umur: 34, pengalaman: 6, totalPelatihan: 55, rating: 4.3, spesialisasi: "Pendidikan Karakter", lat: -1.6101, lng: 103.6131 }
];

const JENJANG_COLORS = {
  "Pertama": "#3b82f6",  // blue
  "Muda": "#10b981",     // emerald
  "Madya": "#f59e0b",    // amber
  "Utama": "#8b5cf6"     // purple
};

const JENJANG_BADGE = {
  "Pertama": "bg-blue-100 text-blue-700 border-blue-300",
  "Muda": "bg-emerald-100 text-emerald-700 border-emerald-300",
  "Madya": "bg-amber-100 text-amber-700 border-amber-300",
  "Utama": "bg-purple-100 text-purple-700 border-purple-300",
};

export default function AnalyticWidyaiswaraPage() {
  const [selectedJenjang, setSelectedJenjang] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedProvinsi, setSelectedProvinsi] = useState("");
  const [selectedSpesialisasi, setSelectedSpesialisasi] = useState("");
  const [ageRange, setAgeRange] = useState({ min: 25, max: 60 });
  const [experienceRange, setExperienceRange] = useState({ min: 0, max: 30 });

  // Filtered data berdasarkan filter yang dipilih
  const filteredData = widyaiswaraAnalyticsData.filter(item => {
    return (
      (!selectedJenjang || item.jenjang === selectedJenjang) &&
      (!selectedGender || item.gender === selectedGender) &&
      (!selectedProvinsi || item.provinsi === selectedProvinsi) &&
      (!selectedSpesialisasi || item.spesialisasi === selectedSpesialisasi) &&
      (item.umur >= ageRange.min && item.umur <= ageRange.max) &&
      (item.pengalaman >= experienceRange.min && item.pengalaman <= experienceRange.max)
    );
  });

  // Data untuk analytics
  const totalWidyaiswara = filteredData.length;

  // Analytics berdasarkan jenjang
  const jenjangAnalytics = ["Pertama", "Muda", "Madya", "Utama"].map(jenjang => {
    const data = filteredData.filter(w => w.jenjang === jenjang);
    return {
      jenjang,
      total: data.length,
      avgRating: (data.reduce((sum, w) => sum + w.rating, 0) / data.length).toFixed(1),
      avgPengalaman: Math.round(data.reduce((sum, w) => sum + w.pengalaman, 0) / data.length),
      totalPelatihan: data.reduce((sum, w) => sum + w.totalPelatihan, 0)
    };
  });

  // Analytics berdasarkan gender
  const genderAnalytics = ["Laki-laki", "Perempuan"].map(gender => {
    const data = filteredData.filter(w => w.gender === gender);
    return {
      gender,
      total: data.length,
      percentage: ((data.length / totalWidyaiswara) * 100).toFixed(1)
    };
  });

  // Analytics berdasarkan provinsi
  const provinsiAnalytics = [...new Set(filteredData.map(w => w.provinsi))].map(provinsi => {
    const data = filteredData.filter(w => w.provinsi === provinsi);
    return {
      provinsi,
      total: data.length,
      avgRating: (data.reduce((sum, w) => sum + w.rating, 0) / data.length).toFixed(1),
      totalPelatihan: data.reduce((sum, w) => sum + w.totalPelatihan, 0)
    };
  }).sort((a, b) => b.total - a.total);

  // Analytics berdasarkan spesialisasi
  const spesialisasiAnalytics = [...new Set(filteredData.map(w => w.spesialisasi))].map(spec => {
    const data = filteredData.filter(w => w.spesialisasi === spec);
    return {
      spesialisasi: spec,
      total: data.length,
      avgRating: (data.reduce((sum, w) => sum + w.rating, 0) / data.length).toFixed(1),
      avgPengalaman: Math.round(data.reduce((sum, w) => sum + w.pengalaman, 0) / data.length),
      totalPelatihan: data.reduce((sum, w) => sum + w.totalPelatihan, 0)
    };
  }).sort((a, b) => b.total - a.total);

  // Data untuk radar chart kompetensi per jenjang
  const radarData = jenjangAnalytics.map(item => ({
    jenjang: item.jenjang,
    Rating: parseFloat(item.avgRating) * 20, // Scale to 100
    Pengalaman: item.avgPengalaman * 4, // Scale to 100
    "Total Pelatihan": Math.min(item.totalPelatihan / 20, 100) // Scale to 100
  }));

  // Data untuk chart rating per provinsi
  const ratingProvinsiData = provinsiAnalytics.slice(0, 10).map(prov => ({
    provinsi: prov.provinsi.length > 10 ? prov.provinsi.substring(0, 10) + '...' : prov.provinsi,
    rating: parseFloat(prov.avgRating),
    jumlah: prov.total
  }));

  // Data untuk distribusi umur
  const umurDistribusi = [
    { range: "25-30", count: filteredData.filter(w => w.umur >= 25 && w.umur < 31).length },
    { range: "31-35", count: filteredData.filter(w => w.umur >= 31 && w.umur < 36).length },
    { range: "36-40", count: filteredData.filter(w => w.umur >= 36 && w.umur < 41).length },
    { range: "41-45", count: filteredData.filter(w => w.umur >= 41 && w.umur < 46).length },
    { range: "46-50", count: filteredData.filter(w => w.umur >= 46 && w.umur < 51).length },
    { range: "50+", count: filteredData.filter(w => w.umur >= 51).length }
  ];

  // Reset all filters
  const resetFilters = () => {
    setSelectedJenjang("");
    setSelectedGender("");
    setSelectedProvinsi("");
    setSelectedSpesialisasi("");
    setAgeRange({ min: 25, max: 60 });
    setExperienceRange({ min: 0, max: 30 });
  };

  return (
    <div className="p-8 flex flex-col gap-10 min-h-screen relative overflow-hidden">
      {/* Ultra Dynamic Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 animate-gradient-x"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob-float"></div>
          <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-r from-purple-400 to-violet-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob-float animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob-float animation-delay-4000"></div>
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob-float animation-delay-6000"></div>
          
          {/* Floating Particles */}
          <div className="absolute top-10 left-10 w-4 h-4 bg-white/40 rounded-full animate-float delay-100"></div>
          <div className="absolute top-32 right-40 w-6 h-6 bg-white/30 rounded-full animate-float delay-200"></div>
          <div className="absolute bottom-20 left-1/4 w-8 h-8 bg-white/20 rounded-full animate-float delay-300"></div>
          <div className="absolute top-1/3 left-2/3 w-3 h-3 bg-white/50 rounded-full animate-float delay-400"></div>
          <div className="absolute bottom-32 right-20 w-5 h-5 bg-white/25 rounded-full animate-float delay-500"></div>
        </div>
      </div>

      {/* Ultra Modern Header Section */}
      <div className="relative group">
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
        <div className="relative bg-white/40 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl border border-white/50 transform hover:scale-[1.01] transition-all duration-500">
          <div className="flex items-center justify-between">
            <div className="relative">
              <div className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full opacity-50 animate-ping"></div>
              <h1 className="text-5xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3 drop-shadow-2xl animate-text-glow">
                📊 Analytics Widyaiswara
              </h1>
              <p className="text-gray-700 text-xl font-medium">Analisis komprehensif data trainer berdasarkan geospasial, demografi & kompetensi</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-emerald-600 text-sm font-medium">Real-time Analytics</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <div className="text-right">
                <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent animate-count-up">{totalWidyaiswara}</div>
                <div className="text-sm text-gray-600 font-medium">Total Widyaiswara</div>
                <div className="text-xs text-emerald-600 font-semibold mt-1">↗ Data Terkini</div>
              </div>
              <div className="relative group cursor-pointer">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl blur opacity-60 group-hover:opacity-80 transition duration-300"></div>
                <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:rotate-12 transition-all duration-300">
                  <FiBarChart className="text-white text-3xl animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Filter Bar */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
        <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/50">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <FiFilter className="text-emerald-600 text-lg" />
              <span className="font-bold text-emerald-700">Filter Analytics:</span>
            </div>
            
            <select
              value={selectedJenjang}
              onChange={(e) => setSelectedJenjang(e.target.value)}
              className="px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/90 shadow-sm font-medium"
            >
              <option value="">🏆 Semua Jenjang</option>
              <option value="Pertama">⭐ Pertama</option>
              <option value="Muda">⭐⭐ Muda</option>
              <option value="Madya">⭐⭐⭐ Madya</option>
              <option value="Utama">⭐⭐⭐⭐ Utama</option>
            </select>

            <select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              className="px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/90 shadow-sm font-medium"
            >
              <option value="">👥 Semua Gender</option>
              <option value="Laki-laki">👨 Laki-laki</option>
              <option value="Perempuan">👩 Perempuan</option>
            </select>

            <select
              value={selectedProvinsi}
              onChange={(e) => setSelectedProvinsi(e.target.value)}
              className="px-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-white/90 shadow-sm font-medium"
            >
              <option value="">🗺️ Semua Provinsi</option>
              {[...new Set(widyaiswaraAnalyticsData.map(w => w.provinsi))].sort().map(provinsi => (
                <option key={provinsi} value={provinsi}>📍 {provinsi}</option>
              ))}
            </select>

            <select
              value={selectedSpesialisasi}
              onChange={(e) => setSelectedSpesialisasi(e.target.value)}
              className="px-4 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white/90 shadow-sm font-medium"
            >
              <option value="">🎯 Semua Spesialisasi</option>
              {[...new Set(widyaiswaraAnalyticsData.map(w => w.spesialisasi))].sort().map(spec => (
                <option key={spec} value={spec}>🔬 {spec}</option>
              ))}
            </select>

            {/* Age Range Filter */}
            <div className="flex items-center gap-2 bg-white/90 px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
              <span className="text-sm font-medium text-gray-600">👤 Umur:</span>
              <input
                type="range"
                min="25"
                max="60"
                value={ageRange.min}
                onChange={(e) => setAgeRange(prev => ({ ...prev, min: parseInt(e.target.value) }))
                }
                className="w-16 h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-xs text-blue-600 font-bold">{ageRange.min}</span>
              <span className="text-xs text-gray-400">-</span>
              <input
                type="range"
                min="25"
                max="60"
                value={ageRange.max}
                onChange={(e) => setAgeRange(prev => ({ ...prev, max: parseInt(e.target.value) }))
                }
                className="w-16 h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-xs text-blue-600 font-bold">{ageRange.max}</span>
            </div>

            {/* Experience Range Filter */}
            <div className="flex items-center gap-2 bg-white/90 px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
              <span className="text-sm font-medium text-gray-600">💼 Exp:</span>
              <input
                type="range"
                min="0"
                max="30"
                value={experienceRange.min}
                onChange={(e) => setExperienceRange(prev => ({ ...prev, min: parseInt(e.target.value) }))
                }
                className="w-16 h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-xs text-green-600 font-bold">{experienceRange.min}</span>
              <span className="text-xs text-gray-400">-</span>
              <input
                type="range"
                min="0"
                max="30"
                value={experienceRange.max}
                onChange={(e) => setExperienceRange(prev => ({ ...prev, max: parseInt(e.target.value) }))
                }
                className="w-16 h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-xs text-green-600 font-bold">{experienceRange.max}</span>
            </div>

            <button
              onClick={resetFilters}
              className="group/reset relative inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
            >
              <FiRefreshCw className="text-sm group-hover/reset:rotate-180 transition-transform duration-300" />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards - Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Widyaiswara Card */}
        <div className="group relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl blur opacity-60 group-hover:opacity-80 transition duration-500"></div>
          <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/40 transform hover:scale-105 transition-all duration-500">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-black text-blue-700 animate-count-up">{totalWidyaiswara}</div>
                <div className="text-blue-800 font-bold text-sm">Total Widyaiswara</div>
                <div className="text-xs text-blue-600 mt-1">Data Aktif</div>
              </div>
              <div className="relative">
                <div className="absolute -inset-2 bg-blue-500/20 rounded-full blur animate-pulse"></div>
                <FaChalkboardTeacher className="relative text-4xl text-blue-700 drop-shadow-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Average Rating Card */}
        <div className="group relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl blur opacity-60 group-hover:opacity-80 transition duration-500"></div>
          <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/40 transform hover:scale-105 transition-all duration-500">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-black text-emerald-700">
                  {(filteredData.reduce((sum, w) => sum + w.rating, 0) / filteredData.length).toFixed(1)}
                </div>
                <div className="text-emerald-800 font-bold text-sm">Rata-rata Rating</div>
                <div className="text-xs text-emerald-600 mt-1">⭐ Kualitas Tinggi</div>
              </div>
              <div className="relative">
                <div className="absolute -inset-2 bg-emerald-500/20 rounded-full blur animate-pulse"></div>
                <FiStar className="relative text-4xl text-emerald-700 drop-shadow-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Gender Distribution Card */}
        <div className="group relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl blur opacity-60 group-hover:opacity-80 transition duration-500"></div>
          <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/40 transform hover:scale-105 transition-all duration-500">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-black text-purple-700">
                  {genderAnalytics[0]?.percentage}% : {genderAnalytics[1]?.percentage}%
                </div>
                <div className="text-purple-800 font-bold text-sm">Laki-laki : Perempuan</div>
                <div className="text-xs text-purple-600 mt-1">👥 Distribusi Gender</div>
              </div>
              <div className="relative">
                <div className="absolute -inset-2 bg-purple-500/20 rounded-full blur animate-pulse"></div>
                <FiUsers className="relative text-4xl text-purple-700 drop-shadow-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Geographic Coverage Card */}
        <div className="group relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl blur opacity-60 group-hover:opacity-80 transition duration-500"></div>
          <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/40 transform hover:scale-105 transition-all duration-500">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-black text-amber-700">{provinsiAnalytics.length}</div>
                <div className="text-amber-800 font-bold text-sm">Provinsi Tercakup</div>
                <div className="text-xs text-amber-600 mt-1">🗺️ Cakupan Nasional</div>
              </div>
              <div className="relative">
                <div className="absolute -inset-2 bg-amber-500/20 rounded-full blur animate-pulse"></div>
                <FiGlobe className="relative text-4xl text-amber-700 drop-shadow-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Jenjang Distribution Chart */}
        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 overflow-hidden transform hover:scale-[1.02] transition-all duration-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-ping"></div>
              <h3 className="font-black text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                📊 Distribusi Jenjang Widyaiswara
              </h3>
            </div>
            
            <div className="w-full h-80 flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={jenjangAnalytics} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="jenjang" className="text-sm font-medium" />
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
                  <Bar dataKey="total" radius={[8, 8, 0, 0]}>
                    {jenjangAnalytics.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={JENJANG_COLORS[entry.jenjang as keyof typeof JENJANG_COLORS]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Gender Distribution Pie Chart */}
        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 overflow-hidden transform hover:scale-[1.02] transition-all duration-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full animate-ping"></div>
              <h3 className="font-black text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                👥 Distribusi Gender
              </h3>
            </div>
            
            <div className="w-full h-80 flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie
                    data={genderAnalytics}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="total"
                    label={({ gender, percentage }) => `${gender}: ${percentage}%`}
                  >
                    <Cell fill="#8b5cf6" />
                    <Cell fill="#ec4899" />
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
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 flex justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Laki-laki</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-pink-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Perempuan</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Age vs Experience Scatter Chart */}
        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 overflow-hidden transform hover:scale-[1.02] transition-all duration-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full animate-ping"></div>
              <h3 className="font-black text-2xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                📈 Korelasi Umur vs Pengalaman
              </h3>
            </div>
            
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height={320}>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis type="number" dataKey="umur" name="Umur" unit=" tahun" />
                  <YAxis type="number" dataKey="pengalaman" name="Pengalaman" unit=" tahun" />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }}
                    contentStyle={{
                      backgroundColor: 'rgba(255,255,255,0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                      backdropFilter: 'blur(10px)'
                    }}
                    formatter={(value, name) => [`${value} tahun`, name]}
                  />
                  <Scatter name="Widyaiswara" data={filteredData} fill="#10b981" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Radar Chart - Competency by Jenjang */}
        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 overflow-hidden transform hover:scale-[1.02] transition-all duration-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full animate-ping"></div>
              <h3 className="font-black text-2xl bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                🎯 Profil Kompetensi per Jenjang
              </h3>
            </div>
            
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height={320}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="jenjang" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name="Rating" dataKey="Rating" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
                  <Radar name="Pengalaman" dataKey="Pengalaman" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                  <Radar name="Total Pelatihan" dataKey="Total Pelatihan" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                  <Tooltip />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Analytics Charts - Part 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Rating per Provinsi Chart */}
        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-rose-500 to-pink-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 overflow-hidden transform hover:scale-[1.02] transition-all duration-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full animate-ping"></div>
              <h3 className="font-black text-2xl bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                🌟 Performa Rating per Provinsi
              </h3>
            </div>
            
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height={320}>
                <ComposedChart data={ratingProvinsiData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="provinsi" className="text-xs font-medium" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255,255,255,0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                      backdropFilter: 'blur(10px)'
                    }}
                  />
                  <Bar yAxisId="left" dataKey="jumlah" fill="#ec4899" radius={[4, 4, 0, 0]} opacity={0.7} />
                  <Line yAxisId="right" type="monotone" dataKey="rating" stroke="#f43f5e" strokeWidth={3} dot={{ r: 6, fill: "#f43f5e" }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Age Distribution Chart */}
        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 overflow-hidden transform hover:scale-[1.02] transition-all duration-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full animate-ping"></div>
              <h3 className="font-black text-2xl bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                👥 Distribusi Umur Widyaiswara
              </h3>
            </div>
            
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={umurDistribusi} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255,255,255,0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                      backdropFilter: 'blur(10px)'
                    }}
                  />
                  <Area type="monotone" dataKey="count" stroke="#3b82f6" fill="url(#ageGradient)" strokeWidth={2} />
                  <defs>
                    <linearGradient id="ageGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Specialization Analysis */}
      <div className="relative group">
        <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
        <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 overflow-hidden">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full animate-ping"></div>
            <h3 className="font-black text-2xl bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
              🎯 Analisis Bidang Spesialisasi
            </h3>
            <div className="ml-auto flex items-center gap-2 bg-gradient-to-r from-cyan-100 to-emerald-100 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-cyan-700">{spesialisasiAnalytics.length} bidang spesialisasi</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spesialisasiAnalytics.slice(0, 6).map((spec, idx) => {
              const cardGradients = [
                'from-blue-500 to-indigo-600',
                'from-emerald-500 to-teal-600',
                'from-amber-500 to-orange-600',
                'from-purple-500 to-violet-600',
                'from-rose-500 to-pink-600',
                'from-cyan-500 to-blue-600'
              ];
              
              return (
                <div key={spec.spesialisasi} className="group relative">
                  <div className={`absolute -inset-1 bg-gradient-to-r ${cardGradients[idx % 6]} rounded-2xl blur opacity-40 group-hover:opacity-70 transition duration-500`}></div>
                  <div className="relative bg-white/85 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/40 transform hover:scale-105 transition-all duration-500">
                    <div className="text-center space-y-4">
                      <div className="text-lg font-bold text-gray-800 leading-tight">
                        {spec.spesialisasi}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="bg-blue-50 rounded-lg p-3">
                          <div className="text-2xl font-black text-blue-700">{spec.total}</div>
                          <div className="text-blue-600 text-xs">Widyaiswara</div>
                        </div>
                        <div className="bg-yellow-50 rounded-lg p-3">
                          <div className="text-2xl font-black text-yellow-700">⭐{spec.avgRating}</div>
                          <div className="text-yellow-600 text-xs">Avg Rating</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="bg-emerald-50 rounded-lg p-3">
                          <div className="text-lg font-black text-emerald-700">{spec.avgPengalaman}th</div>
                          <div className="text-emerald-600 text-xs">Avg Exp</div>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-3">
                          <div className="text-lg font-black text-purple-700">{spec.totalPelatihan}</div>
                          <div className="text-purple-600 text-xs">Pelatihan</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Progress bar based on total widyaiswara */}
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`bg-gradient-to-r ${cardGradients[idx % 6]} h-2 rounded-full transition-all duration-1000`}
                          style={{ width: `${(spec.total / totalWidyaiswara * 100)}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1 text-center">
                        {((spec.total / totalWidyaiswara) * 100).toFixed(1)}% dari total
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Geographic Distribution Map */}
      <GeospatialMap 
        data={filteredData}
        height="600px"
        onProvinceSelect={(province) => {
          setSelectedProvinsi(province || "");
        }}
        selectedProvince={selectedProvinsi}
      />

      {/* Geographic Distribution Table (Compact Summary) */}
      <div className="relative group">
        <div className="absolute -inset-2 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
        <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 overflow-hidden">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-teal-600 rounded-full animate-ping"></div>
            <h3 className="font-black text-2xl bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
              📊 Ringkasan Distribusi Per Provinsi
            </h3>
            <div className="ml-auto flex items-center gap-2 bg-gradient-to-r from-green-100 to-teal-100 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-700">{provinsiAnalytics.length} provinsi tercakup</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {provinsiAnalytics.slice(0, 8).map((prov) => (
              <div 
                key={prov.provinsi}
                className="group relative bg-gradient-to-br from-white/80 to-gray-50/80 backdrop-blur-sm rounded-2xl p-4 border border-white/40 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
                onClick={() => {
                  setSelectedProvinsi(selectedProvinsi === prov.provinsi ? "" : prov.provinsi);
                }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-300"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {prov.provinsi.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-gray-800 text-sm">{prov.provinsi}</div>
                      <div className="text-xs text-gray-500">
                        {((prov.total / totalWidyaiswara) * 100).toFixed(1)}% total
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-blue-50 rounded-lg p-2 text-center">
                      <div className="font-bold text-blue-700">{prov.total}</div>
                      <div className="text-blue-600">Widyaiswara</div>
                    </div>
                    <div className="bg-emerald-50 rounded-lg p-2 text-center">
                      <div className="font-bold text-emerald-700">{prov.avgRating}</div>
                      <div className="text-emerald-600">Rating</div>
                    </div>
                  </div>
                  
                  <div className="mt-3 w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-teal-500 h-1.5 rounded-full transition-all duration-500" 
                      style={{ width: `${(prov.total / Math.max(...provinsiAnalytics.map(p => p.total)) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {provinsiAnalytics.length > 8 && (
            <div className="mt-4 text-center">
              <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                + {provinsiAnalytics.length - 8} provinsi lainnya
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Jenjang Details Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {jenjangAnalytics.map((jenjang, idx) => {
          const cardColors = [
            'from-blue-500 to-indigo-600',
            'from-emerald-500 to-teal-600', 
            'from-amber-500 to-orange-600',
            'from-purple-500 to-violet-600'
          ];
          
          return (
            <div key={jenjang.jenjang} className="group relative">
              <div className={`absolute -inset-1 bg-gradient-to-r ${cardColors[idx]} rounded-2xl blur opacity-50 group-hover:opacity-80 transition duration-500`}></div>
              <div className="relative bg-white/85 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/40 transform hover:scale-105 hover:-rotate-1 transition-all duration-500">
                <div className="text-center">
                  <div className={`inline-flex items-center gap-1 px-3 py-2 rounded-full border text-xs font-bold shadow-lg mb-4 ${JENJANG_BADGE[jenjang.jenjang as keyof typeof JENJANG_BADGE]}`}>
                    <FaGraduationCap className="text-sm" />
                    {jenjang.jenjang}
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="text-3xl font-black" style={{ color: JENJANG_COLORS[jenjang.jenjang as keyof typeof JENJANG_COLORS] }}>
                        {jenjang.total}
                      </div>
                      <div className="text-xs text-gray-500 font-medium">Total Widyaiswara</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="text-emerald-600 text-xs">Total Pelatihan</div>
                    </div>
                  </div>
                </div>
                
                {/* Floating indicator */}
                <div className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-r from-white/60 to-transparent rounded-full opacity-0 group-hover:opacity-100 animate-float"></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Export Data Button and Record Indicator */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <button
          onClick={() => {
            // Export functionality (dummy implementation)
            const dataToExport = {
              summary: {
                totalWidyaiswara,
                avgRating: (filteredData.reduce((sum, w) => sum + w.rating, 0) / filteredData.length).toFixed(1),
                provincesCount: provinsiAnalytics.length,
                specializations: spesialisasiAnalytics.length
              },
              jenjangAnalytics,
              genderAnalytics,
              provinsiAnalytics,
              spesialisasiAnalytics
            };
            
            const jsonString = JSON.stringify(dataToExport, null, 2);
            const blob = new Blob([jsonString], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `analytic-widyaiswara-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }}
          className="group/export relative inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
        >
          <FiDownload className="text-sm group-hover/export:animate-bounce" />
          Export Data
        </button>
        
        <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 rounded-lg">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-blue-700">Showing {filteredData.length} of {widyaiswaraAnalyticsData.length} records</span>
        </div>
      </div>

      {/* Quick Insights & Statistics */}
      <div className="relative group">
        <div className="absolute -inset-2 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
        <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 overflow-hidden">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-3 h-3 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full animate-ping"></div>
            <h3 className="font-black text-2xl bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              ⚡ Quick Insights & Key Metrics
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Top Performer */}
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-6 border border-yellow-200 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full flex items-center justify-center">
                  <FiStar className="text-white text-xl" />
                </div>
                <div>
                  <div className="font-bold text-amber-800">🏆 Top Performer</div>
                  <div className="text-sm text-amber-600">Highest Rating</div>
                </div>
              </div>
              
              {(() => {
                const topPerformer = filteredData.reduce((prev, current) => 
                  (prev.rating > current.rating) ? prev : current
                );
                return (
                  <div className="space-y-2">
                    <div className="font-bold text-amber-900">{topPerformer.nama}</div>
                    <div className="text-sm text-amber-700">{topPerformer.jenjang} • {topPerformer.provinsi}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">⭐</span>
                      <span className="text-xl font-bold text-amber-800">{topPerformer.rating}</span>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Most Experienced */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <FiCalendar className="text-white text-xl" />
                </div>
                <div>
                  <div className="font-bold text-indigo-800">🎯 Most Experienced</div>
                  <div className="text-sm text-indigo-600">Longest Service</div>
                </div>
              </div>
              
              {(() => {
                const mostExperienced = filteredData.reduce((prev, current) => 
                  (prev.pengalaman > current.pengalaman) ? prev : current
                );
                return (
                  <div className="space-y-2">
                    <div className="font-bold text-indigo-900">{mostExperienced.nama}</div>
                    <div className="text-sm text-indigo-700">{mostExperienced.jenjang} • {mostExperienced.provinsi}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">📅</span>
                      <span className="text-xl font-bold text-indigo-800">{mostExperienced.pengalaman} tahun</span>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Most Active Trainer */}
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-200 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
                  <FiBookOpen className="text-white text-xl" />
                </div>
                <div>
                  <div className="font-bold text-emerald-800">🚀 Most Active</div>
                  <div className="text-sm text-emerald-600">Training Champion</div>
                </div>
              </div>
              
              {(() => {
                const mostActive = filteredData.reduce((prev, current) => 
                  (prev.totalPelatihan > current.totalPelatihan) ? prev : current
                );
                return (
                  <div className="space-y-2">
                    <div className="font-bold text-emerald-900">{mostActive.nama}</div>
                    <div className="text-sm text-emerald-700">{mostActive.jenjang} • {mostActive.provinsi}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">📚</span>
                      <span className="text-xl font-bold text-emerald-800">{mostActive.totalPelatihan} pelatihan</span>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-4 border border-purple-200">
              <div className="text-2xl font-black text-purple-700">
                {Math.round(filteredData.reduce((sum, w) => sum + w.pengalaman, 0) / filteredData.length)}
              </div>
              <div className="text-sm text-purple-600 font-medium">Avg Experience</div>
              <div className="text-xs text-purple-500 mt-1">tahun</div>
            </div>
            
            <div className="text-center bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-4 border border-rose-200">
              <div className="text-2xl font-black text-rose-700">
                {Math.round(filteredData.reduce((sum, w) => sum + w.umur, 0) / filteredData.length)}
              </div>
              <div className="text-sm text-rose-600 font-medium">Avg Age</div>
              <div className="text-xs text-rose-500 mt-1">tahun</div>
            </div>
            
            <div className="text-center bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-4 border border-cyan-200">
              <div className="text-2xl font-black text-cyan-700">
                {Math.round(filteredData.reduce((sum, w) => sum + w.totalPelatihan, 0) / filteredData.length)}
              </div>
              <div className="text-sm text-cyan-600 font-medium">Avg Training</div>
              <div className="text-xs text-cyan-500 mt-1">per trainer</div>
            </div>
            
            <div className="text-center bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-200">
              <div className="text-2xl font-black text-orange-700">
                {filteredData.reduce((sum, w) => sum + w.totalPelatihan, 0)}
              </div>
              <div className="text-sm text-orange-600 font-medium">Total Training</div>
              <div className="text-xs text-orange-500 mt-1">delivered</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
