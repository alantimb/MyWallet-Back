import dayjs from "dayjs";
import { recordSchema } from "../schemas/RecordSchema.js";

export async function recordSchemaValidation(req, res, next) {
  const user = res.locals.user;
  const { description, value, type } = req.body;

  const record = {
    createdAt: dayjs().format("DD/MM/YYYY"),
    description,
    value,
    type,
    user: user._id,
  };

  const { error } = recordSchema.validate(record, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }

  res.locals.record = record;

  next();
}
