import db from "../config/database.js";

export async function createRecord(req, res, next) {
  const record = res.locals.record;

  try {
    await db.collection("records").insertOne(record);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
}

export async function recordsList(req, res, next) {
  const user = res.locals.user;

  try {
    const records = await db
      .collection("records")
      .find({ user: user._id })
      .toArray();

    res.send({ records, user });
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
}
