const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
  ownerID: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },

  appliedUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],

  time: {
    type: String,
    required: true,
  },

  meetLink: {
    type: String,
    required: true,
  },

  date: {
    type: String,
  },

  pdfName: String,

  status: {
    type: Boolean,
  },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("schedule", ScheduleSchema);
