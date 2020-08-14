import { Router } from "express";
import { example, createExample, getExample, updateExample } from "../controllers/example";

const exampleRouter = Router();

exampleRouter.get("/get", example);
exampleRouter.post("/post", example);
exampleRouter.get("", example);
exampleRouter.post("", example);


exampleRouter.get("/create/:data", createExample);
exampleRouter.get("/:id/", getExample);
exampleRouter.get("/:id/update/:data", updateExample);

export default exampleRouter;
