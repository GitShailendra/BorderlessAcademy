import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  GraduationCap 
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
    <div className="min-h-screen bg-gradient-to-br mt-24 from-accent/20 via-white to-secondary/20 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-primary mb-2">Join Our Learning Community</h1>
          <p className="text-secondary">Create your account to start your educational journey</p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex border-b">
            <motion.button
              whileHover={{ backgroundColor: activeTab === 'guardian' ? 'var(--color-surface)' : '#f8fafc' }}
              onClick={() => {
                setActiveTab('guardian');
                setStep(1);
              }}
              className={`flex-1 px-6 py-4 flex items-center justify-center gap-2 font-semibold transition-colors ${
                activeTab === 'guardian' ? 'text-primary bg-surface' : 'text-secondary hover:bg-surface/50'
              }`}
            >
              <GraduationCap className="w-5 h-5" />
              Guardian Registration
            </motion.button>
            <motion.button
              whileHover={{ backgroundColor: activeTab === 'teacher' ? 'var(--color-surface)' : '#f8fafc' }}
              onClick={() => {
                setActiveTab('teacher');
                setStep(1);
              }}
              className={`flex-1 px-6 py-4 flex items-center justify-center gap-2 font-semibold transition-colors ${
                activeTab === 'teacher' ? 'text-primary bg-surface' : 'text-secondary hover:bg-surface/50'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              Teacher Registration
            </motion.button>
          </div>

          <div className="p-8">
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center w-full">
                  <motion.div
                    animate={{
                      backgroundColor: step >= 1 ? 'var(--color-primary)' : '#e2e8f0',
                    }}
                    className="w-8 h-8 rounded-full z-10 flex items-center justify-center text-white font-semibold"
                  >
                    1
                  </motion.div>
                  <div className="flex-1 bg-surface relative h-1 mx-2">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{
                        backgroundColor: step === 2 ? 'var(--color-primary)' : '#e2e8f0',
                      }}
                      className="absolute top-0 left-0 h-full bg-primary"
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <motion.div
                    animate={{
                      backgroundColor: step === 2 ? 'var(--color-primary)' : '#e2e8f0',
                    }}
                    className="w-8 h-8 z-10 rounded-full flex items-center justify-center text-white font-semibold"
                  >
                    2
                  </motion.div>
                </div>
              </div>

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

              <div className="mt-6 text-center">
                <p className="text-secondary">
                  Already have an account?{' '}
                  <a href="/login" className="text-primary font-semibold hover:text-primary/90">
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