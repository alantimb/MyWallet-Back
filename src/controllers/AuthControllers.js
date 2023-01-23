import db from "../config/database.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signUp(req, res) {
  const user = res.locals.user;

  const passwordHashed = bcrypt.hashSync(user.password, 10);

  try {
    await db
      .collection("users")
      .insertOne({ ...user, password: passwordHashed });
    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const user = await db.collection("users").findOne({ email }).toArray();

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = uuid();

      await db.collection("sessions").insertOne({ token, userId: user._id });
      return res.status(200).send({ token });
    } else {
      return res.status(401);
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
