import express from "express";
import bodyParser from "body-parser";
import exampleRouter from "./routes/example-router";
import adminSubjectRouter from "./routes/admin-subject-router";
import subjectRouter from "./routes/subject-router";
import authRouter from "./routes/auth-router";
import userRouter from "./routes/user-router";
import adminUserRouter from "./routes/admin-user-router";
import uploadRouter from "./routes/upload-router";

import cors from "cors";
import env from "./helpers/env";
const morgan = require("morgan");

const app = express();
const config = {
  port: env.port,
  stage: env.stage
};

// Middleware
app.use(morgan("tiny"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.raw({ limit: '10mb', type: 'multipart/form-data' }));
app.use(bodyParser.json({ limit: '10mb', extended: true }));
//app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
//app.use(bodyParser.json());


// Routes
app.use("/example", exampleRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/subject", subjectRouter)
app.use("/admin/subject", adminSubjectRouter)
app.use("/admin/user", adminUserRouter)
app.use("/image", uploadRouter)


// Default route
app.get("/", (req, res) => {
  res.json({
    stage: config.stage,
    msg: "FAST! Face Attendance System Thing - REST API"
  });
});

// Startup complete
const server = app.listen(config.port, () => {
  console.log(`Server is now running at:  http://localhost:${config.port}`);
});

module.exports = server;