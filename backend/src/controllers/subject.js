import firestore from "../helpers/firestore";
import { checkParams } from "../helpers/validators/params";
import { v4 as uuidv4 } from "uuid";
import { FirestoreError } from "../errors/firestore";
import {
    successResponse,
    handleApiError
} from "../helpers/apiResponse";

export const newSubject = async (req, res) => {
    try {
        const userId = req.authId;
        const subjectBody = req.body;
        const { subjectName, subjectCode } = subjectBody;

        // Generate a new uuid if no id was provided
        if (subjectBody.subjectId === undefined) {
            subjectBody.subjectId = uuidv4();
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

        // TODO: join subject
        // const allSubjectDoc = await firestore.subject.getAllWhere("students", userId);

        // var subjectsList = allSubjectDoc.docs.map((doc) => {
        //     return doc.data();
        // });

        return res.status(200).json(successResponse());
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
        const { subjectName, subjectCode } = subjectBody;
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