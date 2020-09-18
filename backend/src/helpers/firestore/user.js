import { db } from "../firebase-admin";
import { v4 as uuid } from "uuid";

const collectionName = "users";

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
  getAllIn: (arr) => {
    return db
      .collection(collectionName)
      .where('uid', 'in', arr)
      .get();
  },
  create: (doc, data) => {
    return doc.ref.set(data);
  },
  update: (doc, data) => {
    return doc.ref.update(data);
  },
  delete: (doc) => {
    return doc.ref.delete();
  }
};