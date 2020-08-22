import { createUser } from "./user";
import {
    createSubjectAdmin,
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
            get: getSubjectAdmin,
            update: updateSubjectAdmin,
            delete: deleteSubjectAdmin
        }
    }
}