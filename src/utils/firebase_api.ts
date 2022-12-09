import * as firebase from "firebase/app";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

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

const joyRef = doc(db, "joyride-demo", "completed");
const getData = async () => {
  const getFromfireStore = await getDoc(joyRef);
  let completedfireStore = "";
  if (getFromfireStore.exists()) {
    completedfireStore = String(Object.values(getFromfireStore.data()));
    console.log(completedfireStore);
  }
  return completedfireStore;
};
const saveState = async (input: string) => {
  setDoc(joyRef, { completed: input });
};
export { FireBase, db, getData, saveState };
