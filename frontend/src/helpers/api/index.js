import {
  createUser,
  getUser,
  getUserById,
  updateUser,
  deleteUser,
  resetPassword,
  uploadProfilePicture,
  getStuAttendance,
} from "./user";
import {
  uploadImage,
  downloadImage
} from "./image";
import {
  getSubjectStudent,
  getAllSubjectStudent,
  getStudentsFromSubject,
  joinSubject,
  createSubjectAdmin,
  getAllSubjectAdmin,
  getSubjectAdmin,
  updateSubjectAdmin,
  deleteSubjectAdmin,
  createAttendance,
  getAttendance,
  getAttendanceBySubClass,
  getAttendanceBySubStu,
  verifyLocation,
  verifyQuestions,
  verifyTeacher,
  updateAttendance,
  updateAttendanceSpecific,
  getSubjectAnalyticsAdmin,
} from "./subject";
import {
  getClassStudent,
  getAllClassStudent,
  createClassAdmin,
  getClassAdmin,
  getAllClassAdmin,
  updateClassAdmin,
  deleteClassAdmin,
  generateClassAdmin,
  getClassAnalyticsAdmin,
} from "./class";

export const API_HOST = "localhost:4000";

export default {
  auth: {
    reset: resetPassword
  },
  user: {
    create: createUser,
    get: getUser,
    getById: getUserById,
    update: updateUser,
    delete: deleteUser,
    upload: uploadProfilePicture,
    download: downloadImage,
    attend: getStuAttendance,
  },
  subject: {
    get: getSubjectStudent,
    getAll: getAllSubjectStudent,
    getStudents: getStudentsFromSubject,
    join: joinSubject,
    class: {
      get: getClassStudent,
      getAll: getAllClassStudent,
    },
    attend: {
      create: createAttendance,
      get: getAttendance,
      location: verifyLocation,
      questions: verifyQuestions,
      teacher: verifyTeacher,
      getByCl: getAttendanceBySubClass,
      getBySub: getAttendanceBySubStu,
      update: updateAttendance,
      updateSpec: updateAttendanceSpecific
    }
  },
  admin: {
    subject: {
      create: createSubjectAdmin,
      getAll: getAllSubjectAdmin,
      get: getSubjectAdmin,
      update: updateSubjectAdmin,
      delete: deleteSubjectAdmin,
      analytics: getSubjectAnalyticsAdmin,
      class: {
        create: createClassAdmin,
        get: getClassAdmin,
        getAll: getAllClassAdmin,
        update: updateClassAdmin,
        delete: deleteClassAdmin,
        generate: generateClassAdmin,
        analytics: getClassAnalyticsAdmin,
      }
    }
  }
}