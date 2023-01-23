import db from "../config/database.js";

export async function authValidation(req, res, next) {
  const { authorization } = req.headers;

  const token = authorization?.replace("Bearer", ""); // Token funcionando

  if (!token) {
    return res.status(422);
  }

  try {
    const session = await db.collection("sessions").findOne({ token }); //Não encontra a sessão pelo Token
    console.log(session + "  não há sessão");
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

    res.locals.user = user;
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }

  next();
}
