import React, { useState } from 'react';
import {
  BookOpen,
  Clock,
  Calendar,
  User,
  BarChart,
  ChevronRight,
  FileText,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import img1 from '../../../assets/Images/Photo/avatar-1.svg';
import img2 from '../../../assets/Images/Photo/avatar-2.svg';

const Courses = () => {
  const [selectedStudent, setSelectedStudent] = useState('all');

  // Dummy data for students and their courses
  const students = [
    {
      id: 1,
      name: "John Doe",
      grade: "4th Grade",
      image: img1,
      courses: [
        {
          id: 1,
          name: "Mathematics",
          teacher: "Mrs. Smith",
          schedule: "Mon, Wed, Fri",
          time: "9:00 AM - 10:00 AM",
          progress: 85,
          nextClass: "2024-12-15",
          upcomingTopics: ["Fractions", "Decimals"],
          recentGrade: "A",
          completedAssignments: 15,
          totalAssignments: 18
        },
        {
          id: 2,
          name: "Science",
          teacher: "Mr. Johnson",
          schedule: "Tue, Thu",
          time: "10:30 AM - 11:30 AM",
          progress: 78,
          nextClass: "2024-12-14",
          upcomingTopics: ["Plant Life", "Ecosystems"],
          recentGrade: "B+",
          completedAssignments: 12,
          totalAssignments: 15
        }
      ]
    },
    {
      id: 2,
      name: "Jane Doe",
      grade: "2nd Grade",
      image: img2,
      courses: [
        {
          id: 3,
          name: "English",
          teacher: "Ms. Davis",
          schedule: "Mon, Wed, Fri",
          time: "11:00 AM - 12:00 PM",
          progress: 92,
          nextClass: "2024-12-15",
          upcomingTopics: ["Grammar", "Reading Comprehension"],
          recentGrade: "A",
          completedAssignments: 14,
          totalAssignments: 16
        },
        {
          id: 4,
          name: "Art",
          teacher: "Mrs. Wilson",
          schedule: "Thu",
          time: "2:00 PM - 3:00 PM",
          progress: 95,
          nextClass: "2024-12-16",
          upcomingTopics: ["Color Theory", "Drawing Skills"],
          recentGrade: "A+",
          completedAssignments: 8,
          totalAssignments: 8
        }
      ]
    }
  ];

  const getProgressColor = (progress) => {
    if (progress >= 90) return 'bg-green-500';
    if (progress >= 75) return 'bg-blue-500';
    if (progress >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header with Student Selector */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Courses</h1>
          <p className="text-gray-500 mt-1">View and track your children's courses</p>
        </div>
        <select
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Students</option>
          {students.map(student => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </select>
      </div>

      {/* Courses Grid */}
      {students.map(student => (
        (selectedStudent === 'all' || selectedStudent === student.id.toString()) && (
          <div key={student.id} className="mb-8">
            {selectedStudent === 'all' && (
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={student.image}
                  alt={student.name}
                  className="w-10 h-10 rounded-full border"
                />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{student.name}</h2>
                  <p className="text-sm text-gray-500">{student.grade}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {student.courses.map(course => (
                <div key={course.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
                  {/* Course Header */}
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{course.name}</h3>
                        <p className="text-gray-500 mt-1">Teacher: {course.teacher}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        course.recentGrade.startsWith('A') ? 'bg-green-100 text-green-800' :
                        course.recentGrade.startsWith('B') ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        Grade: {course.recentGrade}
                      </span>
                    </div>
                  </div>

                  {/* Course Progress */}
                  <div className="p-6 border-b border-gray-200">
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Course Progress</span>
                        <span className="text-sm font-medium text-gray-900">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`${getProgressColor(course.progress)} h-2 rounded-full`}
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Assignments: {course.completedAssignments}/{course.totalAssignments}</span>
                    </div>
                  </div>

                  {/* Schedule & Details */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar size={16} className="text-gray-400" />
                      <span>{course.schedule}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Clock size={16} className="text-gray-400" />
                      <span>{course.time}</span>
                    </div>
                    
                    {/* Upcoming Topics */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-900">Upcoming Topics:</h4>
                      <div className="flex flex-wrap gap-2">
                        {course.upcomingTopics.map((topic, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
                    <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                      View Details
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );
};

export default Courses;