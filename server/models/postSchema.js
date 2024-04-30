const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const PostSchema = new Schema({
  
  ownerID: {
    type: mongoose.Types.ObjectId,
    required: true,
  },

  appliedUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],

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
    type: Date,
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

  status : {
    type: Boolean
  },

  imageName : String,

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("posts", PostSchema);
