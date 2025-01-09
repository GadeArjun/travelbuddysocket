const express = require("express");
const { sign_up_user, sign_in_user } = require("../controllers/users");

const router = express.Router();

exports.router = router
  .post("/signup", sign_up_user)
  .post("/signin", sign_in_user);
