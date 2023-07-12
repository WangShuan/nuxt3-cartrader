import Joi from 'joi';
import PC from '@prisma/client';

const schema = Joi.object({
  name: Joi.string().required().messages({ 'any.required': '名稱為必填欄位' }),
  email: Joi.string().email().required().messages({
    'any.required': '信箱為必填欄位',
    'string.email': '信箱格式錯誤'
  }),
  phone: Joi.string().length(10).pattern(/^(\+?886-?|0)?9\d{8}$/).required().messages({
    'any.required': '聯絡電話為必填欄位',
    'string.length': '請輸入正確的電話號碼',
    'string.pattern.base': '聯絡電話格式錯誤',
  }),
  memo: Joi.string().required().messages({ 'any.required': '備註為必填欄位' })
})

export default defineEventHandler(async (e) => {
  const body = await readBody(e)
  const id = e.context.params?.id;
  const { error, value } = await schema.validate(body)
  if (error) {
    throw createError({
      statusCode: 412,
      statusMessage: error.message,
    });
  }
  const p = new PC.PrismaClient()
  const message = await p.message.create({
    data: {
      listingId: Number(id),
      ...body,
      created_at: new Date()
    },
  })
  return message
})