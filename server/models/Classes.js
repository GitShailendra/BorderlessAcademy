// models/Class.js
const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Class name is required'],
        trim: true
    },
    section: {
        type: String,
        required: [true, 'Section is required'],
        trim: true
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: [true, 'Subject is required']
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: [true, 'Teacher is required']
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }],
    schedule: {
        dayOfWeek: [{
            type: String,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        }],
        startTime: {
            type: String,
            required: [true, 'Start time is required']
        },
        endTime: {
            type: String,
            required: [true, 'End time is required']
        }
    },
    meetingLink: {
        type: String,
        required: [true, 'Virtual meeting link is required']
    },
    grade: {
        type: Number,
        required: [true, 'Grade is required'],
        enum: [1, 2, 3, 4, 5]
    },
    academicYear: {
        type: String,
        required: [true, 'Academic year is required']
    },
    progress: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    description: {
        type: String,
        trim: true
    },
    learningMaterials: [{
        title: String,
        fileUrl: String,
        uploadedAt: {
            type: Date,
            default: Date.now
        }
    }],
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Class',classSchema);