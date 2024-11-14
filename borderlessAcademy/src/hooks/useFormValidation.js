// src/hooks/useFormValidation.js
import { useState } from 'react';
import { validateForm, validateFile } from '../constants/registration';

const useFormValidation = () => {
  const [errors, setErrors] = useState({});

  const validateStep = (values, type) => {
    const newErrors = validateForm(values, type);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateFileUpload = (file) => {
    const error = validateFile(file);
    if (error) {
      setErrors(prev => ({ ...prev, photo: error }));
      return false;
    }
    return true;
  };

  return {
    errors,
    setErrors,
    validateStep,
    validateFileUpload
  };
};

export default useFormValidation;