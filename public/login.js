const loginForm = document.getElementById("login-form");

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

const getUserInput = (e) => {
  e.preventDefault();

  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  let bodyObj = {
    username: usernameInput.value,
    password: passwordInput.value,
  };

  // console.log(username.value);

  // http://localhost:4004/api/new-user
  axios
    .post("/api/users/login", bodyObj)
    .then((res) => {
      window.localStorage.setItem("username", username.value);
      window.location.href = "profile.html";
    })
    .catch((err) => console.log(err));
};

loginForm.addEventListener("submit", getUserInput);
