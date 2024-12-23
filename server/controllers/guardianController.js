const Guardian = require("../models/Guardian")
const bcrypt= require('bcryptjs');
const generateToken = require("../utils/generateToken");
exports.registerGuardian = async (req,res)=>{
    try {
        const {
          email,
          fullName,
          address,
          dateOfBirth,
          numberOfStudents,
          primaryPhone,
          alternatePhone,
          relationToStudent,
          visaStatus,
          qualification,
          emergencyContact,
          nationalId,
          occupation,
          asylumStatus,
          password
        } = req.body;
        
        const existingGuardian = await Guardian.findOne({ 
            $or: [
              { nationalId },
              { primaryPhone }
            ]
          });
      
          if (existingGuardian) {
            return res.status(400).json({
              success: false,
              message: 'Guardian already exists with this National ID or Phone number'
            });
          }
          const salt = await bcrypt.genSalt(10)
          const hashedPassword =await bcrypt.hash(password,salt)
        // Create guardian
        const guardian = await Guardian.create({
          email,
          fullName,
          address,
          dateOfBirth,
          numberOfStudents,
          primaryPhone,
          alternatePhone,
          relationToStudent,
          visaStatus,
          qualification,
          emergencyContact,
          nationalId,
          occupation,
          asylumStatus,
          password:hashedPassword
        });
        const token = generateToken(guardian._id)
        console.log(guardian)
        // Send response
        res.status(201).json({
          success: true,
          message: 'Guardian registered successfully',
          token,
          data: {
            id: guardian._id,
            firstName: guardian.fullName,
            numberOfStudents:guardian.numberOfStudents,
            email: guardian.email,
            role:guardian.role
        },
        user:guardian
        });
    
      } catch (error) {
        // Handle Mongoose validation errors
        if (error.name === 'ValidationError') {
          const messages = Object.values(error.errors).map(err => err.message);
          return res.status(400).json({
            success: false,
            message: 'Validation Error',
            errors: messages
          });
        }
    
        // Handle duplicate key error
        if (error.code === 11000) {
          const field = Object.keys(error.keyPattern)[0];
          return res.status(400).json({
            success: false,
            message: `This ${field} is already registered`
          });
        }
    
        // Handle other errors
        console.error('Guardian Registration Error:', error);
        res.status(500).json({
          success: false,
          message: 'Error registering guardian',
          error: error.message
        });
      }
}

exports.login = async (req,res)=>{
  try {
    const {email,password} = req.body;
    const guardian = await Guardian.findOne({email});
    if(!guardian){
      return res.status(404).json({
        success: false,
        message: 'Guardian not found'
      });
    }
    const isMatch = await bcrypt.compare(password,guardian.password);
    if(!isMatch){
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials'
      })
    }
    const token = generateToken(guardian._id);
    res.status(200).json({
      success: true,
      token: token,
      message:'logged in successfully',
      data: {
        id: guardian._id,
        firstName: guardian.fullName,
        
        email: guardian.email
    },
    role:guardian.role,
    user:guardian
    })
  } catch (error) {
    
  }
}