import { Router } from "express";
import { authValidation } from "../middlewares/AuthMiddleware.js";
import { recordSchemaValidation } from "../middlewares/RecordMiddleware.js";
import { createRecord } from "../controllers/RecordController.js";

const recordRouter = Router();

recordRouter.use(authValidation);
recordRouter.post("/records", recordSchemaValidation, createRecord);
// recordRouter.get("/records", signIn);

export default recordRouter;
