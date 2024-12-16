import React, { useState } from 'react';
import { 
  Search, Plus, BookOpen, Users, Clock,
  Edit2, Trash2, MoreVertical, Calendar,
  MapPin, User
} from 'lucide-react';

const ClassesManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Static classes data
  const classes = [
    {
      id: 1,
      name: "Mathematics 8A",
      teacher: "Dr. Sarah Wilson",
      grade: "Grade 8",
      section: "A",
      room: "Room 101",
      schedule: "Mon, Wed, Fri 9:00 AM",
      students: 28,
      topics: ["Algebra", "Geometry", "Statistics"],
      status: "active"
    },
    {
      id: 2,
      name: "Physics 9B",
      teacher: "Prof. James Murphy",
      grade: "Grade 9",
      section: "B",
      room: "Lab 203",
      schedule: "Tue, Thu 10:30 AM",
      students: 25,
      topics: ["Mechanics", "Waves", "Energy"],
      status: "active"
    },
    {
      id: 3,
      name: "English Literature 7A",
      teacher: "Ms. Emily Chen",
      grade: "Grade 7",
      section: "A",
      room: "Room 105",
      schedule: "Mon, Wed, Thu 11:30 AM",
      students: 30,
      topics: ["Poetry", "Novel Study", "Creative Writing"],
      status: "active"
    }
  ];

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Classes Management</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus size={20} />
          <span>Add Class</span>
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex-1 relative min-w-[200px]">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search classes..."
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

      {/* Classes List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Classes Directory</h2>
          <div className="divide-y">
            {classes.map((classItem) => (
              <div key={classItem.id} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <BookOpen size={24} className="text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{classItem.name}</h3>
                      <p className="text-sm text-gray-500">
                        {classItem.grade} - Section {classItem.section}
                      </p>
                      
                      <div className="mt-2 grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <User size={16} />
                          Teacher: {classItem.teacher}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin size={16} />
                          {classItem.room}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={16} />
                          {classItem.schedule}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users size={16} />
                          Students: {classItem.students}
                        </div>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-2">
                        {classItem.topics.map((topic, index) => (
                          <span 
                            key={index}
                            className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full"
                          >
                            {topic}
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

export default ClassesManagement;