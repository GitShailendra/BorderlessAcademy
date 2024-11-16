const Guardian = require("../models/Guardian")
exports.registerGuardian = async (req,res)=>{
    try {
        const {
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
    
        // Create guardian
        const guardian = await Guardian.create({
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
        });
    
        // Send response
        res.status(201).json({
          success: true,
          data: guardian,
          message: 'Guardian registered successfully'
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