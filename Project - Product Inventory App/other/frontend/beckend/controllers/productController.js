import { Product } from '../models/index.js'

// @desc    Create a new product [Admin only]
export const createProduct = async (req, res) => {
    const { name, description, price, quantity } = req.body

    try {
        const product = await Product.create({
            name,
            description,
            price,
            quantity,
        })

        res.status(201).json(product)
    } catch (err) {
        res.status(500).json({ message: 'Error creating product', error: err.message })
    }
}

// @desc    Get all products [Public]
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll()
        res.json(products)
    } catch (err) {
        res.status(500).json({ message: 'Error fetching products', error: err.message })
    }
}

// @desc    Get single product by ID [Public]
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id)
        if (!product) return res.status(404).json({ message: 'Product not found' })

        res.json(product)
    } catch (err) {
        res.status(500).json({ message: 'Error fetching product', error: err.message })
    }
}

// @desc    Update product [Admin only]
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id)
        if (!product) return res.status(404).json({ message: 'Product not found' })

        await product.update(req.body)
        res.json(product)
    } catch (err) {
        res.status(500).json({ message: 'Error updating product', error: err.message })
    }
}

// @desc    Delete product [Admin only]
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id)
        if (!product) return res.status(404).json({ message: 'Product not found' })

        await product.destroy()
        res.json({ message: 'Product deleted successfully' })
    } catch (err) {
        res.status(500).json({ message: 'Error deleting product', error: err.message })
    }
}
