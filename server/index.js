const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const { mongooseConnection } = require("./database/db");
const { router } = require("./routes/users");
const { userAuthentication } = require("./auth/user");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { saveMessage } = require("./controllers/messages");
const { messagesRouter } = require("./routes/messages");
const { tripRouter } = require("./routes/userTripData");
const {feedbackRouter} = require("./routes/userFeedback")

const app = express();
app.use(cors());
app.use(express.json());
app.get("/auth", userAuthentication);
app.use(router);
app.use(messagesRouter);
app.use(tripRouter);
app.use(feedbackRouter);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const userMap = new Map();

io.on("connection", (socket) => {
  console.log(`User connected with socket ID: ${socket.id}`);

  socket.on("token", (token) => {
    const user_email = jwt.verify(token, "secret_key");
    userMap.set(user_email, socket.id);
    console.log("User map:", Array.from(userMap.entries()));

    socket.emit("user_email", user_email);
  });

  socket.on("msg", async (msg) => {
    const receiverID = userMap.get(msg.receiver);
    if (receiverID) {
      socket.to(receiverID).emit("msg", msg);
      // storing messages to database
      await saveMessage(msg.sender, msg.receiver, msg.msg);
    }

    console.log("User map:", Array.from(userMap.entries()));
  });

  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`);

    for (const [user_email, id] of userMap.entries()) {
      if (id === socket.id) {
        userMap.delete(user_email);
        break;
      }
    }
  });
});

// database connectivety
mongooseConnection(process.env.MONGODB_URL);

server.listen(process.env.PORT || 8080, () => {
  console.log("server is running...");
});
