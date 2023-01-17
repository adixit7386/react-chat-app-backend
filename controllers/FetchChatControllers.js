const Chat = require("../models/Chat");
const User = require("../models/User");
const Message = require("../models/Message");

const FetchChatControllers = async (req, res, next) => {
  const userId = req.user._id;
  try {
    var Chats = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage");

    Chats = await User.populate(Chats, {
      path: "latestMessage.sender",
      select: "name pic email",
    });
    return res.json(Chats).status(201);
  } catch (error) {
    return next(error);
  }
  res.json(userId).status(201);
};

module.exports = FetchChatControllers;
