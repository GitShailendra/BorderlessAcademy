import React from 'react';
import { Upload } from 'lucide-react';

const FileUpload = ({ value, onChange, error }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onChange(file);
    }
  };

  return (
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
              {value ? value.name : 'Click or drag to upload photo'}
            </span>
          </div>
        </div>
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FileUpload;