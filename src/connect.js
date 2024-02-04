const mongoose = require("mongoose");

function Connect() {
  mongoose.connect(process.env.URI).then(() => {
    console.log("Database Connected");
  });
}

module.exports = Connect;
