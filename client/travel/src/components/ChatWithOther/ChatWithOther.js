import React from "react";
import "./ChatWithOther.css";
import { Link } from "react-router-dom";

function ChatWithOther() {
  return (
    <div className="chat-with-other-btn-container">
      <Link to={"chat"}>
        <button>Chat With Other Travelrs</button>
      </Link>
    </div>
  );
}

export default ChatWithOther;
