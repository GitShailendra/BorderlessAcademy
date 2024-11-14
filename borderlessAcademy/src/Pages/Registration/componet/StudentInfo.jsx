import React from 'react';
import { motion } from 'framer-motion';
import { User, Calendar, Globe, Flag, Languages, Upload } from 'lucide-react';
import FormField from '../FormField';
import { countries, nationalities } from '../../../constants/registration';
import FileUpload from '../FileUpload';

const StudentInfo = ({ 
  index, 
  data, 
  onChange, 
  onFileUpload, 
  errors, 
  onBack, 
  onNext,
  isLast,
  totalStudents 
}) => {
  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-primary">
          Student {index + 1} of {totalStudents}
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="First Name"
          icon={User}
          value={data.firstName || ''}
          onChange={(e) => onChange(index, 'firstName', e.target.value)}
          placeholder="First Name"
          error={errors[`student${index}.firstName`]}
        />
        <FormField
          label="Last Name"
          icon={User}
          value={data.lastName || ''}
          onChange={(e) => onChange(index, 'lastName', e.target.value)}
          placeholder="Last Name"
          error={errors[`student${index}.lastName`]}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Date of Birth"
          icon={Calendar}
          type="date"
          value={data.dateOfBirth || ''}
          onChange={(e) => onChange(index, 'dateOfBirth', e.target.value)}
          error={errors[`student${index}.dateOfBirth`]}
        />
        <FormField
          label="Gender"
          icon={User}
          type="select"
          value={data.gender || ''}
          onChange={(e) => onChange(index, 'gender', e.target.value)}
          options={[
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'other', label: 'Other' }
          ]}
          placeholder="Select Gender"
          error={errors[`student${index}.gender`]}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Grade Applying For"
          icon={User}
          type="select"
          value={data.grade || ''}
          onChange={(e) => onChange(index, 'grade', e.target.value)}
          options={[1, 2, 3, 4, 5].map(grade => ({
            value: grade.toString(),
            label: `Grade ${grade}`
          }))}
          placeholder="Select Grade"
          error={errors[`student${index}.grade`]}
        />
        <FormField
          label="Country of Residence"
          icon={Globe}
          type="select"
          value={data.country || ''}
          onChange={(e) => onChange(index, 'country', e.target.value)}
          options={countries}
          placeholder="Select Country"
          error={errors[`student${index}.country`]}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Nationality"
          icon={Flag}
          type="select"
          value={data.nationality || ''}
          onChange={(e) => onChange(index, 'nationality', e.target.value)}
          options={nationalities}
          placeholder="Select Nationality"
          error={errors[`student${index}.nationality`]}
        />
        <FormField
          label="Preferred Language"
          icon={Languages}
          type="select"
          value={data.language || ''}
          onChange={(e) => onChange(index, 'language', e.target.value)}
          options={[
            { value: 'english', label: 'English' },
            { value: 'malay', label: 'Bahasa Malaysia' },
            { value: 'mandarin', label: 'Mandarin' },
            { value: 'tamil', label: 'Tamil' },
            { value: 'other', label: 'Other' }
          ]}
          placeholder="Select Language"
          error={errors[`student${index}.language`]}
        />
      </div>

      <FileUpload
        value={data.photo}
        onChange={(file) => onFileUpload(index, file)}
        error={errors[`student${index}.photo`]}
      />

      <div className="flex gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBack}
          className="w-full py-3 bg-surface text-secondary rounded-lg font-semibold hover:bg-surface/80"
        >
          Back
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90"
        >
          {isLast ? 'Complete Registration' : 'Next Student'}
        </motion.button>
      </div>

      <div className="mt-4">
        <div className="bg-surface/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-secondary">Registration Progress</span>
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
    </div>
  );
};

export default StudentInfo;
