import { db } from "../firebase-admin";
import { v4 as uuid } from "uuid";

const collectionName = "classes";

export default {
  get: (id) => {
    return db.collection(collectionName)
      .doc(id)
      .get();
  },
  getAll: (id) => {
    return db
      .collection(collectionName)
      .get();
  },
  getAllWhereIn: (where, ids) => {
    return db
      .collection(collectionName)
      .where(where, "in", ids)
      .get();
  },
  create: (classDoc, data) => {
    return classDoc.ref.set(data);
  },
  update: (classDoc, data) => {
    return classDoc.ref.update(data);
  },
  delete: (classDoc) => {
    return classDoc.ref.delete();
  }
}
