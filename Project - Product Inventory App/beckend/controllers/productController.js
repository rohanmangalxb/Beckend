const { Product } = require('../models/');
const sequelize = require('../config/db')

exports.create = async (req, res) => {
    try {
        const prod = await Product.create(req.body)
        res.status(201).json({ message: 'Product created', product: prod })

    } catch (err) {
        res.status(500).json({ message: `Error creating product: ${err.message}` })
    }
}

exports.getAll = async (req, res) => {
    try {
        const prod = await Product.findAll();
        res.status(201).json(prod)
    } catch (err) {
        res.status(500).json({ message: `Error fetching all products: ${err.message}` })
    }
}

exports.byId = async (req, res) => {
    try {
        const prod = await Product.findByPk(req.params.id)
        if (!prod) return res.status(404).json({ message: `Error fetching product by id: Product not Found` })

        res.json({prod})
    } catch (err) {
        res.status(500).json({ message: `Error fetching product by id: ${err.message}` })
    }
}

exports.update = async (req, res) => {
    try {
        const prod = await Product.findByPk(req.params.id)
        if (!prod) return res.status(403).json({ message: `Error fetching product by id: Product not found or not allowed` });
        
        await prod.update(req.body)
        res.json({message: 'Product updated', product: prod})
    } catch (err) {
        res.status(500).json({ message: `Error updating product: ${err.message}` })
    }
}

exports.delete = async (req, res) => {
    try {
        const prod = await Product.findByPk(req.params.id)

        if (!prod) return res.status(403).json({ message: 'Product not found' });
        await prod.destroy();
        res.json({ message: "Product removed" })

    } catch (err) {
        res.status(500).json({ message: `Error deleting product: ${err.message}` })
    }
}