import PC from '@prisma/client';

export default defineEventHandler((e) => {
  const city = e.context.params?.city
  const { make, minPrice, maxPrice } = getQuery(e)
  const p = new PC.PrismaClient()
  const f = {}
  if (city !== 'All') {
    f.city = city
  }
  if (make) {
    f.make = make
  }
  if (maxPrice || minPrice) {
    f.price = {
      gte: null,
      lte: null
    }
  }
  if (maxPrice) {
    f.price.lte = Number(maxPrice)
  }
  if (minPrice) {
    f.price.gte = Number(minPrice)
  }
  return p.car.findMany({
    where: f
  })
})