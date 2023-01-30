const Chat = require("../models/Chat");
const User = require("../models/User");
const Message = require("../models/Message");
const customErrorHandler = require("../services/customErrorHandler");
const CreateGroupChatControllers = async (req, res, next) => {
  if (!req.body.users || !req.body.ChatName) {
    return next(
      customErrorHandler.inCompleteContent("Please Fill all the details")
    );
  }
  var users = JSON.parse(req.body.users);
  if (users.length < 2) {
    return next(
      customErrorHandler.inCompleteContent(
        "More than 2 users are required to form a group chat"
      )
    );
  }
  users.push(req.user._id);

  try {
    const GroupChat = new Chat({
      ChatName: req.body.ChatName,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user._id,
    });
    var groupChat = await GroupChat.save();
    groupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.json(groupChat).status(201);
  } catch (err) {
    return next(err);
  }
};
module.exports = CreateGroupChatControllers;
