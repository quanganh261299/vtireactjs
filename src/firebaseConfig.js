// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBvDTlLTvE7TyERxSMLcJhU5C2baUWTJE0",
    authDomain: "vtireactjs-80795.firebaseapp.com",
    projectId: "vtireactjs-80795",
    storageBucket: "vtireactjs-80795.appspot.com",
    messagingSenderId: "161627472947",
    appId: "1:161627472947:web:520844af353f7e15e78f46",
    measurementId: "G-EG7NVJT0C3"
};

// Initialize Firebase
export const database = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);