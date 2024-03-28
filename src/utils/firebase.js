import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAAqi17pD61hcdaC8sgKA386yuWcK1vntg",
  authDomain: "giveumma-bd666.firebaseapp.com",
  projectId: "giveumma-bd666",
  storageBucket: "giveumma-bd666.appspot.com",
  messagingSenderId: "986824449736",
  appId: "1:986824449736:web:2c4851c3b202d8df410ffd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
