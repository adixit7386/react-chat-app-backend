const Chat = require("../models/Chat");
const User = require("../models/User");
const Message = require("../models/Message");
const AccessChatControllers = async (req, res, next) => {
  const { userId } = req.body;

  if (!userId) {
    return next(customErrorHandler.noUserId("user id not sent"));
  }

  var isChat = await Chat.findOne({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  if (isChat != null) {
    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name pic email",
    });
    return res.json(isChat).status(201);
  } else {
    var ChatData = {
      ChatName: "sender",
      isGroupChat: false,
      users: [userId, req.user._id],
    };

    try {
      const createdChat = await Chat.create(ChatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      return res.json(FullChat).status(201);
    } catch (err) {
      return next(err);
    }
  }
};

module.exports = AccessChatControllers;
