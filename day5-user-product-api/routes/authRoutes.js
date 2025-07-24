const express = require('express')
const router = express.Router()
const auth = require('../middlewares/authMiddleware')

const { registerUser, login, getUser } = require('../controllers/authController')

router.get('/me', auth, getUser)
router.post('/register', registerUser)
router.post('/login', login)

module.exports = router