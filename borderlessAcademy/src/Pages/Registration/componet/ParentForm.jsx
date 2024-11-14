// src/components/registration/ParentForm/index.jsx
import React from 'react';
import { motion } from 'framer-motion';
import BasicInfo from './BasicInfo';
import AdditionalInfo from './AdditionalInfo';
import EmergencyContact from './EmergencyContact';
import { ChevronRight } from 'lucide-react';

const ParentForm = ({ 
  step, 
  data, 
  onChange, 
  errors, 
  onNext, 
  onBack, 
  isSubmitting 
}) => {
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <BasicInfo 
            data={data} 
            onChange={onChange} 
            errors={errors} 
          />
        );
      case 2:
        return (
          <AdditionalInfo 
            data={data} 
            onChange={onChange} 
            errors={errors} 
          />
        );
      case 3:
        return (
          <EmergencyContact 
            data={data} 
            onChange={onChange} 
            errors={errors} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      key={`parent-step-${step}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {renderStep()}
      
      <div className="flex gap-4">
        {step > 1 && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBack}
            disabled={isSubmitting}
            className="w-full py-3 bg-surface text-secondary rounded-lg font-semibold hover:bg-surface/80 disabled:opacity-50"
          >
            Back
          </motion.button>
        )}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          disabled={isSubmitting}
          className="w-full py-3 bg-primary text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 disabled:opacity-50"
        >
          {step === 3 ? "Continue to Children's Details" : "Continue"}
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ParentForm;