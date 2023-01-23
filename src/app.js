import express from "express";
import cors from "cors";
import authRouter from "./routes/AuthRoutes.js";
import recordRouter from "./routes/RecordsRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use(authRouter);
app.use(recordRouter)

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running in port: ${port}`));
