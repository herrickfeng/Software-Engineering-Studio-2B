import { db } from "../firebase-admin";
import { v4 as uuid } from "uuid";

const exampleCollectionName = "subjects";

export default {
  get: (id) => {
    return db
      .collection(exampleCollectionName)
      .doc(id)
      .get();
  },
  getAll: () => {
    return db
      .collection(exampleCollectionName)
      .get();
  },
  getAllWhere: (where, userId) => {
    return db
      .collection("subjects")
      .where(where, "array-contains", userId)
      .get();
  },
  create: (subjectDoc, data) => {
    return subjectDoc.ref.set(data);
  },
  update: (subjectDoc, data) => {
    return subjectDoc.ref.update(data);
  },
  // TODO : DELETE Oor REMOVE
  delete: (subjectDoc) => {
    return subjectDoc.ref.delete();
  }
};