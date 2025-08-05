import express from 'express'
import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} from '../controllers/productController.js'

import { authenticate, authorizeRoles } from '../middleware/auth.js'

const router = express.Router()

// Public route
router.get('/', getAllProducts)
router.get('/:id', getProductById)

// Admin protected routes
router.post('/', authenticate, authorizeRoles('admin'), createProduct)
router.put('/:id', authenticate, authorizeRoles('admin'), updateProduct)
router.delete('/:id', authenticate, authorizeRoles('admin'), deleteProduct)

export default router
