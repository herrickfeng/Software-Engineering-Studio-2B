import axios from "axios";
import { API_HOST } from ".";

export const getClassStudent = async (idToken, subjectId, classId) => {
	const res = await axios.get(
		`http://${API_HOST}/subject/${subjectId}/class/${classId}`,
		{
			headers: { Authorization: `Bearer ${idToken}` },
		}
	);
	return res;
};

export const getAllClassStudent = async (idToken, subjectId) => {
	const res = await axios.get(
		`http://${API_HOST}/subject/${subjectId}/class`,
		{
			headers: { Authorization: `Bearer ${idToken}` },
		}
	);
	return res;
};

export const getClassAdmin = async (idToken, subjectId, classId) => {
	const res = await axios.get(
		`http://${API_HOST}/admin/subject/${subjectId}/class/${classId}`,
		{
			headers: { Authorization: `Bearer ${idToken}` },
		}
	);
	return res;
};

export const getAllClassAdmin = async (idToken, subjectId) => {
	const res = await axios.get(
		`http://${API_HOST}/admin/subject/${subjectId}`,
		{
			headers: { Authorization: `Bearer ${idToken}` },
		}
	);
	return res;
};

export const createClassAdmin = async (idToken, subjectId, subjectData) => {
	const res = await axios.post(
		`http://${API_HOST}/admin/subject/${subjectId}/class/create`,
		subjectData,
		{
			headers: { Authorization: `Bearer ${idToken}` },
		}
	);
	return res;
};

export const updateClassAdmin = async (idToken, subjectId, classId, classData) => {
	const res = await axios.put(
		`http://${API_HOST}/admin/subject/${subjectId}/class/${classId}`,
		classData,
		{
			headers: { Authorization: `Bearer ${idToken}` },
		}
	);
	return res;
};

export const deleteClassAdmin = async (idToken, subjectId, classId) => {
	const res = await axios.delete(
		`http://${API_HOST}/admin/subject/${subjectId}/class/${classId}`,
		{
			headers: { Authorization: `Bearer ${idToken}` },
		}
	);
	return res;
};

export const generateClassAdmin = async (idToken, subjectId, data) => {
	const res = await axios.post(
		`http://${API_HOST}/admin/subject/${subjectId}/class/generate`,
		data,
		{
			headers: { Authorization: `Bearer ${idToken}` },
		}
	);
	return res;
};