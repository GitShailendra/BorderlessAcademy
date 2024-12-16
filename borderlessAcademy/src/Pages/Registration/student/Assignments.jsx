import React, { useState } from 'react';
import { FileText, Clock, CheckCircle, AlertCircle, Upload, Plus, Calendar, Book } from 'lucide-react';

const Assignments = () => {
  // In a real app, this would come from auth context
  const [userRole] = useState('student'); // or 'teacher'
  const [showAddAssignment, setShowAddAssignment] = useState(false);
  
  // Dummy assignments data
  const assignments = [
    {
      id: 1,
      title: "Physics Motion Laws Analysis",
      subject: "Physics",
      dueDate: "2024-12-20",
      status: "pending",
      description: "Write a detailed analysis of Newton's laws of motion with real-world examples.",
      maxScore: 100,
      submittedDate: null,
      score: null,
      teacher: "Dr. James Miller",
      attachments: ["motion_laws_guide.pdf"]
    },
    {
      id: 2,
      title: "Mathematical Problem Set 3",
      subject: "Mathematics",
      dueDate: "2024-12-18",
      status: "submitted",
      description: "Complete problems 1-10 from Chapter 5: Algebraic Expressions",
      maxScore: 50,
      submittedDate: "2024-12-15",
      score: 45,
      teacher: "Dr. Sarah Wilson",
      attachments: ["chapter5_problems.pdf"]
    },
    {
      id: 3,
      title: "Cell Structure Drawing",
      subject: "Biology",
      dueDate: "2024-12-25",
      status: "graded",
      description: "Create detailed drawings of plant and animal cell structures with proper labeling.",
      maxScore: 75,
      submittedDate: "2024-12-14",
      score: 70,
      teacher: "Ms. Emily Parker",
      attachments: ["cell_structure_template.pdf"]
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      pending: "text-yellow-600 bg-yellow-50",
      submitted: "text-blue-600 bg-blue-50",
      graded: "text-green-600 bg-green-50",
      late: "text-red-600 bg-red-50"
    };
    return colors[status] || colors.pending;
  };

  const AssignmentCard = ({ assignment }) => (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{assignment.title}</h3>
          <p className="text-gray-500">{assignment.subject}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(assignment.status)}`}>
          {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
        </span>
      </div>
      
      <div className="space-y-4">
        <p className="text-gray-600 text-sm">{assignment.description}</p>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Book className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">By: {assignment.teacher}</span>
          </div>
          {assignment.score !== null && (
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Score: {assignment.score}/{assignment.maxScore}</span>
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-4">
          {userRole === 'student' && assignment.status === 'pending' && (
            <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
              <Upload className="w-4 h-4" />
              Submit Assignment
            </button>
          )}
          <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  const AddAssignmentForm = () => (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">Create New Assignment</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input 
            type="text" 
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Assignment title"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Physics</option>
              <option>Mathematics</option>
              <option>Biology</option>
              <option>Chemistry</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <input 
              type="date" 
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea 
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Assignment description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Score</label>
          <input 
            type="number" 
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Maximum score"
          />
        </div>

        <div className="flex gap-3">
          <button 
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Assignment
          </button>
          <button 
            type="button"
            onClick={() => setShowAddAssignment(false)}
            className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Assignments</h1>
        <div className="flex gap-4">
          {userRole === 'teacher' && (
            <button 
              onClick={() => setShowAddAssignment(!showAddAssignment)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Assignment
            </button>
          )}
          <select className="px-4 py-2 border rounded-lg text-gray-600 bg-white">
            <option>All Subjects</option>
            <option>Physics</option>
            <option>Mathematics</option>
            <option>Biology</option>
          </select>
          <select className="px-4 py-2 border rounded-lg text-gray-600 bg-white">
            <option>All Status</option>
            <option>Pending</option>
            <option>Submitted</option>
            <option>Graded</option>
          </select>
        </div>
      </div>

      {/* Add Assignment Form */}
      {showAddAssignment && userRole === 'teacher' && <AddAssignmentForm />}

      {/* Assignments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assignments.map((assignment) => (
          <AssignmentCard key={assignment.id} assignment={assignment} />
        ))}
      </div>
    </div>
  );
};

export default Assignments;