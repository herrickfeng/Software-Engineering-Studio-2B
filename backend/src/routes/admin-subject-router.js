import { Router } from "express";
import { newSubject, getSubject, getAllTeacherSubject, updateSubject, deleteSubject, getAllStudents } from "../controllers/subject";
import { checkToken } from "../middleware/auth";
import { newClass, getClass, updateClass, deleteClass, getAllClass, generateClasses } from "../controllers/class";
import { checkTeacherRole, checkAdminRole } from "../middleware/roles";

const adminSubjectRouter = Router().use(checkToken, checkTeacherRole);

//For Subject
adminSubjectRouter.post("/create", newSubject);
adminSubjectRouter.get("/:id", getSubject);
adminSubjectRouter.get("/", getAllTeacherSubject);
adminSubjectRouter.put("/:id", updateSubject);
adminSubjectRouter.delete("/:id", deleteSubject);
adminSubjectRouter.get("/:subjectId/students", getAllStudents);

//For Class
adminSubjectRouter.post("/:subjectId/class/create", newClass);
adminSubjectRouter.post("/:subjectId/class/generate", generateClasses);
adminSubjectRouter.get("/:subjectId/class/:classId", getClass);
adminSubjectRouter.put("/:subjectId/class/:classId", updateClass);
adminSubjectRouter.delete("/:subjectId/class/:classId", deleteClass);
adminSubjectRouter.get("/:subjectId/class", getAllClass);

export default adminSubjectRouter;          