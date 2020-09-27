import request from "supertest";
import teachers from "./teachers.json"
import students from "./students.json"
import subjects from "./subjects.json"

function rnd(max) {
  return Math.floor(Math.random() * max)
}

function suffice(rate) {
  return Math.random() < rate;
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
      const response = await request(server).post(`/admin/subject/${subjectBody.subjectId}/class/generate`)
        .set("Authorization", `Bearer ${teacherBody.idToken}`)
        .send(subjectBody.seedInfo.classGenerate);
    }
  });

  it("get class ids", async function () {
    this.timeout(10000)
    var teacherBody = teachers[teacherId]
    for (var i = 0; i < subjects.length; i++) {
      var subjectBody = subjects[i];
      const response = await request(server).get(`/admin/subject/${subjectBody.subjectId}/`)
        .set("Authorization", `Bearer ${teacherBody.idToken}`)
        .send();
      subjects[i] = { ...subjectBody, classes: response.body.data.classes }
    }
  });

  it("create and enroll students subject with attendances", async function () {
    this.timeout(600000)
    for (var i = 0; i < students.length; i++) {
      var studentBody = students[i];

      var response;
      response = await request(server).post("/user/create").send(studentBody);
      response = await request(server).post("/auth/login").send(studentBody);
      studentBody = { ...studentBody, ...response.body.data }
      response = await request(server).put(`/user/${studentBody.userId}/image`).set("Authorization", `Bearer ${studentBody.idToken}`).attach("image", `./src/seed/images/${studentBody.displayName}.png`);


      for (var j = 0; j < subjects.length; j++) {
        if (suffice(studentBody.seedInfo.enrollmentRate)) {
          var subjectBody = subjects[j]
          await request(server).post("/subject/join").set("Authorization", `Bearer ${studentBody.idToken}`).send(subjectBody);
        }
      }
    }
  });
});