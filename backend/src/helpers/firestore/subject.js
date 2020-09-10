import { db } from "../firebase-admin";
import { v4 as uuid } from "uuid";

const collectionName = "subjects";

export default {
  get: (id) => {
    return db
      .collection(collectionName)
      .doc(id)
      .get();
  },
  getAll: () => {
    return db
      .collection(collectionName)
      .get();
  },
  getAllWhere: (where, userId) => {
    return db
      .collection(collectionName)
      .where(where, "array-contains", userId)
      .get();
  },
  getByCode: (code) => {
    return db
      .collection(collectionName)
      .where("subjectCode", "==", code)
      .get();
  },
  create: (subjectDoc, data) => {
    return subjectDoc.ref.set(data);
  },
  update: (subjectDoc, data) => {
    return subjectDoc.ref.update(data);
  },
  delete: (subjectDoc) => {
    return subjectDoc.ref.delete();
  }
};