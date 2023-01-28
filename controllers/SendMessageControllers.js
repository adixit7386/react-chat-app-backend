const customErrorHandler = require("../services/customErrorHandler");
const Message = require("../models/Message");
const User = require("../models/User");
const Chat = require("../models/Chat");
const SendMessageControllers = async (req, res, next) => {
  const { message, chatId } = req.body;

  if (!message || !chatId) {
    return next(customErrorHandler.inCompleteContent("send sufficient data"));
  }

  const newMessage = new Message({
    sender: req.user._id,
    content: message,
    Chat: chatId,
  });

  try {
    var data = await newMessage.save();
    data = await data.populate("sender", "name image email");
    data = await data.populate("Chat");
    data = await User.populate(data, {
      path: "Chat.users",
      select: "name image email",
    });
    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: data,
    });
    res.json(data).status(201);
  } catch (err) {
    return next(err);
  }
};

module.exports = SendMessageControllers;
