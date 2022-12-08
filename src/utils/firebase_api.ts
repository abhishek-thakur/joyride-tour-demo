import * as firebase from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDlgVON73CLKw81gPEGma2Fyg1-MKY_TnM",
  authDomain: "joyride-demo.firebaseapp.com",
  databaseURL:
    "https://joyride-demo-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "joyride-demo",
  storageBucket: "joyride-demo.appspot.com",
  messagingSenderId: "990316429272",
  appId: "1:990316429272:web:85b8b1361808b3d90dbcad",
  measurementId: "G-KFBGB6KGF4",
};

const FireBase = firebase.initializeApp(firebaseConfig);
const db = getFirestore(FireBase);
export { FireBase, db };
