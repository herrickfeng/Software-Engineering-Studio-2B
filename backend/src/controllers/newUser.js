import firestore from "../helpers/firestore";
import admin from "../helpers/firebase-admin";
import { v4 as uuidv4 } from "uuid";

export const newUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //Check if fields are completed
        if (email.length === 0 || password.length === 0) {
            console.log("field bad")
            throw "Undefined fields"
        }

        const user = await admin.auth().createUser({ email, password })
        return res.status(200).json({
            result: "Success",
            msg: "User Created",
            user: user
        }
        );
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            result: "Failed",
            msg: "User not Created",
            error: error
        }
        );
    }
};