// Add this to your useFormValidation.js or similar file

export const validateTeacherForm = (step, data) => {
    const errors = {};
  
    switch (step) {
      case 1:
        if (!data.firstName?.trim()) errors.firstName = 'First name is required';
        if (!data.lastName?.trim()) errors.lastName = 'Last name is required';
        if (!data.email?.trim()) errors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(data.email)) errors.email = 'Invalid email format';
        if (!data.phone?.trim()) errors.phone = 'Phone number is required';
        if (!data.address?.trim()) errors.address = 'Address is required';
        break;
  
      case 2:
        if (!data.qualification) errors.qualification = 'Qualification is required';
        if (!data.teachingExperience) errors.teachingExperience = 'Experience is required';
        if (!data.subjects?.length) errors.subjects = 'Select at least one subject';
        if (!data.gradeLevel?.length) errors.gradeLevel = 'Select at least one grade level';
        break;
  
      case 3:
        if (!data.resume) errors.resume = 'Resume is required';
        if (!data.certifications?.length) {
          errors.certifications = 'Add at least one certification';
        }
        break;
    }
  
    return errors;
  };