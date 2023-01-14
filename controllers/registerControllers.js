const customErrorHandler = require("../services/customErrorHandler");
const User = require("../models/User");
const generateToken = require("../middleware/generateToken");
const bcrypt = require("bcrypt");
const registerController = async (req, res, next) => {
  let { name, username, email, password, image } = req.body;
  if (!name || !username || !email || !password) {
    return next(
      customErrorHandler.incompleteData("fill all the necessary details")
    );
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(customErrorHandler.alreadyExist("user already exists"));
  }
  try {
    password = await bcrypt.hash(password, 10);
  } catch (err) {
    return next(err);
  }
  try {
    const user = await User.create({
      name,
      email,
      username,
      password,
      image,
    });
    try {
      const savedUser = await user.save();

      let { password, ...others } = savedUser._doc;
      others.accessToken = generateToken(others._id, false);

      res.status(201).json(others);
    } catch (err) {
      return next(err);
    }
  } catch (err) {
    return next(err);
  }
};

module.exports = registerController;
