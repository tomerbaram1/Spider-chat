import React, { useRef } from "react";
import { useEffect } from "react";
import "./chat.css";
import { useSelector } from "react-redux";
import moment from "moment";
import { useState } from "react";

export default function Messages({ chat }) {
  const { user } = useSelector((state) => state.auth);
  const messageEl = useRef(null);

  // useEffect(() => {
  //   if (messageEl.current !== null) {
  //     messageEl.current.addEventListener("DOMNodeInserted", (event) => {
  //       messageEl.current?.scrollIntoView({
  //         bottom: messageEl.current.scrollHeight,
  //         behavior: "smooth",
  //       });
  //     });
  //   }
  // }, [chat]);
  useEffect(() => {
    if(chat && messageEl ){
      messageEl.current?.scrollIntoView({
        bottom: messageEl.current.scrollHeight,
        behavior: "smooth",
      });
    }

  }, [chat]);

  return (
    <div>
      <section>
        <ul ref={messageEl} className="messages">
          {chat.map((message, index) => {
            return (
              
                <li
                  key={index}
                  className={`msg ${
                    message.message === user.name ? "userMsg" : "diffMsg"
                  }`}>
                  <div>
                    <span>{message.message}</span>

                    <h3>{message.name}</h3>
                    <div></div>
                    <div>
                      <p>
                        {moment(message.createdAt).format(
                          "DD/MM/YY, hh:mm:ss A"
                        )}
                      </p>
                    </div>
                  </div>
                </li>
              
            );
          })}
        </ul>
      </section>
    </div>
  );
}
