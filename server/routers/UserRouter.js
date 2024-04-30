const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const { upload } = require("../multer/config");


router.post("/register", upload.single('file'), userController.register);
router.post("/login", userController.login);
router.get("/getAllUsers", userController.getAllUser);
router.post("/verifyToken", userController.verifyToken);
router.post("/findAccount", userController.findAccount);
router.put("/updatePassword/:id", userController.updatePassword);
router.get("/getAccountWithId/:id", userController.getAccountWithID);

module.exports = router;
