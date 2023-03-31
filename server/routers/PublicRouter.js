const express = require("express");
const router = express.Router();
const publicController = require("../controllers/PublicController");
const {upload} = require("../multer/config");


router.post(
  "/scheduleClass",
  upload.single('file'),
  publicController.scheduleClass
);


router.get("/getScheduledClass/:id", publicController.getScheduledClass);
router.get("/getClassHistory/:id", publicController.getClassHistory);
router.post("/downloadPdf", publicController.downloadPdf);
router.delete("/deleteClass/:id", publicController.deleteClass);
router.put("/updateStatus/:id", publicController.updateStatus);
router.post("/post", publicController.post);
router.get('/getAllPosts/:id', publicController.getAllPost)
router.delete('/deletePost/:id', publicController.deletePost)


module.exports = router;
