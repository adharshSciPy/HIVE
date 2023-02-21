const ScheduleSchema = require("../models/scheduleSchema");
const fs = require('fs')

module.exports = {
  scheduleClass: async (req, res, next) => {
    const { title, batchId, date, time, pdf } = req.body;
    const { filename } = req.file;
    res.status(200).json({ message: 'Posted Succesfully' })
    try {
      const scheduleData = await ScheduleSchema.create({
        title,
        time,
        date,
        pdfName: filename,
        status: true
      })
    }
    catch (err) {
      console.log(err)
      res.status(500).json({ message: 'Server Error' })
    }
  },

  // api to get the scheduled class details in student
  getScheduledClass: async (req, res) => {
    const ScheduledClass = await ScheduleSchema.find({ status: true })

    try {
      if (!ScheduledClass) {
        res.status(400).json({ message: 'No Classes Scheduled' })
      }
      console.log(ScheduledClass)
      res.status(200).json({ message: "Classes Scheduled", ScheduledClass })
    }

    catch (err) {
      res.status(500).json({ message: 'Server Error' })
    }
  },


  getClassHistory: async (req, res) => {
    const classHistory = await ScheduleSchema.find({ status: false })

    try {
      if (!classHistory) {
        res.status(400).json({ message: 'Class History Not Found' })
      }

      res.status(200).json({ message: "Class History Founded", classHistory })
    }

    catch (err) {
      res.status(500).json({ message: 'Server Error' })
    }
  },


  // api to download pdf
  downloadPdf: async (req, res) => {
    const { fileName } = req.body
    const pdf = `/server/uploads/${fileName}`;
    const file = `${__dirname}/${pdf}`;


    try {
      if (!file) {
        res.status(400).json({ message: 'Pdf Note Found' })
      }
      res.status(200).json({ message: 'Pdf Founded' })
      res.download(file) // Set disposition and send it.
    }
    catch (err) {
      res.status(400).json({ message: 'Server Error' })
    }
  }
};
