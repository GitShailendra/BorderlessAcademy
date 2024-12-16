import React, { useState } from 'react';
import { 
  Search, Plus, MoreVertical, Edit2, Trash2, 
  Mail, Phone, Calendar, BookOpen 
} from 'lucide-react';

const TeachersManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Static teacher data
  const teachers = [
    {
      id: 1,
      name: "Dr. Sarah Wilson",
      email: "sarah.wilson@school.com",
      phone: "+1 (555) 123-4567",
      subject: "Mathematics",
      joinDate: "2023-08-15",
      classes: ["Grade 10-A", "Grade 11-B"],
      status: "active"
    },
    {
      id: 2,
      name: "Prof. James Murphy",
      email: "james.murphy@school.com",
      phone: "+1 (555) 234-5678",
      subject: "Physics",
      joinDate: "2023-09-01",
      classes: ["Grade 11-A", "Grade 12-A"],
      status: "active"
    },
    {
      id: 3,
      name: "Ms. Emily Chen",
      email: "emily.chen@school.com",
      phone: "+1 (555) 345-6789",
      subject: "English Literature",
      joinDate: "2023-10-15",
      classes: ["Grade 9-B", "Grade 10-C"],
      status: "active"
    }
  ];

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Teacher Management</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus size={20} />
          <span>Add Teacher</span>
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search teachers..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Subjects</option>
            <option value="mathematics">Mathematics</option>
            <option value="physics">Physics</option>
            <option value="english">English</option>
          </select>
          <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Teachers List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Teachers Directory</h2>
          <div className="divide-y">
            {teachers.map((teacher) => (
              <div key={teacher.id} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-xl font-semibold text-gray-600">
                        {teacher.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{teacher.name}</h3>
                      <p className="text-sm text-gray-500">{teacher.subject}</p>
                      <div className="mt-2 flex gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Mail size={16} />
                          {teacher.email}
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone size={16} />
                          {teacher.phone}
                        </div>
                      </div>
                      <div className="mt-2 flex gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar size={16} />
                          Joined: {new Date(teacher.joinDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen size={16} />
                          Classes: {teacher.classes.join(", ")}
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

export default TeachersManagement;