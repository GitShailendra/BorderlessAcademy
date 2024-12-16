import React, { useState } from 'react';
import { 
  Search, Plus, MoreVertical, Edit2, Trash2, 
  Mail, Book, GraduationCap, Calendar,
  User, Clock, BookOpen
} from 'lucide-react';

const StudentManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Static student data
  const students = [
    {
      id: 1,
      name: "John Wilson",
      email: "john.wilson@school.com",
      grade: "Grade 8",
      section: "A",
      rollNo: "8A001",
      guardian: "Robert Wilson (Father)",
      joinDate: "2023-08-15",
      attendance: "95%",
      subjects: ["Mathematics", "Science", "English", "History"],
      status: "active"
    },
    {
      id: 2,
      name: "Emma Thompson",
      email: "emma.thompson@school.com",
      grade: "Grade 7",
      section: "B",
      rollNo: "7B002",
      guardian: "Sarah Thompson (Mother)",
      joinDate: "2023-07-20",
      attendance: "98%",
      subjects: ["Mathematics", "Science", "English", "Geography"],
      status: "active"
    },
    {
      id: 3,
      name: "Michael Chang",
      email: "michael.chang@school.com",
      grade: "Grade 9",
      section: "A",
      rollNo: "9A003",
      guardian: "David Chang (Father)",
      joinDate: "2023-09-01",
      attendance: "92%",
      subjects: ["Mathematics", "Physics", "English", "Computer Science"],
      status: "active"
    }
  ];

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Student Management</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus size={20} />
          <span>Add Student</span>
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex-1 relative min-w-[200px]">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search students..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Grades</option>
            <option value="7">Grade 7</option>
            <option value="8">Grade 8</option>
            <option value="9">Grade 9</option>
          </select>
          <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Sections</option>
            <option value="A">Section A</option>
            <option value="B">Section B</option>
            <option value="C">Section C</option>
          </select>
          <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Students List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Students Directory</h2>
          <div className="divide-y">
            {students.map((student) => (
              <div key={student.id} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-xl font-semibold text-gray-600">
                        {student.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-gray-900">{student.name}</h3>
                        <span className="text-sm bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                          {student.rollNo}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{student.grade} - Section {student.section}</p>
                      <div className="mt-2 grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Mail size={16} />
                          {student.email}
                        </div>
                        <div className="flex items-center gap-1">
                          <User size={16} />
                          {student.guardian}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={16} />
                          Attendance: {student.attendance}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={16} />
                          Joined: {new Date(student.joinDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                        <BookOpen size={16} />
                        <span>Subjects: </span>
                        <div className="flex gap-2">
                          {student.subjects.map((subject, index) => (
                            <span 
                              key={index}
                              className="bg-gray-100 px-2 py-0.5 rounded-full text-xs"
                            >
                              {subject}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Edit2 size={16} className="text-blue-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Trash2 size={16} className="text-red-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <MoreVertical size={16} className="text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentManagement;