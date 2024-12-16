import React, { useState } from 'react';
import {
  Plus,
  Search,
  Calendar,
  Clock,
  BookOpen,
  Users,
  MoreVertical,
  Filter
} from 'lucide-react';

const Assignments = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Dummy data for assignments
  const assignments = [
    {
      id: 1,
      title: "Physics Lab Report",
      subject: "Physics",
      class: "Grade 10-A",
      dueDate: "2024-12-20",
      totalSubmissions: 28,
      totalStudents: 32,
      status: "active",
      description: "Write a detailed lab report on the pendulum experiment"
    },
    {
      id: 2,
      title: "Mathematical Problems Set",
      subject: "Mathematics",
      class: "Grade 10-B",
      dueDate: "2024-12-18",
      totalSubmissions: 25,
      totalStudents: 30,
      status: "active",
      description: "Complete problems 1-20 from Chapter 5: Quadratic Equations"
    },
    {
      id: 3,
      title: "Essay on Renewable Energy",
      subject: "Environmental Science",
      class: "Grade 10-C",
      dueDate: "2024-12-15",
      totalSubmissions: 30,
      totalStudents: 30,
      status: "completed",
      description: "Write a 1000-word essay on renewable energy sources"
    },
    {
      id: 4,
      title: "Chemical Reactions Analysis",
      subject: "Chemistry",
      class: "Grade 10-A",
      dueDate: "2024-12-22",
      totalSubmissions: 15,
      totalStudents: 32,
      status: "active",
      description: "Document and analyze the results of today's chemical reactions experiment"
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Assignments' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
    { value: 'draft', label: 'Draft' }
  ];

  const filteredAssignments = selectedFilter === 'all' 
    ? assignments 
    : assignments.filter(assignment => assignment.status === selectedFilter);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Assignments</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus size={20} />
          <span>Create Assignment</span>
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search assignments..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-4">
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {filterOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Filter size={20} />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Assignments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssignments.map((assignment) => (
          <div key={assignment.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {assignment.title}
                  </h3>
                  <p className="text-sm text-gray-500">{assignment.subject}</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical size={20} />
                </button>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                {assignment.description}
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <BookOpen size={16} />
                  <span>{assignment.class}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar size={16} />
                  <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users size={16} />
                  <span>Submissions: {assignment.totalSubmissions}/{assignment.totalStudents}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    assignment.status === 'active' ? 'bg-green-100 text-green-700' :
                    assignment.status === 'completed' ? 'bg-gray-100 text-gray-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                  </span>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assignments;