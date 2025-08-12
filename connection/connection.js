const mongoose = require('mongoose');

const connection = async () => {
  try {
    await mongoose.connect("mongodb+srv://tajwar:123456%2B-@cluster0.ypu1z6u.mongodb.net/");
    console.log("✅ Database Connected");
  } catch (err) {
    console.error("❌ Not Connected:", err.message);
    process.exit(1); // Optional: stop the server on DB connection failure
  }
};

connection();
