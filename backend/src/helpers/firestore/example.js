import { db } from "../firebase-admin";
import { v4 as uuid } from "uuid";

const collectionName = "examples";

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
  create: (exampleDoc, data) => {
    return exampleDoc.ref.set({ data: data });
  },
  update: (exampleDoc, data) => {
    return exampleDoc.ref.update({ data: data });
  }
};