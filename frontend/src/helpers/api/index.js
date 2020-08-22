import { createUser } from "./user";
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
        create: createUser
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