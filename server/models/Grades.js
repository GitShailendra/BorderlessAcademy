const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gradeSchema = new Schema({
    grade: {
        type: Number,
        required: true,
        enum: [1, 2, 3, 4, 5]
    },
    teachers: [{
        type: Schema.Types.ObjectId,
        ref: 'Teacher'
    }],
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }],
    academicYear: {
        type: String,
        
    }
}, {
    timestamps: true
});

// Index for faster queries
gradeSchema.index({ grade: 1, academicYear: 1 });

const Grade = mongoose.model('Grade', gradeSchema);

module.exports = Grade;