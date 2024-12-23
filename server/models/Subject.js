const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  grade: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5], // Only grades 1–5 allowed
  },
  // In your Subject schema, change the teacher field from single reference to array
  teachers: [
    {
      // Changed from 'teacher' to 'teachers' and made it an array
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
  ],
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student", // Reference to Student model
    },
  ],
  guardians: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Guardian", // Reference to Guardian model
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Subject", subjectSchema);
