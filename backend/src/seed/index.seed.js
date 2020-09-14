import request from "supertest";
import teachers from "./teachers.json"
import students from "./students.json"
import subjects from "./subjects.json"

function rnd(max) {
  return Math.floor(Math.random() * max)
}

describe("seed", () => {
  var server;
  var teacherId;

  beforeEach(() => {
    server = require("../index");
  });

  afterEach(() => {
    server.close();
  });

  it("create teacher", async function () {
    this.timeout(10000)
    teacherId = rnd(teachers.length);
    var teacherBody = teachers[teacherId]
    teacherBody = {
      ...teacherBody,
      test: "teacher"
    }
    const response = await request(server).post("/user/create").send(teacherBody);
  });

  it("login teachers", async function () {
    this.timeout(10000)
    var teacherBody = teachers[teacherId]
    const response = await request(server).post("/auth/login").send(teacherBody);
    teachers[teacherId] = { ...teacherBody, ...response.body.data }
  });

  it("create subjects", async function () {
    this.timeout(10000)
    var teacherBody = teachers[teacherId]
    for (var i = 0; i < subjects.length; i++) {
      var subjectBody = subjects[i];

      const response = await request(server).post("/admin/subject/create").set("Authorization", `Bearer ${teacherBody.idToken}`).send(subjectBody);
      subjects[i] = { ...subjectBody, ...response.body.data }
    }
  });

  it("create classes", async function () {
    this.timeout(10000)
    var teacherBody = teachers[teacherId]
    for (var i = 0; i < subjects.length; i++) {
      var subjectBody = subjects[i];
      for (var j = 0; j < rnd(10); j++) {
        const response = await request(server).post(`/admin/subject/${subjectBody.subjectId}/class/create`)
          .set("Authorization", `Bearer ${teacherBody.idToken}`)
          .send({
            className: `Week ${j+1}`,
            classCode: j,
            date: "2020-01-01",
            startTime: "10:00",
            endTime: "12:00"
          });
      }
    }
  });

  it("create and enroll students subject", async function () {
    this.timeout(60000)
    for (var i = 0; i < students.length; i++) {
      var studentBody = students[i];

      var response;
      response = await request(server).post("/user/create").send(studentBody);
      response = await request(server).post("/auth/login").send(studentBody);
      studentBody = { ...studentBody, ...response.body.data }

      for (var j = 0; j < subjects.length; j++) {
        var subjectBody = subjects[j]
        await request(server).post("/subject/join").set("Authorization", `Bearer ${studentBody.idToken}`).send(subjectBody);
      }
    }
  });
});