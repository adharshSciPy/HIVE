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

  pdfName: [Object],

  status: {
    type: Boolean,
  },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("schedule", ScheduleSchema);
