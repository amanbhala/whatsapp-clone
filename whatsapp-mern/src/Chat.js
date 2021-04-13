import React, { useState } from 'react'
import "./Chat.css"
import DonutLargeIcon from "@material-ui/icons/DonutLarge"
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon"
import ChatIcon from "@material-ui/icons/Chat"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import { Avatar, IconButton } from "@material-ui/core"
import MicIcon from "@material-ui/icons/Mic"
import axios from "./axios";

function Chat({ messages }) {
    const [input, setInput] = useState("");
   
    const sendMessage = async (e) => {
      e.preventDefault();                        // This will prevent the page from refreshing when we submit the information that is entered.   
  
    // We are using async above and await below so that information doesn't get lost and it persists.
    await axios.post("/messages/new", {
      message: input,
      name: "Vishnu Bhala",
      timestamp: "Just now!",
      // received: "true"
      received: "true"
    });

    setInput("");
  };

  return (
    <div className="chat">    
      {/*This chat window will have multiple componenets- Avatar,Then Chat info,Chat options,then entire chat,and at the bottom search bar.*/}
    <div className="chat__header">
      <Avatar/>
      <div className="chat__headerInfo">
        <h3>Room name</h3>
        <p>Last seen at...</p>
      </div>
      <div className="chat__headerRight">
          <IconButton>     
            <DonutLargeIcon/>
          </IconButton>
          <IconButton>     
            <ChatIcon/>
          </IconButton>
          <IconButton>     
            <MoreVertIcon/>
          </IconButton>
      </div>
    </div>
    <div className="chat__body">
      {
        messages.map((message) => (
          <p className={`chat__message ${message.received && "chat__receiver"}`}>
            <span className="chat__name">{message.name} </span>
            {message.message}
            <span className="chat__timestamp">{message.timestamp}</span>
            {/* <span className="chat__timestamp">{new Date().toUTCString()}</span> */}
          </p> 
        ))
      }
      {/* <p className="chat__message">
        <span className="chat__name">Aman </span>
        This is a message.
        <span className="chat__timestamp">{new 
        Date().toUTCString()}</span>
      </p>  
           */}
    </div>
    <div className="chat__footer">
      <InsertEmoticonIcon/>
      <form>
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message" 
          type="text"
        />
        {/* Whenever user clicks on submit in the chat, it will trigger sendMessage function. */}
        <button onClick={sendMessage} type="submit">Send a message</button>   
      </form>
      <MicIcon/> 
    </div>
    </div>
  )
}

export default Chat
