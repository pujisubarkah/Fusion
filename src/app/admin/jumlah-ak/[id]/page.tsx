"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { 
	FiArrowLeft, 
	FiUser, 
	FiEdit3, 
	FiSave, 
	FiMail, 
	FiPhone, 
	FiMapPin, 
	FiCalendar, 
	FiFileText,
	FiBriefcase,
	FiAward,
	FiCheckCircle,
	FiAlertCircle
} from "react-icons/fi";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Pegawai {
	id: number;
	nip: string;
	niakn: string;
	nama: string;
	jns_kelamin_id: number;
	golongan_id: number;
	jalur_id: number;
	jenjang_id: number;
	instansi_id: number;
	phone: string;
	email: string | null;
	nomor_surat: string;
	tmt_pangkat: string;
	tmt_surat: string;
	unit_kerja: string;
	photo: string | null;
	Jabfung_id: number;
	pendidikan_id: number;
	jns_kelamin?: { id: number; jns_kelamin: string };
	jabfung?: { id: number; fungsional: string };
	golongan?: { id: number; golongan: string };
	instansi?: { id: number; nama_instansi: string };
	jalur?: { id: number; jalur_pengangkatan: string };
	jenjang?: { id: number; nm_jenjang: string };
	pendidikan?: { id: number; pendidikan: string };
}

interface PendidikanOption {
	id: number;
	pendidikan: string;
}

interface InstansiOption {
	id: number;
	kode_instansi: number;
	nama_instansi: string;
	kat_instansi_id: number;
}

interface JenjangOption {
	id: number;
	nm_jenjang: string;
}

interface JenisKelaminOption {
	id: number;
	jns_kelamin: string;
}

interface GolonganOption {
	id: number;
	golongan: string;
}

interface JalurOption {
	id: number;
	jalur_pengangkatan: string;
}

