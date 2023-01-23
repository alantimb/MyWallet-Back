import db from "../config/database.js";

export async function authValidation(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer", "");
  if (!token) {
    return res.status(422);
  }

  try {
    const session = await db.collection("sessions").findOne({ token });
    console.log(session);
    if (!session) {
      return res.sendStatus(401);
    }

    const user = await db.collection("users").findOne({
      _id: session.userId,
    });
    if (!user) {
      return res.sendStatus(401);
    }
    delete user.password;
  } catch (err) {
    res.status(500).send(err.response.message);
  }

  res.locals.user = user;

  next();
}
