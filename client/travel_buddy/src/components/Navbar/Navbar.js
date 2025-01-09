import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import UserContext from "../../Context/UserContext";

function Navbar() {
  const [toggle, setToggle] = useState(false);
  const { userData } = useContext(UserContext);
  function handleToggleClick() {
    setToggle(!toggle);
  }

  return (
    <nav className="navbar">
      {/* Logo */}
      <a href="/" className="navbar-logo">
        TravelBuddy
      </a>

      <div className={`navbar-container ${toggle ? "active" : ""} `}>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/about"}>About</Link>
          </li>
          <li>
            <Link to={"/contactus"}>Contact Us</Link>
          </li>
          <li>
            <Link to={"/search"}> Search 🔍</Link>

            {/* <input
              onInput={handlePlaceNameInput}
              type="text"
              placeholder="Enter your favorite place"
              name="place"
              id="place"
              value={placeName}
            /> */}
          </li>
          <li>
            <Link to={`${userData ? "/profile" : "/signup"}  `}>
              {userData ? "profile" : "Sign Up"}
            </Link>
          </li>
        </ul>
      </div>

      <div className={`toggle-icon`} onClick={handleToggleClick}>
        {toggle ? "✖" : "☰"}
      </div>
    </nav>
  );
}

export default Navbar;
