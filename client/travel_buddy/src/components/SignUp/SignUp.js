import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_password: "",
    user_adhaar_no: "",
    user_gender: "",
    user_preferences: "",
    user_city: "",
    user_state: "",
    user_otp: "",
  });

  const [hideOtp, setHideOtp] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigator = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Sign Up Dataaaa:", formData);

  
    await sendData(formData);

  };

  async function sendData(formData) {
    try {
      
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/signup`, {
        formData,
      });
      if (+response.status === 201) {
        setHideOtp(false);
        // console.log(response.data);
        if (response.data === true) {
          navigator("/signin");
        }
      } else {
        // console.log(response.data.err_msg);
        setErrorMsg(response.data.err_msg);
        setHideOtp(true);
        setTimeout(() => {
          setErrorMsg(null);
        }, 5000);
      }
    } catch (err) {
      console.log({ err });
    }
  }

  return (
    <div className="signup-form-container">
      {errorMsg ? (
        <div className="err-msg-pop-up" style={{ opacity: errorMsg ? 1 : 0 }}>
          {errorMsg}
        </div>
      ) : (
        ""
      )}

      <h2>Create Your Account</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <label htmlFor="user_name">Full Name</label>
        <input
          type="text"
          id="user_name"
          name="user_name"
          value={formData.user_name}
          onChange={handleChange}
          placeholder="Enter your full name"
          required
        />

        <label htmlFor="user_email">Email</label>
        <input
          type="email"
          id="user_email"
          name="user_email"
          value={formData.user_email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />

        <label htmlFor="user_password">Password</label>
        <input
          type="password"
          id="user_password"
          name="user_password"
          value={formData.user_password}
          onChange={handleChange}
          placeholder="Enter a strong password"
          required
        />

        <label htmlFor="user_adhaar_no">Aadhar Number</label>
        <input
          type="text"
          id="user_adhaar_no"
          name="user_adhaar_no"
          value={formData.user_adhaar_no}
          onChange={handleChange}
          placeholder="Enter your Aadhar number"
          required
        />

        <label htmlFor="user_gender">Gender</label>
        <select
          id="user_gender"
          name="user_gender"
          value={formData.user_gender}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select your gender
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label htmlFor="user_city">City</label>
        <input
          id="user_city"
          name="user_city"
          value={formData.user_city}
          onChange={handleChange}
          required
          placeholder="Enter your city"
        ></input>

        <label htmlFor="user_state">State</label>
        <input
          id="user_state"
          name="user_state"
          value={formData.user_state}
          onChange={handleChange}
          required
          placeholder="Enter your state"
        ></input>

        <label htmlFor="user_preferences">Preferences</label>
        <input
          type="text"
          id="user_preferences"
          name="user_preferences"
          value={formData.user_preferences}
          onChange={handleChange}
          placeholder="(comma-separated) Ex. Adventure, Beach..."
          required
        />
        <div className={`${hideOtp ? "hide" : ""}`}>
          <label htmlFor="user_otp">OTP</label>
          <input
            type="text"
            id="user_otp"
            name="user_otp"
            value={formData.user_otp}
            onChange={handleChange}
            placeholder="Enter the OTP sent to your email"
          />
        </div>

        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
      <p>
        Already have an account? <Link to="/signin">Sign In</Link>
      </p>
    </div>
  );
};

export default SignUp;
