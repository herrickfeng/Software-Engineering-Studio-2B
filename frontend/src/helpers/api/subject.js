import axios from "axios";
import { API_HOST } from ".";

export const getSubjectStudent = async (idToken, subjectId) => {
	const res = await axios.get(
		`http://${API_HOST}/subject/${subjectId}`,
		{
			headers: { Authorization: `Bearer ${idToken}` },
		}
	);
	return res;
};

export const getAllSubjectStudent = async (idToken) => {
	const res = await axios.get(
		`http://${API_HOST}/subject`,
		{
			headers: { Authorization: `Bearer ${idToken}` },
		}
	);
	return res;
};

export const getStudentsFromSubject = async (idToken, subjectId) => {
	return await axios.get(
		`http://${API_HOST}/subject/${subjectId}/students`,
		{
			headers: { Authorization: `Bearer ${idToken}` },
		}
	);
};

export const joinSubject = async (idToken, subjectCode) => {
	const res = await axios.post(
		`http://${API_HOST}/subject/join`,
		{
			subjectCode: subjectCode
		},
		{
			headers: { Authorization: `Bearer ${idToken}` },
		}
	);
	return res;
};


export const createAttendance = async (idToken, subjectId, classId, userId) => {
  const res = await axios.post(
    `http://${API_HOST}/subject/${subjectId}/class/${classId}/user/${userId}/attendance`,
    {
      headers: { Authorization: `Bearer ${idToken}` },
    }
  );
  return res;
}

export const getAttendance = async (idToken, subjectId, classId, userId) => {
  const res = await axios.get(
    `http://${API_HOST}/subject/${subjectId}/class/${classId}/user/${userId}/attendance`,
    {
      headers: { Authorization: `Bearer ${idToken}` },
    }
  );
  return res;
}

export const getAttendanceBySubClass = async (idToken, subjectId, classId) => {
  const res = await axios.get(
    `http://${API_HOST}/subject/${subjectId}/class/${classId}/attendance`,
    {
      headers: { Authorization: `Bearer ${idToken}` },
    }
  );
  return res;
}

export const getAttendanceBySubStu = async (idToken, subjectId, userId) => {
  const res = await axios.get(
    `http://${API_HOST}/subject/${subjectId}/user/${userId}/attendance`,
    {
      headers: { Authorization: `Bearer ${idToken}` },
    }
  );
  return res;
}

export const updateAttendance = async (idToken, subjectId, classId, userId, toSend) => {
  const res = await axios.put(
    `http://${API_HOST}/subject/${subjectId}/class/${classId}/user/${userId}/attendance`,
    toSend,
    {
      headers: { Authorization: `Bearer ${idToken}` },
    }
  );
  return res;
}

export const updateAttendanceSpecific = async (idToken, subjectId, classId, userId, attendanceType) => {
  const res = await axios.put(
    `http://${API_HOST}/subject/${subjectId}/class/${classId}/user/${userId}/attendance/${attendanceType}`,
    {},
    {
      headers: { Authorization: `Bearer ${idToken}` },
    }
  );
  return res;
}


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

export const getAllSubjectAdmin = async (idToken) => {
	const res = await axios.get(`http://${API_HOST}/admin/subject/`, {
		headers: { Authorization: `Bearer ${idToken}` },
	});
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

export const getSubjectAnalyticsAdmin = async (idToken) => {
	const res = await axios.get(`http://${API_HOST}/admin/subject/analytics`, {
		headers: { Authorization: `Bearer ${idToken}` },
	});
	return res;
};