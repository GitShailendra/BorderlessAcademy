import React, { useState } from 'react';
import {
  BarChart2,
  TrendingUp,
  Award,
  BookOpen,
  Target,
  Calendar,
  ArrowUp,
  ArrowDown,
  ChevronRight,
  Star
} from 'lucide-react';

const Progress = () => {
  const [selectedStudent, setSelectedStudent] = useState('all');
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('term1');

  // Dummy data for progress tracking
  const studentProgress = [
    {
      id: 1,
      name: "John Doe",
      grade: "4th Grade",
      image: "/api/placeholder/48/48",
      overallProgress: {
        gpa: 3.8,
        attendance: "95%",
        ranking: "Top 10%",
        behavior: "Excellent"
      },
      subjects: [
        {
          name: "Mathematics",
          grade: "A",
          progress: 85,
          trend: "up",
          recentScores: [95, 88, 92],
          strengths: ["Problem Solving", "Arithmetic"],
          areasToImprove: ["Geometry"],
          teacherComments: "Excellent analytical skills"
        },
        {
          name: "Science",
          grade: "B+",
          progress: 78,
          trend: "up",
          recentScores: [85, 82, 88],
          strengths: ["Lab Work", "Scientific Method"],
          areasToImprove: ["Written Reports"],
          teacherComments: "Good practical work, needs theory improvement"
        }
      ],
      learningGoals: [
        {
          goal: "Master Geometry Concepts",
          progress: 70,
          deadline: "2024-12-30"
        },
        {
          goal: "Improve Science Reports",
          progress: 60,
          deadline: "2024-12-25"
        }
      ]
    },
    {
      id: 2,
      name: "Jane Doe",
      grade: "2nd Grade",
      image: "/api/placeholder/48/48",
      overallProgress: {
        gpa: 3.9,
        attendance: "98%",
        ranking: "Top 5%",
        behavior: "Outstanding"
      },
      subjects: [
        {
          name: "English",
          grade: "A+",
          progress: 92,
          trend: "up",
          recentScores: [95, 98, 92],
          strengths: ["Reading", "Vocabulary"],
          areasToImprove: ["Grammar"],
          teacherComments: "Exceptional writing skills"
        },
        {
          name: "Art",
          grade: "A",
          progress: 95,
          trend: "stable",
          recentScores: [98, 95, 96],
          strengths: ["Creativity", "Color Theory"],
          areasToImprove: ["Technical Skills"],
          teacherComments: "Shows great artistic potential"
        }
      ],
      learningGoals: [
        {
          goal: "Improve Grammar Skills",
          progress: 85,
          deadline: "2024-12-28"
        },
        {
          goal: "Complete Art Portfolio",
          progress: 90,
          deadline: "2024-12-20"
        }
      ]
    }
  ];

  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'text-green-600';
    if (grade.startsWith('B')) return 'text-blue-600';
    if (grade.startsWith('C')) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTrendIcon = (trend) => {
    switch(trend) {
      case 'up':
        return <ArrowUp className="text-green-500" size={20} />;
      case 'down':
        return <ArrowDown className="text-red-500" size={20} />;
      default:
        return <ChevronRight className="text-gray-500" size={20} />;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Academic Progress</h1>
          <p className="text-gray-500 mt-1">Monitor your children's academic growth and achievements</p>
        </div>
        <div className="flex gap-4">
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Students</option>
            {studentProgress.map(student => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>
          <select
            value={selectedTimeFrame}
            onChange={(e) => setSelectedTimeFrame(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="term1">Term 1</option>
            <option value="term2">Term 2</option>
            <option value="year">Full Year</option>
          </select>
        </div>
      </div>

      {/* Student Progress Cards */}
      {studentProgress.map(student => (
        (selectedStudent === 'all' || selectedStudent === student.id.toString()) && (
          <div key={student.id} className="mb-8">
            {/* Student Overview Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={student.image}
                  alt={student.name}
                  className="w-16 h-16 rounded-full border"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{student.name}</h2>
                  <p className="text-gray-500">{student.grade}</p>
                </div>
              </div>

              {/* Overall Progress Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-blue-600 font-medium">GPA</span>
                    <BarChart2 className="text-blue-500" size={20} />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{student.overallProgress.gpa}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-green-600 font-medium">Attendance</span>
                    <TrendingUp className="text-green-500" size={20} />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{student.overallProgress.attendance}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-purple-600 font-medium">Class Ranking</span>
                    <Award className="text-purple-500" size={20} />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{student.overallProgress.ranking}</p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-yellow-600 font-medium">Behavior</span>
                    <Star className="text-yellow-500" size={20} />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{student.overallProgress.behavior}</p>
                </div>
              </div>
            </div>

            {/* Learning Goals */}
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Learning Goals</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {student.learningGoals.map((goal, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">{goal.goal}</h4>
                      <p className="text-sm text-gray-500">
                        Due: {new Date(goal.deadline).toLocaleDateString()}
                      </p>
                    </div>
                    <Target className="text-blue-500" size={20} />
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{goal.progress}% completed</p>
                </div>
              ))}
            </div>

            {/* Subject Progress */}
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Subject Progress</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {student.subjects.map((subject, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <BookOpen className="text-blue-500" size={24} />
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{subject.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-2xl font-bold ${getGradeColor(subject.grade)}`}>
                            {subject.grade}
                          </span>
                          {getTrendIcon(subject.trend)}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      Progress: {subject.progress}%
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${subject.progress}%` }}
                    ></div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Strengths</h5>
                      <ul className="space-y-1">
                        {subject.strengths.map((strength, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                            <Star size={12} className="text-yellow-500" />
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Areas to Improve</h5>
                      <ul className="space-y-1">
                        {subject.areasToImprove.map((area, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                            <Target size={12} className="text-red-500" />
                            {area}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Teacher Comments</h5>
                    <p className="text-sm text-gray-600 italic">"{subject.teacherComments}"</p>
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

export default Progress;