import React, { useState } from "react";
import "./MessageSection.css";
import Message from "../message/Message";

function MessageSection({ userClick, user, sendMsg, messages }) {
  const [msg, setMsg] = useState("");

  function handleMsg(e) {
    setMsg(e.target.value);
  }

  function handleSendMsg(e) {
    console.log(e.key);
    if (e.key === "Enter") {
      if (msg.trim()) {
        sendMsg(msg.trim());
      }
    }
  }

  return (
    <div className="message-section-container">
      <div className="selected-user-profile-section">
        <div className="selected-user-profile">
          <p> {userClick ? userClick.user_name[0] : "u"}</p>
        </div>
        <div className="selected-user-name">
          <p>{userClick ? userClick.user_name : "user name"}</p>
        </div>
      </div>
      <Message messages={messages} />

      <div className="message-input-section">
        <input
          type="text"
          name="message"
          placeholder="Start Typing..."
          id="message"
          onInput={handleMsg}
          onKeyDown={handleSendMsg}
        />
      </div>
    </div>
  );
}

export default MessageSection;
