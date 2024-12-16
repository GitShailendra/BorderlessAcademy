import React, { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  Upload,
  BarChart,
  Award,
  BookOpen,
  Users,
  ChevronUp,
  ChevronDown,
  FileSpreadsheet,
  Plus
} from 'lucide-react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const Grades = () => {
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [expandedClass, setExpandedClass] = useState(null);

  // Dummy data for grades
  const gradeData = [
    {
      class: "Grade 10-A",
      subject: "Physics",
      totalStudents: 32,
      averageGrade: 85,
      highestGrade: 98,
      lowestGrade: 65,
      distribution: [
        { grade: "A", count: 8 },
        { grade: "B", count: 12 },
        { grade: "C", count: 8 },
        { grade: "D", count: 4 },
        { grade: "F", count: 0 }
      ],
      recentAssessments: [
        {
          id: 1,
          title: "Mid-Term Exam",
          date: "2024-12-01",
          avgScore: 83,
          maxScore: 100
        },
        {
          id: 2,
          title: "Chapter 5 Quiz",
          date: "2024-12-10",
          avgScore: 88,
          maxScore: 50
        }
      ]
    },
    {
      class: "Grade 10-B",
      subject: "Chemistry",
      totalStudents: 30,
      averageGrade: 82,
      highestGrade: 95,
      lowestGrade: 62,
      distribution: [
        { grade: "A", count: 6 },
        { grade: "B", count: 14 },
        { grade: "C", count: 7 },
        { grade: "D", count: 3 },
        { grade: "F", count: 0 }
      ],
      recentAssessments: [
        {
          id: 1,
          title: "Final Term Exam",
          date: "2024-12-05",
          avgScore: 81,
          maxScore: 100
        },
        {
          id: 2,
          title: "Lab Report",
          date: "2024-12-12",
          avgScore: 85,
          maxScore: 50
        }
      ]
    }
  ];

  const classes = [
    { value: 'all', label: 'All Classes' },
    { value: 'grade-10a', label: 'Grade 10-A' },
    { value: 'grade-10b', label: 'Grade 10-B' }
  ];

  const subjects = [
    { value: 'all', label: 'All Subjects' },
    { value: 'physics', label: 'Physics' },
    { value: 'chemistry', label: 'Chemistry' }
  ];

  const getGradeColor = (grade) => {
    const colors = {
      A: 'bg-green-100 text-green-800',
      B: 'bg-blue-100 text-blue-800',
      C: 'bg-yellow-100 text-yellow-800',
      D: 'bg-orange-100 text-orange-800',
      F: 'bg-red-100 text-red-800'
    };
    return colors[grade] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Grades Management</h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Download size={20} />
            <span>Export</span>
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Plus size={20} />
            <span>Add Grades</span>
          </button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search students..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-4">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {classes.map(cls => (
              <option key={cls.value} value={cls.value}>
                {cls.label}
              </option>
            ))}
          </select>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {subjects.map(subject => (
              <option key={subject.value} value={subject.value}>
                {subject.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grade Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {gradeData.map((data, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{data.class}</h3>
                <p className="text-sm text-gray-500">{data.subject}</p>
              </div>
              <Award className="text-blue-500" size={24} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Average Grade:</span>
                <span className="font-semibold text-gray-900">{data.averageGrade}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Highest Grade:</span>
                <span className="font-semibold text-green-600">{data.highestGrade}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Lowest Grade:</span>
                <span className="font-semibold text-red-600">{data.lowestGrade}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Students:</span>
                <span className="font-semibold text-gray-900">{data.totalStudents}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Grade Information */}
      <div className="space-y-6">
        {gradeData.map((data, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div 
              className="p-4 flex justify-between items-center cursor-pointer"
              onClick={() => setExpandedClass(expandedClass === index ? null : index)}
            >
              <div className="flex items-center gap-4">
                <BookOpen className="text-blue-500" size={24} />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{data.class}</h3>
                  <p className="text-sm text-gray-500">{data.subject}</p>
                </div>
              </div>
              {expandedClass === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>

            {expandedClass === index && (
              <div className="p-4 border-t border-gray-200">
                {/* Grade Distribution */}
                <div className="mb-6">
                  <h4 className="text-md font-semibold text-gray-800 mb-4">Grade Distribution</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart data={data.distribution}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="grade" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#3B82F6" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Recent Assessments */}
                <div>
                  <h4 className="text-md font-semibold text-gray-800 mb-4">Recent Assessments</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Assessment
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Average Score
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Max Score
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {data.recentAssessments.map((assessment) => (
                          <tr key={assessment.id}>
                            <td className="px-4 py-3 text-sm text-gray-900">{assessment.title}</td>
                            <td className="px-4 py-3 text-sm text-gray-500">
                              {new Date(assessment.date).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">{assessment.avgScore}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">{assessment.maxScore}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grades;