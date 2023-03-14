// import express from "express";
const express = require("express");
let app = express();
const pg = require("pg");
//const functions = require('firebase-functions');

//API_KEY
require("dotenv").config({ debug: true });

//API_KEY error check
if (typeof process.env.API_KEY === "undefined") {
  console.error('Error: "KEY1" is not set.');
  console.error("Please consider adding a .env file with KEY1.");
  process.exit(1);
}

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GithubAuthProvider } from "firebase/auth";
// import { getFirestore } from "firebase/firestore"

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID
// };

// // Initialize Firebase
// const firebaseapp = initializeApp(firebaseConfig);
// const auth = getAuth(firebaseapp);
// const provider = new GithubAuthProvider();
// const db = getFirestore(firebaseapp);
// provider.addScope("repo");

var pool = new pg.Pool({
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT
})


app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile("main.html");
    
});

app.post("/signup", (req, res) => {
  const getuserEmail = req.body.email;
  console.log("email:", getuserEmail);
  const getuserName = req.body.displayName;
  const getuserId = req.body.uid;
})

pool.connect();

app.listen(8080, () => {
    console.log("Start Server!");
})