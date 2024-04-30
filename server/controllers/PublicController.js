const ScheduleSchema = require("../models/scheduleSchema");
const PostSchema = require("../models/postSchema");
const userSchema = require("../models/userSchema");
const certificate = require("../models/certificate");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

module.exports = {
  scheduleClass: async (req, res) => {
    const { title, date, time, meetLink, userID } = req.body;

    try {
      const scheduleData = await ScheduleSchema.create({
        ownerID: userID,
        title,
        time,
        date,
        meetLink,
        pdfName: req.file ? req.file.filename : null,
        status: true,
      });
      if (!scheduleData) {
        res.status(400).json({ message: "Posting Failed" });
      }
      res.status(200).json({ message: "Posted Succesfully" });
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
    }
  },

  getScheduledClass: async (req, res) => {
    const { _id } = req.params.id;
    const ScheduledClass = await ScheduleSchema.find({
      ownerID: req.params.id,
      status: true,
    });
    try {
      if (!ScheduledClass) {
        res.status(400).json({ message: "No Classes Scheduled" });
      }
      res.status(200).json({ message: "Classes Scheduled", ScheduledClass });
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
    }
  },

  getClassHistory: async (req, res) => {
    const { _id } = req.params.id;
    const classHistory = await ScheduleSchema.find({
      ownerID: req.params.id,
      status: false,
    });

    try {
      if (!classHistory) {
        res.status(400).json({ message: "Class History Not Found" });
      }

      res.status(200).json({ message: "Class History Founded", classHistory });
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
    }
  },

  deleteClass: async (req, res) => {
    const { _id } = req.params.id;
    const deleteApi = await ScheduleSchema.deleteOne({
      _id: req.params.id,
    });

    try {
      if (!deleteApi) {
        res.status(400).json({ message: "Delete Operation failed" });
      }
      res.status(200).json({ message: "Succesfully Deleted" });
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
    }
  },

  downloadPdf: async (req, res) => {
    try {
      const cert = await certificate.findById(req.params.id);
      if (!cert) {
        return res.status(404).send("Certificate not found");
      }
      const filePath = path.join(__dirname, "../uploads/", cert.certificate);
      res.download(filePath, cert.title + ".pdf");
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  },

  viewClassPdf: async (req, res) => {
    try {
      const course = await ScheduleSchema.findById(req.params.id);
      if (!course) {
        return res.status(404).send("course notes not found");
      }
      const filePath = path.join(__dirname, "../uploads/", course.pdfName);
      res.download(filePath, course.title + ".pdf");
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  },

  updateStatus: async (req, res) => {
    const { _id } = req.params.id;
    const { status } = req.body;
    const updateApi = await ScheduleSchema.updateOne(
      { _id: req.params.id },
      { status: false }
    );

    try {
      if (!updateApi) {
        res.status(400).json({ message: "Failed, Try Again" });
      }
      res.status(200).json({ message: "Class Finished" });
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
    }
  },

  // api for posting post in public
  post: async (req, res) => {
    const {
      userID,
      title,
      postType,
      date,
      price,
      meetLink,
      company,
      place,
      salary,
    } = req.body;

    try {
      const post = await PostSchema.create({
        ownerID: userID,
        title,
        postType,
        date,
        price,
        meetLink,
        company,
        place,
        salary,
        imageName: req.file ? req.file.filename : null, // push file object to array
        status: false,
      });

      if (!post) {
        res.status(400).json({ message: 'Posting "Failed! Try Again' });
      }
      res.status(200).json({ message: "Posted Succesfully" });
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
    }
  },

  getAllPost: async (req, res) => {
    const { _id } = req.params.id;
    const posts = await PostSchema.find({ ownerID: req.params.id });

    try {
      if (!posts) {
        res.status(400).json({ message: "Posts Not found in this account" });
      }
      res.status(200).json({ message: "Post Found", posts });
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
    }
  },

  deletePost: async (req, res) => {
    const { _id } = req.params.id;
    const deleteApi = await PostSchema.deleteOne({
      _id: req.params.id,
    });

    try {
      if (!deleteApi) {
        res.status(400).json({ message: "Delete Operation failed" });
      }
      res.status(200).json({ message: "Post Deleted" });
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
    }
  },

  uploadCertificate: async (req, res) => {
    const { studentId, title } = req.body;

    try {
      const addCertificate = await certificate.create({
        title: title,
        studentId: studentId,
        certificate: req.file ? req.file.filename : null,
      });

      if (!addCertificate) {
        res.status(400).json({ message: "Certificate adding failed" });
      } else {
        res.status(200).json({ message: "Certificate added Succesfully" });
      }
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
    }
  },
};
