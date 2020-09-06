import { Router } from "express";
import { newSubject, getSubject, getAllTeacherSubject, updateSubject, deleteSubject } from "../controllers/subject";
import { checkToken } from "../middleware/auth";
import { checkTeacherRole, checkAdminRole } from "../middleware/roles";

const adminSubjectRouter = Router().use(checkToken, checkTeacherRole);

adminSubjectRouter.post("/create", newSubject);
adminSubjectRouter.get("/:id", getSubject);
adminSubjectRouter.get("/", getAllTeacherSubject);
adminSubjectRouter.put("/:id", updateSubject);
adminSubjectRouter.delete("/:id", deleteSubject);

export default adminSubjectRouter;