const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../models');


exports.registerUser = async (req, res) => {
    console.log('Registration')
    try {
        const { name, email, password, role = 'user' } = req.body

        if (!name || !email || !password || role !== 'admin' && role !== 'user') throw new Error('Invalid Input for registration')

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashed, role })
        res.status(201).json({ message: 'User Registered!', user })

    } catch (err) {
        res.status(500).json({ error: `Error at registration: ${err.message}` })
    }
}


exports.loginUser = async (req, res) => {
    console.log('Logging')

    try {

        const { email, password } = req.body
        const user = await User.findOne({ where: { email } })

        if (!user) return res.status(404).json({ message: "User not registered!" })

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) return res.status(401).json({ message: "Incorrect Password!" })

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.jwt_secret, { expiresIn: '1h' })

        res.json({ message: 'Logged in with User: ', user, token: token })

    } catch (err) {
        res.status(500).json({ error: `Error at Login: ${err.message}` })
    }
}

exports.viewProfile = async (req, res) => {
    console.log('View')

    try {
        res.json({ user: req.user })
    } catch (err) {
        res.status(500).json({ error: `Error at viewProfile: ${err.message}` })
    }
}

exports.deleteUser = async (req, res) => {

    if (req.user.role !== 'admin' && req.user.id !== parseInt(req.params.id)) {
        return res.status(403).json({ message: 'Unauthorized to delete this user' });
    }

    try {
        const del = await User.destroy({ where: { id: req.params.id } });
        if (!del) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User Deleted' });
    } catch (err) {
        res.status(500).json({ error: `Error deleting user: ${err.message}` });
    }

}

exports.deleteAll = async (req, res) => {
    try {
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

        await sequelize.query('TRUNCATE TABLE users');

        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    } catch (err) {

        res.status(500).json({ error: `Error deleting all user: ${err.message}` });
    }
}