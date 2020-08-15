import axios from "axios";
// import { auth } from "../firebase";

export const createUser = (data) => {
	// TODO: Pull the api url from env
	return axios.post("http://localhost:4000/user/create", data);
};

export const loginUser = async (email, password) => {
	// const user = (await auth().signInWithEmailAndPassword(email, password)).user;
	// const token = await user.getIdTokenResult();

	// return {
	// 	user: {
	// 		uid: user.uid,
	// 		displayName: user.displayName,
	// 		email: user.email,
	// 		claims: token.claims,
	// 		idToken: token.token,
	// 	},
	// };
};
