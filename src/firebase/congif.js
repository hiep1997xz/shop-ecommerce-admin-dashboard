import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


export const firebaseConfig = {
  apiKey: "AIzaSyAZJO3IlOjTzK3UfHfAn972ZobNvIyd2es",
  authDomain: "hshop-d2284.firebaseapp.com",
  projectId: "hshop-d2284",
  storageBucket: "hshop-d2284.appspot.com",
  messagingSenderId: "577591789794",
  appId: "1:577591789794:web:5da041b796ade79d8b76bb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app;