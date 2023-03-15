//import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
//import { signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/compat/auth';
import {auth} from '../../firebase';
//import { auth } from '../firebaseConfig';
//import { auth } from '../public/firebase.js';
//const auth = require("../firebase.js");
//const auth = getAuth();
//import 'firebase/compat/auth';
//import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
//const auth = getAuth();


// import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
// const auth = getAuth();
//const auth = getAuth();

//signup
export async function createAccount() {
    var mailAddress = document.getElementById('mailAddress').value;
    var password = document.getElementById('password').value;
    console.log ("動いてる");
    console.log (mailAddress, password);

    //console.log(createUserWithEmailAndPassword);
  
  
    const firebaseResult = await auth.createUserWithEmailAndPassword(mailAddress, password)
      .catch(function(error) {
        alert('ログインできません（' + error.message + '）');
      });
      console.log(firebaseResult);

      
      if(firebaseResult && firebaseResult.user) {
        const userData = firebaseResult.user;
        const signupData = {
          userName: userData.displayName,
          email: userData.email,
          userId: userData.uid
        }

        fetch ('/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(signupData)
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
      };
      console.log(firebaseResult);
  }
  
  
  document.getElementById("register").addEventListener("click", createAccount);
  
  
  //login
  export function login(){
    console.log ("login");
    var mailAddress = document.getElementById('mailAddress').value;
    var password = document.getElementById('password').value;
    firebase.auth().signInWithEmailAndPassword(mailAddress, password)
      .catch(function(error) {
        alert('ログインできません（' + error.message + '）');
      });
  }
  
  document.getElementById("login").addEventListener("click", login);
  
  //認証状態の確認
  // firebase.auth().onAuthStateChanged(function(user) {
  //     if(user) {
  //       //ログイン状態
  //       alert("ログインに成功しました");
  //     }else{
  //       //ログアウト状態
  //     }
  // });