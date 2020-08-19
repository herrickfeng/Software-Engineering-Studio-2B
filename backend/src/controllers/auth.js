import { successResponse, handleApiError } from "../helpers/apiResponse";
import { checkParams } from "../helpers/validators/params";
import axios from "axios";
import env from "../helpers/env";

const firebaseLoginConfig = {
  endpoint:
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword",
  webApiKey: env.firebase.webApiKey
};

export const login = async (req, res) => {
  try {
    // Parse details from request
    const { email, password } = req.body;

    checkParams({
      email: {
        data: email,
        expectedType: "string"
      },
      password: {
        data: password,
        expectedType: "string"
      }
    })

    // Use a google firebase endpoint to login via email and password
    const response = await axios.post(
      `${firebaseLoginConfig.endpoint}?key=${firebaseLoginConfig.webApiKey}`,
      {
        email,
        password,
        returnSecureToken: true
      }
    );

    // Return success with login details
    return res.status(200).json(
      successResponse({
        msg: "User logged in successfully.",
        userId: response.data.localId,
        idToken: response.data.idToken
      })
    );
  } catch (error) {
    return handleApiError(res, error);
  }
};
