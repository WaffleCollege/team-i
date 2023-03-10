import express from "express";
let app = express();

//API_KEY
require("dotenv").config({ debug: true });

//API_KEY error check
if (typeof process.env.API_KEY === "undefined") {
  console.error('Error: "KEY1" is not set.');
  console.error("Please consider adding a .env file with KEY1.");
  process.exit(1);
}

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseapp);
const provider = new GithubAuthProvider();
const db = getFirestore(firebaseapp);
provider.addScope("repo");


app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile("main.html");
    
});

app.listen(8080, () => {
    console.log("Start Server!");
})