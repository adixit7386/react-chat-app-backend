const Message = require("../models/Message");
const Chat = require("../models/Chat");
const User = require("../models/User");
const FetchMessageControllers = async (req, res, next) => {
  const chatId = req.params.chatId;

  try {
    var messages = await Message.find({ Chat: chatId })
      .populate("sender", "name image email")
      .populate("Chat");
    res.json(messages).status(201);
  } catch (error) {
    return next(error);
  }
};

module.exports = FetchMessageControllers;
