import React, { useState } from 'react';
import { motion } from 'framer-motion';
import StudentRegistrationForm from './StudentRegistrationForm';
import { CheckCircle } from 'lucide-react'; // Import CheckCircle icon

const StudentRegistrationManager = ({ numberOfStudents, guardianId,onCompleteAllRegistrations  }) => {
  const [currentStudent, setCurrentStudent] = useState(1);
  const [completedStudents, setCompletedStudents] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [allCompleted, setAllCompleted] = useState(false);

  const handleStudentSubmit = async (studentData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:5000/student/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...studentData,
          guardianId,
        }),
      });
      console.log("form submitted",response.json())
      if (!response.ok) {
        throw new Error('Failed to register student');
      }

      setCompletedStudents(prev => [...prev, studentData]);
      
      if (currentStudent < numberOfStudents) {
        setCurrentStudent(prev => prev + 1);
      } else {
        // All students have been registered
        setAllCompleted(true);
        // Wait for 2 seconds to show success message before redirecting
        setTimeout(() => {
          onCompleteAllRegistrations();
        }, 2000);
      }
    } catch (error) {
      console.error('Error registering student:', error);
      // Handle error appropriately
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {allCompleted ? (
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center p-8 space-y-4"
        >
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-900">
            All Students Registered Successfully!
          </h2>
          <p className="text-gray-600">
            Redirecting back to guardian registration...
          </p>
        </motion.div>
      ) : (
        <>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Student Registration</h2>
            <p className="text-gray-600">
              Registering student {currentStudent} of {numberOfStudents}
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <motion.div
              initial={{ width: 0 }}
              animate={{ 
                width: `${(completedStudents.length / numberOfStudents) * 100}%`
              }}
              className="bg-teal-500 h-2 rounded-full"
            />
          </div>

          <StudentRegistrationForm
            studentNumber={currentStudent}
            onSubmit={handleStudentSubmit}
          />

          {/* Summary of completed registrations */}
          {completedStudents.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Registered Students</h3>
              <div className="space-y-2">
                {completedStudents.map((student, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-gray-50 rounded-lg flex items-center justify-between"
                  >
                    <span className="font-medium">{student.fullName}</span>
                    <span className="text-gray-500">Grade {student.grade}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default StudentRegistrationManager;