// src/components/registration/StudentForm/index.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Upload, ChevronRight } from 'lucide-react';
import FormField from './FormField';
import { 
  countries, 
  nationalities, 
  gradeOptions, 
  genderOptions, 
  languageOptions 
} from './registration';

const StudentForm = ({
  index,
  data,
  onChange,
  onFileUpload,
  errors,
  onBack,
  onNext,
  isLast,
  totalStudents,
  isSubmitting
}) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileUpload(index, file);
    }
  };

  return (
    <motion.div
      key={`student-${index}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-4"
    >
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-primary">
          Student {index + 1} of {totalStudents}
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="First Name"
          type="text"
          value={data.firstName || ''}
          onChange={(e) => onChange(index, 'firstName', e.target.value)}
          error={errors[`student${index}.firstName`]}
          placeholder="First Name"
        />
        <FormField
          label="Last Name"
          type="text"
          value={data.lastName || ''}
          onChange={(e) => onChange(index, 'lastName', e.target.value)}
          error={errors[`student${index}.lastName`]}
          placeholder="Last Name"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Date of Birth"
          type="date"
          value={data.dateOfBirth || ''}
          onChange={(e) => onChange(index, 'dateOfBirth', e.target.value)}
          error={errors[`student${index}.dateOfBirth`]}
        />
        <FormField
          label="Gender"
          type="select"
          value={data.gender || ''}
          onChange={(e) => onChange(index, 'gender', e.target.value)}
          options={genderOptions}
          error={errors[`student${index}.gender`]}
          placeholder="Select Gender"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Grade"
          type="select"
          value={data.grade || ''}
          onChange={(e) => onChange(index, 'grade', e.target.value)}
          options={gradeOptions}
          error={errors[`student${index}.grade`]}
          placeholder="Select Grade"
        />
        <FormField
          label="Country"
          type="select"
          value={data.country || ''}
          onChange={(e) => onChange(index, 'country', e.target.value)}
          options={countries}
          error={errors[`student${index}.country`]}
          placeholder="Select Country"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Nationality"
          type="select"
          value={data.nationality || ''}
          onChange={(e) => onChange(index, 'nationality', e.target.value)}
          options={nationalities}
          error={errors[`student${index}.nationality`]}
          placeholder="Select Nationality"
        />
        <FormField
          label="Preferred Language"
          type="select"
          value={data.language || ''}
          onChange={(e) => onChange(index, 'language', e.target.value)}
          options={languageOptions}
          error={errors[`student${index}.language`]}
          placeholder="Select Language"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary mb-1">
          Student Photo (Passport-size, JPEG/PNG)
        </label>
        <div className="relative">
          <div className="relative border-2 border-dashed border-surface rounded-lg p-4 hover:border-primary transition-colors">
            <input
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex items-center justify-center gap-2 text-secondary">
              <Upload className="w-5 h-5" />
              <span>
                {data.photo ? data.photo.name : 'Click or drag to upload photo'}
              </span>
            </div>
          </div>
        </div>
        {errors[`student${index}.photo`] && (
          <p className="mt-1 text-sm text-red-500">{errors[`student${index}.photo`]}</p>
        )}
      </div>

      <div className="flex gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBack}
          disabled={isSubmitting}
          className="w-full py-3 bg-surface text-secondary rounded-lg font-semibold hover:bg-surface/80 disabled:opacity-50"
        >
          Back
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          disabled={isSubmitting}
          className="w-full py-3 bg-primary text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 disabled:opacity-50"
        >
          {isLast ? 'Complete Registration' : 'Next Student'}
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>

      <div className="mt-4">
        <div className="bg-surface/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-secondary">
              Registration Progress
            </span>
            <span className="text-sm text-secondary">
              Student {index + 1} of {totalStudents}
            </span>
          </div>
          <div className="h-2 bg-surface rounded-full">
            <motion.div
              className="h-full bg-primary rounded-full"
              animate={{
                width: `${((index + 1) / totalStudents) * 100}%`
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StudentForm;