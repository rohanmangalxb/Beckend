const express  = require('express');
const router = express.Router();

const userController = require('../controllers/userController')

//admin part
router.get('./user/amdin', userController.adminUser)

//user part
router.get('/user/', userController.getAll)
router.get('/user/:id', userController.userById)