import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Send, 
  Loader2,
  Upload,
  X,
  User,
  Mail,
  Phone as PhoneIcon,
  HelpCircle,
  Clock,
  MessageSquare
} from 'lucide-react';

export default function ContactForm() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    subject: '',
    message: '',
    preferredContact: '',
    preferredTime: ''
  });

  const inquiryTypes = [
    "General Information",
    "Admission Query",
    "Technical Support",
    "Partnership Opportunity",
    "Other"
  ];

  const contactPreferences = [
    "Email",
    "Phone",
    "WhatsApp"
  ];

  const timePreferences = [
    "Morning (9AM - 12PM)",
    "Afternoon (12PM - 3PM)",
    "Evening (3PM - 6PM)"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        inquiryType: '',
        subject: '',
        message: '',
        preferredContact: '',
        preferredTime: ''
      });
      setFile(null);
    }, 2000);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size <= 5 * 1024 * 1024) { // 5MB limit
      setFile(selectedFile);
    } else {
      alert('Please select a file under 5MB');
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-3xl p-12 shadow-xl max-w-4xl mx-auto">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Send className="h-10 w-10 text-green-600" />
          </div>
          <h3 className="text-3xl font-bold text-primary mb-4">Message Sent Successfully!</h3>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for reaching out. Our team will respond to your inquiry within 24 hours.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-8 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-all hover:scale-105"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl max-w-4xl mx-auto">
      {/* Form Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Get in Touch</h2>
        <p className="text-gray-600">
          Have questions? We'd love to hear from you. Send us a message and we'll get back to you shortly.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="Your full name"
              />
              <User className="h-5 w-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>
          
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="your@email.com"
              />
              <Mail className="h-5 w-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="+60 1X-XXX XXXX"
              />
              <PhoneIcon className="h-5 w-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Inquiry Type *
            </label>
            <div className="relative">
              <select
                name="inquiryType"
                value={formData.inquiryType}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
              >
                <option value="">Select inquiry type</option>
                {inquiryTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <HelpCircle className="h-5 w-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subject *
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            placeholder="Brief subject of your inquiry"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Message *
          </label>
          <div className="relative">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              placeholder="Your message here..."
            />
            <MessageSquare className="h-5 w-5 text-gray-400 absolute left-4 top-4" />
          </div>
        </div>

        {/* Contact Preferences */}
        <div className="bg-gray-50 p-6 rounded-xl space-y-6">
          <h3 className="font-medium text-gray-900">Contact Preferences</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Method
              </label>
              <select
                name="preferredContact"
                value={formData.preferredContact}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              >
                <option value="">Select preference</option>
                {contactPreferences.map((method) => (
                  <option key={method} value={method}>{method}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Best Time
              </label>
              <div className="relative">
                <select
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
                >
                  <option value="">Select time</option>
                  {timePreferences.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
                <Clock className="h-5 w-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>
        </div>

        {/* File Upload */}
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-8">
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Attachment (Optional)
          </label>
          {file ? (
            <div className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-xl">
              <span className="text-sm text-gray-600">{file.name}</span>
              <button
                type="button"
                onClick={() => setFile(null)}
                className="text-gray-400 hover:text-gray-500 p-2 hover:bg-gray-100 rounded-full transition-all"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <label className="cursor-pointer hover:bg-gray-50 rounded-xl p-8 block text-center transition-colors">
              <Upload className="h-8 w-8 mx-auto mb-3 text-gray-400" />
              <span className="text-sm text-gray-600">
                Drag and drop a file here, or click to select
              </span>
              <span className="block text-xs text-gray-500 mt-2">
                Maximum file size: 5MB
              </span>
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
            </label>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all hover:shadow-lg disabled:opacity-50 text-lg font-medium"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin h-6 w-6 mr-2" />
                Sending Message...
              </>
            ) : (
              <>
                <Send className="h-6 w-6 mr-2" />
                Send Message
              </>
            )}
          </button>
        </div>

        {/* Privacy Note */}
        <p className="text-sm text-gray-500 text-center">
          By submitting this form, you agree to our{' '}
          <a href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </a>
        </p>
      </form>
    </div>
  );
}
