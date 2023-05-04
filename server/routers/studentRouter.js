const express = require("express");
const router = express.Router();
const studentController = require("../controllers/StudentController");

router.get("/getAllPublic", studentController.getAllPublic);
router.get("/getAllPosts", studentController.getAllPost);
router.get("/getAllCertificates/:userId", studentController.getAllCertificates);
router.get(
  "/getScheduledClassById/:id",
  studentController.getScheduledClassById
);

module.exports = router;
