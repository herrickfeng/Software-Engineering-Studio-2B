import { Router } from "express";
import { getSubject, getAllStudentSubject, joinSubject } from "../controllers/subject";
import { createAttendance, getAttendance } from "../controllers/attendance";
import { getClass, getAllClass } from "../controllers/class";
import { checkToken } from "../middleware/auth";

const subjectRouter = Router().use(checkToken);

subjectRouter.get("/:id", getSubject);
subjectRouter.get("/", getAllStudentSubject);
subjectRouter.post("/join", joinSubject);

//For Class
subjectRouter.get("/:subjectId/class/:classId", getClass);
subjectRouter.get("/:subjectId/class", getAllClass);

export default subjectRouter;
 
//For Attendance
subjectRouter.post("/:subjectId/class/:classId/student/:userId/attendance", createAttendance);
subjectRouter.get("/:subjectId/class/:classId/student/:userId/attendance", getAttendance);
// TODO
// Get attendance by class /:subjectId/class/:classId/attendance 
// 
// subjectRouter.get("/:subjectId/class/:classId/student/:userId", deleteAttendance);
// subjectRouter.get("/:subjectId/class/:classId/student/:userId", updateAttendance);