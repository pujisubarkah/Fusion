import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
// Make sure the Sidebar component exists at '../../../components/sidebar.tsx' or update the path accordingly.

export default function AdminJumlahAKDetailLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
