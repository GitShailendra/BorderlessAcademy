import React, { useState } from 'react';
import { Calendar, Clock, Book, Award, AlertCircle, CheckCircle, Timer, FileText } from 'lucide-react';

const TestsAndExams = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  // Dummy data for tests and exams
  const assessments = {
    upcoming: [
      {
        id: 1,
        type: "Test",
        title: "Physics Mid-Term",
        subject: "Physics",
        date: "2024-12-20",
        time: "10:00 AM",
        duration: "90",
        room: "Hall 201",
        topics: ["Motion Laws", "Energy Conservation", "Thermodynamics"],
        teacher: "Dr. James Miller",
        totalMarks: 100
      },
      {
        id: 2,
        type: "Exam",
        title: "Final Mathematics Examination",
        subject: "Mathematics",
        date: "2024-12-25",
        time: "9:00 AM",
        duration: "180",
        room: "Exam Hall A",
        topics: ["Calculus", "Algebra", "Trigonometry"],
        teacher: "Dr. Sarah Wilson",
        totalMarks: 150
      }
    ],
    completed: [
      {
        id: 3,
        type: "Test",
        title: "Biology Quiz 3",
        subject: "Biology",
        date: "2024-12-10",
        score: 85,
        totalMarks: 100,
        feedback: "Excellent understanding of cell structures. Review genetic inheritance.",
        topics: ["Cell Biology", "Genetics"],
        teacher: "Ms. Emily Parker"
      },
      {
        id: 4,
        type: "Exam",
        title: "Chemistry Mid-Term",
        subject: "Chemistry",
        date: "2024-12-05",
        score: 92,
        totalMarks: 100,
        feedback: "Outstanding performance. Perfect score in organic chemistry section.",
        topics: ["Organic Chemistry", "Chemical Bonding"],
        teacher: "Dr. Michael Brown"
      }
    ]
  };

  const TabButton = ({ label, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`px-6 py-3 text-sm font-medium rounded-lg transition-colors ${
        isActive 
          ? 'bg-blue-600 text-white' 
          : 'text-gray-600 hover:bg-gray-50'
      }`}
    >
      {label}
    </button>
  );

  const UpcomingAssessmentCard = ({ assessment }) => (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`px-3 py-1 rounded-full text-sm ${
              assessment.type === 'Exam' 
                ? 'bg-purple-50 text-purple-600' 
                : 'bg-blue-50 text-blue-600'
            }`}>
              {assessment.type}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{assessment.title}</h3>
          <p className="text-gray-500">{assessment.subject}</p>
        </div>
        <div className="text-right">
          <span className="text-sm font-medium text-gray-900">Total Marks: {assessment.totalMarks}</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              {new Date(assessment.date).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">{assessment.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <Timer className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">{assessment.duration} minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <Book className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">{assessment.room}</span>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Topics Covered:</h4>
          <div className="flex flex-wrap gap-2">
            {assessment.topics.map((topic, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            View Details
          </button>
          <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            Set Reminder
          </button>
        </div>
      </div>
    </div>
  );

  const CompletedAssessmentCard = ({ assessment }) => (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`px-3 py-1 rounded-full text-sm ${
              assessment.type === 'Exam' 
                ? 'bg-purple-50 text-purple-600' 
                : 'bg-blue-50 text-blue-600'
            }`}>
              {assessment.type}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{assessment.title}</h3>
          <p className="text-gray-500">{assessment.subject}</p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-gray-900">{assessment.score}/{assessment.totalMarks}</span>
          <p className="text-sm text-gray-500">Score</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              {new Date(assessment.date).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Book className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">{assessment.teacher}</span>
          </div>
        </div>

        {assessment.feedback && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 mb-1">Feedback:</h4>
            <p className="text-sm text-blue-800">{assessment.feedback}</p>
          </div>
        )}

        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Topics Covered:</h4>
          <div className="flex flex-wrap gap-2">
            {assessment.topics.map((topic, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            View Full Results
          </button>
          <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            Download Report
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Tests & Exams</h1>
        <div className="flex gap-4">
          <select className="px-4 py-2 border rounded-lg text-gray-600 bg-white">
            <option>All Subjects</option>
            <option>Physics</option>
            <option>Mathematics</option>
            <option>Biology</option>
            <option>Chemistry</option>
          </select>
          <select className="px-4 py-2 border rounded-lg text-gray-600 bg-white">
            <option>All Types</option>
            <option>Tests</option>
            <option>Exams</option>
          </select>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Upcoming Tests</h3>
              <p className="text-2xl font-semibold text-gray-900">3</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <AlertCircle className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Pending Exams</h3>
              <p className="text-2xl font-semibold text-gray-900">2</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Completed</h3>
              <p className="text-2xl font-semibold text-gray-900">8</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <TabButton 
          label="Upcoming" 
          isActive={activeTab === 'upcoming'} 
          onClick={() => setActiveTab('upcoming')}
        />
        <TabButton 
          label="Completed" 
          isActive={activeTab === 'completed'} 
          onClick={() => setActiveTab('completed')}
        />
      </div>

      {/* Assessment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activeTab === 'upcoming' 
          ? assessments.upcoming.map(assessment => (
              <UpcomingAssessmentCard key={assessment.id} assessment={assessment} />
            ))
          : assessments.completed.map(assessment => (
              <CompletedAssessmentCard key={assessment.id} assessment={assessment} />
            ))
        }
      </div>
    </div>
  );
};

export default TestsAndExams;