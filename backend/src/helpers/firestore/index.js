import { db } from "../firebase-admin";
import { v4 as uuid } from "uuid";

const exampleCollectionName = "tasks";

const firestoreExample = {
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
  create: (exampleDoc, data) => {
    return exampleDoc.ref.set({ data: data });
  },
  update: (exampleDoc, data) => {
    return exampleDoc.ref.update({ data: data });
  }
};

const firestoreSubject = {
  create: (subjectDoc, data) => {
    return subjectDoc.ref.set({ data: data });
  },
}

export default {
  example: firestoreExample,
  subject :firestoreSubject,
};