export function schemaValidation(schema) {
  return (req, res, next) => {
    const user = req.body;

    const { error } = schema.validate(user, { abortEarly: false });

    if (error) {
      const errorMessages = error.details.map((err) => err.message);
      return res.status(422).send(errorMessages);
    }

    res.locals.user = user;

    next();
  };
}
