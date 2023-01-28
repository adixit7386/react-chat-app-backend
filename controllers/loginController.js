const customErrorHandler = require("../services/customErrorHandler");
const User = require("../models/User");
const verifyToken = require("../middleware/verifyToken");
const bcrypt = require("bcrypt");
const generateToken = require("../middleware/generateToken");
const loginController = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return next(customErrorHandler.userNotFound("User not found"));
    }
    try {
      const isCorrectPassword = await bcrypt.compare(password, user.password);
      if (isCorrectPassword) {
        let { password, ...others } = user._doc;
        others.accessToken = generateToken(others._id, false);

        res.status(201).json(others);
      } else {
        return next(customErrorHandler.wrongCredentials("password is wrong"));
      }
    } catch (err) {
      return next(err);
    }
  } catch (err) {
    return next(err);
  }
};

module.exports = loginController;
