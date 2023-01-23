import db from "../config/database.js";
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";

export async function signUp(req, res) {
  const user = req.body;

  const passwordHashed = bcrypt.hashSync(user.password, 10);

  try {
    await db
      .collection("users")
      .insertOne({ ...user, password: passwordHashed });
  } catch (err) {
    console.log(err);
    res.status(500).send(error.message);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const user = await db.collection("users").findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = uuidV4();
      await db.collection("sesions").insertOne({ idUsuario: user._id, token });
      return res.status(200).send({ token });
    } else {
      return res.status(401);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(error.message);
  }
}
