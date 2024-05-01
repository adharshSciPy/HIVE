const UserSchema = require("../models/userSchema");
const ScheduleSchema = require("../models/scheduleSchema");
const postSchema = require("../models/postSchema");
const certificateSchema = require("../models/certificate");
const mongoose = require("mongoose");
const moment = require('moment')

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
    const { userId } = req.params
    try {
      const today = new Date();
      const query = {
        status: true,
        date: { $gte: today },
        appliedUsers: { $nin: [userId] }
      }
      const posts = await postSchema.find(query);

      if (!posts) {
        return res.status(400).json({ message: "No posts" });
      }
      const updatePost = posts.map(post => {
        return {
          _id: post._id,
          appliedUsers: post.appliedUsers,
          postType: post.postType,
          price: post.price,
          date: post.date,
          title: post.title,
          meetLink: post.meetLink,
          place: post.place,
          salary: post.salary,
          status: post.status,
          description: post.description,
          imageName: post.imageName ? `/uploads/${post.imageName}` : null
        };
      });
      res.status(200).json({ message: "Success", posts: updatePost });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  },


  getAppliedPost: async (req, res) => {
    const { userId } = req.params
    try {
      const today = new Date();
      const query = {
        status: true,
        appliedUsers: { $in: [userId] }
      }
      const posts = await postSchema.find(query);

      if (!posts) {
        return res.status(400).json({ message: "No posts" });
      }
      const updatePost = posts.map(post => {
        return {
          _id: post._id,
          appliedUsers: post.appliedUsers,
          postType: post.postType,
          price: post.price,
          date: moment(post.date).format('MM-DD-YYYY'),
          title: post.title,
          meetLink: post.meetLink,
          place: post.place,
          salary: post.salary,
          status: post.status,
          description: post.description,
          imageName: post.imageName ? `/uploads/${post.imageName}` : null
        };
      });
      res.status(200).json({ message: "Success", posts: updatePost });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  },

  getAllCertificates: async (req, res) => {
    const { userId } = req.params;
    try {
      const certificates = await certificateSchema.find({ studentId: userId })
      if (!certificates) {
        return res.status(400).json({ message: "No Certificates" });
      }

      const updatedCertificate = certificates.map(certificate => {
        return {
          _id: certificate._id,
          studentId: certificate.studentId,
          title: certificate.title,
          certificate: certificate.certificate ? `/uploads/${certificate.certificate}` : null
        };
      })

      res.status(200).json({ message: "Success", certificates: updatedCertificate });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  },

  applyPost: async (req, res) => {
    const { postId, userId } = req.params;

    try {
      const findPost = await postSchema.findOne({ _id: postId });
      if (!findPost) {
        res.status(400).json({ message: 'Post not found' });
      } else {
        findPost.appliedUsers.push(userId);
        await findPost.save();
        res.status(200).json({ message: 'Successfully applied for post' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },


  getProfile: async (req, res) => {
    const { userId } = req.params
    const idString = userId.toString();

    if (!mongoose.Types.ObjectId.isValid(idString)) {
      return res.status(400).send("Invalid ID");
    }
    try {
      const student = await UserSchema.find({ _id: idString })

      const profile = {
        id: student[0].id,
        fullName: student[0].fullName,
        college: student[0].college,
        course: student[0].course,
        imageName: student[0].imageName ? `/uploads/${student[0].imageName}` : null
      }
      if (!student) {
        res.status(400).json({ message: "Profile Not Found" })
      }
      res.status(200).json({ message: "User Found", profile })
    }
    catch (err) {
      console.log(err)
      res.status(500).json({ message: "Server Error" });
    }

  },
};
