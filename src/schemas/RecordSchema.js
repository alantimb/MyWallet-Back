import joi from "joi";

export const recordSchema = joi.object({
  createdAt: joi.string().required(),
  description: joi.string().required().min(3),
  value: joi.number().required(),
  type: joi.string().required().valid("entrada", "saida"),
  user: joi.object().required(),
});
