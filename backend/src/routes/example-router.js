import { Router } from "express";
import { example, createExample, getExample, updateExample } from "../controllers/example";

const exampleRouter = Router();


exampleRouter.get("/get", example);
exampleRouter.post("/post", example);
exampleRouter.get("", example);
exampleRouter.post("", example);

exampleRouter.post("/:id/update/", updateExample);


exampleRouter.post("/create/", createExample);
exampleRouter.get("/:id/", getExample);
exampleRouter.post("/:id/", updateExample);


export default exampleRouter;
