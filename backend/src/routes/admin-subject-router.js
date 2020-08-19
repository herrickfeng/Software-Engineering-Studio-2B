import { Router } from "express";
import { newSubject, getSubject, updateSubject } from "../controllers/subject";
import { checkToken } from "../middleware/auth";

const adminSubjectRouter = Router().use(checkToken);

adminSubjectRouter.post("/create", newSubject);
adminSubjectRouter.get("/:id", getSubject);
adminSubjectRouter.put("/:id", updateSubject);

export default adminSubjectRouter;