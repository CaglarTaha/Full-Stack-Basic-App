import * as Joi from 'joi';
import { tokenValidator } from './common.validators';
import { roleValidator } from './role.validator';

export const userInputValidator = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  roleId: Joi.number().required(), // Role tipine göre belirli bir Joi şeması kullanılmalıdır, burada varsayılan olarak string olarak belirttim
});

export const loginInputValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
export const loginUserValidator = loginInputValidator;

export const userValidator = Joi.object({
  id: Joi.number().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  role: roleValidator.optional(),
  createdAt: Joi.date().required(),
  updatedAt: Joi.date().required(),
});

export const userResponseValidator = Joi.object({
  data: userValidator.required(),
});

export const loginUserResponseValidator = tokenValidator.keys({
  data: userValidator.required(),
});


export const listResponseValidator = Joi.object({
  data: Joi.array().items(userValidator).required(),
});