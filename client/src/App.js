import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Navbar/Header";
import Chat from "./components/chat/Chat";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { toast } from "react-toastify";

function App(props) {
  const [socket,setSocket] = useState(null)
  const { user } = useSelector((state) => state.auth);
  const startSocket = () => {
    const token = user
      const newSocket = io.connect("http://localhost:3001",{
        query:token
      })
      newSocket.on("disconnect", () =>{
        setSocket(null)
        setTimeout(startSocket,3000)
        toast.error("Socket disconnected")
      })
      newSocket.on("connection", () =>{
        toast.success("Socket connected")
      })
      setSocket(newSocket)
      
    }
    const joinRoom = (room) => {
      if (room !== "") {
        socket.emit("join_room", room);
        alert(`joined room number ${room}`);
      }
    };
  useEffect (() => {
    startSocket()
  },[])
  return (
    <>
      <Router>
        <div className="App">
          <Header />
          <Routes>

            <Route path="/" element={<Dashboard joinRoom={joinRoom} socket={socket}/>} />
            <Route path="/login"  element={<Login startSocket={startSocket} />} />
            <Route path="/chatroom/:room" element={<Chat socket={socket}/>} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
