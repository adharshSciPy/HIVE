const mongoose = require("mongoose");

async function connect() {
  // mongodb connection
  mongoose.set("strictQuery", false);
  await mongoose
    .connect(
      "mongodb+srv://adharshscipy:adharshscipy@cluster0.dgrvtap.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log("Mongodb Connected");
    })
    .catch((err) => {
      console.log(
        "Mongo DB Connection failed please check your network connection or contact your developer"
      );
    });
}

module.exports = connect;
