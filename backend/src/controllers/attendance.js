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

const mapStudentInSubject = async (subjectId) => {
    const subjectDoc = await firestore.subject.get(subjectId);
    if (subjectDoc.exists) {
        var subjectBody = subjectDoc.data();
        var studentsArr = subjectBody.students;
        var allUserDoc = await firestore.user.getAllInArray(studentsArr);

        var studentBodys = allUserDoc.docs.map((doc) => {
            return doc.data();
        });

        var studentBodys = allUserDoc.docs.reduce((result, doc, index, array) => {
            const uid = doc.data().uid;
            result[uid] = doc.data();
            return result;
        }, {});

        return studentBodys;

    } else {
        throw new FirestoreError("missing", subjectDoc.ref, "subject");
    }
}

const mapSubjects = async () => {
    const allSubjectDoc = await firestore.subject.getAll();

    var subjectBodys = allSubjectDoc.docs.reduce((result, doc, index, array) => {
        const subjectId = doc.data().subjectId;
        result[subjectId] = doc.data();
        return result;
    }, {});

    return subjectBodys;
}

const mapClasses = async () => {
    const allClassDoc = await firestore.class.getAll();

    var classBodys = allClassDoc.docs.reduce((result, doc, index, array) => {
        const classId = doc.data().classId;
        result[classId] = doc.data();
        return result;
    }, {});

    return classBodys;
}

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

        await firestore.attendance.create(attendanceDoc, attendanceBody);

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
                successResponse({ msg: "Attendance successfully updated" })
            );
        } else {
            throw new FirestoreError("missing", attendanceDoc.ref, "attendance");
        }
    } catch (error) {
        return handleApiError(res, error);
    }
};

function inside(point, vs) {
    // ray-casting algorithm based on
    // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html/pnpoly.html

    var x = point.latitude, y = point.longitude;

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i].lat, yi = vs[i].lng;
        var xj = vs[j].lat, yj = vs[j].lng;

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
};

export const verifyLocation = async (req, res) => {
    try {
        const { latitude, longitude } = req.body;
        const subjectId = req.params.subjectId;
        const classId = req.params.classId;
        const userId = req.params.userId;
        checkParams({
            latitude: {
                data: latitude,
                expectedType: "number"
            },
            longitude: {
                data: longitude,
                expectedType: "number"
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

        var polygon;
        const subjectDoc = await firestore.subject.get(subjectId);
        if (subjectDoc.exists) {
            var subjectBody = subjectDoc.data();
            if (subjectBody.path){
                polygon = subjectBody.path;
            } else {
                return res.status(200).json(
                    successResponse({ msg: "Your teacher has not set a location for this class or subject." })
                );
            }
        } else {
            throw new FirestoreError("missing", subjectDoc.ref, "subject");
        }

        if (inside({ latitude, longitude }, polygon)){
            const allAttendanceDoc = await firestore.attendance.getBy(subjectId, classId, userId);
            if (allAttendanceDoc.size > 0) {
                const attendanceDoc = allAttendanceDoc.docs[0];
                var attendanceBody = attendanceDoc.data();
                attendanceBody.location = true;
                await firestore.subject.update(attendanceDoc, attendanceBody );
                return res.status(200).json(
                    successResponse({ msg: "Verified location within region. Location authentication successfully marked." })
                );
            } else {
                throw new FirestoreError("missing", attendanceDoc.ref, "attendance");
            }
        }
        else {
            return res.status(200).json(
                successResponse({ msg: "Location not within region. Please move to the region." })
            );
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

        const studentMap = await mapStudentInSubject(subjectId)

        const allAttendanceDoc = await firestore.attendance.getBySubClass(subjectId, classId);

        var attendances = allAttendanceDoc.docs.map((doc) => {
            return { ...doc.data(), student: studentMap[doc.data().uid] };
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

        var attendances = allAttendanceDoc.docs.map((doc) => {
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

        const subjectMap = await mapSubjects();
        const classMap = await mapClasses();
        var attendances = allAttendanceDoc.docs.map((doc) => {
            return {
                ...doc.data(),
                subject: subjectMap[doc.data().subjectId],
                class: classMap[doc.data().classId]
            };
        })

        attendances.sort((a, b) => {
            if (a.class.date == b.class.date)
                return a.class.startTime > b.class.startTime ? 1 : -1
            return a.class.date > b.class.date ? 1 : -1
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
                successResponse({ msg: "Attendance successfully updated" })
            );
        } else {
            throw new FirestoreError("missing", attendanceDoc.ref, "attendance");
        }
    } catch (error) {
        return handleApiError(res, error);
    }
};