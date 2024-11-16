import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  GraduationCap, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  Calendar, 
  School,
  ChevronRight,
  Upload,
  Briefcase,
  FileText,
  Globe,
  Laptop,
  Clock,
  Home, Heart, AlertCircle, BadgeHelp,Users, CreditCard,EyeIcon
} from 'lucide-react';
import TeacherRegistrationForm from './TeacherRegistration/TeacherRegistration';
import GuardianRegistrationForm from './GaurdianRegistration/GaurdianRegistration';
const RegisterPage = () => {
  const [activeTab, setActiveTab] = useState('guardian');
  const [step, setStep] = useState(1);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Our Learning Community</h1>
          <p className="text-gray-600">Create your account to start your educational journey</p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex border-b">
            <motion.button
              whileHover={{ backgroundColor: activeTab === 'guardian' ? '#f0fdfa' : '#f8fafc' }}
              onClick={() => {
                setActiveTab('guardian');
                setStep(1);
              }}
              className={`flex-1 px-6 py-4 flex items-center justify-center gap-2 font-semibold transition-colors ${
                activeTab === 'guardian' ? 'text-teal-600 bg-teal-50' : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <GraduationCap className="w-5 h-5" />
              Guardian Registration
            </motion.button>
            <motion.button
              whileHover={{ backgroundColor: activeTab === 'teacher' ? '#f0fdfa' : '#f8fafc' }}
              onClick={() => {
                setActiveTab('teacher');
                setStep(1);
              }}
              className={`flex-1 px-6 py-4 flex items-center justify-center gap-2 font-semibold transition-colors ${
                activeTab === 'teacher' ? 'text-teal-600 bg-teal-50' : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              Teacher Registration
            </motion.button>
          </div>

          <div className="p-8">
            <div className="max-w-md mx-auto">
              {/* Progress Indicator */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center w-full">
                  <motion.div
                    animate={{
                      backgroundColor: step >= 1 ? '#14b8a6' : '#e2e8f0',
                    }}
                    className="w-8 h-8 rounded-full z-10 flex items-center justify-center text-white font-semibold"
                  >
                    1
                  </motion.div>
                  <div className="flex-1 bg-gray-200 relative h-1 mx-2">
                    <motion.div
                    initial={{ width: "0%" }}
                      animate={{
                        backgroundColor: step === 2 ? '#14b8a6' : '#e2e8f0',
                      }}
                      className="absolute top-0 left-0 h-full bg-teal-500"
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <motion.div
                    animate={{
                      backgroundColor: step === 2 ? '#14b8a6' : '#e2e8f0',
                    }}
                    className="w-8 h-8 z-10 rounded-full flex items-center justify-center text-white font-semibold"
                  >
                    2
                  </motion.div>
                </div>
              </div>

              {/* Form Content */}
              <AnimatePresence mode="wait">
                {activeTab === 'guardian' ? (
                   <GuardianRegistrationForm 
                   currentStep={step}
                   onStepChange={setStep}
                 />
                ) : (
                  <TeacherRegistrationForm 
                    currentStep={step}
                    onStepChange={setStep}
                  />
                )}
              </AnimatePresence>

              {/* Sign In Link */}
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <a href="/login" className="text-teal-600 font-semibold hover:text-teal-700">
                    Sign In
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;