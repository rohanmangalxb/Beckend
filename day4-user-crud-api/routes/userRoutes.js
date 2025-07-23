const express = require('express')
const router = express.Router();

const userController = require('../controllers/userController')

router.get('/users', userController.getAll);
router.get('/users/:id', userController.userById);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.update);
router.delete('/users/:id', userController.del);
router.delete('/users/', userController.delAll);

module.exports = router;