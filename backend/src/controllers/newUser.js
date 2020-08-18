import firestore from "../helpers/firestore";
import admin from "../helpers/firebase-admin";
import { v4 as uuidv4 } from "uuid";
import {
    successResponse,
    handleApiError
} from "../helpers/apiResponse";

export const newUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //Check if fields are completed
        if (email.length === 0 || password.length === 0) {
            throw "Undefined fields"
        }

        const user = await admin.auth().createUser({ email, password })
        return res.status(200).json(
            successResponse(user)
        );
    } catch (error) {
        return handleApiError(res, error);
    }
};