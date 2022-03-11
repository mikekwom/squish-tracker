const profileBody = document.getElementById("profile-body");
const createAccountPrompt = document.getElementById("create-account-prompt");
const squishHolder = document.getElementById("squish-holder");
const logOutBtnLi = document.querySelector(".log-out-btn-li");
const loginBtnLi = document.querySelector(".login-btn-li");
const registerBtnLi = document.querySelector(".register-btn-li");

// get username from local storage if it exists
const user = window.localStorage.getItem("username");

if (user === null) {
  profileBody.classList.add("hidden");
  createAccountPrompt.classList.remove("hidden");
  // for navbar
  logOutBtnLi.classList.add("hidden");
  loginBtnLi.classList.remove("hidden");
  registerBtnLi.classList.remove("hidden");
}

/******************  LOG-OUT BUTTON *******************/
const logOutBtn = document.querySelector(".log-out-btn");
logOutBtn.onclick = () => {
  localStorage.clear();
  window.location.reload();
};
/******************  LOG-OUT BUTTON *******************/

// if (user !== null) {
//   logOutBtn.classList.remove("hidden");
//   loginBtn.classList.add("hidden");
//   registerBtn.classList.add("hidden");
// }
// console.log(user);

const getSquishInfo = (e) => {
  e.preventDefault();

  const nameInput = document.getElementById("name");
  const sizeInput = document.getElementById("size");
  const bioInput = document.getElementById("bio");
  const squishDateInput = document.getElementById("squish-date");
  const purchaseDateInput = document.getElementById("purchase-date");

  let bodyObj = {
    name: nameInput.value,
    size: sizeInput.value,
    bio: bioInput.value,
    squishDate: squishDateInput.value,
    purchaseDate: purchaseDateInput.value,
    user,
  };

  axios
    .post("/profile", bodyObj)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
};

const postProfileInfo = () => {
  axios.get("/profile/" + user).then((res) => {
    const profileElem = `
      <!-- profile header -->
      <div id="profile-body">
        <div class="container" id="profile-header">
        <div class="media">
            <div class="media-left">
                <img src="images/default-turtle.jpeg" id="av-img"/>
            </div>
            <div class="media-body">
          <h1 class="media-heading">${user}</h1> </br>
          <h2 id="squish-total">Squish Count: </h2>
          </div>
        </div>
        </div>
        </div>
  
        <hr />
  
        <!-- Add squish Modal -->
        <div class="container">
          <!-- Trigger the modal with a button -->
          <button
            type="button"
            class="btn btn-info btn-lg center-block"
            data-toggle="modal"
            data-target="#myModal"
          >
            Add a Squish
          </button>
  
          <!-- Modal -->
          <div class="modal fade" id="myModal" role="dialog">
            <div class="modal-dialog">
              <!-- Modal content-->
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal">
                    Add a Squish
                  </button>
                  <h4 class="modal-title">Enter new squish info:</h4>
                </div>
                <div class="modal-body">
                  <form id="new-squish-form">
                    <div class="form-group">
                      <label for="name">Name:</label>
                      <input type="text" id="name" class="form-control" />
                    </div>
                    <div class="form-group">
                      <label for="size">Size (in inches):</label>
                      <input type="text" id="size" class="form-control" />
                    </div>
                    <div class="form-group">
                      <label for="bio">Bio:</label>
                      <input type="text" id="bio" class="form-control" />
                    </div>
                    <div class="form-group">
                      <label for="squish-date">Squish Date:</label>
                      <input type="date" id="squish-date" class="form-control" />
                    </div>
                    <div class="form-group">
                      <label for="purchase-date">Purchase Date:</label>
                      <input type="date" id="purchase-date" class="form-control"
                      />
                    </div>
                    <button type="submit" class="btn btn-default">Submit</button>
                  </form>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-default"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div class="container" id="squish-holder">
      </div>
      `;

    profileBody.innerHTML += profileElem;
    const squishForm = document.getElementById("new-squish-form");
    squishForm.addEventListener("submit", getSquishInfo);
  });
};

// /******************  ADD SQUISH RELOAD BUTTON *******************/
// const submitSquishBtn = document.getElementById("submit-squish");
// submitSquishBtn.onclick = () => {
//   window.location.reload();
// };
// /******************  ADD SQUISH RELOAD BUTTON *******************/

const postSquishInfo = () => {
  // +user concatinates
  axios.get("/profile/" + user).then((res) => {
    res.data.forEach((squish) => {
      // console.log(squish);
      const squishElem = `
      <div class="squish">
      <ul class="list-group">
        <li class="list-group-item"><b>Name: </b>${squish.name}</li>
        <li class="list-group-item">
          <b>Bio: </b>${squish.bio}
        </li>
        <li class="list-group-item"><b>Size: </b>${squish.size} in</li>
        <li class="list-group-item"><b>Squish Date: </b>${squish.squish_date}</li>
        <li class="list-group-item"><b>Purchase Date:</b> ${squish.purchase_date}</li>
        <hr />
      </ul>
    </div>`;

      const squishHolder = document.getElementById("squish-holder");
      squishHolder.innerHTML += squishElem;
      const squishTotalHolder = document.getElementById("squish-total");
      squishTotalHolder.innerHTML = `Squish Count: ${res.data.length}`;
    });
  });
};

postProfileInfo();
postSquishInfo();
