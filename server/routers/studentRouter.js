const express = require("express");
const router = express.Router();
const studentController = require("../controllers/StudentController");

router.get("/getAllPublic", studentController.getAllPublic);
router.get("/getAllPosts/:userId", studentController.getAllPost);
router.get("/getAppliedPosts/:userId", studentController.getAppliedPost);
router.get("/getAllCertificates/:userId", studentController.getAllCertificates);
router.get("/getProfile/:userId", studentController.getProfile);
router.get(
  "/getScheduledClassById/:id",
  studentController.getScheduledClassById
);
router.post('/applyPost/:postId/:userId', studentController.applyPost)

module.exports = router;
