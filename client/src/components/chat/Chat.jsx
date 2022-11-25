import { useRef, useState } from "react";
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

const Chat = ({ roomParam, chat, handleClick,socketRef, setMessage, message,fetchMessages }) => {
  const { user } = useSelector((state) => state.auth);
  

  return (
    <>
      <div className="room-name">{roomParam}</div>
      <div className="chat-container">
        <div >
          <Messages chat={chat} message={message}/>
          <div >
          </div>
        </div>
      </div>

          <SendMessage
            message={message}
            setMessage={setMessage}
            handleClick={handleClick}
          />
          
    </>
  );
};
export default Chat;
