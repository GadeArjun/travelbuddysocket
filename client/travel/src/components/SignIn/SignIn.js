import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.css";
import axios from "axios";

const SignIn = () => {
  const [loginData, setLoginData] = useState({
    user_email: "",
    user_password: "",
  });

  const navigator = useNavigate();
  const [errorMsg, setErrorMsg] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Login Data:", loginData);

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/signin`, {
        loginData,
      });

      if (+response.status !== 404 && response.status === 200) {
        // console.log(response.data);
        localStorage.setItem("travel_buddy_token", response.data.token);
        navigator("/");
        // console.log({ isSignIn });
      } else {
      }
    } catch (err) {
      setErrorMsg(true);
      setTimeout(() => {
        setErrorMsg(false);
      }, 5000);
      // console.log("err", response.data);
      // console.log(err);
    }
  };

  return (
    <div className="login-form-container">
      <div className="signIn-form-container">
        {errorMsg ? (
          <div className="err-msg-pop-up" style={{ opacity: errorMsg ? 1 : 0 }}>
            Wrong Email or Password
          </div>
        ) : (
          ""
        )}
      </div>
      <h2>Log In to Your Account</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="user_email">Email </label>
        <input
          type="email"
          id="user_email"
          name="user_email"
          value={loginData.user_email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />

        <label htmlFor="user_password">Password</label>
        <input
          type="password"
          id="user_password"
          name="user_password"
          value={loginData.user_password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />

        <button type="submit" className="login-button">
          Sign In
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default SignIn;
