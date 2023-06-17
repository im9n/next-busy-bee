// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, setDoc, doc} from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword,  signOut, signInWithEmailAndPassword, updateProfile} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAn9iFxh9YNekGS7fWNegdj-erCTQqpuR0",
  authDomain: "next-busy-bee.firebaseapp.com",
  projectId: "next-busy-bee",
  storageBucket: "next-busy-bee.appspot.com",
  messagingSenderId: "1055947728481",
  appId: "1:1055947728481:web:2a621485c39c1c588b2c20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)


export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, db, setDoc, doc}