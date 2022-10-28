import { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./chat.css";
import { io } from "socket.io-client";

function Room() {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
   
  return (
    <div className="card">
      <div className='card-title'> Create a group</div>
       <div className="card-body">
        <label htmlFor="chatroomName">Group Name?</label>
       <input
       type="text"
       name = "chatroomName"
       id = "chatroomName"
       className="input"
       placeholder="My Group  "
       
     />
     
     <button > Create chat group</button>
     <div className="chatrooms">
      <div className="chatroom">
        <div>Politics</div>
        <div className='join'>JOIN</div>
      </div>
      <div className="chatroom">
        <div>Sports</div>
        <div className='join'>JOIN</div>
      </div>
      <div className="chatroom">
        <div>Web Development</div>
        <div className='join'>JOIN</div>
      </div>
     </div>
     
   </div>
    </div>
  )
}

export default Room
