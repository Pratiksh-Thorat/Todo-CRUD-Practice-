const mongoose = require("mongoose");

const db = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://pratiksha_14:skillhub_14@cluster0.l4bi5.mongodb.net/resumeapp?retryWrites=true&w=majority"
    );
    console.log("localhost running on 5000");
  } catch (error) {
    console.log("Error!!!" + error);
    process.exit();
  }
};

module.exports = db;
