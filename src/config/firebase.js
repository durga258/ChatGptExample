// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_7oyrOgzpp6GdSUWr8xBIrhiMAH8Xbo4",
  authDomain: "fir-auth-4aadd.firebaseapp.com",
  projectId: "fir-auth-4aadd",
  storageBucket: "fir-auth-4aadd.appspot.com",
  messagingSenderId: "139504196932",
  appId: "1:139504196932:web:ce33cd8c7c98c10dd0cb11",
  measurementId: "G-DPQJ927R8S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)

export {auth}