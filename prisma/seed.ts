import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const passwordAdmin = await bcrypt.hash('admin123', 10)
  const passwordUser = await bcrypt.hash('user123', 10)

  await prisma.user.createMany({
    data: [
      {
        role_id: 1, // misal 1 = admin
        username: 'admin',
        nama: 'Admin Sistem',
        email: 'admin@fusion.id',
        password: passwordAdmin,
      },
      {
        role_id: 2, // misal 4 = user biasa
        username: 'user1',
        nama: 'Pengguna Pertama',
        email: 'user1@fusion.id',
        password: passwordUser,
      },
    ],
    skipDuplicates: true,
  })

  console.log('✅ User seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
