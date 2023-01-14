const express = require("express");
const dotenv = require("dotenv");
const chats = require("./data");
dotenv.config();
const app = express();
const APP_PORT = process.env.APP_PORT || 3000;

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/api/chat", (req, res) => {
  res.send(chats);
});
app.listen(5000, () => {
  console.log("server is running on the port ", APP_PORT);
});
