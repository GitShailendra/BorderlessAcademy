// src/components/registration/ParentForm/AdditionalInfo.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserPlus, 
  Home, 
  FileCheck, 
  GraduationCap, 
  Info,
  CheckCircle 
} from 'lucide-react';
import { SelectField, TextareaField } from './FormField';

const AdditionalInfo = ({ data, onChange, errors }) => {
  // Track completed fields
  const [completedFields, setCompletedFields] = useState([]);
  
  const handleChange = (field) => (e) => {
    const value = e.target.value;
    onChange(field, value);
    
    // Update completed fields
    if (value && !errors[field]) {
      setCompletedFields(prev => 
        prev.includes(field) ? prev : [...prev, field]
      );
    } else {
      setCompletedFields(prev => 
        prev.filter(f => f !== field)
      );
    }
  };

  const relationOptions = [
    { value: 'father', label: 'Father' },
    { value: 'mother', label: 'Mother' },
    { value: 'guardian', label: 'Legal Guardian' },
    { value: 'other', label: 'Other' }
  ];

  const asylumStatusOptions = [
    { value: 'citizen', label: 'Citizen' },
    { value: 'permanent_resident', label: 'Permanent Resident' },
    { value: 'refugee', label: 'Refugee' },
    { value: 'asylum_seeker', label: 'Asylum Seeker' }
  ];

  const visaStatusOptions = [
    { value: 'not_applicable', label: 'Not Applicable' },
    { value: 'student', label: 'Student Visa' },
    { value: 'work', label: 'Work Visa' },
    { value: 'dependent', label: 'Dependent Visa' },
    { value: 'other', label: 'Other' }
  ];

  const qualificationOptions = [
    { value: 'high_school', label: 'High School' },
    { value: 'diploma', label: 'Diploma' },
    { value: 'bachelors', label: "Bachelor's Degree" },
    { value: 'masters', label: "Master's Degree" },
    { value: 'doctorate', label: 'Doctorate' },
    { value: 'other', label: 'Other' }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Section Title */}
      <motion.div 
        variants={itemVariants}
        className="text-center"
      >
        <h2 className="text-xl font-semibold text-primary">Additional Information</h2>
        <p className="text-sm text-secondary mt-1">
          Please provide additional details to complete your registration
        </p>
      </motion.div>

      {/* Progress Indicator */}
      <motion.div 
        variants={itemVariants}
        className="bg-surface/30 rounded-lg p-4"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-secondary">Completion Progress</span>
          <span className="text-sm font-medium text-primary">
            {completedFields.length}/4 Required Fields
          </span>
        </div>
        <div className="h-2 bg-surface rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${(completedFields.length / 4) * 100}%` }}
          />
        </div>
      </motion.div>

      {/* Form Fields */}
      <div className="space-y-4">
        <motion.div variants={itemVariants}>
          <SelectField
            label="Relation to Student"
            value={data.relation}
            onChange={handleChange('relation')}
            options={relationOptions}
            icon={UserPlus}
            error={errors.relation}
            required
            placeholder="Select your relation"
            suffix={
              completedFields.includes('relation') && (
                <CheckCircle className="w-5 h-5 text-green-500" />
              )
            }
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <TextareaField
            label="Residential Address"
            value={data.address}
            onChange={handleChange('address')}
            icon={Home}
            error={errors.address}
            required
            placeholder="Enter your full address"
            rows={3}
            suffix={
              completedFields.includes('address') && (
                <CheckCircle className="w-5 h-5 text-green-500" />
              )
            }
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div variants={itemVariants}>
            <SelectField
              label="Asylum Status"
              value={data.asylumStatus}
              onChange={handleChange('asylumStatus')}
              options={asylumStatusOptions}
              icon={FileCheck}
              error={errors.asylumStatus}
              required
              placeholder="Select status"
              suffix={
                completedFields.includes('asylumStatus') && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )
              }
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <SelectField
              label="Visa Status"
              value={data.visaStatus}
              onChange={handleChange('visaStatus')}
              options={visaStatusOptions}
              icon={FileCheck}
              error={errors.visaStatus}
              required
              placeholder="Select visa type"
              suffix={
                completedFields.includes('visaStatus') && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )
              }
            />
          </motion.div>
        </div>

        <motion.div variants={itemVariants}>
          <SelectField
            label="Highest Qualification"
            value={data.qualification}
            onChange={handleChange('qualification')}
            options={qualificationOptions}
            icon={GraduationCap}
            error={errors.qualification}
            required
            placeholder="Select qualification"
            suffix={
              completedFields.includes('qualification') && (
                <CheckCircle className="w-5 h-5 text-green-500" />
              )
            }
          />
        </motion.div>
      </div>

      {/* Info Box */}
      <motion.div 
        variants={itemVariants}
        className="bg-blue-50 p-4 rounded-lg"
      >
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-700">
            <p className="font-medium mb-1">Important Information</p>
            <ul className="list-disc list-inside space-y-1">
              <li>All fields marked with * are required</li>
              <li>Your address should include street, city, state, and postal code</li>
              <li>Please ensure your visa information is current and valid</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Error Message */}
      <AnimatePresence>
        {errors.general && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-lg bg-red-50 p-4 text-red-500 text-sm"
          >
            {errors.general}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Field tooltip content
const FieldTooltips = {
  relation: "Select your relationship to the student you're registering",
  address: "Provide your current residential address including street, city, state, and postal code",
  asylumStatus: "Indicate your current residency or asylum status in the country",
  visaStatus: "Select your current visa status if applicable",
  qualification: "Choose your highest completed educational qualification"
};

export default AdditionalInfo;