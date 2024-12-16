import React from 'react';
import { Clock, Users, Brain, GraduationCap } from 'lucide-react';

const MyClasses = () => {
  // Dummy class data
  const classes = [
    {
      id: 1,
      subject: "Mathematics",
      teacher: "Dr. Sarah Wilson",
      nextClass: "Today, 2:00 PM",
      students: 28,
      progress: 75,
      topic: "Algebraic Expressions",
      room: "Room 301"
    },
    {
      id: 2,
      subject: "Physics",
      teacher: "Prof. James Miller",
      nextClass: "Tomorrow, 10:00 AM",
      students: 24,
      progress: 85,
      topic: "Motion Laws",
      room: "Lab 201"
    },
    {
      id: 3,
      subject: "Biology",
      teacher: "Ms. Emily Parker",
      nextClass: "Today, 4:00 PM",
      students: 26,
      progress: 60,
      topic: "Cell Structure",
      room: "Lab 102"
    },
    {
      id: 4,
      subject: "Chemistry",
      teacher: "Dr. Michael Brown",
      nextClass: "Wednesday, 1:00 PM",
      students: 22,
      progress: 90,
      topic: "Periodic Table",
      room: "Lab 203"
    }
  ];

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">My Classes</h1>
        <div className="flex gap-4">
          <select className="px-4 py-2 border rounded-lg text-gray-600 bg-white">
            <option>All Subjects</option>
            <option>Science</option>
            <option>Mathematics</option>
          </select>
          <select className="px-4 py-2 border rounded-lg text-gray-600 bg-white">
            <option>Current Semester</option>
            <option>Previous Semester</option>
          </select>
        </div>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {classes.map((classItem) => (
          <div 
            key={classItem.id} 
            className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow p-6"
          >
            {/* Card Header */}
            <div className="pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {classItem.subject}
                  </h2>
                  <p className="text-gray-500 mt-1">{classItem.teacher}</p>
                </div>
                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                  {classItem.room}
                </span>
              </div>
            </div>

            {/* Card Content */}
            <div className="space-y-4">
              {/* Progress Bar */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Course Progress</span>
                  <span className="text-gray-900 font-medium">{classItem.progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${classItem.progress}%` }}
                  />
                </div>
              </div>

              {/* Class Info Grid */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{classItem.nextClass}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{classItem.students} Students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{classItem.topic}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">3 Credits</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Join Class
                </button>
                <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyClasses;