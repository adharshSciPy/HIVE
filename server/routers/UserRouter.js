const express = require('express')
const router = express.Router()
const userController = require('../controllers/UserController')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/verifyToken', userController.verifyToken)
router.post('/findAccount', userController.findAccount)
router.put('/updatePassword/:id', userController.updatePassword)


module.exports = router