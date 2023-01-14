const dotenv = require("dotenv");
const customErrorHandler = require("../services/customErrorHandler");

dotenv.config();

//variables
const debugMode = process.env.DEBUG_MODE;

const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let data = {
    message: "internal server error",
    ...(debugMode === "true" && { originalError: err.message }),
  };

  if (err instanceof customErrorHandler) {
    statusCode = err.status;
    data = {
      message: err.message,
    };
  }
  res.status(statusCode).json(data);
};

module.exports = errorHandler;
