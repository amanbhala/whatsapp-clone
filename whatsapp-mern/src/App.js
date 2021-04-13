// import logo from './logo.svg';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Pusher from 'pusher-js';
import React, { useEffect, useState } from 'react';
import axios from "./axios";


function App() {
  const [messages, setMessages] = useState([]); 
  // This useEffect will be responsible for fetching all of the initial user information.
  useEffect(() => {
    axios.get("/messages/sync").then((response) => {
      setMessages(response.data);
    });
  }, []);
  useEffect(() => {
    // This information is deviced from pusher.com website about our build.
    const pusher = new Pusher('b94da7c2603061e66691', {
      cluster: 'ap2'
    });

    var channel = pusher.subscribe("messages");
    channel.bind("inserted", newMessage => {
      // alert(JSON.stringify(newMessage));  This will create an alert or a pop-up box whenever any new message comes in.
      setMessages([...messages, newMessage]);  //When pusher notifies us of any new messages, then keep all the current messages and also include the new one. 
    });

    //In the return function below, we are unbinding all and then unsubscribing from the channel
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);    // Here we have written messages because it is a dependency such as we need to add new messages in the list of old messages represented by messages list.
  
  console.log(messages);

  return (
    <div className="app">
      <div className="app_body">
      <Sidebar /> 
      <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