export default function DetailAnalisPage() {
	const params = useParams();
	const idParam = params?.id;
	const id = Array.isArray(idParam) ? idParam[0] : idParam || "";
	const [data, setData] = useState<Pegawai | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [formData, setFormData] = useState<Pegawai | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showSuccessToast, setShowSuccessToast] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [hasChanges, setHasChanges] = useState(false);
	const [pendidikanOptions, setPendidikanOptions] = useState<PendidikanOption[]>([]);
	const [instansiOptions, setInstansiOptions] = useState<InstansiOption[]>([]);
	const [jenjangOptions, setJenjangOptions] = useState<JenjangOption[]>([]);
	const [jenisKelaminOptions, setJenisKelaminOptions] = useState<JenisKelaminOption[]>([]);
	const [golonganOptions, setGolonganOptions] = useState<GolonganOption[]>([]);
	const [jalurOptions, setJalurOptions] = useState<JalurOption[]>([]);

	useEffect(() => {
		if (!id) return;
		setLoading(true);
		
		// Fetch pegawai data and all dropdown options
		Promise.all([
			fetch(`/api/pegawai/${id}`),
			fetch('/api/pendidikan'),
			fetch('/api/instansi'),
			fetch('/api/jenjang'),
			fetch('/api/jns_kelamin'),
			fetch('/api/golongan'),
			fetch('/api/jalur')
		])
		.then(async ([pegawaiRes, pendidikanRes, instansiRes, jenjangRes, jenisKelaminRes, golonganRes, jalurRes]) => {
			if (!pegawaiRes.ok) throw new Error("Gagal fetch data pegawai");
			if (!pendidikanRes.ok) throw new Error("Gagal fetch data pendidikan");
			if (!instansiRes.ok) throw new Error("Gagal fetch data instansi");
			if (!jenjangRes.ok) throw new Error("Gagal fetch data jenjang");
			if (!jenisKelaminRes.ok) throw new Error("Gagal fetch data jenis kelamin");
			if (!golonganRes.ok) throw new Error("Gagal fetch data golongan");
			if (!jalurRes.ok) throw new Error("Gagal fetch data jalur");
			
			const pegawaiData = await pegawaiRes.json();
			const pendidikanData = await pendidikanRes.json();
			const instansiData = await instansiRes.json();
			const jenjangData = await jenjangRes.json();
			const jenisKelaminData = await jenisKelaminRes.json();
			const golonganData = await golonganRes.json();
			const jalurData = await jalurRes.json();
			
			setData(pegawaiData);
			setFormData(pegawaiData);
			setPendidikanOptions(pendidikanData);
			setInstansiOptions(instansiData);
			setJenjangOptions(jenjangData);
			setJenisKelaminOptions(jenisKelaminData);
			setGolonganOptions(golonganData);
			setJalurOptions(jalurData);
			setError("");
		})
		.catch(() => {
			setError("Data tidak ditemukan.");
			setData(null);
			setFormData(null);
		})
		.finally(() => setLoading(false));
	}, [id]);

	// Handler untuk input dengan deteksi perubahan
	function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
		const { name, value } = e.target;
		setFormData((prev) => {
			if (prev) {
				const newData = { ...prev, [name]: value };
				// Cek apakah ada perubahan dari data asli
				const hasChanges = JSON.stringify(newData) !== JSON.stringify(data);
				setHasChanges(hasChanges);
				return newData;
			}
			return prev;
		});
	}

	// Handler submit dengan loading state dan notifikasi
	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!hasChanges) return;
		
		setIsSubmitting(true);
		
		try {
			// Simulasi API call
			await new Promise(resolve => setTimeout(resolve, 1500));
			
			// TODO: Implementasi PATCH/PUT ke API
			console.log("Data yang akan diupdate:", formData);
			
			// Update data dengan formData yang baru
			setData(formData);
			setHasChanges(false);
			setIsEditing(false);
			
			// Show success notification
			setShowSuccessToast(true);
			setTimeout(() => setShowSuccessToast(false), 3000);
			
		} catch (error) {
			console.error("Error updating data:", error);
			alert("Terjadi kesalahan saat menyimpan data");
		} finally {
			setIsSubmitting(false);
		}
	}

	if (loading)
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden">
				{/* Subtle Background */}
				<div className="absolute inset-0 -z-10">
					<div className="absolute top-20 left-20 w-72 h-72 bg-[#C2E7F6]/20 rounded-full blur-3xl"></div>
					<div className="absolute top-40 right-20 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl"></div>
				</div>
				<div className="relative">
					<div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
					<div className="mt-4 text-center">
						<div className="text-xl font-bold text-blue-600">Memuat Data...</div>
						<div className="text-sm text-gray-600 mt-1">Mohon tunggu sebentar</div>
					</div>
				</div>
			</div>
		);

	if (error || !data || !formData)
		return (
			<div className="min-h-screen bg-gray-50 relative overflow-hidden">
				{/* Subtle Background */}
				<div className="absolute inset-0 -z-10">
					<div className="absolute top-20 left-20 w-72 h-72 bg-[#C2E7F6]/20 rounded-full blur-3xl"></div>
					<div className="absolute top-40 right-20 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl"></div>
				</div>
				<div className="p-8">
					<div className="mb-6">
						<Link
							href="/admin/jumlah-ak"
							className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 text-blue-700 hover:bg-[#C2E7F6]/30 transition-all duration-300 font-medium"
						>
							<FiArrowLeft className="text-lg" /> Kembali ke Dashboard
						</Link>
					</div>
					<div className="max-w-md mx-auto bg-white rounded-xl shadow-sm p-8 border border-gray-200 text-center">
						<Avatar className="w-16 h-16 mx-auto mb-4">
							<AvatarFallback className="bg-red-500 text-white text-2xl">
								<FiUser />
							</AvatarFallback>
						</Avatar>
						<h2 className="text-2xl font-bold text-red-600 mb-2">Data Tidak Ditemukan</h2>
						<p className="text-gray-600 mb-4">{error || "Pegawai yang Anda cari tidak tersedia dalam sistem."}</p>
						<Link 
							href="/admin/jumlah-ak"
							className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-sm hover:bg-blue-700 transition-all duration-300"
						>
							<FiArrowLeft /> Kembali ke Dashboard
						</Link>
					</div>
				</div>
			</div>
		);

	return (
		<div className="min-h-screen bg-gray-50 relative overflow-hidden">
			{/* Success Toast Notification */}
			{showSuccessToast && (
				<div className="fixed top-4 right-4 z-50 animate-fade-in">
					<div className="bg-emerald-500 text-white px-6 py-4 rounded-xl shadow-lg border border-emerald-400/20 flex items-center gap-3">
						<FiCheckCircle className="text-xl" />
						<div>
							<div className="font-bold">Berhasil!</div>
							<div className="text-sm opacity-90">Data pegawai telah diperbarui</div>
						</div>
					</div>
				</div>
			)}

			{/* Subtle Background */}
			<div className="fixed inset-0 -z-10">
				<div className="absolute inset-0 bg-gray-50"></div>
				<div className="absolute top-0 left-0 w-full h-full opacity-20">
					<div className="absolute top-20 left-20 w-96 h-96 bg-[#C2E7F6]/40 rounded-full blur-3xl"></div>
					<div className="absolute top-40 right-20 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl"></div>
					<div className="absolute bottom-20 left-40 w-72 h-72 bg-blue-50/60 rounded-full blur-3xl"></div>
				</div>
			</div>

			<div className="p-8 flex flex-col items-center relative">
				{/* Back Button */}
				<div className="w-full max-w-6xl mb-6">
					<Link
						href="/admin/jumlah-ak"
						className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-xl shadow-sm border border-gray-200 text-blue-700 hover:bg-[#C2E7F6]/30 transition-all duration-300 font-semibold group"
					>
						<FiArrowLeft className="text-lg group-hover:-translate-x-1 transition-transform" /> 
						Kembali ke Dashboard
					</Link>
				</div>

				{/* Main Content Card */}
				<div className="w-full max-w-6xl relative">
					<div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200 overflow-hidden">
						{/* Header Section */}
						<div className="mb-8 text-center">
							<div className="flex items-center justify-center gap-3 mb-4">
								<div className="w-3 h-3 bg-blue-500 rounded-full"></div>
								<h1 className="text-4xl font-black text-blue-600">
									📋 Detail Profil Analis Kebijakan
								</h1>
								<div className="w-3 h-3 bg-blue-500 rounded-full"></div>
							</div>
							<p className="text-gray-600 text-lg">Kelola dan perbarui informasi pegawai secara real-time</p>
						</div>

						<div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
							{/* Profile Photo Section */}
							<div className="lg:col-span-1 flex flex-col items-center">
				<div className="relative mb-6">
					<div className="w-48 h-48 rounded-xl bg-white flex items-center justify-center border border-gray-200 shadow-sm overflow-hidden">
						<Avatar className="w-full h-full rounded-xl">
							<AvatarImage 
								src={data.photo || undefined} 
								alt={data.nama}
								className="object-cover w-full h-full"
							/>
							<AvatarFallback className="w-full h-full bg-blue-50 text-blue-600 text-4xl font-bold flex items-center justify-center">
								{data.nama.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
							</AvatarFallback>
						</Avatar>
					</div>
					{/* Status Badge */}
					<div className="absolute -top-2 -right-2">
						<div className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1">
							<FiCheckCircle className="text-sm" />
							Aktif
						</div>
					</div>
				</div>

				{/* Name and Basic Info */}
				<div className="text-center mb-6">
					<h2 className="text-2xl font-bold text-gray-800 mb-2">
						{data.nama}
					</h2>
					<div className="text-sm text-gray-600 space-y-1">
						<div className="flex items-center justify-center gap-1">
							<FiMail className="text-xs" />
							<span>{data.email || 'Email tidak tersedia'}</span>
						</div>
						<div className="flex items-center justify-center gap-1">
							<FiPhone className="text-xs" />
							<span>{data.phone}</span>
						</div>
					</div>
				</div>
								
				{/* Quick Info Cards */}
				<div className="w-full space-y-3">
					<div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200 hover:shadow-sm transition-all duration-300 cursor-pointer">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2 text-emerald-700">
								<FiFileText className="text-lg" />
								<span className="font-bold text-sm">NIP</span>
							</div>
							<span className="text-emerald-900 font-black text-xs">{data.nip}</span>
						</div>
					</div>
					<div className="bg-purple-50 rounded-xl p-4 border border-purple-200 hover:shadow-sm transition-all duration-300 cursor-pointer">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2 text-purple-700">
								<FiAward className="text-lg" />
								<span className="font-bold text-sm">Jenjang</span>
							</div>
							<span className="text-purple-900 font-black text-xs text-right">{data.jenjang?.nm_jenjang || "-"}</span>
						</div>
					</div>
					<div className="bg-amber-50 rounded-xl p-4 border border-amber-200 hover:shadow-sm transition-all duration-300 cursor-pointer">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2 text-amber-700">
								<FiBriefcase className="text-lg" />
								<span className="font-bold text-sm">Golongan</span>
							</div>
							<span className="text-amber-900 font-black text-sm">{data.golongan?.golongan || "-"}</span>
						</div>
					</div>
					{/* Status Card */}
					<div className="bg-green-50 rounded-xl p-4 border border-green-200 hover:shadow-sm transition-all duration-300">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2 text-green-700">
								<FiCheckCircle className="text-lg" />
								<span className="font-bold text-sm">Status</span>
							</div>
							<div className="flex items-center gap-1">
								<div className="w-2 h-2 bg-green-500 rounded-full"></div>
								<span className="text-green-900 font-black text-sm">Aktif</span>
							</div>
						</div>
					</div>
				</div>
							</div>

							{/* Form Section */}
							<div className="lg:col-span-3 relative">
								<form className="bg-white/80 rounded-xl p-8 border border-gray-200 space-y-6 shadow-sm" onSubmit={handleSubmit}>
									{/* Form Header with Edit Toggle */}
									<div className="flex items-center justify-between mb-6">
										<div className="flex items-center gap-3">
											<FiEdit3 className="text-2xl text-blue-600" />
											<h2 className="text-2xl font-bold text-blue-600">
												{isEditing ? 'Mode Edit Data' : 'Detail Data Pegawai'}
											</h2>
										</div>
										<button
											type="button"
											onClick={() => {
												setIsEditing(!isEditing);
												if (!isEditing) {
													// Reset changes when entering edit mode
													setFormData(data);
													setHasChanges(false);
												}
											}}
											className={`
												px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center gap-2
												${isEditing 
													? 'bg-gray-500 text-white hover:bg-gray-600' 
													: 'bg-blue-500 text-white hover:bg-blue-600'
												}
											`}
										>
											{isEditing ? (
												<>
													<FiAlertCircle className="text-sm" />
													Batal Edit
												</>
											) : (
												<>
													<FiEdit3 className="text-sm" />
													Mulai Edit
												</>
											)}
										</button>
									</div>

									{/* Change Indicator */}
									{hasChanges && isEditing && (
										<div className="bg-amber-50 border border-amber-300 rounded-lg p-3 mb-4">
											<div className="flex items-center gap-2 text-amber-700">
												<FiAlertCircle className="text-lg" />
												<span className="font-semibold text-sm">Ada perubahan yang belum disimpan</span>
											</div>
										</div>
									)}

									{/* Personal Information Section */}
									<div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
										<h3 className="text-lg font-bold text-blue-700 mb-4 flex items-center gap-2">
											<FiUser /> Informasi Personal
										</h3>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<FormRow label="Nama Lengkap" name="nama" value={formData.nama} onChange={handleChange} icon={<FiUser />} readOnly={!isEditing} />
											<FormRow label="NIP" name="nip" value={formData.nip} onChange={handleChange} icon={<FiFileText />} readOnly={!isEditing} />
											<FormRow label="NIAKN" name="niakn" value={formData.niakn} onChange={handleChange} icon={<FiFileText />} readOnly={!isEditing} />
											<FormRow label="Unit Kerja" name="unit_kerja" value={formData.unit_kerja} onChange={handleChange} icon={<FiMapPin />} readOnly={!isEditing} />
											<FormRow label="Email" name="email" value={formData.email || ""} onChange={handleChange} icon={<FiMail />} type="email" readOnly={!isEditing} />
											<FormRow label="No. HP" name="phone" value={formData.phone} onChange={handleChange} icon={<FiPhone />} readOnly={!isEditing} />
											<FormRowSelectInstansi 
												label="Instansi" 
												name="instansi_id" 
												value={formData.instansi_id} 
												onChange={handleChange} 
												options={instansiOptions}
												readOnly={!isEditing} 
											/>
											<FormRowSelectJenisKelamin 
												label="Jenis Kelamin" 
												name="jns_kelamin_id" 
												value={formData.jns_kelamin_id} 
												onChange={handleChange} 
												options={jenisKelaminOptions}
												readOnly={!isEditing} 
											/>
										</div>
									</div>

									{/* Document Information Section */}
									<div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
										<h3 className="text-lg font-bold text-amber-700 mb-4 flex items-center gap-2">
											<FiFileText /> Informasi Dokumen & Pendidikan
										</h3>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<FormRow label="Nomor Surat" name="nomor_surat" value={formData.nomor_surat} onChange={handleChange} icon={<FiFileText />} readOnly={!isEditing} />
											<FormRow label="TMT Pangkat" name="tmt_pangkat" value={formData.tmt_pangkat?.slice(0, 10)} onChange={handleChange} icon={<FiCalendar />} type="date" readOnly={!isEditing} />
											<FormRow label="TMT Surat" name="tmt_surat" value={formData.tmt_surat?.slice(0, 10)} onChange={handleChange} icon={<FiCalendar />} type="date" readOnly={!isEditing} />
											<FormRowSelect 
												label="Pendidikan" 
												name="pendidikan_id" 
												value={formData.pendidikan_id} 
												onChange={handleChange} 
												options={pendidikanOptions}
												readOnly={!isEditing} 
											/>
											<FormRowSelectJenjang 
												label="Jenjang" 
												name="jenjang_id" 
												value={formData.jenjang_id} 
												onChange={handleChange} 
												options={jenjangOptions}
												readOnly={!isEditing} 
											/>
											<FormRowSelectGolongan 
												label="Golongan" 
												name="golongan_id" 
												value={formData.golongan_id} 
												onChange={handleChange} 
												options={golonganOptions}
												readOnly={!isEditing} 
											/>
											<FormRowSelectJalur 
												label="Jalur Pengangkatan" 
												name="jalur_id" 
												value={formData.jalur_id} 
												onChange={handleChange} 
												options={jalurOptions}
												readOnly={!isEditing} 
											/>
										</div>
									</div>

									{/* Submit Button - Only show when editing */}
									{isEditing && (
										<div className="pt-6 flex gap-4">
											<button 
												type="submit" 
												disabled={isSubmitting || !hasChanges}
												className={`
													flex-1 rounded-xl px-8 py-4 font-bold text-lg shadow-sm 
													transition-all duration-300 flex items-center justify-center gap-3 group
													${isSubmitting || !hasChanges
														? 'bg-gray-400 cursor-not-allowed' 
														: 'bg-emerald-600 hover:bg-emerald-700 hover:shadow-md'
													}
													text-white
												`}
											>
												{isSubmitting ? (
													<>
														<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
														Menyimpan...
													</>
												) : (
													<>
														<FiSave className="text-xl" />
														Simpan Perubahan
													</>
												)}
											</button>
											<button 
												type="button"
												onClick={() => {
													setFormData(data);
													setHasChanges(false);
													setIsEditing(false);
												}}
												className="px-6 py-4 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2"
											>
												<FiAlertCircle className="text-lg" />
												Batal
											</button>
										</div>
									)}
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

// FormRow dengan desain modern dan dukungan icon
function FormRow({ label, name, value, onChange, readOnly, type, icon }: {
  label: string;
  name?: string;
  value: string | number | null | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  type?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-12 items-center gap-4 mb-4 group">
      <label className={`col-span-3 font-semibold text-sm transition-colors ${readOnly ? 'text-gray-500' : 'text-gray-700 group-hover:text-blue-600'}`}>
        {label}
      </label>
      <div className="col-span-9 relative">
        {icon && (
          <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 z-10 transition-colors ${
            readOnly ? 'text-gray-300' : 'text-gray-400 group-hover:text-blue-500'
          }`}>
            {icon}
          </div>
        )}
        <input
          type={type || "text"}
          name={name}
          value={value ?? ""}
          onChange={onChange}
          readOnly={readOnly}
          className={`
            w-full px-4 py-3 ${icon ? 'pl-10' : 'pl-4'} 
            border rounded-xl font-medium text-sm
            transition-all duration-300 ease-in-out
            focus:outline-none placeholder:text-gray-400
            ${readOnly 
              ? 'bg-gray-50/80 text-gray-500 cursor-not-allowed border-gray-100' 
              : `bg-white/80 border-gray-200 text-gray-700
                 hover:bg-white hover:border-gray-300 hover:shadow-sm
                 focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 focus:shadow-sm
                 focus:bg-white`
            }
          `}
        />
        {/* Subtle glow effect when focused and not readonly */}
        {!readOnly && (
          <div className="absolute inset-0 rounded-xl bg-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
        )}
      </div>
    </div>
  );
}

// FormRowSelect untuk dropdown
function FormRowSelect({ label, name, value, onChange, readOnly, options }: {
  label: string;
  name?: string;
  value: string | number | null | undefined;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  readOnly?: boolean;
  options: PendidikanOption[];
}) {
  return (
    <div className="grid grid-cols-12 items-center gap-4 mb-4 group">
      <label className={`col-span-3 font-semibold text-sm transition-colors ${readOnly ? 'text-gray-500' : 'text-gray-700 group-hover:text-blue-600'}`}>
        {label}
      </label>
      <div className="col-span-9 relative">
        <select
          name={name}
          value={value ?? ""}
          onChange={onChange}
          disabled={readOnly}
          className={`
            w-full px-4 py-3 
            border rounded-xl font-medium text-sm
            transition-all duration-300 ease-in-out
            focus:outline-none
            ${readOnly 
              ? 'bg-gray-50/80 text-gray-500 cursor-not-allowed border-gray-100' 
              : `bg-white/80 border-gray-200 text-gray-700
                 hover:bg-white hover:border-gray-300 hover:shadow-sm
                 focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 focus:shadow-sm
                 focus:bg-white cursor-pointer`
            }
          `}
        >
          <option value="">Pilih Pendidikan</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.pendidikan}
            </option>
          ))}
        </select>
        {/* Subtle glow effect when focused and not readonly */}
        {!readOnly && (
          <div className="absolute inset-0 rounded-xl bg-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
        )}
      </div>
    </div>
  );
}

// FormRowSelectInstansi untuk dropdown instansi
function FormRowSelectInstansi({ label, name, value, onChange, readOnly, options }: {
  label: string;
  name?: string;
  value: string | number | null | undefined;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  readOnly?: boolean;
  options: InstansiOption[];
}) {
  return (
    <div className="grid grid-cols-12 items-center gap-4 mb-4 group">
      <label className={`col-span-3 font-semibold text-sm transition-colors ${readOnly ? 'text-gray-500' : 'text-gray-700 group-hover:text-blue-600'}`}>
        {label}
      </label>
      <div className="col-span-9 relative">
        <select
          name={name}
          value={value ?? ""}
          onChange={onChange}
          disabled={readOnly}
          className={`
            w-full px-4 py-3 
            border rounded-xl font-medium text-sm
            transition-all duration-300 ease-in-out
            focus:outline-none
            ${readOnly 
              ? 'bg-gray-50/80 text-gray-500 cursor-not-allowed border-gray-100' 
              : `bg-white/80 border-gray-200 text-gray-700
                 hover:bg-white hover:border-gray-300 hover:shadow-sm
                 focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 focus:shadow-sm
                 focus:bg-white cursor-pointer`
            }
          `}
        >
          <option value="">Pilih Instansi</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.nama_instansi}
            </option>
          ))}
        </select>
        {/* Subtle glow effect when focused and not readonly */}
        {!readOnly && (
          <div className="absolute inset-0 rounded-xl bg-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
        )}
      </div>
    </div>
  );
}

// FormRowSelectJenisKelamin untuk dropdown jenis kelamin
function FormRowSelectJenisKelamin({ label, name, value, onChange, readOnly, options }: {
  label: string;
  name?: string;
  value: string | number | null | undefined;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  readOnly?: boolean;
  options: JenisKelaminOption[];
}) {
  return (
    <div className="grid grid-cols-12 items-center gap-4 mb-4 group">
      <label className={`col-span-3 font-semibold text-sm transition-colors ${readOnly ? 'text-gray-500' : 'text-gray-700 group-hover:text-blue-600'}`}>
        {label}
      </label>
      <div className="col-span-9 relative">
        <select
          name={name}
          value={value ?? ""}
          onChange={onChange}
          disabled={readOnly}
          className={`
            w-full px-4 py-3 
            border rounded-xl font-medium text-sm
            transition-all duration-300 ease-in-out
            focus:outline-none
            ${readOnly 
              ? 'bg-gray-50/80 text-gray-500 cursor-not-allowed border-gray-100' 
              : `bg-white/80 border-gray-200 text-gray-700
                 hover:bg-white hover:border-gray-300 hover:shadow-sm
                 focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 focus:shadow-sm
                 focus:bg-white cursor-pointer`
            }
          `}
        >
          <option value="">Pilih Jenis Kelamin</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.jns_kelamin}
            </option>
          ))}
        </select>
        {/* Subtle glow effect when focused and not readonly */}
        {!readOnly && (
          <div className="absolute inset-0 rounded-xl bg-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
        )}
      </div>
    </div>
  );
}

// FormRowSelectJenjang untuk dropdown jenjang
function FormRowSelectJenjang({ label, name, value, onChange, readOnly, options }: {
  label: string;
  name?: string;
  value: string | number | null | undefined;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  readOnly?: boolean;
  options: JenjangOption[];
}) {
  return (
    <div className="grid grid-cols-12 items-center gap-4 mb-4 group">
      <label className={`col-span-3 font-semibold text-sm transition-colors ${readOnly ? 'text-gray-500' : 'text-gray-700 group-hover:text-blue-600'}`}>
        {label}
      </label>
      <div className="col-span-9 relative">
        <select
          name={name}
          value={value ?? ""}
          onChange={onChange}
          disabled={readOnly}
          className={`
            w-full px-4 py-3 
            border rounded-xl font-medium text-sm
            transition-all duration-300 ease-in-out
            focus:outline-none
            ${readOnly 
              ? 'bg-gray-50/80 text-gray-500 cursor-not-allowed border-gray-100' 
              : `bg-white/80 border-gray-200 text-gray-700
                 hover:bg-white hover:border-gray-300 hover:shadow-sm
                 focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 focus:shadow-sm
                 focus:bg-white cursor-pointer`
            }
          `}
        >
          <option value="">Pilih Jenjang</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.nm_jenjang}
            </option>
          ))}
        </select>
        {/* Subtle glow effect when focused and not readonly */}
        {!readOnly && (
          <div className="absolute inset-0 rounded-xl bg-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
        )}
      </div>
    </div>
  );
}

// FormRowSelectGolongan untuk dropdown golongan
function FormRowSelectGolongan({ label, name, value, onChange, readOnly, options }: {
  label: string;
  name?: string;
  value: string | number | null | undefined;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  readOnly?: boolean;
  options: GolonganOption[];
}) {
  return (
    <div className="grid grid-cols-12 items-center gap-4 mb-4 group">
      <label className={`col-span-3 font-semibold text-sm transition-colors ${readOnly ? 'text-gray-500' : 'text-gray-700 group-hover:text-blue-600'}`}>
        {label}
      </label>
      <div className="col-span-9 relative">
        <select
          name={name}
          value={value ?? ""}
          onChange={onChange}
          disabled={readOnly}
          className={`
            w-full px-4 py-3 
            border rounded-xl font-medium text-sm
            transition-all duration-300 ease-in-out
            focus:outline-none
            ${readOnly 
              ? 'bg-gray-50/80 text-gray-500 cursor-not-allowed border-gray-100' 
              : `bg-white/80 border-gray-200 text-gray-700
                 hover:bg-white hover:border-gray-300 hover:shadow-sm
                 focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 focus:shadow-sm
                 focus:bg-white cursor-pointer`
            }
          `}
        >
          <option value="">Pilih Golongan</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.golongan}
            </option>
          ))}
        </select>
        {/* Subtle glow effect when focused and not readonly */}
        {!readOnly && (
          <div className="absolute inset-0 rounded-xl bg-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
        )}
      </div>
    </div>
  );
}

// FormRowSelectJalur untuk dropdown jalur pengangkatan
function FormRowSelectJalur({ label, name, value, onChange, readOnly, options }: {
  label: string;
  name?: string;
  value: string | number | null | undefined;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  readOnly?: boolean;
  options: JalurOption[];
}) {
  return (
    <div className="grid grid-cols-12 items-center gap-4 mb-4 group">
      <label className={`col-span-3 font-semibold text-sm transition-colors ${readOnly ? 'text-gray-500' : 'text-gray-700 group-hover:text-blue-600'}`}>
        {label}
      </label>
      <div className="col-span-9 relative">
        <select
          name={name}
          value={value ?? ""}
          onChange={onChange}
          disabled={readOnly}
          className={`
            w-full px-4 py-3 
            border rounded-xl font-medium text-sm
            transition-all duration-300 ease-in-out
            focus:outline-none
            ${readOnly 
              ? 'bg-gray-50/80 text-gray-500 cursor-not-allowed border-gray-100' 
              : `bg-white/80 border-gray-200 text-gray-700
                 hover:bg-white hover:border-gray-300 hover:shadow-sm
                 focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 focus:shadow-sm
                 focus:bg-white cursor-pointer`
            }
          `}
        >
          <option value="">Pilih Jalur Pengangkatan</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.jalur_pengangkatan}
            </option>
          ))}
        </select>
        {/* Subtle glow effect when focused and not readonly */}
        {!readOnly && (
          <div className="absolute inset-0 rounded-xl bg-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
        )}
      </div>
    </div>
  );
}
