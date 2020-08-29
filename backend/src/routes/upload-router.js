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

userRouter.post("/upload", uploader.single('image'), async (req, res) => {
  //console.log(uploader.single('picture'));
  console.log("please I'm going crazy")
  console.log(req.file.originalname)
  console.log(req.body.image)
  if (!req.file) {
    res.status(400).send('Error, could not upload file');
    return;
  }
  console.log(req.file)
});

export default userRouter;