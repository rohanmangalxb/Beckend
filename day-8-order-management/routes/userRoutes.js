const express = require('express')
const router = express.Router()
const Controller = require('../controllers/userController');
const {authorize : auth, roleAuthorise : role} = require('../middleware/auth');

router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.get('/profile', auth, Controller.viewProfile)

router.delete('/:id', role(['admin']), Controller.deleteUser)

module.exports = router