const mongoose = require("mongoose");

// //* connecting to the database using mongoose (old code)
// const mongoose = require("mongoose");
// mongoose
//   .connect("mongodb://127.0.0.1:27017/firstdb-youtube")
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.log("Error connecting to MongoDB:", err));

//* connecting to the database using mongoose (new code)

async function connectMongoDb(url) {
  return mongoose.connect(url);
}

module.exports = {
  connectMongoDb,
};
