const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  chatUsers: {
    type: Array,
    require: true,
  },

  message: {
    type: String,
    require: true,
  },

  sender: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("messages", MessageSchema);
