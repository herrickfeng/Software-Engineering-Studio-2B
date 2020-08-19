import { Router } from "express";
import { newSubject } from "../controllers/newSubject";

const adminSubjectRouter = Router();

adminSubjectRouter.post("/create", newSubject);

export default adminSubjectRouter;