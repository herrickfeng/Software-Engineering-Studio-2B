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
        const subjectBody = req.body;
        const { subjectName, subjectCode } = subjectBody;

        // Generate a new uuid if no id was provided
        if (subjectBody.subjectId === undefined) {
            subjectBody.subjectId = uuidv4();
        }

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

        const id = uuidv4();
        const subjectDoc = await firestore.subject.get(id);

        await firestore.subject.create(subjectDoc, subjectBody);

        return res.status(200).json(
            successResponse({
                msg: "Subject created successfully",
                subjectId: id
            })
        );
    } catch (error) {
        return handleApiError(res, error);
    }
};

export const getSubject = async (req, res) => {
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
            return res.status(200).json(
                successResponse({
                    subjectId: id,
                    subjectName: subjectDoc.data().subjectName,
                    subjectCode: subjectDoc.data().subjectCode
                })
            );
        } else {
            throw new FirestoreError("missing", subjectDoc.ref, "subject");
        }
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