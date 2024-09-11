// src/utils/common.utils.ts

import Joi from "joi";
import { BaseOutput } from "../interfaces/common.interface";
import { Base } from "../entity/base.entity";

export function validate(data: any, schema: Joi.ObjectSchema): any {
  const { error, value } = schema.validate(data);

  if (error) {
    throw new Error(
      `Validation Error for data ${JSON.stringify(data)}: ${error.message}`
    );
  }

  return value;
}

export function mapToBase<T extends Base>(input: T): BaseOutput {
  return {
    id: input.id,
    createDate: input.createDate,
    updateDate: input.updateDate,
    active: input.active,
  };
}
