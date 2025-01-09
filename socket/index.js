const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const jwt = require("jsonwebtoken")
const server = http.createServer(app);
const {saveMessage} = require("../server/controllers/messages")
const {Message} = require("../server/models/messages")

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});



const userMap = new Map();

io.on("connection",(socket) => {
//   console.log(`User connected with socket ID: ${socket.id}`);

  socket.on("token", (token) => {
    const user_email = jwt.verify(token, "secret_key");
    userMap.set(user_email, socket.id);
    // console.log("User map:", Array.from(userMap.entries()));

    socket.emit("user_email", user_email);
  });

  socket.on("msg", async (msg) => {
    const receiverID = userMap.get(msg.receiver);
    // console.log(receiverID , "receiver id" , msg.receiver);
    
    await saveMessage(msg.sender, msg.receiver, msg.msg);
    
    if (receiverID) {
      socket.to(receiverID).emit("msg", msg);
    }

    // console.log("User map:", Array.from(userMap.entries()));
  });

  socket.on("disconnect", () => {
    // console.log(`Socket disconnected: ${socket.id}`);

    for (const [user_email, id] of userMap.entries()) {
      if (id === socket.id) {
        userMap.delete(user_email);
        break;
      }
    }
  });
});

server.listen(8081,()=>{
    console.log("socket is connected");
})

