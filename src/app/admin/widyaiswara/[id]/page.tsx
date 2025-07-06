"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  FiArrowLeft, FiEdit, FiSave, FiX, FiUser, FiMail, FiPhone, FiMapPin, 
  FiCalendar, FiBookOpen, FiAward, FiStar,
  FiClock, FiTarget, FiCheckCircle
} from "react-icons/fi";
import { FaChalkboardTeacher, FaUserGraduate, FaCertificate } from "react-icons/fa";

// Komponen FormRow dengan icon dan desain modern
const FormRow = ({ 
  label, 
  value, 
  onChange, 
  editable = false, 
  type = "text", 
  icon, 
  placeholder,
  description 
}: {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  editable?: boolean;
  type?: string;
  icon?: React.ReactNode;
  placeholder?: string;
  description?: string;
}) => {
  return (
    <div className="group relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
      <div className="relative bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:border-blue-300/60">
        <div className="flex items-start gap-4">
          {icon && (
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg transform group-hover:rotate-6 transition-all duration-300">
              {icon}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
              {label}
              {editable && <span className="text-xs text-blue-500 font-normal">• Dapat diedit</span>}
            </label>
            {editable ? (
              <input
                type={type}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                placeholder={placeholder}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/90 backdrop-blur-sm text-gray-900 font-medium placeholder-gray-400"
              />
            ) : (
              <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-blue-50/30 border border-gray-200 rounded-lg text-gray-800 font-medium">
                {value || <span className="text-gray-400 italic">Tidak tersedia</span>}
              </div>
            )}
            {description && (
              <p className="text-xs text-gray-500 mt-2 italic">{description}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Dummy data widyaiswara (sama dengan di dashboard)
const dummyWidyaiswara = [
  { id: 1, nama: "Dr. Ahmad Wijaya", nip: "198501012010011001", email: "ahmad.wijaya@kemenkeu.go.id", jenjang: "Utama", instansi: "Pusdiklat Keuangan", umur: 45, spesialisasi: "Manajemen Keuangan", phone: "081234567890", pengalaman: "20 tahun", sertifikasi: "Certified Financial Manager, Master Trainer", jumlahPelatihan: 150, ratingPelatihan: 4.8 },
  { id: 2, nama: "Prof. Siti Nurhaliza", nip: "197803152005012002", email: "siti.nurhaliza@kemenkeu.go.id", jenjang: "Utama", instansi: "Pusdiklat Keuangan", umur: 52, spesialisasi: "Akuntansi Sektor Publik", phone: "081234567891", pengalaman: "25 tahun", sertifikasi: "CPA, Certified Public Sector Accountant", jumlahPelatihan: 200, ratingPelatihan: 4.9 },
  { id: 3, nama: "Drs. Bambang Sutrisno", nip: "198112102008011003", email: "bambang.sutrisno@kemenkeu.go.id", jenjang: "Madya", instansi: "Pusdiklat Keuangan", umur: 42, spesialisasi: "Perpajakan", phone: "081234567892", pengalaman: "15 tahun", sertifikasi: "Tax Specialist, Advanced Tax Planning", jumlahPelatihan: 120, ratingPelatihan: 4.7 },
  { id: 4, nama: "Dr. Rina Kartika", nip: "198505202012012004", email: "rina.kartika@kemenkeu.go.id", jenjang: "Madya", instansi: "Pusdiklat Keuangan", umur: 39, spesialisasi: "Kebijakan Fiskal", phone: "081234567893", pengalaman: "12 tahun", sertifikasi: "Fiscal Policy Expert, Economic Analyst", jumlahPelatihan: 95, ratingPelatihan: 4.6 },
  { id: 5, nama: "M.Pd. Hendra Gunawan", nip: "199002152015011005", email: "hendra.gunawan@kemenkeu.go.id", jenjang: "Muda", instansi: "Pusdiklat Keuangan", umur: 34, spesialisasi: "Teknologi Pembelajaran", phone: "081234567894", pengalaman: "8 tahun", sertifikasi: "Learning Technology Specialist, E-Learning Expert", jumlahPelatihan: 75, ratingPelatihan: 4.5 },
  { id: 6, nama: "S.Pd. Maya Sari", nip: "199208082018012006", email: "maya.sari@kemenkeu.go.id", jenjang: "Muda", instansi: "Pusdiklat Keuangan", umur: 32, spesialisasi: "Psikologi Pendidikan", phone: "081234567895", pengalaman: "6 tahun", sertifikasi: "Educational Psychology, Adult Learning Specialist", jumlahPelatihan: 60, ratingPelatihan: 4.4 },
  { id: 7, nama: "S.E. Andi Pratama", nip: "199512252020011007", email: "andi.pratama@kemenkeu.go.id", jenjang: "Pertama", instansi: "Pusdiklat Keuangan", umur: 29, spesialisasi: "Ekonomi Pembangunan", phone: "081234567896", pengalaman: "4 tahun", sertifikasi: "Development Economics, Policy Analysis", jumlahPelatihan: 40, ratingPelatihan: 4.3 },
  { id: 8, nama: "S.Kom. Devi Anggraini", nip: "199607102022012008", email: "devi.anggraini@kemenkeu.go.id", jenjang: "Pertama", instansi: "Pusdiklat Keuangan", umur: 28, spesialisasi: "Sistem Informasi", phone: "081234567897", pengalaman: "3 tahun", sertifikasi: "Information Systems, Database Management", jumlahPelatihan: 35, ratingPelatihan: 4.2 },
];

const JENJANG_BADGE = {
  "Pertama": "bg-blue-100 text-blue-700 border-blue-300",
  "Muda": "bg-emerald-100 text-emerald-700 border-emerald-300", 
  "Madya": "bg-amber-100 text-amber-700 border-amber-300",
  "Utama": "bg-purple-100 text-purple-700 border-purple-300",
};

export default function DetailWidyaiswara() {
  const params = useParams();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    nip: "",
    email: "",
    jenjang: "",
    instansi: "",
    phone: "",
    spesialisasi: "",
    pengalaman: "",
    sertifikasi: ""
  });

  // Load data widyaiswara berdasarkan ID
  useEffect(() => {
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    if (!id) return;
    
    const widyaiswara = dummyWidyaiswara.find(p => p.id === parseInt(id));
    
    if (widyaiswara) {
      setFormData({
        nama: widyaiswara.nama,
        nip: widyaiswara.nip,
        email: widyaiswara.email,
        jenjang: widyaiswara.jenjang,
        instansi: widyaiswara.instansi,
        phone: widyaiswara.phone,
        spesialisasi: widyaiswara.spesialisasi,
        pengalaman: widyaiswara.pengalaman || "",
        sertifikasi: widyaiswara.sertifikasi || ""
      });
    }
  }, [params.id]);

  const handleSave = async () => {
    setIsLoading(true);
    // Simulasi API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const currentWidyaiswara = dummyWidyaiswara.find(p => {
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    return id ? p.id === parseInt(id) : false;
  });

  if (!currentWidyaiswara) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center p-8">
          <FaChalkboardTeacher className="mx-auto text-6xl text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Widyaiswara Tidak Ditemukan</h2>
          <p className="text-gray-500 mb-6">Data widyaiswara dengan ID tersebut tidak tersedia.</p>
          <button
            onClick={() => router.push("/admin/widyaiswara")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <FiArrowLeft className="text-lg" />
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400 to-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 p-6 max-w-6xl mx-auto">
        
        {/* Success Notification */}
        {showSuccess && (
          <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-500">
            <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white p-4 rounded-xl shadow-2xl flex items-center gap-3 min-w-[300px]">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <FiCheckCircle className="text-lg" />
              </div>
              <div>
                <div className="font-bold">Data Berhasil Disimpan!</div>
                <div className="text-sm opacity-90">Perubahan data widyaiswara telah tersimpan</div>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="relative group mb-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl blur opacity-60 group-hover:opacity-80 transition duration-500"></div>
          <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-xl border border-white/60 shadow-2xl">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-center gap-6">
                <button
                  onClick={() => router.push("/admin/widyaiswara")}
                  className="group/btn relative inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-blue-100 hover:to-indigo-100 text-gray-700 hover:text-blue-700 font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-300 hover:border-blue-300"
                >
                  <FiArrowLeft className="text-lg group-hover/btn:-translate-x-1 transition-transform duration-200" />
                  Kembali
                </button>
                
                <div className="flex items-center gap-4">
                  <div className="relative group/avatar">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full blur opacity-60 group-hover/avatar:opacity-80 transition duration-300"></div>
                    <div className="relative w-16 h-16 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-xl transform group-hover/avatar:rotate-12 transition-all duration-300">
                      {currentWidyaiswara.nama.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 bg-clip-text text-transparent">
                      {currentWidyaiswara.nama}
                    </h1>
                    <div className="flex items-center gap-3 mt-2">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-sm font-bold shadow-lg ${JENJANG_BADGE[currentWidyaiswara.jenjang as keyof typeof JENJANG_BADGE]}`}>
                        <FaChalkboardTeacher className="text-xs" />
                        Widyaiswara {currentWidyaiswara.jenjang}
                      </span>
                      <span className="text-sm text-gray-600 font-medium">ID: {currentWidyaiswara.id}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="group/edit relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <FiEdit className="text-lg group-hover/edit:rotate-12 transition-transform duration-200" />
                    Edit Data
                  </button>
                ) : (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      <FiX className="text-lg" />
                      Batal
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Menyimpan...
                        </>
                      ) : (
                        <>
                          <FiSave className="text-lg" />
                          Simpan
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl blur opacity-60 group-hover:opacity-80 transition duration-300"></div>
            <div className="relative bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-white/60 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-blue-700">{currentWidyaiswara.jumlahPelatihan || 0}</div>
                  <div className="text-sm text-gray-600 font-medium">Total Pelatihan</div>
                  <div className="text-xs text-blue-600 font-semibold mt-1">↗ Aktif mengajar</div>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg transform group-hover:rotate-12 transition-all duration-300">
                  <FaUserGraduate className="text-2xl" />
                </div>
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl blur opacity-60 group-hover:opacity-80 transition duration-300"></div>
            <div className="relative bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-white/60 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-emerald-700">{currentWidyaiswara.ratingPelatihan || 0}/5</div>
                  <div className="text-sm text-gray-600 font-medium">Rating Pelatihan</div>
                  <div className="text-xs text-emerald-600 font-semibold mt-1">⭐ Sangat baik</div>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center text-white shadow-lg transform group-hover:rotate-12 transition-all duration-300">
                  <FiStar className="text-2xl" />
                </div>
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl blur opacity-60 group-hover:opacity-80 transition duration-300"></div>
            <div className="relative bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-white/60 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-amber-700">{currentWidyaiswara.pengalaman || "0 tahun"}</div>
                  <div className="text-sm text-gray-600 font-medium">Pengalaman</div>
                  <div className="text-xs text-amber-600 font-semibold mt-1">🏆 Berpengalaman</div>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center text-white shadow-lg transform group-hover:rotate-12 transition-all duration-300">
                  <FiClock className="text-2xl" />
                </div>
              </div>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl blur opacity-60 group-hover:opacity-80 transition duration-300"></div>
            <div className="relative bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-white/60 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-purple-700">{currentWidyaiswara.umur}</div>
                  <div className="text-sm text-gray-600 font-medium">Usia (Tahun)</div>
                  <div className="text-xs text-purple-600 font-semibold mt-1">🎯 Produktif</div>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white shadow-lg transform group-hover:rotate-12 transition-all duration-300">
                  <FiCalendar className="text-2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Data */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Data Pribadi */}
          <div className="space-y-6">
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-white/60 shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white">
                    <FiUser className="text-sm" />
                  </div>
                  Data Pribadi
                </h3>
                
                <div className="space-y-6">
                  <FormRow
                    label="Nama Lengkap"
                    value={formData.nama}
                    onChange={(value) => setFormData({...formData, nama: value})}
                    editable={isEditing}
                    icon={<FiUser className="text-lg" />}
                    placeholder="Masukkan nama lengkap"
                  />
                  
                  <FormRow
                    label="NIP"
                    value={formData.nip}
                    onChange={(value) => setFormData({...formData, nip: value})}
                    editable={isEditing}
                    icon={<FiTarget className="text-lg" />}
                    placeholder="Masukkan NIP"
                    description="Nomor Induk Pegawai"
                  />
                  
                  <FormRow
                    label="Email"
                    value={formData.email}
                    onChange={(value) => setFormData({...formData, email: value})}
                    editable={isEditing}
                    type="email"
                    icon={<FiMail className="text-lg" />}
                    placeholder="Masukkan email"
                  />
                  
                  <FormRow
                    label="Nomor Telepon"
                    value={formData.phone}
                    onChange={(value) => setFormData({...formData, phone: value})}
                    editable={isEditing}
                    type="tel"
                    icon={<FiPhone className="text-lg" />}
                    placeholder="Masukkan nomor telepon"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Data Profesional */}
          <div className="space-y-6">
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-white/60 shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg flex items-center justify-center text-white">
                    <FaChalkboardTeacher className="text-sm" />
                  </div>
                  Data Profesional
                </h3>
                
                <div className="space-y-6">
                  <FormRow
                    label="Jenjang Fungsional"
                    value={formData.jenjang}
                    onChange={(value) => setFormData({...formData, jenjang: value})}
                    editable={isEditing}
                    icon={<FiAward className="text-lg" />}
                    placeholder="Masukkan jenjang"
                  />
                  
                  <FormRow
                    label="Instansi"
                    value={formData.instansi}
                    onChange={(value) => setFormData({...formData, instansi: value})}
                    editable={isEditing}
                    icon={<FiMapPin className="text-lg" />}
                    placeholder="Masukkan instansi"
                  />
                  
                  <FormRow
                    label="Spesialisasi"
                    value={formData.spesialisasi}
                    onChange={(value) => setFormData({...formData, spesialisasi: value})}
                    editable={isEditing}
                    icon={<FiBookOpen className="text-lg" />}
                    placeholder="Masukkan bidang spesialisasi"
                    description="Bidang keahlian utama"
                  />
                  
                  <FormRow
                    label="Pengalaman Mengajar"
                    value={formData.pengalaman}
                    onChange={(value) => setFormData({...formData, pengalaman: value})}
                    editable={isEditing}
                    icon={<FiClock className="text-lg" />}
                    placeholder="Contoh: 10 tahun"
                    description="Total pengalaman sebagai widyaiswara"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sertifikasi & Kompetensi */}
        <div className="mt-8">
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 rounded-2xl blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-white/60 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center text-white">
                  <FaCertificate className="text-sm" />
                </div>
                Sertifikasi & Kompetensi
              </h3>
              
              <FormRow
                label="Sertifikasi"
                value={formData.sertifikasi}
                onChange={(value) => setFormData({...formData, sertifikasi: value})}
                editable={isEditing}
                icon={<FaCertificate className="text-lg" />}
                placeholder="Masukkan sertifikasi yang dimiliki"
                description="Daftar sertifikasi profesional yang dimiliki (pisahkan dengan koma)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

