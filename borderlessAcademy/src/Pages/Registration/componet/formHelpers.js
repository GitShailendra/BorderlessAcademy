// src/utils/formHelpers.js
export const formatPhoneNumber = (value) => {
    // Remove non-digits
    const number = value.replace(/\D/g, '');
    
    // Format as: +XX XXX-XXX-XXXX
    if (number.length <= 2) return number;
    if (number.length <= 5) return `+${number.slice(0, 2)} ${number.slice(2)}`;
    if (number.length <= 8) return `+${number.slice(0, 2)} ${number.slice(2, 5)}-${number.slice(5)}`;
    return `+${number.slice(0, 2)} ${number.slice(2, 5)}-${number.slice(5, 8)}-${number.slice(8, 12)}`;
  };
  
  export const validateFileUpload = (file) => {
    if (!file) return null;
    
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    const ALLOWED_TYPES = ['image/jpeg', 'image/png'];
    
    if (!ALLOWED_TYPES.includes(file.type)) {
      return 'Only JPEG and PNG files are allowed';
    }
    
    if (file.size > MAX_SIZE) {
      return 'File size must be less than 5MB';
    }
    
    return null;
  };
  
  export const getStepTitle = (step, totalSteps) => {
    if (step <= 3) {
      switch(step) {
        case 1: return 'Basic Information';
        case 2: return 'Additional Information';
        case 3: return 'Emergency Contact';
        default: return '';
      }
    }
    return `Student ${step - 3} of ${totalSteps - 3}`;
  };
  
  export const initialParentData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    altPhone: '',
    relation: '',
    address: '',
    asylumStatus: '',
    visaStatus: '',
    qualification: '',
    emergencyContact: {
      name: '',
      phone: '',
      address: ''
    },
    childrenCount: 1
  };
  
  export const initialStudentData = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    grade: '',
    country: '',
    nationality: '',
    language: '',
    photo: null
  };