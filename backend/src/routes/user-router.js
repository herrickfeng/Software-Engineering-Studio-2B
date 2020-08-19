import { Router } from "express";
import { newUser } from "../controllers/user";

const userRouter = Router();

userRouter.post("/create", newUser);

export default userRouter;