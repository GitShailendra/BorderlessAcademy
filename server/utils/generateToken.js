const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: '30d'
    });
};

module.exports=generateToken;