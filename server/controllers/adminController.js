const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createAdmin = async (req, res) => {
    try {
        const { email, password, setupKey } = req.body;
        console.log(email)
        // Basic validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            });
        }

        // Log the setup process
        console.log('Starting admin creation process...');
        console.log('Setup key received:', setupKey);
        console.log('Environment setup key:', "this-is-secret");

        // Verify setup key
        if (setupKey !== "this-is-secret") {
            console.log('Setup key verification failed');
            return res.status(401).json({
                success: false,
                message: 'Invalid setup key'
            });
        }

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ role: 'admin' });
        if (existingAdmin) {
            console.log('Admin already exists');
            return res.status(400).json({
                success: false,
                message: 'Admin already exists'
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create admin
        const admin = new Admin({
            email,
            password: hashedPassword,
            role: 'admin'
        });

        await admin.save();
        console.log('Admin created successfully');

        res.status(201).json({
            success: true,
            message: 'Admin created successfully'
        });

    } catch (error) {
        console.error('Admin creation error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error creating admin'
        });
    }
};

exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find admin
        const admin = await Admin.findOne({ email }).select('+password');
        if (!admin) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
        // console.log(admin)
        // Verify password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Create token
        const token = jwt.sign(
            { id: admin._id, role: 'admin' },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        console.log({
            success: true,
            token,
            user: {
                id: admin._id,
                email: admin.email,
                role: 'admin'
            }
        });

        res.status(200).json({
            success: true,
            token,
            user: {
                id: admin._id,
                email: admin.email,
                role: 'admin'
            },
            data: {
                id: admin._id,
                firstName: 'admin',
                email: admin.email,
                role:'admin'
            }
        });

    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({
            success: false,
            message: 'Error logging in'
        });
    }
};