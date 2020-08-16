import { Router } from "express";
import { newUser } from "../controllers/newUser";

const userRouter = Router();

userRouter.post("/create", newUser);

export default userRouter;