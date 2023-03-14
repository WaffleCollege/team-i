import { auth, provider } from "./firebase.js";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, GithubAuthProvider} from "firebase/auth";

export async function createAccount() {
    var mailAddress = document.getElementById('mailAddress').value;
    var password = document.getElementById('password').value;
    // console.log ("動いてる");
    // console.log (mailAddress, password);
  
  
    const firebaseResult = await signInWithEmailAndPassword(mailAddress, password)

      .catch(function(error) {
        alert('ログインできません（' + error.message + '）');
      });
    console.log(firebaseResult);
  }
  
  
  document.getElementById("register").addEventListener("click", createAccount);
  
  
  // ログイン処理
  // login.addEventListener('click', function(e) {
  //     var mailAddress = document.getElementById('mailAddress').value;
  //     var password = document.getElementById('password').value;
      
  //     firebase.auth().signInWithEmailAndPassword(mailAddress, password)
  //     .catch(function(error) {
  //       alert('ログインできません（' + error.message + '）');
  //     });
  // });
  
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