const jwt = require('jsonwebtoken')
const { User } = require('../models')

const authorize = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "User unauthorized!" })
    }

    try {
        const decoded = jwt.verify(token, process.env.jwt_secret);
        req.user = await User.findByPk(decoded.id);
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid token' });
    }
}

module.exports = authorize;