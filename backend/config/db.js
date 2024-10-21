const { default: mongoose } = require("mongoose");

const connection = {};
const connectDb = async () => {
  if (connection.isConnected) {
    console.log("Already connected to database");
    return;
  }

  try {
    const db = await mongoose.connect(
      "mongodb+srv://karanthakurr2001:Singh8750@cluster0.1t9ms.mongodb.net/" ||
        "",
      {}
    );
    connection.isConnected = db.connections[0].readyState;
    console.log("Database connected successfully");
  } catch (error) {
    console.log("MongoDB error", error);
    process.exit(1);
  }
};

module.exports = connectDb;
