import { Router } from "express";
import { login, passwordReset } from "../controllers/auth";
import { checkToken } from "../middleware/auth";
import { successResponse } from "../helpers/apiResponse";

const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/reset", passwordReset);
authRouter.get("/verify", checkToken, successResponse);

export default authRouter;
