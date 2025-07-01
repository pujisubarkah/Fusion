"use client";
import React from "react";
import { useParams } from "next/navigation";
import { FiArrowLeft, FiUser } from "react-icons/fi";
import Link from "next/link";

// Dummy data, in real app fetch by params.nama
const dataTable = [
	{
		id: "1",
		nama: "Budi Santoso",
		jenjang: "Madya",
		instansi: "Kemenkeu",
		provinsi: "DKI Jakarta",
		nip: "19780101 200501 1 001",
		email: "budi@kemenkeu.go.id",
	},
	{
		id: "2",
		nama: "Siti Aminah",
		jenjang: "Muda",
		instansi: "Kemendikbud",
		provinsi: "Jawa Barat",
		nip: "19800202 200601 2 002",
		email: "siti@kemdikbud.go.id",
	},
	{
		id: "3",
		nama: "Andi Wijaya",
		jenjang: "Madya",
		instansi: "Kemenkes",
		provinsi: "Jawa Timur",
		nip: "19790505 200701 1 003",
		email: "andi@kemenkes.go.id",
	},
	{
		id: "4",
		nama: "Rina Dewi",
		jenjang: "Pertama",
		instansi: "Kemenhub",
		provinsi: "Bali",
		nip: "19830510 201001 2 004",
		email: "rina@kemenhub.go.id",
	},
	{
		id: "5",
		nama: "Dewi Lestari",
		jenjang: "Utama",
		instansi: "Kemenko PMK",
		provinsi: "Sumatera Utara",
		nip: "19761212 199901 2 005",
		email: "dewi@kemenkopmk.go.id",
	},
];

export default function DetailAnalisPage() {
	const params = useParams();
	let idParam = params?.id;
	let id = Array.isArray(idParam) ? idParam[0] : idParam || "";
	const data = dataTable.find((d) => d.id === id);

	if (!data)
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
				<div className="text-red-600 font-bold">Data tidak ditemukan.</div>
			</div>
		);

	return (
		<div className="p-8 flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
			<div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-12 border-t-4 border-blue-400 relative flex flex-col gap-6">
				<Link
					href="/user/jumlah-ak"
					className="absolute top-4 left-4 text-blue-700 hover:underline flex items-center gap-1"
				>
					<FiArrowLeft /> Kembali
				</Link>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
					{/* Form Data */}
					<form className="md:col-span-2 space-y-4">
						<div className="grid grid-cols-12 items-center gap-2 mb-2">
							<label className="col-span-4 text-blue-700 font-semibold text-right pr-2">
								Nama
							</label>
							<input
								type="text"
								value={data.nama}
								readOnly
								className="col-span-8 border border-blue-200 rounded-lg px-3 py-2 bg-blue-50 text-blue-900 font-bold focus:outline-none w-full"
							/>
						</div>
						<div className="grid grid-cols-12 items-center gap-2 mb-2">
							<label className="col-span-4 text-blue-700 font-semibold text-right pr-2">
								NIP
							</label>
							<input
								type="text"
								value={data.nip}
								readOnly
								className="col-span-8 border border-blue-200 rounded-lg px-3 py-2 bg-blue-50 text-blue-900 focus:outline-none w-full"
							/>
						</div>
						<div className="grid grid-cols-12 items-center gap-2 mb-2">
							<label className="col-span-4 text-blue-700 font-semibold text-right pr-2">
								Email
							</label>
							<input
								type="text"
								value={data.email}
								readOnly
								className="col-span-8 border border-blue-200 rounded-lg px-3 py-2 bg-blue-50 text-blue-900 focus:outline-none w-full"
							/>
						</div>
						<div className="grid grid-cols-12 items-center gap-2 mb-2">
							<label className="col-span-4 text-blue-700 font-semibold text-right pr-2">
								Jenjang
							</label>
							<input
								type="text"
								value={data.jenjang}
								readOnly
								className="col-span-8 border border-blue-200 rounded-lg px-3 py-2 bg-blue-50 text-blue-900 focus:outline-none w-full"
							/>
						</div>
						<div className="grid grid-cols-12 items-center gap-2 mb-2">
							<label className="col-span-4 text-blue-700 font-semibold text-right pr-2">
								Instansi
							</label>
							<input
								type="text"
								value={data.instansi}
								readOnly
								className="col-span-8 border border-blue-200 rounded-lg px-3 py-2 bg-blue-50 text-blue-900 focus:outline-none w-full"
							/>
						</div>
						<div className="grid grid-cols-12 items-center gap-2 mb-2">
							<label className="col-span-4 text-blue-700 font-semibold text-right pr-2">
								Provinsi
							</label>
							<input
								type="text"
								value={data.provinsi}
								readOnly
								className="col-span-8 border border-blue-200 rounded-lg px-3 py-2 bg-blue-50 text-blue-900 focus:outline-none w-full"
							/>
						</div>
					</form>
					{/* Foto Profil */}
					<div className="flex-shrink-0 flex justify-center md:justify-end">
						<div className="w-40 h-40 rounded-xl bg-blue-100 flex items-center justify-center border-4 border-blue-200 shadow">
							<FiUser className="text-7xl text-blue-400" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
