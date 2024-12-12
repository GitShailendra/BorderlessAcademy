import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Calendar, 
  School,
  BookOpen,
  GraduationCap,
  AlertCircle ,
  UserCircle,
  Flag,
  Upload,
  MessageSquare,
  Globe
} from 'lucide-react';
const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Australia", "Austria", 
  "Bangladesh", "Belgium", "Brazil", "Canada", "China", "Denmark", "Egypt", 
  "Finland", "France", "Germany", "India", "Indonesia", "Italy", "Japan", 
  "Malaysia", "Netherlands", "New Zealand", "Pakistan", "Russia", "Saudi Arabia", 
  "Singapore", "South Africa", "Spain", "Sweden", "United Kingdom", "United States"
];

// List of languages
const languages = [
  "English", "Spanish", "French", "German", "Arabic", "Chinese (Mandarin)", 
  "Hindi", "Japanese", "Russian", "Portuguese", "Korean", "Italian"
];
const StudentRegistrationForm = ({ studentNumber, onSubmit }) => {
  const initialFormState = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    grade: '',
    countryOfResidence: '',
    nationality: '',
    preferredLanguage: '',
    photo: null,
    studentId: `SID-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    validateField(name, formData[name]);
  };

  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!value?.trim()) {
          error = `${name === 'firstName' ? 'First' : 'Last'} name is required`;
        } else if (value.trim().length < 2) {
          error = `${name === 'firstName' ? 'First' : 'Last'} name must be at least 2 characters`;
        } else if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
          error = 'Only letters are allowed';
        }
        break;

      case 'dateOfBirth':
        if (!value) {
          error = 'Date of birth is required';
        } else {
          const dob = new Date(value);
          const today = new Date();
          const age = today.getFullYear() - dob.getFullYear();
          if (age < 4) {
            error = 'Student must be at least 4 years old';
          } else if (age > 18) {
            error = 'Student must be under 18 years old';
          }
        }
        break;

      case 'gender':
        if (!value) {
          error = 'Gender is required';
        }
        break;

      case 'grade':
        if (!value) {
          error = 'Grade is required';
        }
        break;

      case 'countryOfResidence':
        if (!value) {
          error = 'Country of residence is required';
        }
        break;

      case 'nationality':
        if (!value?.trim()) {
          error = 'Nationality is required';
        }
        break;

      case 'preferredLanguage':
        if (!value) {
          error = 'Preferred language is required';
        }
        break;

      case 'photo':
        if (!value) {
          error = 'Student photo is required';
        }
        break;

      default:
        break;
    }

    setErrors(prev => ({
      ...prev,
      [name]: error
    }));

    return !error;
  };

  const validateForm = () => {
    let isValid = true;
    
    // Validate all fields
    Object.keys(formData).forEach(key => {
      const fieldIsValid = validateField(key, formData[key]);
      if (!fieldIsValid) {
        isValid = false;
      }
    });

    // Mark all fields as touched
    const newTouched = {};
    Object.keys(formData).forEach(key => {
      newTouched[key] = true;
    });
    setTouched(newTouched);

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      // Clear form after successful submission
      setFormData(initialFormState);
      setTouched({});
      setErrors({});
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Student {studentNumber} Details
      </h3>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full pl-10 pr-4 py-2.5 border ${
                  touched.firstName && errors.firstName ? 'border-red-500' : 'border-gray-200'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
                placeholder="Enter student's first name"
              />
              {touched.firstName && errors.firstName && (
                <div className="flex items-center mt-1 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.firstName}
                </div>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full pl-10 pr-4 py-2.5 border ${
                  touched.lastName && errors.lastName ? 'border-red-500' : 'border-gray-200'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
                placeholder="Enter student's last name"
              />
              {touched.lastName && errors.lastName && (
                <div className="flex items-center mt-1 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.lastName}
                </div>
              )}
            </div>
          </div>

           {/* Gender and Date of Birth */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full pl-10 pr-4 py-2.5 border ${
                  touched.gender && errors.gender ? 'border-red-500' : 'border-gray-200'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {touched.gender && errors.gender && (
                <div className="flex items-center mt-1 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.gender}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full pl-10 pr-4 py-2.5 border ${
                  touched.dateOfBirth && errors.dateOfBirth ? 'border-red-500' : 'border-gray-200'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
              />
              {touched.dateOfBirth && errors.dateOfBirth && (
                <div className="flex items-center mt-1 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.dateOfBirth}
                </div>
              )}
            </div>
          </div>
        </div>

          {/* Grade and Country of Residence */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Grade Applying For <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full pl-10 pr-4 py-2.5 border ${
                  touched.grade && errors.grade ? 'border-red-500' : 'border-gray-200'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
              >
                <option value="">Select grade</option>
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>Grade {i + 1}</option>
                ))}
              </select>
              {touched.grade && errors.grade && (
                <div className="flex items-center mt-1 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.grade}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country of Residence <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                name="countryOfResidence"
                value={formData.countryOfResidence}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full pl-10 pr-4 py-2.5 border ${
                  touched.countryOfResidence && errors.countryOfResidence ? 'border-red-500' : 'border-gray-200'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
              >
                <option value="">Select country</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
              {touched.countryOfResidence && errors.countryOfResidence && (
                <div className="flex items-center mt-1 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.countryOfResidence}
                </div>
              )}
            </div>
          </div>
        </div>

           {/* Nationality and Preferred Language */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nationality <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Flag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full pl-10 pr-4 py-2.5 border ${
                  touched.nationality && errors.nationality ? 'border-red-500' : 'border-gray-200'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
                placeholder="Enter nationality"
              />
              {touched.nationality && errors.nationality && (
                <div className="flex items-center mt-1 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.nationality}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Language <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                name="preferredLanguage"
                value={formData.preferredLanguage}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full pl-10 pr-4 py-2.5 border ${
                  touched.preferredLanguage && errors.preferredLanguage ? 'border-red-500' : 'border-gray-200'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
              >
                <option value="">Select language</option>
                {languages.map(language => (
                  <option key={language} value={language}>{language}</option>
                ))}
              </select>
              {touched.preferredLanguage && errors.preferredLanguage && (
                <div className="flex items-center mt-1 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.preferredLanguage}
                </div>
              )}
            </div>
          </div>
        </div>
         {/* Photo Upload */}
         <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Student Photo <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Upload className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="file"
              name="photo"
              onChange={handleChange}
              onBlur={handleBlur}
              accept="image/jpeg,image/png"
              className={`w-full pl-10 pr-4 py-2.5 border ${
                touched.photo && errors.photo ? 'border-red-500' : 'border-gray-200'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
            />
            {touched.photo && errors.photo && (
              <div className="flex items-center mt-1 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.photo}
              </div>
            )}
          </div>
        </div>

        {/* Student ID (Read Only) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Student ID
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="studentId"
              value={formData.studentId}
              readOnly
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50"
            />
          </div>
        </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-primary text-white rounded-lg font-semibold flex items-center justify-center gap-2  transition-colors"
          >
            Submit Student Information
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default StudentRegistrationForm;