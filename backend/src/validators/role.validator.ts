import * as Joi from 'joi';

// Role için giriş validasyon şeması
export const roleInputValidator = Joi.object({
  name: Joi.string().required(),
  // Diğer özellikler buraya eklenebilir
});


// Role için çıkış validasyon şeması
export const roleValidator = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  createdAt: Joi.date().required(),
  updatedAt: Joi.date().required(),
});

export const roleResponseValidator = Joi.object({
  data: roleValidator.required(),
});

// Role listesi için çıkış validasyon şeması
export const roleListResponseValidator = Joi.array().items(roleValidator);
