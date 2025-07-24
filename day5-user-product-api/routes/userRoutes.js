const express = require('express')
const router = express.Router()

const auth = require('../middlewares/authMiddleware')
const role = require('../middlewares/roleMiddleware')

const { getAll, getUserById, deleteUser, deleteAll } = require('../controllers/userController')

router.use(auth, role(['admin']))

router.get('/', getAll)
router.get('/:id', getUserById)

router.delete('/', deleteAll)
router.delete('/:id', deleteUser) 

module.exports = router