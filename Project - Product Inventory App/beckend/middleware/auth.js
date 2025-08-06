const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authorize = async (req, res, next) => {
    try {
        let token;


        if (req.cookies?.token) {
            token = req.cookies.token;
        }

        else if (req.headers?.authorization?.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ message: "User unauthorized!" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id);

        if (!user) {
            return res.status(401).json({ message: "User not found!" });
        }

        req.user = user;
        next();

    } catch (err) {
        console.error('Authorization error:', err);
        return res.status(401).json({
            error: "Authentication failed",
            message: err.message
        });
    }
}

const roleAuthorise = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access Denied for this user' });
        }
        next();
    }
}

module.exports = { authorize, roleAuthorise };
