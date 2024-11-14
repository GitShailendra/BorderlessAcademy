// src/components/registration/ParentForm/EmergencyContact.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Phone, 
  Home, 
  Users, 
  AlertTriangle,
  Heart,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { TextField, PhoneField, TextareaField, NumberField } from './FormField';

const EmergencyContact = ({ data, onChange, errors }) => {
  const [completedFields, setCompletedFields] = useState([]);
  const [showTooltip, setShowTooltip] = useState('');

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    
    // Handle nested emergency contact fields
    if (field.startsWith('emergencyContact.')) {
      const subField = field.split('.')[1];
      onChange('emergencyContact', {
        ...data.emergencyContact,
        [subField]: value
      });
    } else {
      onChange(field, value);
    }

    // Update completed fields tracking
    const fieldKey = field.replace('emergencyContact.', '');
    if (value && !errors[field]) {
      setCompletedFields(prev => prev.includes(fieldKey) ? prev : [...prev, fieldKey]);
    } else {
      setCompletedFields(prev => prev.filter(f => f !== fieldKey));
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
      <motion.div variants={itemVariants} className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Heart className="w-6 h-6 text-red-500" />
          <h2 className="text-xl font-semibold text-primary">Emergency Contact</h2>
        </div>
        <p className="text-sm text-secondary">
          Please provide emergency contact information
        </p>
      </motion.div>

      {/* Progress Indicator */}
      <motion.div variants={itemVariants} className="bg-surface/30 rounded-lg p-4">
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
        {/* Emergency Contact Details */}
        <motion.div variants={itemVariants}>
          <div className="relative">
            <TextField
              label="Emergency Contact Name"
              value={data.emergencyContact?.name || ''}
              onChange={handleChange('emergencyContact.name')}
              placeholder="Full name of emergency contact"
              error={errors['emergencyContact.name']}
              icon={User}
              required
              suffix={
                completedFields.includes('name') && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )
              }
            />
            <button
              type="button"
              className="absolute top-0 right-0 mt-1"
              onMouseEnter={() => setShowTooltip('name')}
              onMouseLeave={() => setShowTooltip('')}
            >
              <HelpCircle className="w-4 h-4 text-secondary" />
            </button>
            <AnimatePresence>
              {showTooltip === 'name' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 top-8 z-10 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg w-64"
                >
                  Provide the full name of someone we can contact in case of emergency
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <PhoneField
            label="Emergency Contact Phone"
            value={data.emergencyContact?.phone || ''}
            onChange={handlePhoneChange('emergencyContact.phone')}
            placeholder="+60 123-456-7890"
            error={errors['emergencyContact.phone']}
            icon={Phone}
            required
            suffix={
              completedFields.includes('phone') && (
                <CheckCircle className="w-5 h-5 text-green-500" />
              )
            }
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <TextareaField
            label="Emergency Contact Address"
            value={data.emergencyContact?.address || ''}
            onChange={handleChange('emergencyContact.address')}
            placeholder="Full address of emergency contact"
            error={errors['emergencyContact.address']}
            icon={Home}
            required
            rows={3}
            suffix={
              completedFields.includes('address') && (
                <CheckCircle className="w-5 h-5 text-green-500" />
              )
            }
          />
        </motion.div>

        {/* Number of Children */}
        <motion.div variants={itemVariants}>
          <NumberField
            label="Number of Children to Enroll"
            value={data.childrenCount || 1}
            onChange={handleChange('childrenCount')}
            min={1}
            max={5}
            error={errors.childrenCount}
            icon={Users}
            required
            suffix={
              completedFields.includes('childrenCount') && (
                <CheckCircle className="w-5 h-5 text-green-500" />
              )
            }
          />
          <p className="text-xs text-secondary mt-1">
            You can enroll up to 5 children at once
          </p>
        </motion.div>
      </div>

      {/* Important Notice */}
      <motion.div 
        variants={itemVariants}
        className="bg-amber-50 border border-amber-200 rounded-lg p-4"
      >
        <div className="flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
          <div className="text-sm text-amber-700">
            <p className="font-medium mb-1">Important Information</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Emergency contact should be someone other than yourself</li>
              <li>Make sure the contact is reachable and aware they are listed</li>
              <li>Provide complete and accurate contact information</li>
              <li>Update this information if it changes</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Error Messages */}
      <AnimatePresence>
        {errors.general && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-lg bg-red-50 p-4 text-red-500 text-sm flex items-start gap-2"
          >
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <span>{errors.general}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EmergencyContact;