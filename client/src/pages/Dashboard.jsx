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

import LoadingPage from "../components/LoadingPage";
import WaveScreen from "../components/WaveScreen";

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
        setTimeout(getChatRooms, 1000);
      });
  };

  const socketRef = useRef();
  const socketUrl = "http://localhost:3001/";

  useEffect(() => {
    getChatRooms();
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
  }, [roomParam,message]);



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
        
        <div className="wrapper">

            {chatrooms.map((room) => (
              <div   key={room._id}  >
                <Link className="room-link"
                  to={"/chatroom/" + room.name }
                  onClick={() => {
                    leaveRoom();
                    fetchMessages(room).then((messages) => {
                      setChat(messages);
                    });
                  }}>
                    <p className='btn-nav' >{room.name}</p>

                </Link>
              </div>
            ))}
        </div>

        <div>


          <div >

          {roomParam? roomParam && (
            <Chat
            roomParam={roomParam}
            chat={chat}
            handleClick={handleClick}
            message={message}
            setMessage={setMessage}
            />
            ):
            <LoadingPage />
          }
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Dashboard;
