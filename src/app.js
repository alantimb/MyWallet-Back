import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import joi from "joi";
import bcrypt from "bcrypt";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

const mongoClient = new MongoClient(process.env.DATABASE_URL);
let db;

try {
  await mongoClient.connect();
} catch (err) {
  console.log("Erro no mongo.connect", err.message);
}

db = mongoClient.db();

// ROTAS

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running in port: ${PORT}`));
