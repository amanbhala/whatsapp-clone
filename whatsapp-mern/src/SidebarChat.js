import React from 'react'
import "./SidebarChat.css"
import { Avatar } from '@material-ui/core';

function SidebarChat() {
  return  <div className="sidebarChat">
    {/* Every sidebarchat contins three componenets- one avatar,one Room name and another last message in that room name. */}
        <Avatar />
        <div className="sidebarChat__info">
          <h2>Room name </h2>
          <p>This is the last message</p>
        </div>

    </div>;
  
}

export default SidebarChat
