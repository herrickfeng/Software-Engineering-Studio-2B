import firestore from "../helpers/firestore";
import admin, { store } from "../helpers/firebase-admin";
import { checkParams } from "../helpers/validators/params";
import { checkUserRoles } from "../helpers/validators/userRoles";
import { v4 as uuidv4 } from "uuid";
import {
    successResponse,
    errorResponse,
    handleApiError
} from "../helpers/apiResponse";
import * as faceapi from 'face-api.js';
import * as canvas from 'canvas';
const { Canvas, Image, ImageData } = canvas
faceapi.nets.ssdMobilenetv1.loadFromDisk('./models')
faceapi.nets.tinyFaceDetector.loadFromDisk('./models')
faceapi.nets.faceLandmark68Net.loadFromDisk('./models')
faceapi.nets.faceRecognitionNet.loadFromDisk('./models')
faceapi.env.monkeyPatch({ Canvas, Image, ImageData })

export const newUser = async (req, res) => {
    try {
        const { email, password, displayName, test, studentId } = req.body;

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

        const userDoc = await firestore.user.get(user.uid);
        var userBody = { email, displayName, studentId: studentId ? studentId : "", uid: user.uid }
        await firestore.user.create(userDoc, userBody);

        const defaultUserRoles = {
            "student": true,
            "teacher": test === "teacher" ? true : false,
            "admin": test === "admin" ? true : false
        }
        await admin.auth().setCustomUserClaims(user.uid, defaultUserRoles);

        return res.status(200).json(
            successResponse({ ...userBody, userDetails: user })
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

        // const user = await admin.auth().getUser(userId);
        const user = (await firestore.user.get(userId)).data()

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

        const userDoc = await firestore.user.get(userId);
        if (userDoc.exists === true) {
            await firestore.user.update(userDoc, updateUserBody);
            return res.status(200).json(successResponse({ msg: "User was successfully updated", updatedUserDetails }));
        } else {
            throw new FirestoreError("missing", userDoc.ref, "user");
        }
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

        const userDoc = await firestore.user.get(userId);
        if (userDoc.exists === true) {
            await userDoc.ref.delete();
            return res.status(200).json(
                successResponse({
                    msg: "User successfully deleted"
                })
            );
        } else {
            throw new FirestoreError("missing", subjectDoc.ref, "subject");
        }
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

export const uploadProfilePicture = async (req, res) => {
    try {
        const { userId } = req.params;
        const uuid = uuidv4();

        const img = await canvas.loadImage(req.file.buffer);
        const detections = await faceapi.detectSingleFace(img, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor()
        if (!detections) {
            return res.status(400).json(
                errorResponse(
                    "No face found"
                )
            );
        }

        if (req.file.mimetype === "image/jpeg" ||
            req.file.mimetype === "image/bmp" ||
            req.file.mimetype === "image/png" ||
            req.file.mimetype === "image/tiff" ||
            req.file.mimetype === "image/webp") {

            const userDoc = await firestore.user.get(userId);
            if (userDoc.exists === true) {
                var userBody = userDoc.data();

                const imageName = `${uuid}.${req.file.mimetype.split("/")[1]}`;
                let bucketFile = store.file(imageName);

                const metadata = {
                    metadata: {
                        contentType: req.file.mimetype,
                        firebaseStorageDownloadTokens: uuid,
                    }
                };

                await bucketFile.save(req.file.buffer)
                await bucketFile.setMetadata(metadata);

                const imageURL = await bucketFile.getSignedUrl({
                    action: 'read',
                    expires: '01-01-2025'
                });
                userBody.image = imageURL[0];
                userBody.imageId = uuid;
                userBody.imageName = imageName;
                userBody.descriptor = { ...detections.descriptor };

                // console.log(new Float32Array(detections.descriptor))

                await firestore.user.update(userDoc, userBody);

                return res.status(200).json(successResponse({ msg: "User was successfully updated", userBody }));
            } else {
                throw new FirestoreError("missing", userDoc.ref, "user");
            }
        } else {
            return res.status(422).json(
                errorResponse(
                    'Incorrect file type uploaded', 422
                )
            );
        }
    } catch (error) {
        return handleApiError(res, error);
    }
}