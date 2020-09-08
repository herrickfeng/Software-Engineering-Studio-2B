import { Router } from "express";
import { newSubject, getSubject, getAllSubject, updateSubject, deleteSubject } from "../controllers/subject";
import { checkToken } from "../middleware/auth";
import { newClass, getClass, updateClass, deleteClass, getAllClass } from "../controllers/class";

const adminSubjectRouter = Router().use(checkToken);

//For Subject
adminSubjectRouter.post("/create", newSubject);
adminSubjectRouter.get("/:id", getSubject);
adminSubjectRouter.get("/", getAllSubject);
adminSubjectRouter.put("/:id", updateSubject);
adminSubjectRouter.delete("/:id", deleteSubject);

//For Class
adminSubjectRouter.post("/:subjectId/class/create", newClass);
adminSubjectRouter.get("/:subjectId/class/:classId", getClass);
adminSubjectRouter.put("/:subjectId/class/:classId", updateClass);
adminSubjectRouter.delete("/:subjectId/class/:classId", deleteClass);
adminSubjectRouter.get("/:subjectId/class", getAllClass);

export default adminSubjectRouter;          