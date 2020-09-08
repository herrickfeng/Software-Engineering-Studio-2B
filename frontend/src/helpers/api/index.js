import {
  createUser,
  getUser,
  getUserById,
  updateUser,
  deleteUser,
  resetPassword
} from "./user";
import { uploadImage } from "./upload";
import {
  getSubjectStudent,
  getAllSubjectStudent,
  joinSubject,
  createSubjectAdmin,
  getAllSubjectAdmin,
  getSubjectAdmin,
  updateSubjectAdmin,
  deleteSubjectAdmin
} from "./subject";

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
    upload: uploadImage,
  },
  subject: {
    get: getSubjectStudent,
    getAll: getAllSubjectStudent,
    join: joinSubject,
  },
  admin: {
    subject: {
      create: createSubjectAdmin,
      getAll: getAllSubjectAdmin,
      get: getSubjectAdmin,
      update: updateSubjectAdmin,
      delete: deleteSubjectAdmin
    }
  }
}