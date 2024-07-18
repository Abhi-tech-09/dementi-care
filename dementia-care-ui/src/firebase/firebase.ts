// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

export const provider = new GoogleAuthProvider();

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBvfbca3FwUP1okTDh0rLEJ1e7mRI9xEo",
  authDomain: "dementia-app-d3747.firebaseapp.com",
  projectId: "dementia-app-d3747",
  storageBucket: "dementia-app-d3747.appspot.com",
  messagingSenderId: "541817648384",
  appId: "1:541817648384:web:5abfd953baaf97cb9eefe5",
  measurementId: "G-91XKC0NPBT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export const add = (collectionName: string, data: any) =>
  addDoc(collection(db, collectionName), data);

export const set = (
  collectionName: string,
  id: string,
  data: any,
  merge: boolean = false
) => setDoc(doc(db, collectionName, id), data, { merge: merge });

export const get = (collectionName: string, id: string) =>
  getDoc(doc(db, collectionName, id));

