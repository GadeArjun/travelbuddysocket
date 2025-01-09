import React, { useContext, useEffect } from "react";
import UserContext from "../../Context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    async function authenticatingUser(token) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/auth`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.status);

        if (response.status === 200) {
          setUserData(response.data);
        } else {
          navigate("/signup");
          // console.log(response.status);
        }
        // console.log(response.data);
      } catch (err) {
        console.log({ err });
        navigate("/signup");
      }
    }

    const token = localStorage.getItem("travel_buddy_token");
    if (!token || token === undefined || token === null) {
      navigate("/signin");
    } else {
      authenticatingUser(token);
    }
  }, [navigate, setUserData]);

  console.log(userData);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>User Profile</h1>
        <p>Welcome, {userData?.user_name}! Here is your profile information:</p>
      </div>
      <div className="profile-details">
        <div className="profile-card">
          <h2>Personal Details</h2>
          <p>
            <strong>Name:</strong> {userData?.user_name}
          </p>
          <p>
            <strong>Email:</strong> {userData?.user_email}
          </p>
          <p>
            <strong>Gender:</strong> {userData?.user_gender}
          </p>
          <p>
            <strong>Adhaar No:</strong> {userData?.user_adhaar_no}
          </p>
        </div>
        <div className="profile-card">
          <h2>Location</h2>
          <p>
            <strong>City:</strong> {userData?.user_city}
          </p>
          <p>
            <strong>State:</strong> {userData?.user_state}
          </p>
        </div>
        <div className="profile-card">
          <h2>Additional Information</h2>
          <p>
            <strong>Preferences:</strong>{" "}
            {userData?.user_preferances.length > 0
              ? userData?.user_preferances.join(", ")
              : "None"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
