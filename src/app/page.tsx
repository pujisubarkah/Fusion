import Login from '@/components/login';


export default function LoginPage() {
  return (
    <div>
      {/* Komponen AutoLogout ditambahkan di sini */}
   
      <Login />
    </div>
  );
}

// Halaman login sudah dipindahkan ke /login/page.tsx dan layout khusus login sudah dibuat.
// File ini bisa dihapus atau diganti dengan landing page lain jika diperlukan.
