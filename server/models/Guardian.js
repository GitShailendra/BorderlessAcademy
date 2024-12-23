const mongoose = require('mongoose');

const guardianSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
},
  address: String,
  dateOfBirth: Date,
  numberOfStudents: Number,
  primaryPhone: {
    type: String,
    required: [true, 'Primary phone is required']
  },
  alternatePhone: String,
  relationToStudent: String,
  visaStatus: String,
  qualification: String,
  emergencyContact: String,
  nationalId: {
    type: String,
    unique: true,
    required: [true, 'National ID is required']
  },
  occupation: String,
  asylumStatus: String,
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  students:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }],
  role: {
    type: String,
    default: 'guardian',
    immutable: true
}
});

module.exports = mongoose.model('Guardian', guardianSchema);