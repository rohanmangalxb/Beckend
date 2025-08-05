import { Order, Product, OrderProduct, User } from '../models/index.js'

// @desc    Create a new order (User)
export const createOrder = async (req, res) => {
    const { products } = req.body // [{ productId: 1, quantity: 2 }, ...]

    if (!products || !products.length) {
        return res.status(400).json({ message: 'No products provided' })
    }

    try {
        // Create order linked to the logged-in user
        const order = await Order.create({ userId: req.user.id })

        // Add products to the order
        const orderProducts = products.map(p => ({
            orderId: order.id,
            productId: p.productId,
            quantity: p.quantity
        }))

        await OrderProduct.bulkCreate(orderProducts)

        res.status(201).json({ message: 'Order placed successfully', orderId: order.id })
    } catch (err) {
        res.status(500).json({ message: 'Error creating order', error: err.message })
    }
}

// @desc    Get all orders (Admin)
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [
                { model: User, attributes: ['id', 'name', 'email'] },
                { model: Product, through: { attributes: ['quantity'] } }
            ],
            order: [['createdAt', 'DESC']]
        })

        res.json(orders)
    } catch (err) {
        res.status(500).json({ message: 'Error fetching orders', error: err.message })
    }
}

// @desc    Get logged-in user's orders
export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: { userId: req.user.id },
            include: [
                { model: Product, through: { attributes: ['quantity'] } }
            ],
            order: [['createdAt', 'DESC']]
        })

        res.json(orders)
    } catch (err) {
        res.status(500).json({ message: 'Error fetching orders', error: err.message })
    }
}
