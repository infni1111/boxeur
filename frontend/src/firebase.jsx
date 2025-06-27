// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getDatabase,get,ref} from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDKLxx3oFkgadet-LcMWCVeXaxPpiwLHs",
  authDomain: "boxeur-52179.firebaseapp.com",
  databaseURL: "https://boxeur-52179-default-rtdb.firebaseio.com",
  projectId: "boxeur-52179",
  storageBucket: "boxeur-52179.firebasestorage.app",
  messagingSenderId: "1089540068392",
  appId: "1:1089540068392:web:08440cce53ede0882d911d",
  measurementId: "G-1E9RL2HC9G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



export {app}