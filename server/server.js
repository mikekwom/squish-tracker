require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const path = require("path");
const { SERVER_PORT } = process.env;
const {
  addUser,
  serveCreateProfile,
  login,
  serveProfile,
  addSquish,
  getAllSquish,
} = require("./controller.js");

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../public")));

// DEV
// app.post("/seed", seed);

// USER
app.post("/api/new-user", addUser);
app.get("/create_profile", serveCreateProfile);
app.post("/api/users/login", login);
app.get("/login", serveProfile);

// PROFILE PAGE ENDPOINTS
app.get("/profile/:username", getAllSquish);
app.post("/profile", addSquish);

// app.post("/api/login", login);

// endpoint api/profile that runs addUser from controller
// axios req

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`));
