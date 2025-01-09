import React from 'react'

const Message = React.memo(({messages}) => {
  return (
    <div className="message-container">
      {messages?.map((msg, index) => {
        return (
          <div
            key={index}
            className={`${
              user === msg.sender && userClick?.user_email === msg.receiver
                ? "msg-send"
                : user === msg.receiver && userClick?.user_email === msg.sender
                ? "msg-receive"
                : "hide"
            }`}
          >
            <p>{msg.msg || msg.message} </p>
          </div>
        );
      })}
    </div>
  );
})

export default Message
