const { Orders, Product, User, OrderItems } = require('../models');
const jwt = require('jsonwebtoken');
const sequelize = require('../config/db')


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

        const orders = await Orders.findAll({ where: { userId: req.user.id } })

        res.status(201).json(orders)
    } catch (err) {
        res.status(500).json({ message: `Error fetching Order for user: ${err.message}` });
    }
}

exports.getAll = async (req, res) => {
    try {

        const orders = await Orders.findAll({
            include: [{ model: User, attributes: ['name', 'email'] }]
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

        await order.update({ status: status });

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
