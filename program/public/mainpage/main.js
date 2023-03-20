//signup
function createAccount() {
    var mailAddress = document.getElementById('mailAddress').value;
    var password = document.getElementById('password').value;
    console.log ("動いてる");
    console.log (mailAddress, password);

    const sendUserData = {
      email: mailAddress,
      password: password
    }

    fetch ('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendUserData)
    })
    .then(res => {
      console.log(res);
      console.log("res返って来ている");
      //window.location.href = 'http://localhost:8080/mainpage/main2.html';
    })
    .catch(err => {
      console.log(err);
    });

    console.log(sendUserData);

  };


  
document.getElementById("register").addEventListener("click", createAccount);
  
  
  //login
function login(){
    console.log ("login");
    var mailAddress = document.getElementById('mailAddress').value;
    var password = document.getElementById('password').value;
    // firebase.auth().signInWithEmailAndPassword(mailAddress, password)
    //   .catch(function(error) {
    //     alert('ログインできません（' + error.message + '）');
    //   });

    const sendLoginData = {
      email: mailAddress,
      password: password
    }

    fetch ('/login', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendLoginData)
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });

    console.log(sendLoginData);
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