const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController.js");

router.get('/getChatUsers/:userId', chatController.getChatUser);
router.post("/postMessage", chatController.postMessage);
router.get("/getMessages/:sender/:receiver", chatController.getAllMessages);
module.exports = router;
