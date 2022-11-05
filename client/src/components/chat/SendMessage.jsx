import React from "react";
import "./chat.css";
export default function SendMessage({ message, setMessage, handleClick }) {
  return (
    <div>
      <form className="send-message-form">
        <input
          className="input"
          label="Message"
          placeholder="Type your message here"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="send-msg-btn" onClick={ handleClick}>
          Send
        </button>
      </form>
    </div>
  );
}
