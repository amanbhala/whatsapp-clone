import React from 'react'
import "./Sidebar.css"
import DonutLargeIcon from "@material-ui/icons/DonutLarge"
import ChatIcon from "@material-ui/icons/Chat"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import { Avatar, IconButton } from "@material-ui/core"
// import SearchOutlined from "@bit/mui-org.material-ui-icons.search-outlined";
import SearchOutlined from "@material-ui/icons/SearchOutlined"
import SidebarChat from './SidebarChat'

function Sidebar() {
  return (
    // This sidebar div represents the entire sidebar component.It has multiple components- sidebar header,Avatar on the left side,on sidebar headerRight side it contains various icons and below it a search option.Then below it contains sidebar chats which contains all the room names and their last messages.
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar />
        <div className="sidebar__headerRight">
          {/* We are wrapping button donutlargeicon inside Iconbutton to make it clickable. */}
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
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input placeholder="Search or start new chat" type="text"/>
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat/>
        <SidebarChat/>
        <SidebarChat/> 
      </div>
    </div>
  )
}

export default Sidebar;
