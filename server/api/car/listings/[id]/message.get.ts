import PC from '@prisma/client';

export default defineEventHandler((e) => {
  const p = new PC.PrismaClient()
  const id = e.context.params?.id
  return p.message.findMany({
    where: {
      listingId: Number(id)
    },
    select: {
      name: true,
      email: true,
      phone: true,
      memo: true,
      id: true,
      created_at: true
    }
  })
})