// src/components/registration/ProgressBar.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const ProgressBar = ({ currentStep, totalSteps, text }) => {
  const calculateProgress = (step) => (step / totalSteps) * 100;

  const steps = [
    { label: 'Basic Info', step: 1 },
    { label: 'Additional Details', step: 2 },
    { label: 'Emergency Contact', step: 3 },
    ...Array.from({ length: totalSteps - 3 }, (_, i) => ({
      label: `Student ${i + 1}`,
      step: i + 4
    }))
  ];

  return (
    <div className="mb-8">
      {/* Step Counter and Label */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-secondary">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm font-medium text-primary">
          {text}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className="h-2 bg-surface rounded-full">
          <motion.div
            className="h-full bg-primary rounded-full"
            animate={{
              width: `${calculateProgress(currentStep)}%`
            }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Step Indicators */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-[2px]">
          {steps.map(({ label, step }) => (
            <div
              key={step}
              className="relative group"
            >
              <motion.div
                className={`w-4 h-4 rounded-full flex items-center justify-center ${
                  step <= currentStep ? 'bg-primary' : 'bg-surface'
                }`}
                animate={{
                  scale: step === currentStep ? 1.2 : 1,
                  backgroundColor: step <= currentStep ? 'var(--color-primary)' : 'var(--color-surface)'
                }}
              >
                {step < currentStep && (
                  <CheckCircle className="w-3 h-3 text-white" />
                )}
              </motion.div>

              {/* Step Label Tooltip */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 hidden group-hover:block">
                <div className="bg-secondary text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                  {label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Alternative simpler version without step indicators
const SimpleProgressBar = ({ currentStep, totalSteps, text }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-secondary">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm text-secondary">
          {text}
        </span>
      </div>
      <div className="h-2 bg-surface rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          animate={{
            width: `${(currentStep / totalSteps) * 100}%`
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
};

export { ProgressBar as default, SimpleProgressBar };