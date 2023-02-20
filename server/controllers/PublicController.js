const ScheduleSchema = require("../models/scheduleSchema");

module.exports = {
  scheduleClass: async (req, res, next) => {
    const { title, batchId, date, time, pdf } = req.body;
    console.log(req.body);

    try {
      // multer configureations
      // Set up storage for uploaded files
      const storage = multer.memoryStorage();

      // Set up file filter for uploaded files
      const fileFilter = function (req, file, cb) {
        const filetypes = /pdf/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(
          file.originalname.split(".").pop().toLowerCase()
        );
        if (mimetype && extname) {
          return cb(null, true);
        } else {
          cb("Error: Only PDF files are allowed!");
        }
      };

      // Set up Multer middleware with storage and file filter options
      const upload = multer({
        storage: storage,
        fileFilter: fileFilter,
      });
    } catch (err) {
      res.status(500).json({ message: "Server Error" });
    }
  },
};
