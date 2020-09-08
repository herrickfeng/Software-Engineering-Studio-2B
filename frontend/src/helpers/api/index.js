import {
  createUser,
  getUser,
  getUserById,
  updateUser,
  deleteUser,
} from "./user";
import { uploadImage } from "./upload";
import {
  createSubjectAdmin,
  getAllSubjectAdmin,
  getSubjectAdmin,
  updateSubjectAdmin,
  deleteSubjectAdmin
} from "./subject";

export const API_HOST = "localhost:4000";

export default {
  user: {
    create: createUser,
    get: getUser,
    getById: getUserById,
    update: updateUser,
    delete: deleteUser,
    upload: uploadImage,
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