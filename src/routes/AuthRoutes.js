import { Router } from "express";
import { signIn, signUp } from "../controllers/AuthControllers.js";
import { schemaValidation } from "../middlewares/schemaMiddleware.js";
import { loginSchema, userSchema } from "../schemas/AuthSchema.js";

const authRouter = Router();

authRouter.post("/sign-up", schemaValidation(userSchema), signUp);
authRouter.post("/sign-in", schemaValidation(loginSchema), signIn);

export default authRouter;
