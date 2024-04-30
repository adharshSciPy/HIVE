const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/getAllPublics", adminController.getAllPublics);
router.get("/getAllStudents", adminController.getAllStudents);
router.get("/getAllPosts", adminController.getAllPosts);
router.get("/getPostHistory", adminController.getPostsHistory);
router.get("/getCount", adminController.getCount);
router.delete("/deletePost/:id", adminController.deletePost)
router.delete("/deletePublic/:id", adminController.deletePublic)
router.delete("/deleteStudent/:id", adminController.deleteStudent)
router.put("/updatePost/:id", adminController.updatePost)

module.exports = router;
