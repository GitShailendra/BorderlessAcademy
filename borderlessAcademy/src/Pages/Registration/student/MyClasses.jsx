import React, { useEffect, useState } from 'react';
import { Clock, Users, Brain, GraduationCap } from 'lucide-react';
import studentService from '../../../Components/services/studentService';

const MyClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [stats, setStats] = useState({
    totalClasses: 0,
    subjects: 0
  });

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await studentService.getClasses();
      console.log('this is student response', response.classes);
      
      if (response.classes) {
        const allClasses = response.classes.reduce((acc, classGroup, index) => {
          if (classGroup) {
            const classesToAdd = Array.isArray(classGroup) ? classGroup : [classGroup];
            return [...acc, ...classesToAdd];
          }
          return acc;
        }, []);
        
        setClasses(allClasses);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch classes');
    } finally {
      setLoading(false);
    }
  };

  const formatScheduleTime = (schedule) => {
    if (!schedule || !schedule.dayOfWeek || !schedule.dayOfWeek[0]) return "Not scheduled";
    return `${schedule.dayOfWeek[0]}, ${schedule.startTime} - ${schedule.endTime}`;
  };

  const getTeacherName = (teacher) => {
    if (!teacher) return "Not assigned";
    return `${teacher.firstName} ${teacher.lastName}`;
  };

  // Get unique subjects from classes
  const getUniqueSubjects = () => {
    const subjects = new Set(classes.map(classItem => classItem.subject?.name));
    return ['All Subjects', ...Array.from(subjects)].filter(Boolean);
  };

  // Filter classes based on selected subject
  const filteredClasses = classes.filter(classItem => {
    if (selectedSubject === 'All Subjects') return true;
    return classItem.subject?.name === selectedSubject;
  });

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">My Classes</h1>
        <div className="flex gap-4">
          <select 
            className="px-4 py-2 border rounded-lg text-gray-600 bg-white"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            {getUniqueSubjects().map(subject => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          <select className="px-4 py-2 border rounded-lg text-gray-600 bg-white">
            <option>Current Semester</option>
            <option>Previous Semester</option>
          </select>
        </div>
      </div>

      {/* No Classes Message */}
      {filteredClasses.length === 0 && (
        <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-sm">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Classes Found</h3>
          <p className="text-gray-600">
            {selectedSubject === 'All Subjects' 
              ? "You don't have any classes yet."
              : `No classes found for ${selectedSubject}.`}
          </p>
        </div>
      )}

      {/* Classes Grid */}
      {filteredClasses.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredClasses.map((classItem) => (
            <div 
              key={classItem._id} 
              className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow p-6"
            >
              {/* Card Header */}
              <div className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {classItem.name}
                    </h2>
                    <p className="text-gray-500 mt-1">
                      {classItem.subject?.name} | {getTeacherName(classItem.teacher)}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                    Section {classItem.section}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="space-y-4">
                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Course Progress</span>
                    <span className="text-gray-900 font-medium">{classItem.progress || 0}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${classItem.progress || 0}%` }}
                    />
                  </div>
                </div>

                {/* Class Info Grid */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {formatScheduleTime(classItem.schedule)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {classItem.students?.length || 0} Students
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      Grade {classItem.grade}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {classItem.academicYear}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Join Class
                  </button>
                  <a 
                    href={classItem.meetingLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Meeting Link
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyClasses;