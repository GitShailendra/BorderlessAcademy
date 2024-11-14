// src/components/registration/ParentForm/BasicInfo.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, CheckCircle } from 'lucide-react';
import { 
  TextField, 
  EmailField, 
  PhoneField 
} from './FormField';

const BasicInfo = ({ data, onChange, errors }) => {
  // Track field completion status
  const [completedFields, setCompletedFields] = useState([]);

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    onChange(field, value);
    
    // Check if field is completed
    if (value && !errors[field] && !completedFields.includes(field)) {
      setCompletedFields(prev => [...prev, field]);
    } else if ((!value || errors[field]) && completedFields.includes(field)) {
      setCompletedFields(prev => prev.filter(f => f !== field));
    }
  };

  const formatPhoneNumber = (value) => {
    const number = value.replace(/\D/g, '');
    let formatted = '';
    if (number.length > 0) formatted += `+${number.slice(0, 2)}`;
    if (number.length > 2) formatted += ` ${number.slice(2, 5)}`;
    if (number.length > 5) formatted += `-${number.slice(5, 8)}`;
    if (number.length > 8) formatted += `-${number.slice(8, 12)}`;
    return formatted;
  };

  const handlePhoneChange = (field) => (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    handleChange(field)({ target: { value: formatted } });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
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
        className="text-center"
        variants={itemVariants}
      >
        <h2 className="text-xl font-semibold text-primary">Basic Information</h2>
        <p className="text-sm text-secondary mt-1">
          Please provide your personal details
        </p>
      </motion.div>

      {/* Progress Indicator */}
      <motion.div 
        className="bg-surface/30 rounded-lg p-4"
        variants={itemVariants}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-secondary">Completion Progress</span>
          <span className="text-sm font-medium text-primary">
            {completedFields.length}/5 Required Fields
          </span>
        </div>
        <div className="h-2 bg-surface rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${(completedFields.length / 5) * 100}%` }}
          />
        </div>
      </motion.div>

      {/* Form Fields */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div variants={itemVariants}>
            <TextField
              label="First Name"
              value={data.firstName}
              onChange={handleChange('firstName')}
              placeholder="Enter first name"
              error={errors.firstName}
              icon={User}
              required
              autoComplete="given-name"
              className="relative"
              suffix={
                completedFields.includes('firstName') && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )
              }
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <TextField
              label="Last Name"
              value={data.lastName}
              onChange={handleChange('lastName')}
              placeholder="Enter last name"
              error={errors.lastName}
              icon={User}
              required
              autoComplete="family-name"
              suffix={
                completedFields.includes('lastName') && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )
              }
            />
          </motion.div>
        </div>

        <motion.div variants={itemVariants}>
          <EmailField
            label="Email Address"
            value={data.email}
            onChange={handleChange('email')}
            placeholder="example@email.com"
            error={errors.email}
            icon={Mail}
            required
            autoComplete="email"
            suffix={
              completedFields.includes('email') && (
                <CheckCircle className="w-5 h-5 text-green-500" />
              )
            }
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div variants={itemVariants}>
            <PhoneField
              label="Phone Number"
              value={data.phone}
              onChange={handlePhoneChange('phone')}
              placeholder="+60 123-456-7890"
              error={errors.phone}
              icon={Phone}
              required
              autoComplete="tel"
              suffix={
                completedFields.includes('phone') && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )
              }
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <PhoneField
              label="Alternate Phone (Optional)"
              value={data.altPhone}
              onChange={handlePhoneChange('altPhone')}
              placeholder="+60 123-456-7890"
              icon={Phone}
              autoComplete="tel"
            />
          </motion.div>
        </div>
      </div>

      {/* Form-wide Error Message */}
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

      {/* Helper Text */}
      <motion.div 
        className="text-xs text-secondary space-y-1"
        variants={itemVariants}
      >
        <p>* Required fields</p>
        <p>• Phone numbers should include country code (e.g., +60 for Malaysia)</p>
      </motion.div>
    </motion.div>
  );
};

export default BasicInfo;