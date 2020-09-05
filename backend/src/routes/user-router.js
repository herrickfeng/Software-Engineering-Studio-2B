import { Router } from "express";
import { newUser, getUser } from "../controllers/user";
import { checkToken } from "../middleware/auth";

const userRouter = Router();

userRouter.post("/create", newUser);
userRouter.get("/", checkToken, getUser);
userRouter.get("/:userId", getUser);

export default userRouter;