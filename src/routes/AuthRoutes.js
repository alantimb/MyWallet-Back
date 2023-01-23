import { Router } from "express";
import { signIn, signUp } from "../controllers/AuthControllers.js";
import { schemaValidation } from "../middlewares/schemaMiddleware.js";

const authRouter = Router();

authRouter.post("/sign-up", schemaValidation, signUp);
authRouter.post("/sign-in", signIn);

export default authRouter;
