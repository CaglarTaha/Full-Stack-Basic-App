import * as Joi from 'joi';

// Role için giriş validasyon şeması
export const taskInputValidator = Joi.object({
  name: Joi.string().required(),
  task : Joi.string().required(),
});


// Role için çıkış validasyon şeması
export const taskValidator = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  task : Joi.string().required(),
  createdAt: Joi.date().required(),
  updatedAt: Joi.date().required(),
});

export const taskResponseValidator = Joi.object({
  data: taskValidator.required(),
});

// Role listesi için çıkış validasyon şeması
export const taskListResponseValidator = Joi.array().items(taskValidator);
