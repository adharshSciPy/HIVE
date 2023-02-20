const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  batchId: {
    type: String,
    required: true,
  },

  time: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
  },

  pdf: {
    type: String,
    data: Buffer,
  },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("schedule", ScheduleSchema);
