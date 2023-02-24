const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  time: {
    type: String,
    required: true,
  },

  date: {
    type: String,
  },

  pdfName: {
    type: String,
  },


  status: {
    type: Boolean,
  },


  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("schedule", ScheduleSchema);
