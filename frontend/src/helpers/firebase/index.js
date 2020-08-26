import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firebase-storage"

// TODO: This shouldnt be an issue to be public but it might be a good idea to move this to an untracked file
// https://javebratt.com/hide-firebase-api/
var firebaseConfig = {
	apiKey: "AIzaSyD4aPBGNRBXrpiZE8gEk3N3FcdQJMXPDvo",
	authDomain: "face-attendance-system-thing.firebaseapp.com",
	databaseURL: "https://face-attendance-system-thing.firebaseio.com",
	projectId: "face-attendance-system-thing",
	storageBucket: "face-attendance-system-thing.appspot.com",
	messagingSenderId: "618672004676",
	appId: "1:618672004676:web:bd4cb9a2711c60b7656611",
	measurementId: "G-N35TZ6EB58"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth;

export const store = firebase.storage;

export default firebase;
