import PC from '@prisma/client';

export default defineEventHandler((e) => {
  const p = new PC.PrismaClient()
  const id = e.context.params?.userId
  return p.car.findMany({
    where: {
      listerId: id
    },
    select: {
      image_url: true,
      name: true,
      price: true,
      enginesize: true,
      seats: true,
      id: true,
      features: true
    }
  })
})