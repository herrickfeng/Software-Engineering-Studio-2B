import express from "express";
import bodyParser from "body-parser";
import exampleRouter from "./routes/example-router";
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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use("/example", exampleRouter);

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