import React, { useState } from 'react';
import {
  User,
  Phone,
  Mail,
  Calendar,
  BookOpen,
  Award,
  BarChart,
  Clock,
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import img1 from '../../../assets/Images/Photo/avatar-1.svg';
import img2 from '../../../assets/Images/Photo/avatar-2.svg';

const MyStudents = () => {
  // Dummy data for students
  const students = [
    {
      id: 1,
      name: "John Doe",
      grade: "4th Grade",
      section: "A",
      image: img1,
      attendance: "95%",
      performance: "Excellent",
      teacher: "Mrs. Smith",
      upcomingClasses: 3,
      pendingAssignments: 2,
      recentGrades: [
        { subject: "Mathematics", grade: "A", date: "2024-12-10" },
        { subject: "Science", grade: "A-", date: "2024-12-08" },
        { subject: "English", grade: "B+", date: "2024-12-07" }
      ]
    },
    {
      id: 2,
      name: "Jane Doe",
      grade: "2nd Grade",
      section: "B",
      image: img2,
      attendance: "92%",
      performance: "Good",
      teacher: "Mr. Johnson",
      upcomingClasses: 2,
      pendingAssignments: 1,
      recentGrades: [
        { subject: "Mathematics", grade: "B+", date: "2024-12-10" },
        { subject: "Science", grade: "A", date: "2024-12-09" },
        { subject: "English", grade: "A-", date: "2024-12-08" }
      ]
    }
  ];

  const getPerformanceColor = (performance) => {
    const colors = {
      'Excellent': 'text-green-500',
      'Good': 'text-blue-500',
      'Fair': 'text-yellow-500',
      'Needs Improvement': 'text-red-500'
    };
    return colors[performance] || 'text-gray-500';
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">My Students</h1>
        <p className="text-gray-500 mt-1">Monitor your children's academic progress</p>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {students.map((student) => (
          <div key={student.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Student Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start gap-4">
                <img
                  src={student.image}
                  alt={student.name}
                  className="w-16 h-16 rounded-full border"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900">{student.name}</h2>
                  <p className="text-gray-500">{student.grade} - Section {student.section}</p>
                  <p className="text-gray-500">Class Teacher: {student.teacher}</p>
                </div>
                <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                  View Details
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 p-6 border-b border-gray-200">
              <div className="space-y-1">
                <div className="text-sm text-gray-500">Attendance</div>
                <div className="text-2xl font-semibold text-gray-900">{student.attendance}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-500">Performance</div>
                <div className={`text-2xl font-semibold ${getPerformanceColor(student.performance)}`}>
                  {student.performance}
                </div>
              </div>
            </div>

            {/* Academic Overview */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                  <Clock className="text-blue-500" size={20} />
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {student.upcomingClasses} Upcoming Classes
                    </div>
                    <div className="text-xs text-gray-500">Today</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                  <AlertCircle className="text-orange-500" size={20} />
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {student.pendingAssignments} Pending Assignments
                    </div>
                    <div className="text-xs text-gray-500">Due Soon</div>
                  </div>
                </div>
              </div>

              {/* Recent Grades */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Recent Grades</h3>
                <div className="space-y-3">
                  {student.recentGrades.map((grade, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100">
                      <div>
                        <div className="font-medium text-gray-900">{grade.subject}</div>
                        <div className="text-sm text-gray-500">
                          {new Date(grade.date).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-lg font-semibold text-blue-600">{grade.grade}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyStudents;