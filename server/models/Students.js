const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    minlength: [2, 'First name must be at least 2 characters']
  },
  email:{
    type:String,
    required: [true, 'Email is required'],
  },
  password:{
    type:String,
    required: [true, 'Password is required'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    minlength: [2, 'Last name must be at least 2 characters']
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required'],
    validate: {
      validator: function(value) {
        const age = (new Date() - value) / (1000 * 60 * 60 * 24 * 365);
        return age >= 4 && age <= 18;
      },
      message: 'Student must be between 4 and 18 years old'
    }
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['male', 'female', 'other']
  },
  grade: {
    type: Number,
    required: [true, 'Grade is required'],
    min: 1,
    max: 10
  },
  countryOfResidence: {
    type: String,
    required: [true, 'Country of residence is required'],
    enum: [
      "Afghanistan", "Albania", "Algeria", "Andorra", "Australia", "Austria", 
      "Bangladesh", "Belgium", "Brazil", "Canada", "China", "Denmark", "Egypt", 
      "Finland", "France", "Germany", "India", "Indonesia", "Italy", "Japan", 
      "Malaysia", "Netherlands", "New Zealand", "Pakistan", "Russia", "Saudi Arabia", 
      "Singapore", "South Africa", "Spain", "Sweden", "United Kingdom", "United States"
    ]
  },
  nationality: {
    type: String,
    required: [true, 'Nationality is required'],
    trim: true
  },
  preferredLanguage: {
    type: String,
    required: [true, 'Preferred language is required'],
    enum: [
      "English", "Spanish", "French", "German", "Arabic", "Chinese (Mandarin)", 
      "Hindi", "Japanese", "Russian", "Portuguese", "Korean", "Italian"
    ]
  },
  photo: {
    type: String,  // Store the URL/path to the photo
    required: [true, 'Student photo is required']
  },
  studentId: {
    type: String,
    required: true,
    unique: true,
    default: () => `SID-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  updatedAt: {
    type: Date,
    default: Date.now
  },
  guardian:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Guardian'

  },
  role: {
    type: String,
    default: 'student',
    immutable: true
}
}, {
  timestamps: true // This will automatically handle createdAt and updatedAt
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;