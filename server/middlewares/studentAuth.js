// middleware/auth.js
const jwt = require('jsonwebtoken');
const Student = require('../models/Students');

const protectClass = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get teacher from token
            req.user = await Student.findById(decoded.id).select('-password');
            next();
        } else {
            res.status(401).json({
                success: false,
                message: 'Not authorized, no token'
            });
        }
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(401).json({
            success: false,
            message: 'Not authorized, token failed'
        });
    }
};

module.exports = protectClass;