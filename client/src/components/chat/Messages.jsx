import React, { useRef } from "react";
import { useEffect } from "react";
import "./chat.css";
import { useSelector } from "react-redux";
import moment from "moment";
import { useState } from "react";


export default function Messages({ chat }) {
  const { user } = useSelector((state) => state.auth);
  const messageEl = useRef(null);
  console.log("chat:",chat);
  // useEffect(() => {
  //   if (messageEl.current == null) {
  //     messageEl.current.addEventListener("DOMNodeInserted", (event) => {
  //       messageEl.current.scroll({
  //         top: messageEl.current.scrollHeight,
  //         behavior: "smooth",
  //       });
  //     });
  //   }
  //   console.log('messageEl:',messageEl)
  // }, []);

  return (
    <div>
      <section className="messages">

        <div ref={messageEl}>
          
          {chat.map((message,index) => {
           return(
            <div key={message._id} 
            className={`msg ${message.message === user.name ? 'userMsg' : 'diffMsg'}`}
            >
              <div>
                <span className="msg-user">{message.message}</span>
                <h3 className="msg-text">{message.name}</h3>
                <div>
                </div>
                <div>
                <p  className={message.message === user.name ? 'myTime' : 'yourTime'}>
                  {moment(message.createdAt).format("DD/MM/YY, hh:mm:ss A")}
                </p>

                </div>
              </div>
            </div>
           )
          })}
        </div>
      </section>
    </div>
  );
}
