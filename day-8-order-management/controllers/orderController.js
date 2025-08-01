const Orders = require('../models');
const jwt = require('jsonwebtoken');
const { Products, OrderItems } = require('../models/productModel');

// POST /api/orders – Create order (requires token) 
// GET /api/orders/user/:userId – Get user's orders 
// GET /api/orders – Admin can view all 
// PUT /api/orders/:id – Update order status 
// DELETE /api/orders/:id 

exports.create = async (req, res) => {
    try {
        const { products } = req.body
        if (!products || products === 0) return res.status(400).json({ message: 'No products in order' })

        const order = await Orders.create({ userId: req.user.id })

        for (const item of products) {
            if (quantity > item.quantity) return res.status(401).json({ message: 'Enough items not available' })

            const prod = await Products.findByPk(item.productsId)

            if (!prod) continue

            await OrderItems.create({
                OrderId: order.id,
                ProductId: prod.id,
                quantity: item.quantity,
                pricing: prod.price
            })
        }

        const orderToken = jwt.sign({ orderId: order.id, userId: req.user.id }, process.env.jwt_secret, { expiresIn: '1h' })

        res.status(201).json({
            message: 'Order placed successfully',
            orderId: order.id,
            token: orderToken
        });

    } catch (err) {
        res.status(500).json({ message: `Error creating Order: ${err.message}` });
    }
}