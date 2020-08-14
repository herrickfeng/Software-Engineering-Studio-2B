import { Router } from "express";
import { example } from "../controllers/test";

const exampleRouter = Router();

exampleRouter.get("/get", example);
exampleRouter.post("/post", example);
exampleRouter.get("", example);
exampleRouter.post("", example);

export default exampleRouter;
