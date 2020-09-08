import { createUser } from "./user";
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