import { Router } from "express";
import { newUser, getUser, updateUser, deleteUser } from "../controllers/user";
import { checkUser } from "../middleware/user";
import { checkToken } from "../middleware/auth";

const userRouter = Router();

userRouter.post("/create", newUser);
userRouter.get("/", checkToken, getUser);
userRouter.get("/:userId", getUser);
userRouter.put("/:userId", checkToken, checkUser, updateUser);
userRouter.delete("/:userId", checkToken, checkUser, deleteUser);

export default userRouter;