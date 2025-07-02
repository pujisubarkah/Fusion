import { BarChart2, Users, Bell, Activity, UserCheck } from 'lucide-react';

export default function AdminHomePage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-[#003366] mb-4">Dashboard Admin</h1>
      <div className="bg-white rounded-xl shadow p-6 mb-6 border-l-4 border-yellow-400">
        <p className="text-lg text-gray-700 mb-2">Selamat datang di halaman admin FUSION!</p>
        <p className="text-gray-500">Gunakan menu di sidebar untuk mengelola data, melihat analitik, dan fitur admin lainnya.</p>
      </div>
      {/* Statistik Card */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="flex items-center gap-4 bg-blue-50 rounded-xl p-6 shadow border border-blue-100 hover:scale-105 transition-transform">
          <div className="bg-blue-200 text-blue-700 rounded-full p-3 shadow">
            <Users className="w-8 h-8" />
          </div>
          <div>
            <div className="text-3xl font-extrabold text-blue-900 mb-1">120</div>
            <div className="text-blue-700 font-semibold">Total User</div>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-green-50 rounded-xl p-6 shadow border border-green-100 hover:scale-105 transition-transform">
          <div className="bg-green-200 text-green-700 rounded-full p-3 shadow">
            <BarChart2 className="w-8 h-8" />
          </div>
          <div>
            <div className="text-3xl font-extrabold text-green-900 mb-1">45</div>
            <div className="text-green-700 font-semibold">Data Baru Bulan Ini</div>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-yellow-50 rounded-xl p-6 shadow border border-yellow-200 hover:scale-105 transition-transform">
          <div className="bg-yellow-200 text-yellow-700 rounded-full p-3 shadow">
            <Bell className="w-8 h-8" />
          </div>
          <div>
            <div className="text-3xl font-extrabold text-yellow-700 mb-1">7</div>
            <div className="text-yellow-700 font-semibold">Notifikasi Penting</div>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-purple-50 rounded-xl p-6 shadow border border-purple-100 hover:scale-105 transition-transform">
          <div className="bg-purple-200 text-purple-700 rounded-full p-3 shadow">
            <UserCheck className="w-8 h-8" />
          </div>
          <div>
            <div className="text-3xl font-extrabold text-purple-900 mb-1">32</div>
            <div className="text-purple-700 font-semibold">User Aktif Hari Ini</div>
          </div>
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
