import { Users, Bell, Activity, UserCheck, Sparkles, TrendingUp } from 'lucide-react';

export default function AdminHomePage() {
  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-blue-200/20 to-transparent rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-green-200/20 to-transparent rounded-full blur-3xl -z-10"></div>
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
            <Sparkles className="text-white w-6 h-6" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-700 via-blue-600 to-green-600 bg-clip-text text-transparent">
            Dashboard Admin
          </h1>
        </div>
        
        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-white/80 via-blue-50/80 to-green-50/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-l from-yellow-300/20 to-transparent rounded-full blur-2xl"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-8 bg-gradient-to-b from-yellow-400 to-orange-400 rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-800">Selamat datang di FUSION!</h2>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              Kelola data, pantau analitik, dan akses fitur admin dengan mudah melalui dashboard yang intuitif.
            </p>
          </div>
        </div>
      </div>
      {/* Statistik Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total User Card */}
        <div className="group relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">120</div>
              <div className="text-blue-100 font-semibold">Total User</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 group-hover:rotate-12 transition-transform duration-300">
              <Users className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-300 to-blue-200"></div>
        </div>

        {/* Data Baru Card */}
        <div className="group relative bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">45</div>
              <div className="text-green-100 font-semibold">Data Baru Bulan Ini</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 group-hover:rotate-12 transition-transform duration-300">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-300 to-green-200"></div>
        </div>

        {/* Notifikasi Card */}
        <div className="group relative bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl p-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">7</div>
              <div className="text-yellow-100 font-semibold">Notifikasi Penting</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 group-hover:rotate-12 transition-transform duration-300">
              <Bell className="w-8 h-8 text-white animate-pulse" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-300 to-orange-300"></div>
        </div>

        {/* User Aktif Card */}
        <div className="group relative bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">32</div>
              <div className="text-purple-100 font-semibold">User Aktif Hari Ini</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 group-hover:rotate-12 transition-transform duration-300">
              <UserCheck className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-300 to-purple-200"></div>
        </div>
      </div>
      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow p-6 mb-8 border-l-4 border-blue-400">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="text-blue-500" />
          <span className="font-bold text-blue-900">Aktivitas Terbaru</span>
        </div>
        <ul className="text-gray-700 text-sm space-y-2">
          <li><span className="font-semibold text-blue-700">Budi Santoso</span> login ke sistem (2 menit lalu)</li>
          <li><span className="font-semibold text-green-700">Siti Aminah</span> menambah data AK (10 menit lalu)</li>
          <li><span className="font-semibold text-yellow-700">Admin</span> mengirim notifikasi (30 menit lalu)</li>
          <li><span className="font-semibold text-blue-700">Andi Wijaya</span> update profil (1 jam lalu)</li>
        </ul>
      </div>
      {/* Pengumuman */}
      <div className="bg-yellow-50 rounded-xl shadow p-6 border-l-4 border-yellow-400">
        <div className="font-bold text-yellow-700 mb-2">Pengumuman</div>
        <ul className="text-yellow-900 text-sm list-disc pl-5 space-y-1">
          <li>Maintenance sistem dijadwalkan pada 5 Juli 2025 pukul 22.00 WIB.</li>
          <li>Pastikan data sudah diupdate sebelum maintenance.</li>
        </ul>
      </div>
    </div>
  );
}
