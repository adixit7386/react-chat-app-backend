const User = require("../models/User");
const AllUsers = async (req, res, next) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { username: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  try {
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    // const users = await User.find(keyword);

    res.json(users).status(201);
  } catch (err) {
    return next(err);
  }
};

module.exports = AllUsers;
