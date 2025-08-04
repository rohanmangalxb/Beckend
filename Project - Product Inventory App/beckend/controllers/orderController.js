const { Orders, Product, User, OrderItems } = require('../models');
const jwt = require('jsonwebtoken');
const sequelize = require('../config/db')

// POST /api/orders – Create order ( requires token ) //
// GET /api/orders/user/:userId – Get user's orders 
// GET /api/orders – Admin can view all 
// PUT /api/orders/:id – Update order status 
// DELETE /api/orders/:id 

exports.create = async (req, res) => {
    try {
        const { products, quantity = 1 } = req.body
        if (!products || products === 0) return res.status(400).json({ message: 'No products in order' })

        let totalPrice = 0
        const order = await Orders.create({ userId: req.user.id })

        for (const item of products) {
            console.log(item)
            const prod = await Product.findByPk(item.productId)
            console.log(prod.name, prod.price)
            if (!prod) continue

            if (prod.quantity < item.quantity) return res.status(401).json({ message: `Not enough quantity for product ${prod.name}` })

            const price = (prod.price * item.quantity)
            totalPrice += price
            // console.log("totalPrice: " + totalPrice)

            await OrderItems.create({
                OrderId: order.id,
                ProductId: prod.id,
                quantity: item.quantity,
                pricing: prod.price
            })

            await prod.update({ quantity: prod.quantity - item.quantity })
        }

        await order.update({ quantity: quantity, totalPrice: totalPrice * quantity })

        // const orderToken = jwt.sign({ orderId: order.id, userId: req.user.id }, process.env.jwt_secret, { expiresIn: '1h' })

        res.status(201).json({
            message: 'Order placed successfully',
            orderId: order.id,
            // token: orderToken
        });

    } catch (err) {
        res.status(500).json({ message: `Error creating Order: ${err.message}` });
    }
}

exports.getUserOrder = async (req, res) => {
    try {
        const userId = req.params.userId

        const orders = await Orders.findAll({ where: { userId }, include: [{ model: Product }] })

        res.status(201).json(orders)
    } catch (err) {
        res.status(500).json({ message: `Error fetching Order for user: ${err.message}` });
    }
}

exports.getAll = async (req, res) => {
    try {
        const { status, startDate, endDate } = req.query;

        const sql = {};
        if (status) sql.status = status;
        if (startDate && endDate) {
            sql.createdAt = {
                [require('sequelize').Op.between]: [new Date(startDate), new Date(endDate)]
            };
        }

        const orders = await Orders.findAll({
            where: sql,
            include: [{ model: Product }, { model: User }]
        });

        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: `Error fetching all orders: ${err.message}` });
    }
}

exports.updateStatus = async (req, res) => {
    try {

        const { status } = req.body;
        const order = await Orders.findByPk(req.params.id)

        if (!order) return res.status(404).json({ message: `Order Not found` })

        order.status = status;

        await order.save()

        res.json({ message: 'Order updated Successfully', order })

    } catch (err) {
        res.status(500).json({ message: `Error updating status of Order: ${err.message}` });

    }
}

exports.delete = async (req, res) => {
    try {
        const order = await Orders.findByPk(req.params.id)
        if (!order) return res.status(404).json({ message: `Order Not found` })

        await order.destroy()

        res.json({ message: 'Order removed successfully' })
    } catch (err) {
        res.status(500).json({ message: `Error deleting Order: ${err.message}` });

    }

}

exports.deleteAll = async (req, res) => {
    try {
        await OrderItems.destroy({ where: {} });
        await Orders.destroy({ where: {} });

        await sequelize.query('ALTER TABLE Orders AUTO_INCREMENT = 1');
        await sequelize.query('ALTER TABLE OrderItems AUTO_INCREMENT = 1');


        res.json('All deleted')
    } catch (err) {
        res.status(500).json({ message: `Error deleting All Order: ${err.message}` });

    }
}