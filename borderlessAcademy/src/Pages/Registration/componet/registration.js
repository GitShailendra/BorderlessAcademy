// src/constants/registration.js
export const relationOptions = [
    { value: 'father', label: 'Father' },
    { value: 'mother', label: 'Mother' },
    { value: 'guardian', label: 'Legal Guardian' },
    { value: 'other', label: 'Other' }
  ];
  
  export const asylumStatusOptions = [
    { value: 'citizen', label: 'Citizen' },
    { value: 'permanent_resident', label: 'Permanent Resident' },
    { value: 'refugee', label: 'Refugee' },
    { value: 'asylum_seeker', label: 'Asylum Seeker' }
  ];
  
  export const visaStatusOptions = [
    { value: 'not_applicable', label: 'Not Applicable' },
    { value: 'student', label: 'Student Visa' },
    { value: 'work', label: 'Work Visa' },
    { value: 'dependent', label: 'Dependent Visa' },
    { value: 'other', label: 'Other' }
  ];
  
  export const qualificationOptions = [
    { value: 'high_school', label: 'High School' },
    { value: 'diploma', label: 'Diploma' },
    { value: 'bachelors', label: 'Bachelor\'s Degree' },
    { value: 'masters', label: 'Master\'s Degree' },
    { value: 'doctorate', label: 'Doctorate' },
    { value: 'other', label: 'Other' }
  ];
  
  export const gradeOptions = [
    { value: '1', label: 'Grade 1' },
    { value: '2', label: 'Grade 2' },
    { value: '3', label: 'Grade 3' },
    { value: '4', label: 'Grade 4' },
    { value: '5', label: 'Grade 5' }
  ];
  
  export const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ];
  
  export const languageOptions = [
    { value: 'english', label: 'English' },
    { value: 'malay', label: 'Bahasa Malaysia' },
    { value: 'mandarin', label: 'Mandarin' },
    { value: 'tamil', label: 'Tamil' },
    { value: 'other', label: 'Other' }
  ];
  
  export const countries = [
    "Malaysia", "Singapore", "Indonesia", "Thailand", "Philippines",
    "Vietnam", "Myanmar", "Cambodia", "Laos", "Brunei", "China",
    "Japan", "South Korea", "India", "Pakistan", "Bangladesh",
    "Sri Lanka", "Nepal", "Other"
  ].map(country => ({ 
    value: country.toLowerCase(), 
    label: country 
  }));
  
  export const nationalities = [
    "Malaysian", "Singaporean", "Indonesian", "Thai", "Filipino",
    "Vietnamese", "Burmese", "Cambodian", "Laotian", "Bruneian",
    "Chinese", "Japanese", "South Korean", "Indian", "Pakistani",
    "Bangladeshi", "Sri Lankan", "Nepalese", "Other"
  ].map(nationality => ({ 
    value: nationality.toLowerCase(), 
    label: nationality 
  }));