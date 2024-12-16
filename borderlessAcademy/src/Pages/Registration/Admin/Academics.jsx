import React, { useState } from 'react';
import { 
  Search, Plus, Book, Calendar, Clock,
  Edit2, Trash2, MoreVertical, FileText,
  User, BookOpen
} from 'lucide-react';

const AcademicManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Static academic data
  const academicPrograms = [
    {
      id: 1,
      name: "Core Mathematics Program",
      coordinator: "Dr. Sarah Wilson",
      grades: ["Grade 7", "Grade 8", "Grade 9"],
      subjects: ["Algebra", "Geometry", "Statistics"],
      schedule: "Mon, Wed, Fri",
      duration: "45 mins per class",
      totalStudents: 245,
      status: "active"
    },
    {
      id: 2,
      name: "Science Excellence Track",
      coordinator: "Prof. James Murphy",
      grades: ["Grade 8", "Grade 9"],
      subjects: ["Physics", "Chemistry", "Biology"],
      schedule: "Tue, Thu",
      duration: "60 mins per class",
      totalStudents: 180,
      status: "active"
    },
    {
      id: 3,
      name: "Language Arts Program",
      coordinator: "Ms. Emily Chen",
      grades: ["Grade 7", "Grade 8"],
      subjects: ["Literature", "Grammar", "Creative Writing"],
      schedule: "Mon, Wed, Thu",
      duration: "50 mins per class",
      totalStudents: 200,
      status: "active"
    }
  ];

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Academic Programs</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus size={20} />
          <span>Add Program</span>
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search programs..."
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
            <option value="">Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Programs List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Academic Programs Directory</h2>
          <div className="divide-y">
            {academicPrograms.map((program) => (
              <div key={program.id} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Book size={24} className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{program.name}</h3>
                      <p className="text-sm text-gray-500">Coordinator: {program.coordinator}</p>
                      
                      <div className="mt-2 grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <User size={16} />
                          Students: {program.totalStudents}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={16} />
                          {program.schedule}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={16} />
                          {program.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen size={16} />
                          Grades: {program.grades.join(", ")}
                        </div>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-2">
                        {program.subjects.map((subject, index) => (
                          <span 
                            key={index}
                            className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full"
                          >
                            {subject}
                          </span>
                        ))}
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

export default AcademicManagement;