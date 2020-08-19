import axios from "axios";
import { API_HOST } from ".";

export const createSubjectAdmin = async (idToken, subjectData) => {
	const res = await axios.post(
		`http://${API_HOST}/admin/subject/create`,
		subjectData,
		{
			headers: { Authorization: `Bearer ${idToken}` },
		}
	);
	return res;
};

export const getSubjectAdmin = async (idToken, subjectId) => {
	const res = await axios.get(`http://${API_HOST}/admin/subject/${subjectId}`, {
		headers: { Authorization: `Bearer ${idToken}` },
	});
	return res;
};

export const updateSubjectAdmin = async (idToken, subjectId, subjectData) => {
	const res = await axios.put(
		`http://${API_HOST}/admin/subject/${subjectId}`,
		subjectData,
		{
			headers: { Authorization: `Bearer ${idToken}` },
		}
	);
	return res;
};

export const deleteSubjectAdmin = async (idToken, subjectId) => {
	const res = await axios.delete(
		`http://${API_HOST}/admin/subject/${subjectId}`,
		{
			headers: { Authorization: `Bearer ${idToken}` },
		}
	);
	return res;
};