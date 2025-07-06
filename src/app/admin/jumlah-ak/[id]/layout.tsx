import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Detail Pegawai AK | FUSION',
  description: 'Detail dan edit informasi pegawai Analis Kebijakan'
}

export default function DetailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}