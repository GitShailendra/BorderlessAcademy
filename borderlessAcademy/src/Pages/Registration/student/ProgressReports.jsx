import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { 
  Award, TrendingUp, Book, Users, 
  Calendar, Clock, Target, Activity,
  ChevronUp, ChevronDown, ArrowUpRight
} from 'lucide-react';

const ProgressReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('semester');

  // Dummy data for performance metrics
  const subjectPerformance = [
    { subject: 'Physics', score: 85, average: 78, highest: 95 },
    { subject: 'Mathematics', score: 92, average: 75, highest: 96 },
    { subject: 'Biology', score: 78, average: 72, highest: 90 },
    { subject: 'Chemistry', score: 88, average: 76, highest: 94 }
  ];

  const monthlyProgress = [
    { month: 'Aug', physics: 75, math: 82, biology: 68, chemistry: 78 },
    { month: 'Sep', physics: 78, math: 85, biology: 72, chemistry: 82 },
    { month: 'Oct', physics: 80, math: 88, biology: 75, chemistry: 85 },
    { month: 'Nov', physics: 82, math: 90, biology: 76, chemistry: 86 },
    { month: 'Dec', physics: 85, math: 92, biology: 78, chemistry: 88 }
  ];

  const attendanceData = [
    { month: 'Aug', present: 90, total: 100 },
    { month: 'Sep', present: 85, total: 90 },
    { month: 'Oct', present: 95, total: 100 },
    { month: 'Nov', present: 88, total: 95 },
    { month: 'Dec', present: 92, total: 100 }
  ];

  const StatCard = ({ title, value, change, icon: Icon }) => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <span className={`flex items-center gap-1 text-sm ${
          change >= 0 ? 'text-green-600' : 'text-red-600'
        }`}>
          {change >= 0 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          {Math.abs(change)}%
        </span>
      </div>
      <h3 className="text-gray-600 text-sm mb-1">{title}</h3>
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
    </div>
  );

  const SubjectCard = ({ subject, score, average, highest }) => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{subject}</h3>
          <p className="text-sm text-gray-500">Current Score</p>
        </div>
        <span className="text-2xl font-bold text-blue-600">{score}%</span>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Progress</span>
            <span className="text-gray-900 font-medium">{score}%</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full">
            <div
              className="h-full bg-blue-600 rounded-full"
              style={{ width: `${score}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Class Average</p>
            <p className="text-lg font-semibold text-gray-900">{average}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Highest Score</p>
            <p className="text-lg font-semibold text-gray-900">{highest}%</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Progress Report</h1>
        <div className="flex gap-4">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border rounded-lg text-gray-600 bg-white"
          >
            <option value="semester">Current Semester</option>
            <option value="year">Academic Year</option>
            <option value="all">All Time</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Download Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard 
          title="Overall Grade" 
          value="A-" 
          change={5}
          icon={Award}
        />
        <StatCard 
          title="Average Score" 
          value="85.8%" 
          change={3.2}
          icon={TrendingUp}
        />
        <StatCard 
          title="Attendance Rate" 
          value="92%" 
          change={-2.1}
          icon={Users}
        />
        <StatCard 
          title="Completed Tasks" 
          value="45/50" 
          change={8}
          icon={Target}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Performance Trend */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Performance Trend</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="physics" stroke="#3B82F6" name="Physics" />
                <Line type="monotone" dataKey="math" stroke="#10B981" name="Mathematics" />
                <Line type="monotone" dataKey="biology" stroke="#8B5CF6" name="Biology" />
                <Line type="monotone" dataKey="chemistry" stroke="#F59E0B" name="Chemistry" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attendance Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Attendance Overview</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="present" fill="#3B82F6" name="Present" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Subject Performance */}
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Subject Performance</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subjectPerformance.map((subject, index) => (
          <SubjectCard key={index} {...subject} />
        ))}
      </div>
    </div>
  );
};

export default ProgressReports;