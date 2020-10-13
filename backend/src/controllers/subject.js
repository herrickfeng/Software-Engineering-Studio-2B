import firestore from "../helpers/firestore";
import admin from "../helpers/firebase-admin";
import { checkParams } from "../helpers/validators/params";
import { v4 as uuidv4 } from "uuid";
import { FirestoreError } from "../errors/firestore";
import {
    successResponse,
    errorResponse,
    handleApiError
} from "../helpers/apiResponse";
import moment from "moment"
import subject from "../helpers/firestore/subject";
import { store } from "../helpers/firebase-admin";

export const newSubject = async (req, res) => {
    try {
        const userId = req.authId;
        const subjectBody = req.body;
        const { subjectName, subjectCode } = subjectBody;

        // Generate a new uuid if no id was provided
        if (subjectBody.subjectId === undefined) {
            subjectBody.subjectId = uuidv4();
        }
        // Generate class array if no classes was provided
        if (subjectBody.classes === undefined) {
            subjectBody.classes = [];
        }

        // Add this user as a teacher
        subjectBody.teacher = [userId]
        subjectBody.students = []

        checkParams({
            subjectName: {
                data: subjectName,
                expectedType: "string"
            },
            subjectCode: {
                data: subjectCode,
                expectedType: "string"
            }
        });

        const subjectDoc = await firestore.subject.get(subjectBody.subjectId);

        await firestore.subject.create(subjectDoc, subjectBody);

        return res.status(200).json(
            successResponse({
                msg: "Subject created successfully",
                ...subjectBody
            })
        );
    } catch (error) {
        return handleApiError(res, error);
    }
};

export const getSubject = async (req, res) => {
    try {
        const id = req.params.id;
        const subjectBody = req.body;

        checkParams({
            id: {
                data: id,
                expectedType: "string"
            }
        });

        const subjectDoc = await firestore.subject.get(id);
        if (subjectDoc.exists === true) {
            return res.status(200).json(
                successResponse(subjectDoc.data())
            );
        } else {
            throw new FirestoreError("missing", subjectDoc.ref, "subject");
        }
    } catch (error) {
        handleApiError(res, error);
    }
};

export const joinSubject = async (req, res) => {
    try {
        const userId = req.authId;
        const { subjectCode } = req.body;

        const allSubjectDoc = await firestore.subject.getByCode(subjectCode);

        if (allSubjectDoc.size > 0) {
            const subjectDoc = allSubjectDoc.docs[0];
            var subjectBody = subjectDoc.data()

            if (subjectBody.students.includes(userId)) {
                return res.status(400).json(errorResponse(`Student already enrolled into ${subjectCode}`));
            }

            subjectBody.students.push(userId);
            await firestore.subject.update(subjectDoc, subjectBody);

            // Create attendance records for the classes
            const classes = subjectBody.classes;
            for (const classId of classes) {
                await firestore.attendance.createAuto(subjectBody.subjectId, classId, userId)
            }

            return res.status(200).json(successResponse({ msg: "Student successfully enrolled" }));
        } else {
            return res.status(400).json(errorResponse(`No such subject with code ${subjectCode}`, "subject-missing", "FirestoreError"));
        }
    } catch (error) {
        handleApiError(res, error);
    }
};

export const getAllStudentSubject = async (req, res) => {
    try {
        const userId = req.authId;

        const allSubjectDoc = await firestore.subject.getAllWhere("students", userId);

        var subjectsList = allSubjectDoc.docs.map((doc) => {
            return doc.data();
        });

        return res.status(200).json(successResponse(subjectsList));
    } catch (error) {
        handleApiError(res, error);
    }
};

export const getAllTeacherSubject = async (req, res) => {
    try {
        const userId = req.authId;

        const allSubjectDoc = await firestore.subject.getAllWhere("teacher", userId);

        var subjectsList = allSubjectDoc.docs.map((doc) => {
            return doc.data();
        });

        return res.status(200).json(successResponse(subjectsList));
    } catch (error) {
        handleApiError(res, error);
    }
};

export const updateSubject = async (req, res) => {
    try {
        const subjectBody = req.body;
        const { subjectName, subjectCode, classes } = subjectBody;
        const id = req.params.id;

        checkParams({
            subjectName: {
                data: subjectName,
                expectedType: "string"
            },
            subjectCode: {
                data: subjectCode,
                expectedType: "string"
            },
            id: {
                data: id,
                expectedType: "string"
            },

            classes: {
                data: classes,
                expectedType: "object"
            }

        });

        const subjectDoc = await firestore.subject.get(id);
        if (subjectDoc.exists === true) {
            await firestore.subject.update(subjectDoc, subjectBody);
            return res.status(200).json(successResponse({ msg: "Subject was successfully updated", id }));
        } else {
            throw new FirestoreError("missing", subjectDoc.ref, "subject");
        }
    } catch (error) {
        handleApiError(res, error);
    }
};

