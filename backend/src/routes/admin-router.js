import { Router } from "express";
import { newSubject, getSubject, updateSubject } from "../controllers/subject";

const adminSubjectRouter = Router();

adminSubjectRouter.post("/create", newSubject);
adminSubjectRouter.get("/:id", getSubject);
adminSubjectRouter.put("/:id", updateSubject);

export default adminSubjectRouter;