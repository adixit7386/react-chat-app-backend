const Chat = require("../models/Chat");
const User = require("../models/User");
const Message = require("../models/Message");

const AddToGroupControllers = async (req, res, next) => {
  const { userId, ChatId } = req.body;

  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      ChatId,
      { $push: { users: userId } },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    res.json(updatedChat).status(200);
  } catch (error) {
    return next(error);
  }
};
module.exports = AddToGroupControllers;
