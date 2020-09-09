import { Router } from "express";
import { getSubject, getAllStudentSubject, joinSubject } from "../controllers/subject";
import { checkToken } from "../middleware/auth";

const subjectRouter = Router().use(checkToken);

subjectRouter.get("/:id", getSubject);
subjectRouter.get("/", getAllStudentSubject);
subjectRouter.post("/join", joinSubject);

export default subjectRouter;