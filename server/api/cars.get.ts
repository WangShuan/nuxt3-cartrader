import PC from '@prisma/client';

export default defineEventHandler(() => {
  const p = new PC.PrismaClient()
  return p.car.findMany()
})