export const deleteSubject = async (req, res) => {
    try {
        const id = req.params.id;

        checkParams({
            id: {
                data: id,
                expectedType: "string"
            }
        });

        const subjectDoc = await firestore.subject.get(id);
        if (subjectDoc.exists === true) {
            await subjectDoc.ref.delete();
            return res.status(200).json(
                successResponse({
                    msg: "Subject successfully deleted"
                })
            );
        } else {
            throw new FirestoreError("missing", subjectDoc.ref, "subject");
        }
    } catch (error) {
        handleApiError(res, error);
    }
};

export const getAllStudents = async (req, res) => {
    try {
        const subjectId = req.params.subjectId;
        const subjectDoc = await firestore.subject.get(subjectId);
        if (subjectDoc.exists) {
            var subjectBody = subjectDoc.data();
            var studentsArr = subjectBody.students;
            var allUserDoc = await firestore.user.getAllInArray(studentsArr);

            var studentBodys = allUserDoc.docs.map((doc) => {
                return doc.data();
            });

            return res.status(200).json(successResponse(studentBodys));
        } else {
            throw new FirestoreError("missing", subjectDoc.ref, "subject");
        }
    } catch (error) {
        handleApiError(res, error);
    }
};

export const getAllTeacherSubjectAnalytics = async (req, res) => {
    try {
        const userId = req.authId;

        const allSubjectDoc = await firestore.subject.getAllWhere("teacher", userId);

        var subjectsDataList = await Promise.all(allSubjectDoc.docs.map(async (doc) => {
            var completed = 0;
            var awaiting = 0;

            const subjectBody = doc.data();

            for (var i = 0; i < subjectBody.classes.length; i++) {
                var classId = subjectBody.classes[i];
                const classDoc = await firestore.class.get(classId);
                if (classDoc.exists) {
                    const classData = classDoc.data();
                    const date = classData.date;
                    if (moment(date).isBefore(moment()))
                        completed++;
                    else
                        awaiting++;
                }
                else {
                    throw new FirestoreError("missing", classDoc.ref, "class");
                }
            }

            return { subjectId: subjectBody.subjectId, completed, awaiting }
        }));

        var subjectAttendanceCountMap = subjectsDataList.reduce((result, data, index, array) => {
            const subjectId = data.subjectId;
            result[subjectId] = data
            return result;
        }, {});

        return res.status(200).json(successResponse(subjectAttendanceCountMap));
    } catch (error) {
        handleApiError(res, error);
    }
};

export const getAllTeacherClassAnalytics = async (req, res) => {
    try {
        const attendanceBody = req.body;

        const subjectId = req.params.subjectId;

        checkParams({
            subjectId: {
                data: subjectId,
                expectedType: "string"
            }
        });

        const subjectDoc = await firestore.subject.get(subjectId);
        if (subjectDoc.exists === true) {
            const subjectBody = subjectDoc.data();
            const classIds = subjectBody.classes;
            var outp = []
            for (const classId of classIds) {
                const allAttendanceDoc = await firestore.attendance.getBySubClass(subjectId, classId);
                const classDoc = await firestore.class.get(classId);
                if (classDoc.exists === true) {
                    const classBody = classDoc.data();

                    var attendances = allAttendanceDoc.docs.map((doc) => {
                        var attendance = doc.data();
                        return attendance.facial + attendance.location + attendance.question + (attendance.signOff ? 1 : 0)
                    })

                    var occurrences = {
                        "0": 0,
                        "1": 0,
                        "2": 0,
                        "3": 0,
                        "4": 0,
                    };
                    for (var i = 0, j = attendances.length; i < j; i++) {
                        occurrences[attendances[i]] = (occurrences[attendances[i]] || 0) + 1;
                    }
                    outp.push({...classBody, ...occurrences});
                } else {
                    throw new FirestoreError("missing", classDoc.ref, "class");
                }
            }

            outp.sort((a, b) => {
                if (a.date == b.date)
                    return a.startTime > b.startTime ? 1 : -1
                return a.date > b.date ? 1 : -1
            })

            return res.status(200).json(
                successResponse(outp)
            );
        } else {
            throw new FirestoreError("missing", subjectDoc.ref, "subject");
        }
    } catch (error) {
        handleApiError(res, error);
    }
}; 