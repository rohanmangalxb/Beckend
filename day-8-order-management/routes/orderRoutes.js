const express = require('express')
const router = express.Router()
const Controller = require('../controllers/orderController');
const { authorize: auth, roleAuthorise: role } = require('../middleware/auth');

// POST /api/orders – Create order (requires token) 
// GET /api/orders/user/:userId – Get user's orders 
// GET /api/orders – Admin can view all 
// PUT /api/orders/:id – Update order status 
// DELETE /api/orders/:id 


 