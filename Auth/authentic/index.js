
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
var b1=document.getElementById('submit2');
const auth = getAuth(app);
b1.addEventListener("click",()=>
{
    var email=document.getElementById('name1').value;
    var password=document.getElementById('pass1').value;
   

    
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        
     const user = userCredential.user;
       console.log("create succesfully"+user);

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode,errorMessage);
        console.log("create not succesfully");
      });
})

var b2=document.getElementById('submit');
b2.addEventListener("click",()=>
{
    var email=document.getElementById('name').value;
    var password=document.getElementById('pass').value;
   
    
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        
        const user = userCredential.user;
        console.log("user  login sucesssfully"+user);
     window.location.href = "home.html";
      })
      .catch((error) => {

        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("user login unsuceessfully");
        console.log(errorCode,errorMessage);
      });
   
});

var b4=document.getElementById('submit4');
b4.addEventListener("click",()=>
{
    
    
    signInWithPopup(auth, provider)
      .then((result) => {
        
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
       
        const user = result.user;
     
        console.log(user);
        window.alert("Signed in with Google");
        window.location.href = "home.html";
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        
        console.log(errorCode, errorMessage);
        // ...
      });

   
});
