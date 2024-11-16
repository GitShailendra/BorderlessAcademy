const mongoose = require('mongoose');

const guardianSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required']
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
  }
});

module.exports = mongoose.model('Guardian', guardianSchema);