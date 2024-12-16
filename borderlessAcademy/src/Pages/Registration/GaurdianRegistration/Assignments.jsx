import React, { useState } from 'react';
import {
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Calendar,
  BookOpen,
  Filter
} from 'lucide-react';
import img1 from '../../../assets/Images/Photo/avatar-1.svg';
import img2 from '../../../assets/Images/Photo/avatar-2.svg';

const Assignments = () => {
  const [selectedStudent, setSelectedStudent] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Dummy data for students and their assignments
  const students = [
    {
      id: 1,
      name: "John Doe",
      grade: "4th Grade",
      image: img1,
      assignments: [
        {
          id: 1,
          subject: "Mathematics",
          title: "Fractions Worksheet",
          dueDate: "2024-12-20",
          status: "pending",
          type: "homework",
          score: null,
          teacher: "Mrs. Smith",
          description: "Complete exercises 1-10 on fractions addition and subtraction"
        },
        {
          id: 2,
          subject: "Science",
          title: "Plant Life Cycle Report",
          dueDate: "2024-12-18",
          status: "submitted",
          type: "project",
          score: "95/100",
          teacher: "Mr. Johnson",
          description: "Write a detailed report on the plant life cycle with diagrams"
        }
      ]
    },
    {
      id: 2,
      name: "Jane Doe",
      grade: "2nd Grade",
      image: img2,
      assignments: [
        {
          id: 3,
          subject: "English",
          title: "Reading Assignment",
          dueDate: "2024-12-19",
          status: "graded",
          type: "homework",
          score: "90/100",
          teacher: "Ms. Davis",
          description: "Read Chapter 5 and answer comprehension questions"
        },
        {
          id: 4,
          subject: "Art",
          title: "Color Wheel Project",
          dueDate: "2024-12-21",
          status: "pending",
          type: "project",
          score: null,
          teacher: "Mrs. Wilson",
          description: "Create a color wheel using primary and secondary colors"
        }
      ]
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      submitted: 'bg-blue-100 text-blue-800',
      graded: 'bg-green-100 text-green-800',
      overdue: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending':
        return <Clock size={16} className="text-yellow-500" />;
      case 'submitted':
        return <CheckCircle size={16} className="text-blue-500" />;
      case 'graded':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'overdue':
        return <AlertCircle size={16} className="text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header with Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Assignments</h1>
          <p className="text-gray-500 mt-1">Track your children's assignments and submissions</p>
        </div>
        <div className="flex gap-4">
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
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="submitted">Submitted</option>
            <option value="graded">Graded</option>
          </select>
        </div>
      </div>

      {/* Assignments List */}
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

            <div className="space-y-4">
              {student.assignments
                .filter(assignment => filterStatus === 'all' || assignment.status === filterStatus)
                .map(assignment => (
                  <div key={assignment.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-4">
                          <div className="p-2 bg-blue-50 rounded-lg">
                            <BookOpen className="text-blue-500" size={24} />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{assignment.title}</h3>
                            <p className="text-gray-500">{assignment.subject} | {assignment.teacher}</p>
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${getStatusColor(assignment.status)}`}>
                          {getStatusIcon(assignment.status)}
                          <span className="capitalize">{assignment.status}</span>
                        </div>
                      </div>

                      <p className="mt-4 text-gray-600">{assignment.description}</p>

                      <div className="mt-4 flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar size={16} />
                          <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                        </div>
                        {assignment.score && (
                          <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
                            <FileText size={16} />
                            <span>Score: {assignment.score}</span>
                          </div>
                        )}
                      </div>
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

export default Assignments;