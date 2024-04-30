const express = require("express");
const router = express.Router();
const publicController = require("../controllers/PublicController");
const { upload } = require("../multer/config");

router.post(
  "/scheduleClass",
  upload.single("file"),
  publicController.scheduleClass
);
router.post("/post", upload.single("file"), publicController.post);
router.get("/getScheduledClass/:id", publicController.getScheduledClass);
router.get("/getClassHistory/:id", publicController.getClassHistory);
router.get("/downloadPdf/:id", publicController.downloadPdf);
router.get("/viewClassPdf/:id", publicController.viewClassPdf);
router.delete("/deleteClass/:id", publicController.deleteClass);
router.put("/updateStatus/:id", publicController.updateStatus);
router.get("/getAllPosts/:id", publicController.getAllPost);
router.delete("/deletePost/:id", publicController.deletePost);
router.post(
  "/uploadCertificate",
  upload.single("file"),
  publicController.uploadCertificate
);

module.exports = router;
