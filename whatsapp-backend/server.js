//importing 
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js'
import Pusher from 'pusher';
import cors from 'cors';
// const Pusher = require("pusher");

//app config
const app = express(); //Creating application instance.This will allow us to write all the API routes and other stuff.
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1186130",
  key: "b94da7c2603061e66691",
  secret: "75ee18debc73c18572c6",
  cluster: "ap2",
  useTLS: true
});
//middleware
app.use(express.json());  //Without this line it won't return in a good format, the response of the API.

app.use(cors());   //This will set the below mentioned headers directly.
// app.use((req,res,next) => {
//   res.setHeader("Access-Control-Allow-Origin","*");    //We will be allowing requests to come from any endpoint.
//   res.setHeader("Access-Control-Allow-Headers","*");   //We will be omitting any headers.
//   next();
// });

//DB Config
const connection_url = "mongodb://admin:zNP0gFDSg8u4B0jL@cluster0-shard-00-02.z3txe.mongodb.net:27017,cluster0-shard-00-01.z3txe.mongodb.net:27017,cluster0-shard-00-00.z3txe.mongodb.net:27017/main?ssl=true&replicaSet=Main-shard-0&authSource=admin&retryWrites=true";
// To connect to the mongoose database
mongoose.connect(connection_url,{
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("DB connected...");
const msgCollection = db.collection("messagecontents");
const changeStream = msgCollection.watch();

changeStream.on("change", (change) => {
  console.log(change);

  if(change.operationType == "insert"){
    const messageDetails = change.fullDocument;
    pusher.trigger("messages","inserted",{
      name: messageDetails.name,
      message: messageDetails.message,
      timestamp: messageDetails.timestamp,
      received: messageDetails.received,
    });
  }else{
    console.log("Error triggering pusher");
  }
  });
});
// ???


//api routes
app.get('/',(req,res)=>res.status(200).send('hello world'));

app.get('/messages/sync',(req,res)=>{
  // The below method will find all the messages.
    Messages.find((err,data)=>{
    if(err){
        res.status(500).send(err);
    } else {
        res.status(200).send(data);
    }
  })
})

app.post('/messages/new',(req,res)=>{
  // Passing message structure in the reuest body
  const dbMessage = req.body    
  //We will be saving dbMessage in the Messages
  Messages.create(dbMessage, (err,data) => {
    if(err){
        res.status(500).send(err);
    } else {
        res.status(201).send(data);
    }
  })
})
//listen
app.listen(port,()=>console.log('Listening on localhost:${port}'));