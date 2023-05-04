const UserSchema = require("../models/userSchema");
const ScheduleSchema = require("../models/scheduleSchema");
const postSchema = require("../models/postSchema");
const certificiateSchema = require("../models/certificate");
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
    try {
      const today = new Date();
      const query = {
        status: true,
        date: { $lte: today }
      }
      const posts = await postSchema.find(query);

      if (!posts) {
        return res.status(400).json({ message: "No posts" });
      }

      // Map through the posts and append image details
      const postsWithImages = await Promise.all(
        posts.map(async (post) => {
          const image = {
            fileName: post.imageName[0].fileName,
            filePath: post.imageName[0].filePath,
            fileType: post.imageName[0].fileType,
            fileSize: post.imageName[0].fileSize,
          };

          return {
            ...post._doc,
            imageName: image,
          };
        })
      );

      res.status(200).json({ message: "Success", posts: postsWithImages });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  },

  getAllCertificates: async (req, res) => {
    const { userId } = req.params
    try {

      const certificates = await certificiateSchema.find({ studentId: userId })

      if (!certificates) {
        return res.status(400).json({ message: "No Certificates" });
      }

      // Map through the posts and append image details
      const myCertificates = await Promise.all(
        certificates.map(async (certificate) => {
          const cert = {
            fileName: certificate.certificate[0].fileName,
            filePath: certificate.certificate[0].filePath,
            fileType: certificate.certificate[0].fileType,
            fileSize: certificate.certificate[0].fileSize,
          };

          return {
            ...certificate._doc,
            certificate: cert,
          };
        })
      );

      res.status(200).json({ message: "Success", certificates: myCertificates });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  },
};
