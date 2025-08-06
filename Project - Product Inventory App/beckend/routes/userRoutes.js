const express = require('express')
const router = express.Router()
const Controller = require('../controllers/userController');
const {authorize : auth, roleAuthorise : role} = require('../middleware/auth');

router.post('/register', Controller.registerUser)
router.post('/login', Controller.loginUser)
router.get('/me', auth, Controller.viewProfile)

module.exports = router