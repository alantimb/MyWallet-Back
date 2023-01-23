import db from "../config/database.js";
import bcrypt from "bcrypt";

export async function signUp(req, res) {
  const user = req.body;

  const passwordHashed = bcrypt.hashSync(user.password, 10);

  try {
    await db
      .collection("users")
      .insertOne({ ...user, password: passwordHashed });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function signIn(req, res) {}
