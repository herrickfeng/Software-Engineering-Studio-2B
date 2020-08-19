import axios from "axios";
import { API_HOST } from ".";

export const createUser = async (userData) => {
	const res = await axios.post(`http://${API_HOST}/user/create`, userData);
	return res;
};