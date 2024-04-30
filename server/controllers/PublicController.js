const ScheduleSchema = require("../models/scheduleSchema");
const PostSchema = require("../models/postSchema");
const userSchema = require("../models/userSchema");
const certificate = require("../models/certificate")
const jwt = require("jsonwebtoken");
const fileSizeFormatter = require('./fileformat')



module.exports = {
  scheduleClass: async (req, res, next) => {
    const { title, date, time, meetLink, userID } = req.body;
    console.log(req.file);

    try {
      const file = {
        fileName: req.file.originalname,
        filePath: req.file.path,
        fileType: req.file.mimetype,
        fileSize: fileSizeFormatter(req.file.size, 2) // 0.00
      };

      const scheduleData = await ScheduleSchema.create({
        ownerID: userID,
        title,
        time,
        date,
        meetLink,
        pdfName: file,
        status: true,
      });
      if (!scheduleData) {
        res.status(400).json({ message: "Posting Failed" });
      }
      console.log(scheduleData);
      res.status(200).json({ message: "Posted Succesfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server Error" });
    }
  },

  // api to get the scheduled class details in student
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

  // delete api
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
      console.log(err);
      res.status(500).json({ message: "Server Error" });
    }
  },

  // api to download pdf
  downloadPdf: async (req, res) => {
    const { fileName } = req.body;
    const pdf = `/server/uploads/${fileName}`;
    const file = `${__dirname}/${pdf}`;

    try {
      if (!file) {
        res.status(400).json({ message: "Pdf Note Found" });
      }
      res.status(200).json({ message: "Pdf Founded" });
      res.download(file); // Set disposition and send it.
    } catch (err) {
      res.status(400).json({ message: "Server Error" });
    }
  },

  // api to update status of schedule class to history class
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

    console.log("post image file" + JSON.stringify(req.file))

    const file = {
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2) // 0.00
    };


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
        imageName: [file], // push file object to array
        status: false,
      });

      if (!post) {
        res.status(400).json({ message: 'Posting "Failed! Try Again' });
      }
      res.status(200).json({ message: "Posted Succesfully" });
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
      console.log(err);
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
      console.log(err);
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
      console.log(err);
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
