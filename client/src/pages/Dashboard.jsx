import React from "react";
import "./dashboard.css"
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Chat from "../components/chat/Chat";
import axios from "axios";
import { toast } from "react-toastify";



const Dashboard = (props) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [chatrooms,setChatrooms] = useState([])
  
  const getChatRooms = () => {
    axios.get("/api/room/",{
      headers: {
        Authorization:"Bearer" + localStorage.getItem('user')
      }
    }).then((response) => {

      setChatrooms(response.data)
    }).catch(err =>{

      setTimeout(getChatRooms,9000)
    })
  }
  useEffect(() => {
 
        getChatRooms()
   
    },[])
  
  // useEffect(() => {
  //   getChatRooms()
  //   if (!user) {
  //     navigate("/login");
  //   }
  // }, [user, navigate]);



  return (

    <div className="container">
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
        {chatrooms.map(chatroom => (
          <div key={chatroom._id} className="chatroom">
            <div>{chatroom.name}</div>
            <Link to={"/chatroom/" + chatroom.name} >
            <div className='join' onClick={()=>props.joinRoom(chatroom.name)}>JOIN</div>
            </Link>
          </div>
        ))}
     </div>
     
   </div>
    </div>
      
    </div>
  );
};

export default Dashboard;
