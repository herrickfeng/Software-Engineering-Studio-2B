import { db } from "../firebase-admin";
import { v4 as uuid } from "uuid";

const collectionName = "attendance";

export default {
  get: (id) => {
    return db
    .collection(collectionName)
    .doc(id)
    .get();
  },
  create: (attendanceDoc, data) => {
    return attendanceDoc.ref.set(data);
  },
  update: (attendanceDoc, data) => {
    return attendanceDoc.ref.update(data);
  },
  delete: (attendanceDoc) => {
    return attendanceDoc.ref.delete();
  },
  getBy: (subjectId, classId, userId) => {
    return db
      .collection(collectionName)
      .where("subjectId", "==", subjectId)
      .where("classId", "==", classId)
      .where("uid", "==", userId)
      .get();
  },
  getBySubClass: (subjectId, classId) => {
    return db
      .collection(collectionName)
      .where("subjectId", "==", subjectId)
      .where("classId", "==", classId)
      .get();
  },
  getBySubStu: (subjectId, userId) => {
    return db
      .collection(collectionName)
      .where("subjectId", "==", subjectId)
      .where("uid", "==", userId)
      .get();
  },
  getByStu: (userId) => {
    return db
      .collection(collectionName)
      .where("uid", "==", userId)
      .get();
  },
}
