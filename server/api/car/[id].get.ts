import PC from '@prisma/client';

export default defineEventHandler((e) => {
  const p = new PC.PrismaClient()
  const id = e.context.params?.id
  return p.car.findUnique({
    where: {
      id: Number(id)
    }
  })
})