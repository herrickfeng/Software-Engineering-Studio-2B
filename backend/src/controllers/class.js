import firestore from "../helpers/firestore";
import { checkParams } from "../helpers/validators/params";
import { v4 as uuidv4 } from "uuid";
import { FirestoreError } from "../errors/firestore";
import {
    successResponse,
    handleApiError
} from "../helpers/apiResponse";

export const newClass = async (req, res) => {
    try {
        const userId = req.authId;
        const subjectId = req.params.subjectId;
        const classBody = req.body;
        const { className, classCode, classTime, classId } = classBody;

        // Generate a new uuid if no id was provided
        if (classBody.classId === undefined) {
            classBody.classId = uuidv4();
        }

        checkParams({
            className: {
                data: className,
                expectedType: "number"
            },
            classCode: {
                data: classCode,
                expectedType: "number"
            },
            classTime: {
                data: classTime,
                expectedType: "object"
            },
            subjectId: {
                data: subjectId,
                expectedType: "string"
            }
        });

        // TODO check if subjectDoc exists
        const subjectDoc = await firestore.subject.get(subjectId);
        if (subjectDoc.exists === true) {
            var subjectBody = subjectDoc.data();
            subjectBody.classes.push(classBody.classId);
            await firestore.subject.update(subjectDoc, subjectBody);

            const classDoc = await firestore.class.get(classBody.classId);

            await firestore.class.create(classDoc, classBody);
        }
        else {
            throw new FirestoreError("missing", subjectDoc.ref, "subject");
        }
        return res.status(200).json(
            successResponse({
                msg: "Class created successfully",
                classId: classBody.classId,
                data: classBody
            })
        );
    } catch (error) {
        return handleApiError(res, error);
    }
};

export const getClass = async (req, res) => {
    try {
        const id = req.params.classId;

        checkParams({
            id: {
                data: id,
                expectedType: "string"
            }
        });

        const classDoc = await firestore.class.get(id);
        if (classDoc.exists === true) {
            return res.status(200).json(
                successResponse(classDoc.data())
            );
        } else {
            throw new FirestoreError("missing", classDoc.ref, "class");
        }
    } catch (error) {
        handleApiError(res, error);
    }
};

export const updateClass = async (req, res) => {
    try {
        const classBody = req.body;
        const { className, classCode, classTime, classId } = classBody;
        const id = req.params.classId;

        checkParams({
            className: {
                data: className,
                expectedType: "int"
            },
            classCode: {
                data: classCode,
                expectedType: "int"
            },
            classTime: {
                data: classTime,
                expectedType: "object"
            }
        });

        const classDoc = await firestore.class.get(id);
        if (classDoc.exists === true) {
            await firestore.class.update(classDoc, classBody);
            return res.status(200).json(successResponse({ msg: "Class was successfully updated", id }));
        } else {
            throw new FirestoreError("missing", classDoc.ref, "class");
        }
    } catch (error) {
        handleApiError(res, error);
    }
};

export const deleteClass = async (req, res) => {
    try {
        const subjectId = req.params.subjectId;
        const classId = req.params.classId;

        checkParams({
            classId: {
                data: classId,
                expectedType: "string"
            },
            subjectId: {
                data: subjectId,
                expectedType: "string"
            }
        });

        const subjectDoc = await firestore.subject.get(subjectId);
        if (subjectDoc.exists === true) {
            var subjectBody = subjectDoc.data();
            subjectBody.classes = subjectBody.classes.filter(id => id !== classId);
            await firestore.subject.update(subjectDoc, subjectBody);

            const classDoc = await firestore.class.get(classId);
            if (classDoc.exists === true) {

                firestore.class.delete(classDoc);
                return res.status(200).json(
                    successResponse({
                        msg: "Class successfully deleted"
                    })
                );
            } else {
                throw new FirestoreError("missing", classDoc.ref, "class");
            }
        } else {
            throw new FirestoreError("missing", subjectDoc.ref, "subject");
        }
    } catch (error) {
        handleApiError(res, error);
    }
};

export const getAllClass = async (req, res) => {
    try {
        const subjectId = req.params.subjectId;
        const subjectDoc = await firestore.subject.get(subjectId);
        if (subjectDoc.exists) {
            var subjectBody = subjectDoc.data();
            //iterate through classes array within subject
            var classBodys = [];
            for (var i = 0; i < subjectBody.classes.length; i++) {
                var classId = subjectBody.classes[i];
                const classDoc = await firestore.class.get(classId);
                if (classDoc.exists) {
                    classBodys.push(classDoc.data());
                }
                else {
                    throw new FirestoreError("missing", classDoc.ref, "class");
                }
            }

            return res.status(200).json(successResponse(classBodys));
        }
        else {
            throw new FirestoreError("missing", subjectDoc.ref, "subject");
        }
    } catch (error) {
        handleApiError(res, error);
    }
};

