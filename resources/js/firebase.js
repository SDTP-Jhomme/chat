// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCtYKefQUpiFnibYW9N5oyt5D9zhT9CPds",
    authDomain: "chat-app-1d7ae.firebaseapp.com",
    databaseURL: "https://chat-app-1d7ae-default-rtdb.firebaseio.com",
    projectId: "chat-app-1d7ae",
    storageBucket: "chat-app-1d7ae.appspot.com",
    messagingSenderId: "383315879899",
    appId: "1:383315879899:web:62d4457a1f8b4dc65369fe",
    measurementId: "G-D6CSNQ0HNL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

window.db = getFirestore(app);
