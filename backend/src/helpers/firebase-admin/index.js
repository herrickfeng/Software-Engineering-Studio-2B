import admin from "firebase-admin";
import "firebase/firebase-storage";
import env from "../env";
const serviceAccount = require(env.firebase.serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: env.firebase.dbUrl,
  storageURL: env.firebase.sUrl
});

export const db = admin.firestore();

export const store = firebase.storage;

export default admin;
