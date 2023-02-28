const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/getAllPublics", adminController.getAllPublics);
router.get("/getAllStudents", adminController.getAllStudents);
router.get("/getAllPosts", adminController.getAllPosts);

module.exports = router;
