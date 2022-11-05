import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Navbar/Header";
import Chat from "./components/chat/Chat";
import { useEffect, useState,useRef, useContext  } from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";

import Landing from "./components/Landing";
import WaveScreen from "./components/WaveScreen";


function App(props) {

  const { user } = useSelector((state) => state.auth);


 
  return (
    <>


    
      <Router>
        <div className="App">
          <Header />
          <Routes>

            <Route path="/" element={<Landing/>} />
            <Route path="/loading" element={<WaveScreen/>} />
            <Route path="/dashboard" element={<Dashboard  />} />
            <Route path="/login"  element={<Login  />} />
            <Route path="/chatroom/:room" element={<Dashboard  />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />

    </>
  );
}

export default App;
