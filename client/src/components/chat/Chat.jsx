import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import "./chat.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSocket } from "../../features/SocketContext";
import Messages from "./Messages";
import SendMessage from "./SendMessage";

const Chat = ({ roomParam, chat, handleClick, setMessage, message }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <div className="chat-container">
          <h2>Hello {user && user.name} </h2>
        <div >
          <div className="room">{roomParam}</div>
          <br />
          <Messages chat={chat} message={message}/>
          <div className="sendMessage">

          <SendMessage
            message={message}
            setMessage={setMessage}
            handleClick={handleClick}
          />
          </div>
        </div>
      </div>
    </>
  );
};
export default Chat;
