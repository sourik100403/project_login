"use strict";

// Data
const account1 = {
  owner: "SOURIK PARUI",

  pin: 1111,
// 
};

const account2 = {
  owner: "Debanjan Banerjee",
  pin: 2222,
};

const account3 = {
  owner: "Bipul Roy",
  pin: 3333,
};

const account4 = {
  owner: "Diya Roy",
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

//Elements
const inputUser = document.querySelector(".username");
const inputPass = document.querySelector(".pass");
const formToReset = document.getElementById('signup-form');

function myFunction(event) {
    // event.preventDefault(); // Prevent the form from submitting
  
    // Get form values
    var signupName = document.getElementById("signup-name").value;
    var signupUser = document.getElementById("signup-user").value;
    var signupPass = document.getElementById("signup-pass").value;
    var signupConfarmPass=document.getElementById("signup_confarm-pass").value;
  

  
    // Display the form values
    // console.log("Name: " + signupName);
    // console.log("Username: " + signupUser);
    // console.log("Password: " + signupPass);
    // console.log("confirmPassword: " + signupConfarmPass);

    if(signupPass==signupConfarmPass){
        alert("Sucessfully register please login using login page");
        location.replace("index.html");
        formToReset.addEventListener('click', (e) => {
            e.preventDefault();
            // formToReset.reset();
            setInterval(function () {formToReset.reset();}, 1000);
         });   
    }
    else{
        alert("password not match please cofirm your password");
    }
  

  }
  



const firstLoginBtn = document.querySelector(".first-login-btn");
const firstSignupBtn = document.querySelector(".first-signup-btn");
const secondLoginBtn = document.querySelector(".second-login-btn");
const secondSignupBtn = document.querySelector(".second-signup-btn");
const signupSection = document.querySelector(".signup");
const loginPage = document.querySelector(".login-page");
const loginSection = document.querySelector(".login");
const loginHeader = document.querySelector(".loign-header");
const loginMessage = document.querySelector(".in-msg");
const backBtn1 = document.querySelector(".back-btn1");
const backBtn2 = document.querySelector(".back-btn2");

const userPanel = document.querySelector(".panel");
const btnContainer = document.querySelector(".btn-container");
const logoutBtn = document.querySelector(".logout-btn");

const lableDate = document.querySelector(".date");

const inputID = document.querySelector(".input-id");
const transferInputAmount = document.querySelector(".transfer-input-amount");
const transferBtn = document.querySelector(".btn-tools");

const userConfirmInput = document.querySelector(".user-confirm");
const passConfirmInput = document.querySelector(".pass-confirm");
const logoutError = document.querySelector(".logout-error");
const confirmBtn = document.querySelector(".confirm-logout");

const usersName = document.querySelector(".user-name");


const lableTimer = document.querySelector(".timer");

const accUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
accUsernames(accounts);


const logoutTimer = function () {
  let time = 10 * 60; // In SEC (10m)
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    if (time === 0) {
      clearInterval(timer);
    }

    time--;

    lableTimer.textContent = `${min} : ${sec}`;
  };

  tick();

  const timer = setInterval(tick, 1000);

  return timer;
};


const backBtns = function () {
  loginSection.classList.add("hidden");
  signupSection.classList.add("hidden");
  btnContainer.classList.remove("hidden");
  loginMessage.textContent = "Log in ";
};
backBtn1.addEventListener("click", backBtns);
backBtn2.addEventListener("click", backBtns);

firstLoginBtn.addEventListener("click", () => {
  btnContainer.classList.toggle("hidden");
  loginSection.classList.toggle("hidden");
});

firstSignupBtn.addEventListener("click", () => {
  btnContainer.classList.toggle("hidden");
  signupSection.classList.toggle("hidden");
  loginMessage.textContent = "Sign up ";
});

let currentAcc, timer;
secondLoginBtn.addEventListener("click", () => {
  currentAcc = accounts.find(
    (acc) => acc.username === inputUser.value.toLowerCase()
  );

  //Calculate current date and time
  const now = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formattedDate = Intl.DateTimeFormat(currentAcc.locale, options).format(
    now
  );
  lableDate.textContent = formattedDate;

  if (currentAcc?.pin === Number(inputPass.value)) {
    inputUser.value = inputPass.value = "";
    loginPage.classList.add("hidden");
    userPanel.classList.remove("hidden");
    usersName.textContent = `${currentAcc.owner.split(" ")[0]} 😊`;

    //TIMER on login
    if (timer) clearInterval(timer);
    timer = logoutTimer();


  } else {
    inputUser.value = inputPass.value = "";
    alert("Username or Password is INCORRECT!");
    sessionStorage.clear();
  }
});

transferBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const reciverAcc = accounts.find((acc) => acc.username === inputID.value);
  const amount = Number(transferInputAmount.value);
  inputID.value = transferInputAmount.value = "";
  if (
    amount > 0 &&
    reciverAcc &&
    reciverAcc !== currentAcc &&
    currentAcc.balance >= amount
  ) {


    //RESET timer
    clearInterval(timer);
    timer = logoutTimer();
  } else {
    alert("Wrong information!");
  }
});

