import { Router } from "express";
import { newSubject, getSubject, getAllTeacherSubject, getAllTeacherSubjectAnalytics, updateSubject, deleteSubject, getAllStudents } from "../controllers/subject";
import { checkToken } from "../middleware/auth";
import { newClass, getClass, updateClass, deleteClass, getAllClass, generateClasses } from "../controllers/class";
import { createAttendance, getAttendance, getAttendanceBySubClass, getAttendanceBySubStu, updateAttendance, updateSpecific } from "../controllers/attendance";
import { checkTeacherRole, checkAdminRole } from "../middleware/roles";

const adminSubjectRouter = Router().use(checkToken, checkTeacherRole);

//For Subject
adminSubjectRouter.post("/create", newSubject);
adminSubjectRouter.get("/analytics", getAllTeacherSubjectAnalytics);
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

// This is duplicate in admin-subject-router
// FRONTEND IS USING SUBJECT-ROUTER for these endpoints
//For Attendance
adminSubjectRouter.post("/:subjectId/class/:classId/user/:userId/attendance", createAttendance);
adminSubjectRouter.get("/:subjectId/class/:classId/user/:userId/attendance", getAttendance);
adminSubjectRouter.get("/:subjectId/class/:classId/attendance", getAttendanceBySubClass);
adminSubjectRouter.get("/:subjectId/user/:userId/attendance", getAttendanceBySubStu);

adminSubjectRouter.put("/:subjectId/class/:classId/user/:userId/attendance", updateAttendance);
adminSubjectRouter.put("/:subjectId/class/:classId/user/:userId/attendance/:attendanceType", updateSpecific);
//Get all students from subject
adminSubjectRouter.get("/:subjectId", getAllStudents);

export default adminSubjectRouter;          