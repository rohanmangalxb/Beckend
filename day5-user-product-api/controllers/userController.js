const { where } = require('sequelize');
const { User } = require('../models')

exports.getAll = async (req, res) => {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    res.json(users)
}

exports.getUserById = async (req, res) => {
    const user = await User.findByPk(req.params.id, { attributes: { exclude: ['password'] } })

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user)
}

exports.deleteUser = async (req, res) => {
    const del = await User.destroy({ where: { id: req.params.id } })

    if (!del) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User Deleted' })
}

exports.deleteAll = async (req, res) => {
    try {
        const del = await User.destroy({ where: {}, truncate: true });
        res.json({ message: 'All users deleted' })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}