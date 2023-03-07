const UserSchema = require("../models/userSchema");
const ScheduleSchema = require("../models/scheduleSchema");
const postSchema = require("../models/postSchema");
const mongoose = require("mongoose");

module.exports = {
  getAllPublic: async (req, res) => {
    const fields = ["fullName", "_id"];
    const public = await UserSchema.find({ role: "public" }, fields);

    try {
      if (!public) {
        res.status(400).json({ message: "No public found" });
      }
      res.status(200).json({ message: "Public Founded", public });
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
    }
  },

  getScheduledClassById: async (req, res) => {
    const id = req.params.id;
    const idString = id.toString();

    if (!mongoose.Types.ObjectId.isValid(idString)) {
      return res.status(400).send("Invalid ID");
    }
    const query = {
      ownerID: mongoose.Types.ObjectId(idString),
      status: true,
    };
    const scheduledClass = await ScheduleSchema.find(query);

    try {
      if (!scheduledClass)
        res.status(400).json({ message: "No classes Scheduled" });
      res.status(200).json({ message: "Classes Found", scheduledClass });
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
    }
  },

  getAllPost: async (req, res) => {
    const today = new Date();
    const query = {
      status: true,
      date: { $lte: today }
    }
    const posts = await postSchema.find(query);

    try {
      if (!posts) {
        res.status(400).json({ message: "No posts" });
      }
      res.status(200).json({ message: "Success", posts });
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
    }
  },
};
