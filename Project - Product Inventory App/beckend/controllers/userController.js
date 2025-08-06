const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../models');


exports.registerUser = async (req, res) => {
    console.log('Registration')
    try {
        const { name, email, password, role = 'user' } = req.body

        if (!name?.trim() || !email?.trim() || !password?.trim()) {
            return res.status(400).json({
                message: 'Please provide name, email and password'
            });
        }

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email: email.toLowerCase().trim(), password: hashed, role })

        const result = {...user.get(), password: undefined}
        res.status(201).json({ message: 'User Registered!', result })

    } catch (err) {
        res.status(500).json({ error: `Error at registration: ${err.message}` })
    }
}


exports.loginUser = async (req, res) => {
    console.log('Logging')

    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide an email and password' });
        }

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
        const user = await User.findByPk(req.user.id, { attributes: { exclude: ['password'] } })
        res.status(200).json({ data: user });

    } catch (err) {
        res.status(500).json({ error: `Error at viewProfile: ${err.message}` })
    }
}
