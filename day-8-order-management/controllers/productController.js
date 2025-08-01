const Products  = require('../models/');

exports.create = async (req, res) => {
    try {
        const prod = await Products.create({ ...req.body, userId: req.user.id })
        res.status(201).json({ message: 'Product added to user', user: req.user, product: prod })

    } catch (err) {
        res.status(500).json({ message: `Error creating product: ${err.message}` })
    }
}

exports.getAll = async (req, res) => {
    try {
        const prod = await Products.findAll();
        res.status(201).json(prod)
    } catch (err) {
        res.status(500).json({ message: `Error fetching all products: ${err.message}` })
    }
}

exports.byId = async (req, res) => {
    try {
        const prod = await Products.findByPk(req.params.id)
        if (!prod) return res.status(404).json({ message: `Error fetching product by id: Product not Found` })
    } catch (err) {
        res.status(500).json({ message: `Error fetching product by id: ${err.message}` })
    }
}

exports.update = async (req, res) => {
    try {
        const prod = await Products.findByPk(req.params.id)

        if (!prod || prod.userId !== req.params.id) return res.status(403).json({ message: `Error fetching product by id: Product not found or not allowed` });

    } catch (err) {
        res.status(500).json({ message: `Error updating product: ${err.message}` })
    }
}

exports.delete = async (req, res) => {
    try {
        const prod = await Product.findByPk(req.params.id)

        if (!prod || prod.userId != req.user.id) return res.status(403).json({ message: 'Product not found or not allowed' });
        await prod.destroy();
        res.json({ message: "Product removed" })

    } catch (err) {
        res.status(500).json({ message: `Error deleting product: ${err.message}` })
    }
}