import { Router } from "express";
import { checkToken } from "../middleware/auth";
import { checkTeacherRole, checkAdminRole } from "../middleware/roles";
import {
  getUser,
  getAllUsers,
  getUserRoles,
  updateUserRoles,
  deleteUser
} from "../controllers/user";

const userAdminRouter = Router().use(checkToken, checkTeacherRole);

userAdminRouter.get("/", getAllUsers);
userAdminRouter.get("/:userId", getUser);
userAdminRouter.get("/:userId/roles", getUserRoles);
userAdminRouter.post("/:userId/roles", updateUserRoles);
userAdminRouter.delete("/:userId", deleteUser);

export default userAdminRouter;
