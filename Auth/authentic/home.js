import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js';

import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyC_TSoaQdZqxlpHx6nVf3f9l8LLvpCqmMM",
  authDomain: "cloud-842e8.firebaseapp.com",
  projectId: "cloud-842e8",
  storageBucket: "cloud-842e8.appspot.com",
  messagingSenderId: "996950546779",
  appId: "1:996950546779:web:2ceaf4e770fb8b123a627e",
  measurementId: "G-WSDF72XY9V"
};
      
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

const auth = getAuth(app);
var b3=document.getElementById('submit3');
b3.addEventListener("click",()=>
{
    
   

signOut(auth).then(() => {
    console.log("sign out");
   window.location.href = "index.html";
}).catch((error) => {
    console.log("error");
    console.log(error);
});

   
});