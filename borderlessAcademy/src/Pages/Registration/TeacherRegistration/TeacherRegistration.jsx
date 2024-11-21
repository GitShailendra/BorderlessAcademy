import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  GraduationCap, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  Calendar, 
  School,
  ChevronRight,
  Upload,
  Briefcase,
  FileText,
  Globe,
  Laptop,
  Clock,
  Home, Heart, AlertCircle, BadgeHelp,Users, CreditCard,EyeIcon
} from 'lucide-react';

  const TeacherRegistrationForm = ({currentStep, onStepChange}) => {
    const [formData, setFormData] = useState({
        // Personal Information
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        alternatePhone: '',
        address: '',
        dateOfBirth: '',
        gender: '',
        nationality: '',
        nationalId: '',
        profilePhoto: '',

        // Professional Information
        highestQualification: '',
        teachingCertifications: '',
        licenseNumber: '',
        yearsExperience: '',
        subjectsToTeach: [],
        gradeLevels: [],
        specialEducation: '',
        languages: [],
        technologySkills: '',
        availability: '',
        preferredHours: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
      };
      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if (type === 'checkbox') {
            setFormData(prev => ({
                ...prev,
                [name]: checked
                    ? [...(prev[name] || []), value]
                    : (prev[name] || []).filter(item => item !== value)
            }));
        } else if (type === 'file') {
            const files = e.target.files;
            setFormData(prev => ({
                ...prev,
                [name]: files
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };
    const validateStep1 = () => {
        const step1Fields = ['firstName', 'lastName', 'email', 'phoneNumber', 'address', 'dateOfBirth', 'gender', 'nationality', 'nationalId', 'profilePhoto'];
        const newErrors = {};

        step1Fields.forEach(field => {
            if (!formData[field] || String(formData[field]).trim() === '') {
                newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} is required`;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const validateStep2 = () => {
        const step2Fields = {
            highestQualification: { required: true },
            licenseNumber: { required: true },
            yearsExperience: { 
                required: true,
                validate: (value) => !isNaN(value) && parseInt(value) >= 0
            },
            subjectsToTeach: { 
                required: true,
                validate: (value) => Array.isArray(value) && value.length > 0
            },
            gradeLevels: { 
                required: true,
            },
            availability: { required: true },
            preferredHours: { required: true },
            password: { 
                required: true,
                validate: (value) => value && value.length >= 8
            }
        };

        const newErrors = {};

        Object.entries(step2Fields).forEach(([field, rules]) => {
            const value = formData[field];
            
            if (rules.required && (!value || 
                (typeof value === 'string' && value.trim() === '') || 
                (Array.isArray(value) && value.length === 0))) {
                newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} is required`;
            }
            
            if (!newErrors[field] && rules.validate && !rules.validate(value)) {
                switch (field) {
                    case 'yearsExperience':
                        newErrors[field] = 'Years of experience must be a valid number';
                        break;
                    case 'subjectsToTeach':
                        newErrors[field] = 'Please select at least one subject';
                        break;
                    case 'gradeLevels':
                        newErrors[field] = 'Please select at least one grade level';
                        break;
                    case 'password':
                        newErrors[field] = 'Password must be at least 8 characters long';
                        break;
                    default:
                        newErrors[field] = 'Invalid value';
                }
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

  const handleContinue = () => {
      if (validateStep1()) {
          onStepChange(2);
      }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep2()) {
        return;
    }

    setIsSubmitting(true);

    try {
        const teacherData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            alternatePhone: formData.alternatePhone || '',
            address: formData.address,
            dateOfBirth: formData.dateOfBirth,
            gender: formData.gender,
            nationality: formData.nationality,
            nationalId: formData.nationalId,
            profilePhoto: 'placeholder_url',
            highestQualification: formData.highestQualification,
            licenseNumber: formData.licenseNumber,
            yearsExperience: Number(formData.yearsExperience),
            subjectsToTeach: formData.subjectsToTeach,
            gradeLevels: formData.gradeLevels,
            specialEducation: formData.specialEducation || '',
            languages: formData.languages || [],
            technologySkills: formData.technologySkills || '',
            availability: formData.availability,
            preferredHours: formData.preferredHours,
            password: formData.password
        };
        console.log(teacherData)

        const response = await fetch('http://localhost:5000/teacher/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(teacherData),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Registration failed');
        }

        // Reset form after successful submission
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            alternatePhone: '',
            address: '',
            dateOfBirth: '',
            gender: '',
            nationality: '',
            nationalId: '',
            profilePhoto: '',
            highestQualification: '',
            teachingCertifications: '',
            licenseNumber: '',
            yearsExperience: '',
            subjectsToTeach: [],
            gradeLevels: [],
            availability: '',
            preferredHours: '',
            password: '',
            confirmPassword: '',
            specialEducation: '',
            technologySkills:''
        });
        
    } catch (error) {
        setErrors(prev => ({
            ...prev,
            submit: error.message || 'Registration failed. Please try again.'
        }));
    } finally {
        setIsSubmitting(false);
    }
};
    return (
      <motion.div
        key="teacher-form"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <form onSubmit={handleSubmit}>
        {currentStep === 1 ? (
    <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-2.5 border ${
                            errors.firstName ? 'border-red-500' : 'border-gray-200'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
                        placeholder="Enter first name"
                    />
                </div>
                {errors.firstName && (
                    <span className="text-red-500 text-sm mt-1">{errors.firstName}</span>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-2.5 border ${
                            errors.lastName ? 'border-red-500' : 'border-gray-200'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
                        placeholder="Enter last name"
                    />
                </div>
                {errors.lastName && (
                    <span className="text-red-500 text-sm mt-1">{errors.lastName}</span>
                )}
            </div>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2.5 border ${
                        errors.email ? 'border-red-500' : 'border-gray-200'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
                    placeholder="Enter email address"
                />
            </div>
            {errors.email && (
                <span className="text-red-500 text-sm mt-1">{errors.email}</span>
            )}
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-2.5 border ${
                            errors.phoneNumber ? 'border-red-500' : 'border-gray-200'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
                        placeholder="Enter phone number"
                    />
                </div>
                {errors.phoneNumber && (
                    <span className="text-red-500 text-sm mt-1">{errors.phoneNumber}</span>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alternate Phone (Optional)</label>
                <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="tel"
                        name="alternatePhone"
                        value={formData.alternatePhone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Enter alternate phone"
                    />
                </div>
            </div>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Residential Address</label>
            <div className="relative">
                <Home className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2.5 border ${
                        errors.address ? 'border-red-500' : 'border-gray-200'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
                    placeholder="Enter your complete address"
                    rows="3"
                />
            </div>
            {errors.address && (
                <span className="text-red-500 text-sm mt-1">{errors.address}</span>
            )}
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
            <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2.5 border ${
                        errors.dateOfBirth ? 'border-red-500' : 'border-gray-200'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
                />
            </div>
            {errors.dateOfBirth && (
                <span className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</span>
            )}
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-2.5 border ${
                            errors.gender ? 'border-red-500' : 'border-gray-200'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none`}
                    >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                {errors.gender && (
                    <span className="text-red-500 text-sm mt-1">{errors.gender}</span>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-2.5 border ${
                            errors.nationality ? 'border-red-500' : 'border-gray-200'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
                        placeholder="Enter nationality"
                    />
                </div>
                {errors.nationality && (
                    <span className="text-red-500 text-sm mt-1">{errors.nationality}</span>
                )}
            </div>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">National ID Card</label>
            <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    name="nationalId"
                    value={formData.nationalId}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2.5 border ${
                        errors.nationalId ? 'border-red-500' : 'border-gray-200'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
                    placeholder="Enter national ID number"
                />
            </div>
            {errors.nationalId && (
                <span className="text-red-500 text-sm mt-1">{errors.nationalId}</span>
            )}
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo</label>
            <div className="relative">
                <div className="w-full p-4 border-2 border-dashed border-gray-200 rounded-lg text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                    <input
                        type="file"
                        name="profilePhoto"
                        onChange={handleChange}
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                </div>
            </div>
            {errors.profilePhoto && (
                <span className="text-red-500 text-sm mt-1">{errors.profilePhoto}</span>
            )}
        </div>

        <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleContinue}
            className="w-full py-3 bg-teal-500 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-teal-600 transition-colors"
        >
            Continue
            <ChevronRight className="w-5 h-5" />
        </motion.button>
    </div>
)   : (
  <div className="space-y-4">
  {/* Educational Qualifications */}
  <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Highest Educational Qualification</label>
      <div className="relative">
          <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
              name="highestQualification"
              value={formData.highestQualification}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2.5 border ${
                  errors.highestQualification ? 'border-red-500' : 'border-gray-200'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none`}
          >
              <option value="">Select highest qualification</option>
              <option value="highSchool">High School</option>
              <option value="diploma">Diploma</option>
              <option value="bachelors">Bachelor's Degree</option>
              <option value="masters">Master's Degree</option>
              <option value="doctorate">Doctorate</option>
              <option value="other">Other Professional Certifications</option>
          </select>
      </div>
      {errors.highestQualification && (
          <span className="text-red-500 text-sm mt-1">{errors.highestQualification}</span>
      )}
  </div>

  {/* Teaching License */}
  <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Teaching License Number</label>
      <div className="relative">
          <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
              type="text"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2.5 border ${
                  errors.licenseNumber ? 'border-red-500' : 'border-gray-200'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
              placeholder="Enter teaching license number (if applicable)"
          />
      </div>
      {errors.licenseNumber && (
          <span className="text-red-500 text-sm mt-1">{errors.licenseNumber}</span>
      )}
  </div>

  {/* Teaching Experience */}
  <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Years of Teaching Experience</label>
      <div className="relative">
          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
              type="number"
              name="yearsExperience"
              value={formData.yearsExperience}
              onChange={handleChange}
              min="0"
              className={`w-full pl-10 pr-4 py-2.5 border ${
                  errors.yearsExperience ? 'border-red-500' : 'border-gray-200'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
              placeholder="Enter years of experience"
          />
      </div>
      {errors.yearsExperience && (
          <span className="text-red-500 text-sm mt-1">{errors.yearsExperience}</span>
      )}
  </div>

  {/* Subjects */}
  <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Subjects Able to Teach</label>
      <div className="grid grid-cols-3 gap-2">
          {['Mathematics', 'Science', 'English', 'History', 'Geography', 'Physics', 
            'Chemistry', 'Biology', 'Computer Science', 'Art', 'Music', 'Physical Education', 'Languages'].map(subject => (
              <div key={subject} className="flex items-center">
                  <input
                      type="checkbox"
                      id={subject}
                      name="subjectsToTeach"
                      value={subject}
                      checked={formData.subjectsToTeach.includes(subject)}
                      onChange={handleChange}
                      className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  />
                  <label htmlFor={subject} className="ml-2 text-sm text-gray-700">{subject}</label>
              </div>
          ))}
      </div>
      {errors.subjectsToTeach && (
          <span className="text-red-500 text-sm mt-1">{errors.subjectsToTeach}</span>
      )}
  </div>

  {/* Grade Levels */}
  <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Grade Levels Preferred</label>
      <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(grade => (
              <div key={grade} className="flex items-center">
                  <input
                      type="checkbox"
                      id={`grade${grade}`}
                      name="gradeLevels"
                      value={grade}
                      checked={formData.gradeLevels.includes(grade.toString())}
                      onChange={handleChange}
                      className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  />
                  <label htmlFor={`grade${grade}`} className="ml-2 text-sm text-gray-700">Grade {grade}</label>
              </div>
          ))}
      </div>
      {errors.gradeLevels && (
          <span className="text-red-500 text-sm mt-1">{errors.gradeLevels}</span>
      )}
  </div>

  {/* Document Uploads */}
  <div className="space-y-2">
      {/* <label className="block text-sm font-medium text-gray-700">Professional Documents</label> */}
      
      {/* Resume/CV */}
      {/* <div className="relative">
          <div className="w-full p-4 border-2 border-dashed border-gray-200 rounded-lg text-center">
              <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Upload Resume/CV</p>
              <input
                  type="file"
                  name="resume"
                  onChange={handleChange}
                  accept=".pdf,.doc,.docx"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
          </div>
      </div> */}

      {/* Teaching Certificates */}
      {/* <div className="relative">
          <div className="w-full p-4 border-2 border-dashed border-gray-200 rounded-lg text-center">
              <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Upload Teaching Certificates</p>
              <input
                  type="file"
                  name="teachingCertificates"
                  onChange={handleChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  multiple
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
          </div>
      </div> */}

      {/* Educational Certificates */}
      {/* <div className="relative">
          <div className="w-full p-4 border-2 border-dashed border-gray-200 rounded-lg text-center">
              <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Upload Educational Certificates</p>
              <input
                  type="file"
                  name="educationalCertificates"
                  onChange={handleChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  multiple
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
          </div>
      </div> */}
  </div>

  {/* Teaching Skills & Specializations */}
  <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Special Education Training (if any)</label>
      <div className="relative">
          <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <textarea
              name="specialEducation"
              value={formData.specialEducation}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Describe any special education training or experience"
              rows="3"
          />
      </div>
  </div>

  {/* Language Proficiencies */}
  <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Language Proficiencies</label>
      <div className="grid grid-cols-3 gap-2">
          {['English', 'Spanish', 'French', 'German', 'Chinese', 'Arabic', 'Other'].map(language => (
              <div key={language} className="flex items-center">
                  <input
                      type="checkbox"
                      id={language}
                      name="languages"
                      value={language}
                      checked={formData.languages?.includes(language)}
                      onChange={handleChange}
                      className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  />
                  <label htmlFor={language} className="ml-2 text-sm text-gray-700">{language}</label>
              </div>
          ))}
      </div>
  </div>

  {/* Technology Skills */}
  <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Technology Skills</label>
      <div className="relative">
          <Laptop className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <textarea
              name="technologySkills"
              value={formData.technologySkills}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="List your technology skills and proficiencies"
              rows="3"
          />
      </div>
  </div>

  {/* Availability */}
  <div className="grid grid-cols-2 gap-4">
      <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
          <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none"
              >
                  <option value="">Select availability</option>
                  <option value="fullTime">Full Time</option>
                  <option value="partTime">Part Time</option>
                  <option value="flexible">Flexible</option>
              </select>
          </div>
      </div>

      <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Teaching Hours</label>
          <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                  type="text"
                  name="preferredHours"
                  value={formData.preferredHours}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="e.g., Morning, Afternoon, Evening"
              />
          </div>
      </div>
  </div>

  {/* Password Fields */}
  <div className="grid grid-cols-2 gap-4">
      <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2.5 border ${
                      errors.password ? 'border-red-500' : 'border-gray-200'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
                  placeholder="Enter password"
              />
          </div>
          {errors.password && (
              <span className="text-red-500 text-sm mt-1">{errors.password}</span>
          )}
      </div>

      <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2.5 border ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
                  placeholder="Confirm password"
              />
          </div>
          {errors.confirmPassword && (
              <span className="text-red-500 text-sm mt-1">{errors.confirmPassword}</span>
          )}
      </div>
  </div>

            <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onStepChange(1)}
              className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Back
            </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition-colors"
              >
                Complete Registration
              </motion.button>
            </div>
          </div>
        )}
        </form>
      </motion.div>
    );
  };

  export default TeacherRegistrationForm