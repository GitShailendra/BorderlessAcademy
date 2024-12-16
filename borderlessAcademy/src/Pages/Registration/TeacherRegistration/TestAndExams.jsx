import React, { useState } from 'react';
import {
  Plus,
  Search,
  Calendar,
  Clock,
  BookOpen,
  Users,
  MoreVertical,
  Filter,
  Timer,
  BarChart,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const TestsAndExams = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Dummy data for tests and exams
  const tests = [
    {
      id: 1,
      title: "Mid-Term Physics Examination",
      type: "exam",
      subject: "Physics",
      class: "Grade 10-A",
      date: "2024-12-20",
      time: "09:00 AM",
      duration: "120",
      totalStudents: 32,
      status: "upcoming",
      topics: ["Mechanics", "Thermodynamics", "Wave Motion"],
      totalMarks: 100
    },
    {
      id: 2,
      title: "Chapter 5 Quiz",
      type: "quiz",
      subject: "Mathematics",
      class: "Grade 10-B",
      date: "2024-12-18",
      time: "10:30 AM",
      duration: "45",
      totalStudents: 30,
      status: "ongoing",
      topics: ["Quadratic Equations"],
      totalMarks: 25
    },
    {
      id: 3,
      title: "Final Term Chemistry Test",
      type: "exam",
      subject: "Chemistry",
      class: "Grade 10-A",
      date: "2024-12-25",
      time: "11:00 AM",
      duration: "180",
      totalStudents: 32,
      status: "upcoming",
      topics: ["Organic Chemistry", "Chemical Bonding", "Periodic Table"],
      totalMarks: 100
    },
    {
      id: 4,
      title: "Biology Unit Test",
      type: "test",
      subject: "Biology",
      class: "Grade 10-C",
      date: "2024-12-15",
      time: "09:30 AM",
      duration: "60",
      totalStudents: 30,
      completedSubmissions: 30,
      status: "completed",
      topics: ["Cell Biology"],
      totalMarks: 50
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Tests' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'ongoing', label: 'Ongoing' },
    { value: 'completed', label: 'Completed' }
  ];

  const typeFilters = [
    { value: 'all', label: 'All Types' },
    { value: 'exam', label: 'Exams' },
    { value: 'test', label: 'Tests' },
    { value: 'quiz', label: 'Quizzes' }
  ];

  const filteredTests = selectedFilter === 'all' 
    ? tests 
    : tests.filter(test => test.status === selectedFilter);

  const getStatusColor = (status) => {
    switch(status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-700';
      case 'ongoing':
        return 'bg-green-100 text-green-700';
      case 'completed':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'exam':
        return <BookOpen size={16} />;
      case 'quiz':
        return <Timer size={16} />;
      case 'test':
        return <CheckCircle size={16} />;
      default:
        return <AlertCircle size={16} />;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Tests & Examinations</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus size={20} />
          <span>Create New Test</span>
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search tests and exams..."
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

      {/* Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTests.map((test) => (
          <div key={test.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {getTypeIcon(test.type)}
                    <span className="text-sm font-medium text-gray-600 capitalize">
                      {test.type}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {test.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{test.subject}</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical size={20} />
                </button>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <BookOpen size={16} />
                  <span>{test.class}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar size={16} />
                  <span>{new Date(test.date).toLocaleDateString()} at {test.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Timer size={16} />
                  <span>Duration: {test.duration} minutes</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users size={16} />
                  <span>Students: {test.totalStudents}</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="text-sm font-medium text-gray-700">Topics:</div>
                <div className="flex flex-wrap gap-2">
                  {test.topics.map((topic, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(test.status)}`}>
                  {test.status.charAt(0).toUpperCase() + test.status.slice(1)}
                </span>
                <div className="flex gap-2">
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View Details
                  </button>
                  {test.status === 'completed' && (
                    <button className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center gap-1">
                      <BarChart size={16} />
                      Results
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestsAndExams;