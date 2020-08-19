import firestore from "../helpers/firestore";
import admin from "../helpers/firebase-admin";
import { db } from "../helpers/firebase-admin";
import { v4 as uuidv4 } from "uuid";
import {
    successResponse,
    handleApiError
} from "../helpers/apiResponse";

export const newSubject = async (req, res) => {
    try {
        const { subjectName, subjectode } = req.body;
        const data = req.body;

        const id = uuidv4();
        const subjectDoc = await db.collection("subject").doc(id).get();
        
        await firestore.subject.create(subjectDoc, data);

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