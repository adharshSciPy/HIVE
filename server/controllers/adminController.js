const PostSchema = require("../models/postSchema");
const UserSchema = require("../models/userSchema");

module.exports = {
  getAllPublics: async (req, res) => {
    const publicList = await UserSchema.find({ role: "public" });
    try {
      if (!publicList) {
        res.status(400).json({ message: "No users Found" });
      }
      res.status(200).json({ message: "Users Found", publicList });
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
    }
  },

  getAllStudents: async (req, res) => {
    const studentList = await UserSchema.find({ role: "student" });
    try {
      if (!studentList) {
        res.status(400).json({ message: "No users Found" });
      }
      res.status(200).json({ message: "Users Found", studentList });
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
    }
  },

  getAllPosts: async (req, res) => {
    const postLists = await PostSchema.find();

    try {
      if (!postLists) {
        res.status(400).json({ message: "No users Found" });
      }
      res.status(200).json({ message: "Users Found", postLists });
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
    }
  },
};
