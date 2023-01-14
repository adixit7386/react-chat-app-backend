const express = require("express");
const dotenv = require("dotenv");
const chats = require("./data");
const cors = require("cors");
const connect = require("./config/mongodb");
const userRouter = require("./router/userRouter");
const ErrorHandler = require("./middleware/errorHandler");
const notFound = require("./services/notFound");
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
connect();

app.use("/api/user", userRouter);

app.use(ErrorHandler);

const APP_PORT = process.env.APP_PORT || 3000;
app.listen(5000, () => {
  console.log("server is running on the port ", APP_PORT);
});
