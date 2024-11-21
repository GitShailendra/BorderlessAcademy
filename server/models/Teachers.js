// models/Teacher.js
const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    // Personal Information
    firstName: {
        type: String,
        required: [true, 'First name is required'],
       
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
        
    },
    alternatePhone: {
        type: String,
        
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
        
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Date of birth is required']
    },
    gender: {
        type: String,
        required: [true, 'Gender is required'],
        enum: ['male', 'female', 'other']
    },
    nationality: {
        type: String,
        required: [true, 'Nationality is required'],
        
    },
    nationalId: {
        type: String,
        required: [true, 'National ID is required'],
        unique: true,
        
    },

    // Profile Photo
    profilePhoto: {
        type: String, // URL to stored image
        required: [true, 'Profile photo is required']
    },

    // Educational and Professional Details
    highestQualification: {
        type: String,
        required: [true, 'Highest qualification is required'],
        enum: ['highSchool', 'diploma', 'bachelors', 'masters', 'doctorate', 'other']
    },
    teachingCertifications: [{
        type: String // URLs to stored certificates
    }],
    licenseNumber: {
        type: String,
        required: [true, 'Teaching license number is required'],
        
    },
    yearsExperience: {
        type: Number,
        required: [true, 'Years of experience is required'],
        min: 0
    },
    subjectsToTeach: [{
        type: String,
        required: [true, 'At least one subject must be selected']
    }],
    gradeLevels: [{
        type: String,
        // required: [true, 'At least one grade level must be selected']
    }],

    // Documents
    resume: {
        type: String // URL to stored resume
    },
    educationalCertificates: [{
        type: String // URLs to stored certificates
    }],

    // Additional Qualifications
    specialEducation: {
        type: String,
       
    },
    languages: [{
        type: String
    }],
    technologySkills: {
        type: String,
       
    },

    // Availability
    availability: {
        type: String,
        required: [true, 'Availability is required'],
        enum: ['fullTime', 'partTime', 'flexible']
    },
    preferredHours: {
        type: String,
        required: [true, 'Preferred hours are required'],
        
    },

    // Simple password field
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 8
    },

    // Timestamps
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },

    // Status
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true // This automatically handles createdAt and updatedAt
});


const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;