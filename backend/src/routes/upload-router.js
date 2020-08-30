import { Router } from "express";
import { UploadImage } from "../controllers/upload";
import multer from "multer";

const userRouter = Router();

const uploader = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // keep images size < 10 MB
  },
});


//userRouter.post("/upload", uploader.single('image'), UploadImage);

userRouter.post("/upload", uploader.single('image'), UploadImage);

export default userRouter;