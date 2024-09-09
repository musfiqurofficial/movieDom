import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAc3LwF9OSr56I7sWnmntmmTg7KoAE92M8",
  authDomain: "login-signup-practice.firebaseapp.com",
  databaseURL: "https://login-signup-practice-default-rtdb.firebaseio.com",
  projectId: "login-signup-practice",
  storageBucket: "login-signup-practice.appspot.com",
  messagingSenderId: "825282348087",
  appId: "1:825282348087:web:1bb2bb41d8e7174a416bb2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const fire_db = getFirestore(app);