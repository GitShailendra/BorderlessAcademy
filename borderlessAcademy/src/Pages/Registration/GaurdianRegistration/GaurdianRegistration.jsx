import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Home,
  Heart,
  AlertCircle,
  BadgeHelp,
  Users,
  CreditCard,
  EyeIcon,
} from "lucide-react";
import StudentRegistrationManager from '../student/StudentRegistrationManager'
import authService from '../../../Components/services/authService'
const GuardianRegistrationForm = ({ currentStep, onStepChange }) => {
  const [showStudentForms, setShowStudentForms] = useState(false);
  const [guardianId, setGuardianId] = useState(null);
  const[nostudent,setNoStudent] = useState(null)
  const [isGuardianSubmitted, setIsGuardianSubmitted] = useState(false);

  // const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    dateOfBirth: "",
    numberOfStudents: "",
    primaryPhone: "",
    alternatePhone: "",
    relationToStudent: "",
    visaStatus: "",
    qualification: "",
    emergencyContact: "",
    nationalId: "",
    occupation: "",
    asylumStatus: "",
    password: "",
    email:""
  });
  console.log("Current Step:", currentStep);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredStudentsCount, setRegisteredStudentsCount] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when field changes
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };
  const validateStep1 = () => {
    const step1Fields = [
      "fullName",
      "address",
      "dateOfBirth",
      "numberOfStudents",
      "primaryPhone",
      "email"
    ];
    const newErrors = {};

    step1Fields.forEach((field) => {
      if (!formData[field] || String(formData[field]).trim() === "") {
        newErrors[field] = `${
          field.charAt(0).toUpperCase() +
          field.slice(1).replace(/([A-Z])/g, " $1")
        } is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const validateStep2 = () => {
    const step2Fields = [
      "relationToStudent",
      "visaStatus",
      "qualification",
      "emergencyContact",
      "nationalId",
      "password",
    ];
    const newErrors = {};

    step2Fields.forEach((field) => {
      if (!formData[field] || String(formData[field]).trim() === "") {
        newErrors[field] = `${
          field.charAt(0).toUpperCase() +
          field.slice(1).replace(/([A-Z])/g, " $1")
        } is required`;
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
  // Validate first step
  // Validate both steps before submission

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep2()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const submissionData = {
        ...formData,
        numberOfStudents: parseInt(formData.numberOfStudents) || 0,
      };

      const result = await authService.registerGuardian(submissionData);

      console.log(result.data, "submitted successfully");
      console.log(result.data.id, "submitted successfully");
      console.log('=============',result.data.numberOfStudents,'===============')
      // if (!response.ok) {
      //   throw new Error(result.message || "Registration failed");
      // }
      setNoStudent(result.data.numberOfStudents)
      setIsGuardianSubmitted(true);
      setGuardianId(result.data.id); // Assuming the backend returns the guardian's ID
      setShowStudentForms(true);

      // Clear form data on successful submission
      setFormData({
        fullName: "",
        address: "",
        dateOfBirth: "",
        numberOfStudents: "",
        primaryPhone: "",
        alternatePhone: "",
        relationToStudent: "",
        visaStatus: "",
        qualification: "",
        emergencyContact: "",
        nationalId: "",
        occupation: "",
        asylumStatus: "",
        password: "",
        email:""
      });

      // You can add success handling here (e.g., show success message, redirect)
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        submit: error.message || "Registration failed. Please try again.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    return () => {
      // Cleanup can be added here if needed
    };
  }, []);
  const handleStudentRegistrationComplete = () => {
    // Reset all states to initial values
    setShowStudentForms(false);
    setIsGuardianSubmitted(false);
    setGuardianId(null);
    setFormData({
      fullName: '',
      address: '',
      dateOfBirth: '',
      numberOfStudents: '',
      primaryPhone: '',
      alternatePhone: '',
      relationToStudent: '',
      visaStatus: '',
      qualification: '',
      emergencyContact: '',
      nationalId: '',
      occupation: '',
      asylumStatus: '',
      password: ''
    });
    onStepChange(1); // Reset to first step of guardian form
  };
  return (
    <div>
      {!isGuardianSubmitted ? (
        <motion.div
        key="guardian-form"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <form onSubmit={handleSubmit}>
          {currentStep === 1 ? (
            <div className="space-y-4">
               <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.email}
                    name="email"
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2.5 border ${
                      errors.email ? "border-red-500" : "border-gray-200"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.fullName}
                    name="fullName"
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2.5 border ${
                      errors.fullName ? "border-red-500" : "border-gray-200"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
                    placeholder="Enter full name"
                  />
                </div>
                {errors.fullName && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.fullName}
                  </span>
                )}
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <div className="relative">
                  <Home className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2.5 border ${
                      errors.address ? "border-red-500" : "border-gray-200"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
                    placeholder="Enter complete address"
                    rows="3"
                  />
                </div>
                {errors.address && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.address}
                  </span>
                )}
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2.5 border ${
                      errors.dateOfBirth ? "border-red-500" : "border-gray-200"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
                  />
                </div>
                {errors.dateOfBirth && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.dateOfBirth}
                  </span>
                )}
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Students to Register
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    name="numberOfStudents"
                    type="number"
                    min="1"
                    value={formData.numberOfStudents}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2.5 border ${
                      errors.numberOfStudents
                        ? "border-red-500"
                        : "border-gray-200"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
                    placeholder="Enter number of students"
                  />
                </div>
                {errors.numberOfStudents && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.numberOfStudents}
                  </span>
                )}
              </div>
  
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number (Primary)
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.primaryPhone}
                      name="primaryPhone"
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-2.5 border ${
                        errors.primaryPhone ? "border-red-500" : "border-gray-200"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
                      placeholder="Primary contact number"
                    />
                  </div>
                  {errors.primaryPhone && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.primaryPhone}
                    </span>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Alternate Phone (Optional)
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      name="alternatePhone"
                      type="tel"
                      value={formData.alternatePhone}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-2.5 border ${
                        errors.alternatePhone
                          ? "border-red-500"
                          : "border-gray-200"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
                      placeholder="Alternate number"
                    />
                  </div>
                  {errors.alternatePhone && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.alternatePhone}
                    </span>
                  )}
                </div>
              </div>
  
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleContinue}
                className="w-full py-3 bg-primary text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:secondary transition-colors"
              >
                Continue
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Relation to Student
                </label>
                <div className="relative">
                  <Heart className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    name="relationToStudent"
                    value={formData.relationToStudent}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2.5 border ${
                      errors.relationToStudent
                        ? "border-red-500"
                        : "border-gray-200"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none`}
                  >
                    <option value="">Select relation</option>
                    <option value="father">Father</option>
                    <option value="mother">Mother</option>
                    <option value="guardian">Guardian</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                {errors.relationToStudent && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.relationToStudent}
                  </span>
                )}
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Visa Status
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    name="visaStatus"
                    value={formData.visaStatus}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2.5 border ${
                      errors.visaStatus ? "border-red-500" : "border-gray-200"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none`}
                  >
                    <option value="">Select visa status</option>
                    <option value="citizen">Citizen</option>
                    <option value="permanent">Permanent Resident</option>
                    <option value="temporary">Temporary Visa</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                {errors.visaStatus && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.visaStatus}
                  </span>
                )}
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Qualification of the Parent
                </label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2.5 border ${
                      errors.qualification ? "border-red-500" : "border-gray-200"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
                    placeholder="Enter highest qualification"
                  />
                </div>
                {errors.qualification && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.qualification}
                  </span>
                )}
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Emergency Contact and Address
                </label>
                <div className="relative">
                  <AlertCircle className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2.5 border ${
                      errors.emergencyContact
                        ? "border-red-500"
                        : "border-gray-200"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
                    placeholder="Enter emergency contact details and address"
                    rows="3"
                  />
                </div>
                {errors.emergencyContact && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.emergencyContact}
                  </span>
                )}
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  National ID Card
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    name="nationalId"
                    type="text"
                    value={formData.nationalId}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2.5 border ${
                      errors.nationalId ? "border-red-500" : "border-gray-200"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
                    placeholder="Enter national ID number"
                  />
                </div>
                {errors.nationalId && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.nationalId}
                  </span>
                )}
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Occupation
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2.5 border ${
                      errors.occupation ? "border-red-500" : "border-gray-200"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
                    placeholder="Enter current occupation"
                  />
                </div>
                {errors.occupation && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.occupation}
                  </span>
                )}
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Asylum Status
                </label>
                <div className="relative">
                  <BadgeHelp className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    name="asylumStatus"
                    value={formData.asylumStatus}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2.5 border ${
                      errors.asylumStatus ? "border-red-500" : "border-gray-200"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none`}
                  >
                    <option value="">Select asylum status</option>
                    <option value="applicant">Asylum Applicant</option>
                    <option value="granted">Asylum Granted</option>
                    <option value="refugee">Refugee Status</option>
                    <option value="na">Not Applicable</option>
                  </select>
                </div>
                {errors.asylumStatus && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.asylumStatus}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <EyeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2.5 border ${
                      errors.password ? "border-red-500" : "border-gray-200"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500`}
                    placeholder="Enter your password"
                  />
                </div>
                {errors.password && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.password}
                  </span>
                )}
              </div>
              {errors.submit && (
                <div className="text-red-500 text-sm text-center">
                  {errors.submit}
                </div>
              )}
              <div className="flex gap-4">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onStepChange(1)}
                  className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Back
                </motion.button>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-primary text-white rounded-lg font-semibold transition-colors disabled:bg-gray-300"
                >
                  {isSubmitting ? "Submitting..." : "Complete Registration"}
                </motion.button>
              </div>
            </div>
          )}
        </form>
        
  
      </motion.div>
      ):(
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <StudentRegistrationManager
          numberOfStudents={nostudent}
          guardianId={guardianId}
          onCompleteAllRegistrations={handleStudentRegistrationComplete}

        />
      </motion.div>

      )}
    
    </div>
  );
};

export default GuardianRegistrationForm;
