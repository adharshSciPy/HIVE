const express = require("express");
const router = express.Router();
const publicController = require("../controllers/PublicController");
const multerConfig = require("../multer/config");

router.post(
  "/scheduleClass",
  multerConfig.upload.single("pdf"),
  publicController.scheduleClass
);
router.get("/getScheduledClass", publicController.getScheduledClass);
router.get("/getClassHistory", publicController.getClassHistory);
router.post("/downloadPdf", publicController.downloadPdf);
router.delete("/deleteClass", publicController.deleteClass);   

module.exports = router;
