// import firebase from "firebase/app";
// import "firebase/firestore";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  //   Timestamp,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
// import { query, orderBy, limit, where, onSnapshot } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"

// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyDJV_BSGZcTDMHriwqihtTSoNxitevkoO0",
  authDomain: "the-odin-project-library-91e50.firebaseapp.com",
  projectId: "the-odin-project-library-91e50",
  storageBucket: "the-odin-project-library-91e50.appspot.com",
  messagingSenderId: "572851761208",
  appId: "1:572851761208:web:7fd719d304747f419cf6cd",
  measurementId: "G-RVM02W4J3M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { app, db, collection, getDocs, deleteDoc, addDoc, updateDoc, doc };

//without this, we get errors in the console
// db.settings({ timestampsInSnapshots: true })
