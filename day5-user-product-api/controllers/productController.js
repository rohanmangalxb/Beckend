const { Product } = require('../models')

exports.createP = async (req, res) => {
    try {
        const prod = await Product.create({ ...req.body, userId: req.user.id });
        res.status(201).json(prod)
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.getAll = async (req, res) => {
    const prod = await Product.findAll();
    res.json(prod)
}

exports.getProdById = async (req, res) => {
    const prod = await Product.findByPk(req.params.id)
    if (!prod) {
        return res.status(404).json({ message: 'Product not found' });
    }

    res.json(prod)
}

exports.updateProd = async (req, res) => {
    const prod = await Product.findByPk(req.params.id)
    if (!prod || prod.userId != req.user.id) {
        return res.status(403).json({ message: 'Product not found or not allowed' });
    }

    await prod.update(req.body);
    res.json(prod)
}

exports.deleteAllProd = async (req, res) => {
    try {
        const del = await Product.destroy({ where: {}, truncate: true });
        res.json({ message: 'All products deleted' })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.deleteProd = async (req, res) => {
    const prod = await Product.findByPk(req.params.id)

    if (!prod || prod.userId != req.user.id) {
        return res.status(403).json({ message: 'Product not found or not allowed' });
    } 

    await prod.destroy();
    res.json({message: "Prod delete"})
}