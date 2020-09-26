import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firebase-storage";

// TODO: This shouldnt be an issue to be public but it might be a good idea to move this to an untracked file
// https://javebratt.com/hide-firebase-api/
var firebaseConfig = {
  apiKey: "AIzaSyD0C9l7eqr7tEz9mwHDHbpRsZ2I8nSPOqY",
  authDomain: "face-attendance-thingy-2.firebaseapp.com",
  databaseURL: "https://face-attendance-thingy-2.firebaseio.com",
  projectId: "face-attendance-thingy-2",
  storageBucket: "face-attendance-thingy-2.appspot.com",
  messagingSenderId: "282045804705",
  appId: "1:282045804705:web:d148b0d79ddde26e7340e0",
  measurementId: "G-1HYBPWQ049"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth;

export const store = firebase.storage;

export default firebase;
