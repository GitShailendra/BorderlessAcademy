// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const Teacher = require('../models/Teachers');
const Guardian = require('../models/Guardian');
const Student = require('../models/Students');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

exports.protect = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to access this route'
            });
        }

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Find user based on role
        let user;
        switch (decoded.role) {
            case 'teacher':
                user = await Teacher.findById(decoded.id).select('-password');
                break;
            case 'guardian':
                user = await Guardian.findById(decoded.id).select('-password');
                break;
            case 'student':
                user = await Student.findById(decoded.id).select('-password');
                break;
            default:
                throw new Error('Invalid user role');
        }

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found'
            });
        }

        // Add user to request
        req.user = user;
        req.userRole = decoded.role;
        next();

    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Not authorized to access this route'
        });
    }
};

// Middleware to check specific roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.userRole)) {
            return res.status(403).json({
                success: false,
                message: `Role ${req.userRole} is not authorized to access this route`
            });
        }
        next();
    };
};