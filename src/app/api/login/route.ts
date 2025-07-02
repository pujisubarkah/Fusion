import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma' // pastikan kamu punya prisma client
import bcrypt from 'bcryptjs' // untuk cek password

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json({ message: 'Username dan password wajib diisi.' }, { status: 400 })
    }

    const user = await prisma.user.findFirst({
      where: { username },
    })

    if (!user) {
      return NextResponse.json({ message: 'User tidak ditemukan.' }, { status: 404 })
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if (!isPasswordMatch) {
      return NextResponse.json({ message: 'Password salah.' }, { status: 401 })
    }

    // Jangan kirim password ke client
    const { password: _password, ...userData } = user

    return NextResponse.json({
      message: 'Login berhasil!',
      user: userData,
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ message: 'Terjadi kesalahan server.' }, { status: 500 })
  }
}
