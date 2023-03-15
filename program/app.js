// import express from "express";
const express = require("express");
const path = require('path');
let app = express();
const pg = require("pg");
//const functions = require('firebase-functions');

const firebase = require("firebase/app");
require("firebase/auth");

//API_KEY
require("dotenv").config({ debug: true });

//API_KEY error check
if (typeof process.env.API_KEY === "undefined") {
  console.error('Error: "KEY1" is not set.');
  console.error("Please consider adding a .env file with KEY1.");
  process.exit(1);
}

//firebase
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
};

firebase.initializeApp(firebaseConfig);


var pool = new pg.Pool({
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT
})


app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'mainpage', 'main.html'));
});

app.post("/signup", async(req, res) => {
  const getuserEmail = req.body.email;
  console.log("email:", getuserEmail);
  const getuserName = req.body.displayName;
  const getuserID = req.uid;
 try {

  const client = await pool.connect();
  await client.query ("INSERT INTO users (user_name, email, firebase_id) VALUES ($1, $2, $3)", [getuserName, getuserEmail, getuserID]);
  client.release();


  console.log("post動いてる？")
  const redirectpage = 'main2.html';
  res.redirect('/public/mainpage/' + redirectpage);
 } catch (err) {
  console.log(err);
  res.status(500).send("データベースエラーが発生しました");
 }


})

// app.get("/signup", (req, res) => {
//   const redirectpage = "/main2.html";
//   res.redirect(redirectpage);
// })

pool.connect();

app.listen(8080, () => {
    console.log("Start Server!");
})