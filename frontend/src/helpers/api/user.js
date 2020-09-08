import axios from "axios";
import { API_HOST } from ".";

export const createUser = async (userData) => {
	const res = await axios.post(`http://${API_HOST}/user/create`, userData);
	return res;
};

export const getUser = async (idToken) => {
	const res = await axios.get(
		`http://${API_HOST}/user/`,
		{
			headers: { Authorization: `Bearer ${idToken}` },
		}
	);
	return res;
};

export const getUserById = async (idToken, userId) => {
	const res = await axios.get(
		`http://${API_HOST}/user/${userId}`,
		{
			headers: { Authorization: `Bearer ${idToken}` },
		}
	);
	return res;
};

export const updateUser = async (idToken, userId, userData) => {
	const res = await axios.put(
		`http://${API_HOST}/user/${userId}`,
		userData,
		{
			headers: { Authorization: `Bearer ${idToken}` },
		}
	);
	return res;
};

export const deleteUser = async (idToken, userId) => {
	const res = await axios.delete(
		`http://${API_HOST}/user/${userId}`,
		{
			headers: { Authorization: `Bearer ${idToken}` },
		}
	);
	return res;
};

export const resetPassword = async (email) => {
	const res = await axios.post(
		`http://${API_HOST}/auth/reset`,
		{
			"email": email
		}
	);
	return res;
};