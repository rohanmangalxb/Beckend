const express = require('express')
const router = express.Router()
const Controller = require('../controllers/userController');
const {authorize : auth, roleAuthorise : role} = require('../middleware/auth');

router.post('/register', Controller.registerUser)
router.post('/login', Controller.loginUser)
router.get('/profile', auth, Controller.viewProfile)

router.delete('/:id',auth, role(['admin']), Controller.deleteUser)
router.delete('/',auth, role(['admin']), Controller.deleteAll)

module.exports = router