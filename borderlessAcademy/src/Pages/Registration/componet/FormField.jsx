// src/components/registration/FormField.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

const FormField = ({ 
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  icon: Icon,
  required = false,
  disabled = false,
  className = '',
  options = [],
  rows = 3,
  max,
  min,
  maxLength,
  pattern,
  inputMode,
  autoComplete,
  name,
}) => {
  const inputClasses = `
    w-full
    pl-10
    pr-4
    py-2.5
    border
    ${error ? 'border-red-500 focus:ring-red-500' : 'border-surface focus:ring-primary'}
    rounded-lg
    focus:outline-none
    focus:ring-2
    transition-colors
    duration-200
    ${disabled ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : 'bg-white'}
    ${className}
  `;

  const renderInput = () => {
    switch (type) {
      case 'select':
        return (
          <select
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`${inputClasses} appearance-none`}
            name={name}
          >
            <option value="">{placeholder}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            rows={rows}
            className={`${inputClasses} min-h-[80px] py-3`}
            name={name}
            maxLength={maxLength}
          />
        );

      case 'file':
        return (
          <div className="relative">
            <input
              type="file"
              onChange={onChange}
              disabled={disabled}
              accept="image/jpeg,image/png"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              name={name}
            />
            <div className={`${inputClasses} flex items-center cursor-pointer`}>
              {value ? value.name : placeholder}
            </div>
          </div>
        );

      default:
        return (
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className={inputClasses}
            min={min}
            max={max}
            maxLength={maxLength}
            pattern={pattern}
            inputMode={inputMode}
            autoComplete={autoComplete}
            name={name}
          />
        );
    }
  };

  return (
    <div className="form-field">
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-secondary mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Icon */}
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
        )}

        {/* Input Element */}
        {renderInput()}

        {/* Error Icon */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <AlertCircle className="w-5 h-5 text-red-500" />
          </motion.div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-sm text-red-500"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

// Specialized form fields for common use cases
export const TextField = (props) => <FormField {...props} type="text" />;
export const EmailField = (props) => <FormField {...props} type="email" inputMode="email" autoComplete="email" />;
export const PasswordField = (props) => <FormField {...props} type="password" autoComplete="current-password" />;
export const PhoneField = (props) => (
  <FormField 
    {...props} 
    type="tel" 
    inputMode="tel" 
    autoComplete="tel"
    pattern="[0-9+\s-]*"
  />
);
export const SelectField = (props) => <FormField {...props} type="select" />;
export const TextareaField = (props) => <FormField {...props} type="textarea" />;
export const FileField = (props) => <FormField {...props} type="file" />;
export const NumberField = (props) => <FormField {...props} type="number" inputMode="numeric" />;
export const DateField = (props) => <FormField {...props} type="date" />;

export default FormField;