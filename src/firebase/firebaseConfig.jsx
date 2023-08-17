import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDsAd2Ql79zFqoA90_IDQFzuCDkEibIG34",
  authDomain: "movie-42c35.firebaseapp.com",
  projectId: "movie-42c35",
  storageBucket: "movie-42c35.appspot.com",
  messagingSenderId: "973730258352",
  appId: "1:973730258352:web:b6b0ef3246e13ba319ca75",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
