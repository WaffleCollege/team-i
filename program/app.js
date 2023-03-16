const express = require("express");
require("dotenv").config({ debug: true });
const bodyParser = require('body-parser');
const path = require('path');
let app = express();
const pg = require("pg");

//const auth = require("./firebase");

const firebase = require('firebase/compat/app');
require('firebase/compat/auth');

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

//console.log(firebaseConfig);

const initialize = firebase.initializeApp(firebaseConfig);
const auth = initialize.auth();


//API_KEY & DB

//API_KEY error check
if (typeof process.env.API_KEY === "undefined") {
  console.error('Error: "KEY1" is not set.');
  console.error("Please consider adding a .env file with KEY1.");
  process.exit(1);
}


var pool = new pg.Pool({
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT
})


app.use(express.static("public"));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'mainpage', 'main.html'));
});


//firebase認証

app.post("/signup", async(req, res) => {

  const catchEmail = req.body.email;
  const catchPassword = req.body.password;

  const firebaseResult = await firebase.auth().createUserWithEmailAndPassword(catchEmail, catchPassword)
      .catch(function(error) {
        console.log('ログインできません（' + error.message + '）');
      });
  //console.log(firebaseResult);

  const getuserEmail = firebaseResult.user.email;
  const getuserName = getuserEmail.slice(0, getuserEmail.indexOf('@'));;
  const getuserID = firebaseResult.user.uid;

  console.log(getuserEmail, getuserName, getuserID);

  try {

    const client = await pool.connect();
    await client.query ("SELECT * FROM public.users");
    //await client.query ("INSERT INTO public.users (user_name, email, firebase_id) VALUES ($1, $2, $3)", [getuserName, getuserEmail, getuserID]);
    client.release();


    console.log("post動いてる？")
    const redirectpage = 'main2.html';
    res.redirect('/mainpage/' + redirectpage);
  } catch (err) {
    console.log(err);
    res.status(500).send("データベースエラーが発生しました");
  }


})

app.get("/login", async(req, res) => {
  const catchloginEmail = req.body.email;
  const catchloginPassword = req.body.password;

  const firebaseLogin = firebase.auth().signInWithEmailAndPassword(catchloginEmail, catchloginPassword)
      .catch(function(error) {
        console.log('ログインできません（' + error.message + '）');
      });

  const getloginEmail = firebaseLogin.user.email;
  const getloginId = firebaseLogin.user.uid;

  console.log(getloginEmail, getloginId);

  try {

    const client = await pool.connect();
    // await client.query ("SELECT * FROM public.users");
    //await client.query ("INSERT INTO public.users (user_name, email, firebase_id) VALUES ($1, $2, $3)", [getuserName, getuserEmail, getuserID]);
    client.release();


    console.log("login動いてる？")
    const redirectpage = 'main2.html';
    res.redirect('../mainpage/' + redirectpage);
  } catch (err) {
    console.log(err);
    res.status(500).send("データベースエラーが発生しました");
  }
})



pool.connect();

app.listen(8080, () => {
    console.log("Start Server!");
})