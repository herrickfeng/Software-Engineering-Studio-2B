import { Router } from "express";
import { UploadImage, DownloadImage } from "../controllers/image";
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
userRouter.get("/:userId/download", DownloadImage);

export default userRouter;