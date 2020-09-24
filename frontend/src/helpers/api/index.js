import {
  createUser,
  getUser,
  getUserById,
  updateUser,
  deleteUser,
  resetPassword,
  uploadProfilePicture
} from "./user";
import {
  uploadImage,
  downloadImage
} from "./image";
import {
  getSubjectStudent,
  getAllSubjectStudent,
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
} from "./subject";
import {
  getClassStudent,
  getAllClassStudent,
  createClassAdmin,
  getClassAdmin,
  getAllClassAdmin,
  updateClassAdmin,
  deleteClassAdmin,
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
    download: downloadImage
  },
  subject: {
    get: getSubjectStudent,
    getAll: getAllSubjectStudent,
    join: joinSubject,
    class: {
      get: getClassStudent,
      getAll: getAllClassStudent,
    },
    attend: {
      create: createAttendance,
      get: getAttendance,
      getByCl: getAttendanceBySubClass,
      getBySub: getAttendanceBySubStu,
    }
  },
  admin: {
    subject: {
      create: createSubjectAdmin,
      getAll: getAllSubjectAdmin,
      get: getSubjectAdmin,
      update: updateSubjectAdmin,
      delete: deleteSubjectAdmin,
      class: {
        create: createClassAdmin,
        get: getClassAdmin,
        getAll: getAllClassAdmin,
        update: updateClassAdmin,
        delete: deleteClassAdmin,
      }
    }
  }
}