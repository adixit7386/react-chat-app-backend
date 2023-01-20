const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("mongoDB connected successfully ", conn.connection.host);
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
