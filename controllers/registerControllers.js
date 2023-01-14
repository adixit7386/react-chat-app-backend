const customErrorHandler = require("../services/customErrorHandler");
const User = require("../models/User");
const registerController = async (req, res, next) => {
  const { name, username, email, password, image } = req.body;
  console.log(name, username, email, password, image);
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
    const user = await User.create({
      name,
      email,
      username,
      password,
      image,
    });
    try {
      const savedUser = await user.save();

      const { password, ...others } = savedUser._doc;
      res.status(201).json(others);
    } catch (err) {
      return next(err);
    }
  } catch (err) {
    return next(err);
  }
};

module.exports = registerController;
