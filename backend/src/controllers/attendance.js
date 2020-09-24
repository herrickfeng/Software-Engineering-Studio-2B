import firestore from "../helpers/firestore";
import { checkParams } from "../helpers/validators/params";
import { v4 as uuidv4 } from "uuid";
import { FirestoreError } from "../errors/firestore";
import {
    successResponse,
    errorResponse,
    handleApiError
} from "../helpers/apiResponse";
import subject from "../helpers/firestore/subject";
import attendance from "../helpers/firestore/attendance";

export const createAttendance = async (req, res) => {
    try {
        const userId = req.authId;
        const attendanceBody = req.body;
        const { question, location, facial } = attendanceBody;

        const attendanceId = uuidv4();
        attendanceBody.subjectId = req.params.subjectId;
        attendanceBody.classId = req.params.classId;
        attendanceBody.uid = req.params.userId;
        checkParams({
            question: {
                data: question,
                expectedType: "boolean"
            },
            location: {
                data: location,
                expectedType: "boolean"
            },
            facial: {
                data: facial,
                expectedType: "boolean"
            },
        });

        const attendanceDoc = await firestore.attendance.get(attendanceId);

        await firestore.subject.create(attendanceDoc, attendanceBody);

        return res.status(200).json(
            successResponse({
                msg: "Attendance created successfully",
                ...attendanceBody
            })
        );
    } catch (error) {
        return handleApiError(res, error);
    }
};

export const updateAttendance = async (req, res) => {
  try {
        const attendanceBody = req.body;
        const { question, location, facial } = attendanceBody;

        attendanceBody.subjectId = req.params.subjectId;
        attendanceBody.classId = req.params.classId;
        attendanceBody.uid = req.params.userId;
        const subjectId = req.params.subjectId;
        const classId = req.params.classId;
        const userId = req.params.userId;
        checkParams({
            question: {
                data: question,
                expectedType: "boolean"
            },
            location: {
                data: location,
                expectedType: "boolean"
            },
            facial: {
                data: facial,
                expectedType: "boolean"
            },
            subjectId: {
                data: subjectId,
                expectedType: "string"
            },
            classId: {
                data: classId,
                expectedType: "string"
            },
            userId: {
                data: userId,
                expectedType: "string"
            }
        });

        const allAttendanceDoc = await firestore.attendance.getBy(subjectId, classId, userId);
        if (allAttendanceDoc.size > 0) {
            const attendanceDoc = allAttendanceDoc.docs[0];
            await firestore.subject.update(attendanceDoc, attendanceBody);
            return res.status(200).json(
                successResponse({msg: "Attendance successfully updated"})
            );
        } else {
            throw new FirestoreError("missing", attendanceDoc.ref, "attendance");
        }
    } catch (error) {
        return handleApiError(res, error);
    }
};

export const getAttendance = async (req, res) => {
    try {
        const attendanceBody = req.body;

        const subjectId = req.params.subjectId;
        const classId = req.params.classId;
        const userId = req.params.userId;

        checkParams({
            subjectId: {
                data: subjectId,
                expectedType: "string"
            },
            classId: {
                data: classId,
                expectedType: "string"
            },
            userId: {
                data: userId,
                expectedType: "string"
            }
        });

        const allAttendanceDoc = await firestore.attendance.getBy(subjectId, classId, userId);
        if (allAttendanceDoc.size > 0) {
            const attendanceDoc = allAttendanceDoc.docs[0];
            return res.status(200).json(
                successResponse(attendanceDoc.data())
            );
        } else {
            throw new FirestoreError("missing", attendanceDoc.ref, "attendance");
        }
    } catch (error) {
        handleApiError(res, error);
    }
};

export const getAttendanceBySubClass = async (req, res) => {
    try {
        const attendanceBody = req.body;

        const subjectId = req.params.subjectId;
        const classId = req.params.classId;
        //const userId = req.params.userId;

        checkParams({
            subjectId: {
                data: subjectId,
                expectedType: "string"
            },
            classId: {
                data: classId,
                expectedType: "string"
            },
        });

        const allAttendanceDoc = await firestore.attendance.getBySubClass(subjectId, classId);

        var attendances = allAttendanceDoc.docs.map((doc)=>{
            return doc.data();
        })

        return res.status(200).json(
            successResponse(attendances)
        );
    } catch (error) {
        handleApiError(res, error);
    }
};

export const getAttendanceBySubStu = async (req, res) => {
    try {
        const attendanceBody = req.body;

        const subjectId = req.params.subjectId;
        //const classId = req.params.classId;
        const userId = req.params.userId;

        checkParams({
            subjectId: {
                data: subjectId,
                expectedType: "string"
            },
            userId: {
                data: userId,
                expectedType: "string"
            }
        });

        const allAttendanceDoc = await firestore.attendance.getBySubStu(subjectId, userId);

        var attendances = allAttendanceDoc.docs.map((doc)=>{
            return doc.data();
        })

        return res.status(200).json(
            successResponse(attendances)
        );
    } catch (error) {
        handleApiError(res, error);
    }
};

export const getStuAttendance = async (req, res) => {
    try {
        const attendanceBody = req.body;
        const userId = req.params.userId;

        checkParams({
            userId: {
                data: userId,
                expectedType: "string"
            }
        });

        const allAttendanceDoc = await firestore.attendance.getByStu(userId);

        var attendances = allAttendanceDoc.docs.map((doc)=>{
            return doc.data();
        })

        return res.status(200).json(
            successResponse(attendances)
        );
    } catch (error) {
        handleApiError(res, error);
    }
};

export const updateSpecific = async (req, res) => {
    try {
        const body = req.body;

        const attendanceType = req.params.attendanceType;
        const subjectId = req.params.subjectId;
        const classId = req.params.classId;
        const userId = req.params.userId;

        const allAttendanceDoc = await firestore.attendance.getBy(subjectId, classId, userId);
        if (allAttendanceDoc.size > 0) {
            const attendanceDoc = allAttendanceDoc.docs[0];
            const attendanceBody = attendanceDoc.data();
            attendanceBody[attendanceType] = body[attendanceType] == undefined ? true : attendanceBody[attendanceType];
            await firestore.subject.update(attendanceDoc, attendanceBody);
            return res.status(200).json(
                successResponse({msg: "Attendance successfully updated"})
            );
        } else {
            throw new FirestoreError("missing", attendanceDoc.ref, "attendance");
        }
    } catch (error) {
        return handleApiError(res, error);
    }
};