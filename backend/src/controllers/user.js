import firestore from "../helpers/firestore";
import admin from "../helpers/firebase-admin";
import { checkParams } from "../helpers/validators/params";
import { checkUserRoles } from "../helpers/validators/userRoles";
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

        const user = await admin.auth().createUser({ email, password, displayName })

        const defaultUserRoles = {
            "student": true,
            "teacher": false,
            "admin": false
        }
        await admin.auth().setCustomUserClaims(user.uid, defaultUserRoles);

        return res.status(200).json(
            successResponse(user)
        );
    } catch (error) {
        return handleApiError(res, error);
    }
};

export const getUser = async (req, res) => {
    try {
        var userId;
        if (req.authId) {
            userId = req.authId;
        } else {
            userId = req.params.userId;
        }

        const user = await admin.auth().getUser(userId);

        return res
            .status(200)
            .json(successResponse(user));
    } catch (error) {
        return handleApiError(res, error);
    }
}

export const getAllUsers = async (req, res) => {
    try {
        // Get details from firebase
        const userDetails = await admin.auth().listUsers();

        // Prepare a response
        return res.status(200).json(successResponse(userDetails));
    } catch (error) {
        return handleApiError(res, error);
    }
};

export const updateUser = async (req, res) => {
    try {
        // Parse details from the request
        const userId = req.params.userId;
        const updateUserBody = req.body;

        checkParams({
            userId: {
                data: userId,
                expectedType: "string"
            },
            updateUserBody: {
                data: updateUserBody,
                expectedType: "object"
            }
        });

        // Update current user details from firebase
        const updatedUserDetails = await admin
            .auth()
            .updateUser(userId, updateUserBody);

        // Prepare a response
        return res.status(200).json(successResponse(updatedUserDetails));
    } catch (error) {
        return handleApiError(res, error);
    }
};

export const deleteUser = async (req, res) => {
    try {
        // Parse request details
        const userId = req.params.userId;

        checkParams({
            userId: {
                data: userId,
                expectedType: "string"
            }
        });

        // Delete current user details from firebase
        await admin.auth().deleteUser(userId);

        // Prepare a response
        return res
            .status(200)
            .json(successResponse({ msg: "User was successfully deleted." }));
    } catch (error) {
        return handleApiError(res, error);
    }
};

export const getUserRoles = async (req, res) => {
    try {
        // Get details from the request
        const userId = req.params.userId;

        checkParams({
            userId: {
                data: userId,
                expectedType: "string"
            }
        });

        // Get user roles from firebase
        var userRoles = (await admin.auth().getUser(userId)).customClaims;

        // Prepare a response
        return res.status(200).json(successResponse(userRoles));
    } catch (error) {
        // The cases for this code should be via tha firebase error codes
        // https://firebase.google.com/docs/auth/admin/errors
        switch (error.code) {
            case "auth/user-not-found":
                return res
                    .status(500)
                    .json(
                        errorResponse(
                            "No user found for the provided userId.",
                            error.code,
                            undefined
                        )
                    );
            default:
                return handleApiError(res, error);
        }
    }
};

export const updateUserRoles = async (req, res) => {
    try {
        const userRoles = req.body;
        const { userId } = req.params;

        checkUserRoles(userRoles)

        await admin.auth().setCustomUserClaims(userId, userRoles);
        return res
            .status(200)
            .json(successResponse({ msg: "The action was completed successfully." }));
    } catch (error) {
        return handleApiError(res, error);
    }
};
