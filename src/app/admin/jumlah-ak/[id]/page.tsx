"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FiArrowLeft, FiUser } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

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

export default function DetailAnalisPage() {
	const params = useParams();
	const idParam = params?.id;
	const id = Array.isArray(idParam) ? idParam[0] : idParam || "";
	const [data, setData] = useState<Pegawai | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [formData, setFormData] = useState<Pegawai | null>(null);

	useEffect(() => {
		if (!id) return;
		setLoading(true);
		fetch(`/api/pegawai/${id}`)
			.then(async (res) => {
				if (!res.ok) throw new Error("Gagal fetch data");
				const json = await res.json();
				setData(json);
				setFormData(json); // set formData untuk edit
				setError("");
			})
			.catch(() => {
				setError("Data tidak ditemukan.");
				setData(null);
				setFormData(null);
			})
			.finally(() => setLoading(false));
	}, [id]);

	// Handler untuk input
	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setFormData((prev) => (prev ? { ...prev, [name]: value } : prev));
	}

	// Handler submit
	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		// TODO: Kirim PATCH/PUT ke API
		console.log("Data yang akan diupdate:", formData);
		alert("Perubahan disimpan (dummy, belum ke API)");
	}

	if (loading)
		return (
			<div className="p-8 text-center text-blue-700 font-semibold">Loading...</div>
		);

	if (error || !data || !formData)
		return (
			<div className="p-8">
				<div className="mb-4">
					<Link
						href="/user/jumlah-ak"
						className="inline-flex items-center gap-2 text-blue-700 hover:underline"
					>
						<FiArrowLeft /> Kembali
					</Link>
				</div>
				<div className="text-red-600 font-bold">{error || "Data tidak ditemukan."}</div>
			</div>
		);

	return (
		<div className="p-8 flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
			<div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-12 border-t-4 border-blue-400 relative flex flex-col gap-6">
				<Link
					href="/admin/jumlah-ak"
					className="absolute top-4 left-4 text-blue-700 hover:underline flex items-center gap-1"
				>
					<FiArrowLeft /> Kembali
				</Link>
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
					{/* Form Data */}
					<form className="md:col-span-3 space-y-4" onSubmit={handleSubmit}>
						<FormRow label="Nama" name="nama" value={formData.nama} onChange={handleChange} />
						<FormRow label="NIP" name="nip" value={formData.nip} onChange={handleChange} />
						<FormRow label="NIAKN" name="niakn" value={formData.niakn} onChange={handleChange} />
						<FormRow label="Unit Kerja" name="unit_kerja" value={formData.unit_kerja} onChange={handleChange} />
						<FormRow label="Email" name="email" value={formData.email || ""} onChange={handleChange} />
						<FormRow label="No. HP" name="phone" value={formData.phone} onChange={handleChange} />
						<FormRow label="Nomor Surat" name="nomor_surat" value={formData.nomor_surat} onChange={handleChange} />
						<FormRow label="TMT Pangkat" name="tmt_pangkat" value={formData.tmt_pangkat?.slice(0, 10)} onChange={handleChange} type="date" />
						<FormRow label="TMT Surat" name="tmt_surat" value={formData.tmt_surat?.slice(0, 10)} onChange={handleChange} type="date" />
						{/* Field relasi tetap readonly */}
						<FormRow label="Jenis Kelamin" value={data.jns_kelamin?.jns_kelamin || "-"} readOnly />
						<FormRow label="Jabatan Fungsional" value={data.jabfung?.fungsional || "-"} readOnly />
						<FormRow label="Jenjang" value={data.jenjang?.nm_jenjang || "-"} readOnly />
						<FormRow label="Golongan" value={data.golongan?.golongan || "-"} readOnly />
						<FormRow label="Jalur Pengangkatan" value={data.jalur?.jalur_pengangkatan || "-"} readOnly />
						<FormRow label="Instansi" value={data.instansi?.nama_instansi || "-"} readOnly />
						<FormRow label="Pendidikan" value={data.pendidikan?.pendidikan || "-"} readOnly />
						<button type="submit" className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow transition">Simpan Perubahan</button>
					</form>
					{/* Foto Profil */}
					<div className="flex-shrink-0 flex justify-center md:justify-end items-start md:col-span-1">
						<div className="w-40 h-40 rounded-xl bg-blue-100 flex items-center justify-center border-4 border-blue-200 shadow overflow-hidden">
							{data.photo ? (
								<Image
									src={data.photo}
									alt={data.nama}
									width={160}
									height={160}
									className="object-cover w-full h-full"
								/>
							) : (
								<FiUser className="text-7xl text-blue-400" />
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

// FormRow sekarang support input editable
function FormRow({ label, name, value, onChange, readOnly, type }: {
  label: string;
  name?: string;
  value: string | number | null | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  type?: string;
}) {
  return (
    <div className="grid grid-cols-12 items-center gap-2 mb-2">
      <label className="col-span-3 text-blue-700 font-semibold text-right pr-2">{label}</label>
      <input
        type={type || "text"}
        name={name}
        value={value ?? ""}
        onChange={onChange}
        readOnly={readOnly}
        className={`col-span-9 border border-blue-200 rounded-lg px-3 py-2 bg-blue-50 text-blue-900 font-bold focus:outline-none w-full ${readOnly ? 'bg-gray-100 text-gray-500' : ''}`}
      />
    </div>
  );
}
