import PC from '@prisma/client';

export default defineEventHandler(async (e) => {
  const id = e.context.params?.id
  const p = new PC.PrismaClient()
  const car = await p.car.delete({
    where: {
      id: Number(id)
    }
  })
  return car
})