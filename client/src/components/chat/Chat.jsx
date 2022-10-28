import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import "./chat.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Chat = (  props  ) => {
  const roomParam = useParams().room
  const { user } = useSelector((state) => state.auth);
  
  
  const navigate = useNavigate();

  // const [messages, setMessages] = useState([]);
  // const [message, setMessage] = useState("");
  // const [name, setName] = useState('')
  // const [messageReceived, setMessageReceived] = useState("");
  // const [room, setRoom] = useState("");

  // const joinRoom = () => {
  //   if (room !== "") {
  //     socket.emit("join_room", room);
  //     toast.success(`joined room number ${room}`, {
  //       position: toast.POSITION.TOP_RIGHT
  //   });
    
  //   }
  // };

  // const sendMessage = (e) => {
  //   e.preventDefault();
  //   socket.emit("send_message", { message, room,
  //   user:user.name
   
  //   });
    
   

  // };



  // useEffect(() => {
  //   socket.emit("addUser", user.name)
  //   socket.on("getUsers",users=>{
  //     console.log(users);
  //   })
  // },[user])

  // useEffect(() => {
  //   if (!user) {
  //     navigate("/login");
  //   }
  //   socket.on("receive_message", (data) => {
  //     // console.log("data",data);
  //     setMessageReceived(data.message);
  //     setName(data.user)
  //     setMessages((prev) => {
  //       return [...prev, data.message, data.user];
        
  //     });
      
  //   });
  // }, [socket]);

  return (
    <>
 <div className="chat-container">
 <div className="chat">
 <h2>Hello {user &&user.name} </h2>
   <div className="room">
   {roomParam}
     
   </div>
   <br />
   <form className="form"></form>
   <br />
   <h1>message:</h1>
   {/* {messages.map((messageReceived,index) => {
     return (
       <ul className="messages" key={index}>
         <li className="message">
         {name} : { messageReceived}
         </li>
       </ul>
     );
   })} */}
   <input
     className="input"
     placeholder="Message..."
    //  onChange={(e) => {
    //    setMessage(e.target.value);
    //  }}
   />
   <button > Send Message</button>
 </div>
</div>

   
    </>
  );
};

export default Chat;
