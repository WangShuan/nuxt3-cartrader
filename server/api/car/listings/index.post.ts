import Joi from 'joi';
import PC from '@prisma/client';

const schema = Joi.object({
  name: Joi.string().required().messages({ 'any.required': '名稱為必填欄位' }),
  make: Joi.string().required().messages({ 'any.required': '廠牌為必填欄位' }),
  price: Joi.number().min(0.1).required().messages({
    'any.required': '價格為必填欄位',
    'number.min': '價格不得低於 0.1 萬'
  }),
  image_url: Joi.string().min(10).required().messages({
    'any.required': '圖片連結為必填欄位',
    'string.min': '圖片檔案格式錯誤',
  }),
  seats: Joi.string().min(5).required().messages({
    'any.required': '座位數量為必填欄位',
    'string.min': '座位數量格式錯誤',
  }),
  enginesize: Joi.string().min(4).required().messages({
    'any.required': 'c.c.數為必填欄位',
    'string.min': 'c.c.數格式錯誤',
  }),
  features: Joi.string().required().messages({ 'any.required': '特點為必填欄位' }),
  description: Joi.string().min(30).required().messages({
    'any.required': '描述為必填欄位',
    'string.min': '請輸入正確的描述',
  }),
  city: Joi.string().required().messages({ 'any.required': '地點為必填欄位' }),
  listerId: Joi.string().required()
})

export default defineEventHandler(async (e) => {
  const body = await readBody(e)

  const { error, value } = await schema.validate(body)

  if (error) {
    throw createError({
      statusCode: 412,
      statusMessage: error.message,
    });
  }
  const p = new PC.PrismaClient()
  const car = await p.car.create({
    data: body
  })
  return car
})