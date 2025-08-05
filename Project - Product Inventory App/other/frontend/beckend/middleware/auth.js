import jwt from 'jsonwebtoken'
import { User } from '../models/index.js'

export const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' })
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findByPk(decoded.id)

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: User not found' })
        }

        req.user = user // Attach user to request
        next()
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' })
    }
}

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden: Access denied' })
        }
        next()
    }
}
