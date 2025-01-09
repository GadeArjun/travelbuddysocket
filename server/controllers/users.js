const jwt = require("jsonwebtoken");
const { User } = require("../models/users");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
require("dotenv").config();

//
// for creating new user sign up
exports.sign_up_user = async (req, res) => {
  var otp = Math.floor(100000 + Math.random() * 1000000);
  console.log(otp);

  if (!req.body.formData.user_otp) {
    try {
      const {
        user_name,
        user_email,
        user_password,
        user_adhaar_no,
        user_city,
        user_state,
        user_gender,
        user_preferances,
      } = req.body.formData;
      // console.log(req.body.formData);

      const salt = await bcrypt.genSalt(10);
      const hashed_password = await bcrypt.hash(user_password, salt);

      const user_details = {
        user_name,
        user_email,
        user_password: hashed_password,
        user_adhaar_no,
        user_gender,
        user_city,
        user_state,
        user_preferances,
        user_otp: otp,
      };

      const user = new User(user_details);
      const new_user = await user.save();

      res
        .status(201)
        .json({ user: new_user, otp_msg: "OTP send on your email." });

      const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: new_user.user_email,
        subject: "To send OTP",
        text: `Your OTP is ${otp}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error:", error);
        } else {
          console.log("Email sent successfully:", info.response);
        }
      });

      // console.log(user);
      //
    } catch (err) {
      // console.log(err);
      res.json({ err_msg: "Email or Adhaar_card_no are already exists" });
    }
  } else {
    try {
      const otp_to_check = +req.body.formData.user_otp;
      console.log("hello", otp_to_check, req.body.formData.user_email);

      const user_email = req.body.formData.user_email;
      const user = await User.findOne({ user_email: user_email });
      console.log({ user });

      const stored_otp = user.user_otp;

      console.log(otp_to_check, stored_otp);

      res.status(201).json(+otp_to_check === +stored_otp);
    } catch (err) {
      res.json(err);
    }
  }
};

// for signinning the user

exports.sign_in_user = async (req, res) => {
  try {
    const { user_email, user_password } = req.body.loginData;

    const user = await User.findOne({ user_email: user_email });

    if (user) {
      const isVerify = await bcrypt.compare(user_password, user.user_password);
      if (isVerify) {
        const token = jwt.sign(user_email, "secret_key");
        res.json({ token: token, msg: "Sign in successfully" });
      } else {
        res.status(404).json("Password is wrong");
      }
    } else {
      res.status(404).json("Email is wrong");
    }
  } catch (err) {
    res.status(404).json({ err_msg: "User not found" });
  }
};
