
import * as Joi from 'joi';


export const baseValidator = Joi.object({
    id: Joi.number().required(),
    active: Joi.boolean().required(),
    createDate: Joi.date().required(),
    updateDate: Joi.date().required(),
  });

  export const tokenValidator = Joi.object({
    token: Joi.string().required(),
  });



export const loginInputValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });


  export const idValidator = Joi.object({
    id: Joi.string().required(),
  });