// src/Registration/componet/TeacherForm.jsx

const TeacherForm = ({
    step,
    data,
    onChange,
    errors,
    onNext,
    onBack,
    onSubmit,
    isSubmitting
  }) => {
    // ... previous state declarations ...
  
    const handleStepNext = () => {
      // Validate current step
      const currentStepFields = {
        1: ['firstName', 'lastName', 'email', 'phone', 'address'],
        2: ['qualification', 'teachingExperience', 'subjects', 'gradeLevel'],
        3: ['resume', 'certifications']
      };
  
      const isStepValid = currentStepFields[step].every(field => {
        if (field === 'subjects' || field === 'gradeLevel') {
          return data[field]?.length > 0;
        }
        return !!data[field];
      });
  
      if (isStepValid) {
        onNext();
      }
    };
  
    const handleChange = (field, value) => {
      onChange(field, value);
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
  
    // ... rest of your component code ...
  
    return (
      <motion.div
        key={`teacher-step-${step}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
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
            onClick={step === 3 ? onSubmit : handleStepNext}
            disabled={isSubmitting}
            className="w-full py-3 bg-primary text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin">⏳</span>
                Processing...
              </>
            ) : (
              <>
                {step === 3 ? 'Complete Registration' : 'Continue'}
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </motion.button>
        </div>
  
        {/* Progress indicator */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-secondary mb-2">
            <span>Step {step} of 3</span>
            <span>
              {step === 1 ? 'Basic Information' : 
               step === 2 ? 'Professional Details' : 
               'Documents & Certifications'}
            </span>
          </div>
          <div className="h-2 bg-surface rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>
  
        {errors.general && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg bg-red-50 p-4 text-red-500 text-sm flex items-start gap-2"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{errors.general}</span>
          </motion.div>
        )}
      </motion.div>
    );
  };
  
  export default TeacherForm;