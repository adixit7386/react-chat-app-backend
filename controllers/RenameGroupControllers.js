const Chat = require("../models/Chat");
const User = require("../models/User");
const Message = require("../models/Message");

const RenameGroupControllers = async (req, res, next) => {
  const { ChatName, ChatId } = req.body;

  try {
    const renamedChat = await Chat.findByIdAndUpdate(
      ChatId,
      { ChatName: ChatName },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    res.json(renamedChat).status(200);
  } catch (error) {
    return next(error);
  }
};

module.exports = RenameGroupControllers;
