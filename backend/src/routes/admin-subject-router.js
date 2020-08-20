import { Router } from "express";
import { newSubject, getSubject, updateSubject, deleteSubject } from "../controllers/subject";
import { checkToken } from "../middleware/auth";

const adminSubjectRouter = Router()//.use(/* checkToken */);

adminSubjectRouter.post("/create", newSubject);
adminSubjectRouter.get("/:id", getSubject);
adminSubjectRouter.put("/:id", updateSubject);
adminSubjectRouter.delete("/:id", deleteSubject);

export default adminSubjectRouter;