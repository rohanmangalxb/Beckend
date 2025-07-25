const { User, Product } = require('../models')

exports.createP = async (req, res) => {
    try {
        const prod = await Product.create({ ...req.body, userId: req.user.id, imageUrl: null });

        res.status(201).json({ message: "Product added" }, prod)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.getAll = async (req, res) => {
    try {
        const prod = await Product.findAll()
        if (!prod) return res.status(404).json({ message: "No Products" })

        res.json(prod)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.getProdById = async (req, res) => {
    try {
        const prod = await Product.findByPk(req.params.id)

        if (!prod) return res.status(404).json({ message: "Product not found!" })

        res.json(prod)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

exports.getProdByUser = async (req, res) => {
    try {
        const prod = await Product.findAll({ where: { userId: req.params.userId } })

        if (!prod) return res.status(404).json({ message: "Product for this user not available!" })

        res.json(prod)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
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
    res.json({ message: "Prod delete" })
}

exports.updateProd = async (req, res) => {
    const prod = await Product.findByPk(req.params.id)
    if (!prod || prod.userId != req.user.id) {
        return res.status(403).json({ message: 'Product not found or not allowed' });
    }

    await prod.update({ ...req.body, imageUrl: null });
    res.json(prod)
}


exports.upImage = async (req, res) => {
    try {

        const fileurl = req.file ? `uploads/${req.file.filename}` : undefined

        const prod = await Product.findByPk(req.params.id)
        if (!prod || prod.userId != req.user.id) {
            return res.status(403).json({ message: 'Product not found or not allowed' });
        }

        await prod.update({
            ...req.body,
            imageUrl: fileurl
        })

        res.json({ message: "Product image updated successfully", product: prod, imageAddres: fileurl });
    } catch (err) {
        res.status(500).json({message: "Failed upload"})
    }

}