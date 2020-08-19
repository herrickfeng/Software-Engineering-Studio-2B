export const API_HOST = "localhost:4000";
import { createUser } from "./user";

export default {
    user: {
        create: createUser
    }
}