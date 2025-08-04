const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');

const authorize = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) return res.status(401).json({ message: "User unauthorized!" })

        const decoded = jwt.verify(token, process.env.jwt_secret)
        req.user = await User.findByPk(decoded.id)
        next();

    } catch (err) {
        res.json({ error: `Error at user authorization: ${err}` })
    }
}

const roleAuthorise = (role = []) => {
    return (req, res, next) => {
        if (!role.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access Denied for this user' })
        }
        next()
    }
}

module.exports = { authorize, roleAuthorise }