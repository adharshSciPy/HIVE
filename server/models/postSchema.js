const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  
  ownerID: {
    type: mongoose.Types.ObjectId,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  postType: {
    type: String,
    required: true,
  },

  price: {
    type: String,
  },

  date: {
    type: String,
  },

  meetLink: {
    type: String,
    trim: true,
  },

  place: {
    type: String,
  },

  salary: {
    type: String,
  },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("posts", PostSchema);
