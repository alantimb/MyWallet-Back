import { userSchema } from "../schemas/AuthSchema.js";

export async function schemaValidation(req, res, next) {
  const user = req.body;

  const { error } = userSchema.validate(user, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map((err) => err.message);
    return res.status(422).send(errorMessages);
  }

  next();
}
