import { Router } from "express";
import { getSubject, getAllStudentSubject, joinSubject, getAllStudents } from "../controllers/subject";
import { getClass, getAllClass } from "../controllers/class";
import { checkToken } from "../middleware/auth";

const subjectRouter = Router().use(checkToken);

subjectRouter.get("/:id", getSubject);
subjectRouter.get("/", getAllStudentSubject);
subjectRouter.post("/join", joinSubject);

//For Class
subjectRouter.get("/:subjectId/class/:classId", getClass);
subjectRouter.get("/:subjectId/class", getAllClass);

//Get all students from subject
subjectRouter.get("/:id", getAllStudents);

export default subjectRouter;