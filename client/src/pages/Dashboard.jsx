import "./dashboard.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Chat from "../components/chat/Chat";
import axios from "axios";
import { io } from "socket.io-client";
import React, { useState, useEffect, useRef } from "react";
import LoadingPage from "../components/LoadingPage"
const Dashboard = (props) => {

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const roomParam = useParams().room;
  const [message, setMessage] = useState("");
  const [chatrooms, setChatrooms] = useState([]);
  const [chat, setChat] = useState([]);
  const [test, setTest] = useState(0);

  const getChatRooms = () => {
    axios
      .get("/api/room/", {
        headers: {
          Authorization: "Bearer" + user,
        },
      })
      .then((response) => {
        setChatrooms(response.data);
      })
      .catch((err) => {
        setTimeout(getChatRooms, 1000);
      });
  };
  const socketRef = useRef();
  const socketUrl = "http://localhost:3001/";
  useEffect(() => {
    fetchMessages(roomParam).then((messages) => {
      setChat(messages);
    });
    getChatRooms();
    socketRef.current = io(socketUrl);
    if (socketRef.current) {
      socketRef.current.on("replayMessage", (message) => {
        setChat((chat) => [...chat, message]);        
      });
    }
  }, []);

  const fetchMessages = async (room) => {
      const response = await axios.get(`/api/message/${room}`);
      return response.data;
    
  };

  const handleClick = (e) => {
    e.preventDefault();
    socketRef.current.emit("message", {
      message: message,
      room: roomParam,
      name: user.name
    });
    setMessage("");
  };

  const leaveRoom = (room) => {
    socketRef.current.emit("leaveRoom", room);
  };
  const joinRoom = (room) =>{
    socketRef.current?.emit("join", room);
  }
  return (
    <div className="card">
      <div className="wrapper">
        {chatrooms.map((room) => (
          <div key={room._id}>
            <Link
              className="room-link"
              to={"/chatroom/" + room.name}
              onClick={() => {
                leaveRoom(room.name);
                joinRoom(room.name)
                fetchMessages(room.name).then((messages) => {
                  console.log(messages,"messages");
                  setChat(messages);
                });
              }}>
              <p className="btn-nav">{room.name}</p>
            </Link>
          </div>
        ))}
      </div>
      <div>
        <div>
          {roomParam ? (
            roomParam && (
              <Chat
                socketRef={socketRef}
                fetchMessages={fetchMessages}
                roomParam={roomParam}
                chat={chat}
                handleClick={handleClick}
                message={message}
                setMessage={setMessage}
              />
            )
            
          ) : (
            <LoadingPage />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
