import express from 'express'
import {
    createOrder,
    getAllOrders,
    getMyOrders
} from '../controllers/orderController.js'

import { authenticate, authorizeRoles } from '../middleware/auth.js'

const router = express.Router()

// Protected routes
router.post('/', authenticate, createOrder)
router.get('/me', authenticate, getMyOrders)
router.get('/all', authenticate, authorizeRoles('admin'), getAllOrders)

export default router
