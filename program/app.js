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
  apiKey: "AIzaSyDOLV540G8tnGmhoc7s_Quf_zoJr-YovMM",
  authDomain: "team-i-7b23c.firebaseapp.com",
  projectId: "team-i-7b23c",
  storageBucket: "team-i-7b23c.appspot.com",
  messagingSenderId: "86959699193",
  appId: "1:86959699193:web:964b05f5896b8407a1de28"
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