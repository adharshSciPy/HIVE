const PostSchema = require("../models/postSchema");
const ScheduleSchema = require("../models/scheduleSchema")
const UserSchema = require("../models/userSchema");

module.exports = {
  getAllPublics: async (req, res) => {
    const publicList = await UserSchema.find({ role: "public" });
    try {
      if (!publicList) {
        res.status(400).json({ message: "No users Found" });
      }
      res.status(200).json({ message: "USers Found", publicList });
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
    }
  },

  getAllStudents: async (req, res) => {
    const studentList = await UserSchema.find({ role: "student" });
    try {
      if (!studentList) {
        res.status(400).json({ message: "No Users Found" });
      }
      res.status(200).json({ message: "Users Found", studentList });
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
    }
  },

  getAllPosts: async (req, res) => {
    const postLists = await PostSchema.find({ status: false });

    try {
      if (!postLists) {
        res.status(400).json({ message: "No Posts Found" });
      }
      res.status(200).json({ message: "Posts Found", postLists });
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
    }
  },

  getPostsHistory: async (req, res) => {
    const postLists = await PostSchema.find({ status: true });

    try {
      if (!postLists) {
        res.status(400).json({ message: "No Posts Found" });
      }
      res.status(200).json({ message: "Posts Found", postLists });
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
    }
  },

  getCount: async (req, res) => {
    try {
      const studentCount = await UserSchema.countDocuments({ role: "student" })
      const publicCount = await UserSchema.countDocuments({ role: "public" })
      const postCount = await PostSchema.countDocuments({ status: false })

      if (!studentCount && !publicCount && !postCount) {
        res.status(400).json({ message: 'Api failed' })
      }
      else {
        res.status(201).json({ message: "All feilds count returned", publicCount, studentCount, postCount })
      }
    }

    catch (err) {
      res.status(500).json({ message: "Server Error" });
    }
  },


  deletePost: async (req, res) => {
    const { _id } = req.params.id;
    const deleteApi = await PostSchema.deleteOne({
      _id: req.params.id,
    });

    if (!deleteApi) {
      res.status(400).json({ message: "Delete operation failed" });
    }
    res.status(200).json({ message: "Delete Succesfull" });
  },

  updatePost: async (req, res) => {
    const postId = req.params.id;

    try {
      const updateResult = await PostSchema.updateOne(
        { _id: postId },
        { status: true }
      );

      if (updateResult.nModified === 0) {
        return res.status(404).json({ message: 'Post not found or already approved' });
      }

      return res.status(200).json({ message: 'Post approved successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server Error' });
    }
  },


  deleteStudent: async (req, res) => {
    const { _id } = req.params.id;
    const deleteApi = await UserSchema.deleteOne({
      _id: req.params.id,
    });

    if (!deleteApi) {
      res.status(400).json({ message: "Student deletion failed" });
    }
    res.status(200).json({ message: "Delete Succesfull" });
  },

  deletePublic: async (req, res) => {
    const { _id } = req.params.id;
    const deleteApi = await UserSchema.deleteOne({
      _id: req.params.id,
    });

    if (!deleteApi) {
      res.status(400).json({ message: "Public deletion failed" });
    }
    res.status(200).json({ message: "Delete Succesfull" });
  }
}
