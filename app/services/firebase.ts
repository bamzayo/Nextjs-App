// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: object = {
  apiKey: "AIzaSyBWQOe1h4kiDwCwJijsGD96YQ0ySmGmEoA",
  authDomain: "trg-app-59d4f.firebaseapp.com",
  projectId: "trg-app-59d4f",
  storageBucket: "trg-app-59d4f.appspot.com",
  messagingSenderId: "155189265575",
  appId: "1:155189265575:web:7ae727950d91d1c2778782",
  measurementId: "G-FTSLHBB212",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, auth, db };
