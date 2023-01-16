const Chat = require("../models/Chat");
const User = require("../models/User");
const AccessChatControllers = async (req, res, next) => {
  const { userId } = req.body;
  if (!userId) {
    return next(customErrorHandler.noUserId("user id not sent"));
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: req.userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat).status(201);
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

      res.json(FullChat).status(201);
    } catch (err) {
      return next(err);
    }
  }
};

module.exports = AccessChatControllers;
