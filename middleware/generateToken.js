const jwt = require("jsonwebtoken");

const generateToken = (_id, isAdmin) => {
  const token = jwt.sign(
    { _id: _id, isAdmin: isAdmin },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
  return token;
};

module.exports = generateToken;
