import { Router } from "express";
import { UploadImage } from "../controllers/upload";

const userRouter = Router();

userRouter.post("/upload", UploadImage);

export default userRouter;