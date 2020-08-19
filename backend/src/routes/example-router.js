import { Router } from "express";
import { example, createExample, getExample, updateExample } from "../controllers/example";

const exampleRouter = Router();


exampleRouter.post("/create/", createExample);
exampleRouter.get("/:id/", getExample);
exampleRouter.post("/:id/", updateExample);

export default exampleRouter;
