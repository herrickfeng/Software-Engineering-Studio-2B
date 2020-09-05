import { Router } from "express";
import { login, passwordReset } from "../controllers/auth";

const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/reset", passwordReset);

export default authRouter;
