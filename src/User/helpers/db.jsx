import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyB6fRwUkmAaGGF3-l3ltyjp0QHGIrGcLls",
    authDomain: "react-bags.firebaseapp.com",
    projectId: "react-bags",
    storageBucket: "react-bags.appspot.com",
    messagingSenderId: "249778826660",
    appId: "1:249778826660:web:bf8a6b433a151c7702e531"
};
  
  // Initialize Firebase
 const fire= firebase.initializeApp(firebaseConfig);

 export const db = getFirestore(fire);
 export const storage = getStorage(fire);

 export const auth = getAuth(fire);
 
 export default fire;





