/*********************  NAV BUTTONS *******************/
const logOutBtnLi = document.querySelector(".log-out-btn-li");
const loginBtnLi = document.querySelector(".login-btn-li");
const registerBtnLi = document.querySelector(".register-btn-li");

// get username from local storage if it exists
const user = window.localStorage.getItem("username");

if (user === null) {
  // for navbar
  logOutBtnLi.classList.add("hidden");
  loginBtnLi.classList.remove("hidden");
  registerBtnLi.classList.remove("hidden");
}
/*********************  NAV BUTTONS *******************/

/******************  LOG-OUT BUTTON *******************/
const logOutBtn = document.querySelector(".log-out-btn");
logOutBtn.onclick = () => {
  localStorage.clear();
  window.location.reload();
};
/******************  LOG-OUT BUTTON *******************/
