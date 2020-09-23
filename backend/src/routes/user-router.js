import { Router } from "express";
import { newUser, getUser, updateUser, deleteUser, uploadProfilePicture } from "../controllers/user";
import { checkUser } from "../middleware/user";
import { checkToken } from "../middleware/auth";
import multer from "multer";

const uploader = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // keep images size < 10 MB
  },
});

const userRouter = Router();

userRouter.post("/create", newUser);
userRouter.get("/", checkToken, getUser);
userRouter.get("/:userId", getUser);
userRouter.put("/:userId", checkToken, checkUser, updateUser);
userRouter.put("/:userId/image", checkToken, checkUser, uploader.single('image'), uploadProfilePicture);
userRouter.delete("/:userId", checkToken, checkUser, deleteUser);

export default userRouter;