import "./dashboard.css";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Chat from "../components/chat/Chat";
import axios from "axios";
import { toast } from "react-toastify";

import { io, Socket } from "socket.io-client";

import React, {
  useState,
  useEffect,
  useRef,
} from "react";

const Dashboard = (props) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const roomParam = useParams().room;

  const [message, setMessage] = useState("");
  const [chatrooms, setChatrooms] = useState([]);
  const [chat, setChat] = useState([]);

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
        setTimeout(getChatRooms, 9000);
      });
  };

  const socketRef = useRef();
  const socketUrl = "http://localhost:3001/";

  useEffect(() => {
    fetchMessages(roomParam).then((messages) => {
      setChat(messages);
    });
    socketRef.current = io(socketUrl);
    if (socketRef.current) {
      socketRef.current.on("replayMessage", (message) => {
        setChat((chat) => [...chat, message]);
      });
      console.log("socket connected",socketRef);
    }
    getChatRooms();
  }, [socketRef,message]);

  const fetchMessages = async (room) => {
    socketRef.current?.emit('join', room);
    const response = await axios.get(`/api/message/${room}`);
    return response.data;
  };

  // const fetchMessages = async (room) =>{
  //   socketRef?.current.emit("join",room)
  //   const response = await axios.get(
  //     `${socketUrl}/api/message/${room}`)
  //   return(response.data)
  // }

  const handleClick = (e) => {
    e.preventDefault();
    socketRef.current.emit("message", {
      message: message,
      room: roomParam,
      name: user.name,
    });
    setMessage("");
    // console.log("message", message);
    // console.log("room", roomParam);
    // console.log("name", user.name);
  };

  const leaveRoom = () => {
    socketRef.current.emit("leaveRoom", roomParam);
  };

  return (
    <div >
      <div className="card">
        <div className="card-body">
          <label className="group-title">Groups</label>
          <div className="chatrooms">
            {chatrooms.map((room) => (
              <div key={room._id} className="chatroom">
                <div>{room.name}</div>
                <Link
                  to={"/chatroom/" + room.name}
                  onClick={() => {
                    leaveRoom();
                    fetchMessages(room).then((messages) => {
                      setChat(messages);
                    });
                  }}>
                  <button>Join</button>
                </Link>
              </div>
            ))}
          </div>
          <div className="card-chat">

          {roomParam && (
            <Chat
              roomParam={roomParam}
              chat={chat}
              handleClick={handleClick}
              message={message}
              setMessage={setMessage}
            />
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
