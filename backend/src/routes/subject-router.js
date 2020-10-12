import { Router } from "express";
import { createAttendance, getAttendance, getAttendanceBySubClass, getAttendanceBySubStu, updateAttendance, verifyLocation, updateSpecific } from "../controllers/attendance";
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
 
// This is duplicate in admin-subject-router
//For Attendance
subjectRouter.post("/:subjectId/class/:classId/user/:userId/attendance", createAttendance);
subjectRouter.get("/:subjectId/class/:classId/user/:userId/attendance", getAttendance);
subjectRouter.get("/:subjectId/class/:classId/attendance", getAttendanceBySubClass);
subjectRouter.get("/:subjectId/user/:userId/attendance", getAttendanceBySubStu);

subjectRouter.put("/:subjectId/class/:classId/user/:userId/attendance", updateAttendance);
subjectRouter.post("/:subjectId/class/:classId/user/:userId/location", verifyLocation);
subjectRouter.put("/:subjectId/class/:classId/user/:userId/attendance/:attendanceType", updateSpecific);

//Get all students from subject
subjectRouter.get("/:subjectId/students", getAllStudents);

export default subjectRouter;
