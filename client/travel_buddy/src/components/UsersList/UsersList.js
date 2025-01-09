import React, { useState } from "react";
import "./UsersList.css";

function UsersList({ usersList, setUserClick }) {
  const [toggleUsers, setToggleUsers] = useState(false);

  function handletoggleUserBtn() {
    setToggleUsers(!toggleUsers);
  }

  function handleUserClick(user) {
    setUserClick(user);
    handletoggleUserBtn();
  }
  // console.log({ usersList });

  return (
    <div className="users-list-container">
      <div className="user-toggle-btn" onClick={handletoggleUserBtn}>
        {toggleUsers ? "☰" : "✖"}
      </div>
      <div
        className={` ${toggleUsers ? "users-list-dissable" : "users-list "}`}
      >
        { usersList.length !== 0 ? (
          usersList.map((user, index) => {
            return (
              <div
                key={index}
                className="user-list-details"
                onClick={() => handleUserClick(user)}
              >
                <div className="user-list-profile">
                  <p>{user?.user_name ? user?.user_name[0] : ""}</p>
                </div>
                <div className="user-list-name">{user?.user_name}</div>
              </div>
            );
          })
        ) : (
          <h1>No any User</h1>
        )}
      </div>
    </div>
  );
}

export default UsersList;
