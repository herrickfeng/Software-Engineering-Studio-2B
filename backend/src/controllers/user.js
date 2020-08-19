import firestore from "../helpers/firestore";
import admin from "../helpers/firebase-admin";
import { checkParams } from "../helpers/validators/params";
import { v4 as uuidv4 } from "uuid";
import {
    successResponse,
    handleApiError
} from "../helpers/apiResponse";

export const newUser = async (req, res) => {
    try {
        const { email, password, displayName } = req.body;

        //Check if fields are completed
        checkParams({
            email: {
                data: email,
                expectedType: "string"
            },
            password: {
                data: password,
                expectedType: "string"
            },
            displayName: {
                data: displayName,
                expectedType: "string"
            }
        });

        const user = await admin.auth().createUser({ email, password })
        return res.status(200).json(
            successResponse(user)
        );
    } catch (error) {
        return handleApiError(res, error);
    }
};