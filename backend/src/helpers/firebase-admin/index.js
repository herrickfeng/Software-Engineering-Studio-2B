import admin from "firebase-admin";
import env from "../env";
const serviceAccount = require(env.firebase.serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: env.firebase.dbUrl,
  storageBucket: env.firebase.sUrl
});

export const db = admin.firestore();

export const store = admin.storage().bucket();

export default admin;
