const express = require("express");
const dotenv = require("dotenv");
const chats = require("./data");
const cors = require("cors");
const connect = require("./config/mongodb");
const userRouter = require("./router/userRouter");
const chatRouter = require("./router/chatRouter.js");
const ErrorHandler = require("./middleware/errorHandler");
const messageRouter = require("./router/messageRouter");
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
connect();
app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);

app.use(ErrorHandler);

const APP_PORT = process.env.APP_PORT || 3000;
const server = app.listen(
  5000,
  console.log("server is running on the port ", APP_PORT)
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});
io.on("connection", (socket) => {
  socket.on("setup", (userData) => {
    socket.join(userData._id);

    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
  });
  socket.on("typing", (room) => {
    console.log("hello", room);
    socket.in(room).emit("typing", room);
  });
  socket.on("stop typing", (room) => {
    socket.in(room).emit("stop typing", room);
  });
  socket.on("new message", (newMessageReceived) => {
    // console.log(newMessageReceived);
    var chat = newMessageReceived.Chat;
    if (!chat.users) {
      return console.log("chat.users is not defined");
    }
    chat.users.forEach((user) => {
      if (user._id == newMessageReceived.sender._id) {
        return;
      }
      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });
  socket.off("setup", () => {
    socket.leave(userData._id);
  });
});
