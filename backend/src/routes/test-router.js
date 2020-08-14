import { Router } from "express";
import { test } from "../controllers/test";

const testRouter = Router();

testRouter.get("/get", test);
testRouter.post("/post", test);

export default testRouter;
