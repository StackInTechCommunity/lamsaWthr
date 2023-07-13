import * as Joi from 'joi';
export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().required(),
  PORT: Joi.number().required(),
  DB_HOST: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_PASS: Joi.string().required(),
  JWT_ACCESS_TIME: Joi.number().required(),
  JWT_SECRET: Joi.string().required(),
});
