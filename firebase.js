// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBigRdL5OrUTgZoZygzL59Sb03C4rnxIFc",
  authDomain: "structuralassistant-5dd97.firebaseapp.com",
  projectId: "structuralassistant-5dd97",
  storageBucket: "structuralassistant-5dd97.appspot.com",
  messagingSenderId: "287488866331",
  appId: "1:287488866331:web:6838370da6e94d04d420be",
  measurementId: "G-R88XDNKX9K"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
} else{
    app = firebase.app()
}

const auth = firebase.auth()
const db = firebase.firestore()


export {auth, db};

