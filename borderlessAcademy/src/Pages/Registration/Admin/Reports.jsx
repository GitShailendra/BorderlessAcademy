import React, { useState } from 'react';
import { BarChart, FileText, Download, Calendar, Users, BookOpen, TrendingUp } from 'lucide-react';

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const reportCategories = [
    {
      title: "Student Performance",
      description: "Academic progress and grades analysis",
      icon: <TrendingUp className="text-blue-500" />,
      stats: "85% Average",
      lastUpdated: "Last updated 2 hours ago"
    },
    {
      title: "Attendance Records",
      description: "Student and teacher attendance tracking",
      icon: <Users className="text-green-500" />,
      stats: "92% Present",
      lastUpdated: "Updated daily"
    },
    {
      title: "Course Completion",
      description: "Course progress and completion rates",
      icon: <BookOpen className="text-purple-500" />,
      stats: "78% Complete",
      lastUpdated: "Last updated today"
    }
  ];

  const recentReports = [
    {
      name: "Monthly Performance Summary",
      date: "Dec 15, 2024",
      type: "PDF",
      size: "2.4 MB"
    },
    {
      name: "Quarterly Attendance Report",
      date: "Dec 10, 2024",
      type: "Excel",
      size: "1.8 MB"
    },
    {
      name: "Course Progress Analysis",
      date: "Dec 5, 2024",
      type: "PDF",
      size: "3.1 MB"
    }
  ];

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Reports & Analytics</h1>
          <p className="text-gray-500 mt-1">View and download system reports</p>
        </div>
        <div className="flex gap-3">
          <select 
            className="px-4 py-2 border rounded-lg bg-white text-gray-700"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download size={20} />
            Export Reports
          </button>
        </div>
      </div>

      {/* Report Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {reportCategories.map((category, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow">
            <div className="flex items-center justify-between pb-2">
              <div className="p-2 bg-gray-50 rounded-lg">
                {category.icon}
              </div>
              <span className="text-sm text-gray-500">{category.lastUpdated}</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-1">{category.title}</h3>
              <p className="text-gray-500 mb-4">{category.description}</p>
              <div className="text-2xl font-bold text-gray-900">{category.stats}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Reports Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Recent Reports</h2>
          <p className="text-gray-500 mt-1">Download or view previously generated reports</p>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-700">Report Name</th>
                  <th className="text-left py-3 px-4 text-gray-700">Date Generated</th>
                  <th className="text-left py-3 px-4 text-gray-700">Type</th>
                  <th className="text-left py-3 px-4 text-gray-700">Size</th>
                  <th className="text-left py-3 px-4 text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentReports.map((report, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 flex items-center gap-2">
                      <FileText size={20} className="text-gray-400" />
                      <span className="text-gray-700">{report.name}</span>
                    </td>
                    <td className="py-3 px-4 text-gray-500">{report.date}</td>
                    <td className="py-3 px-4 text-gray-500">{report.type}</td>
                    <td className="py-3 px-4 text-gray-500">{report.size}</td>
                    <td className="py-3 px-4">
                      <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700">
                        <Download size={16} />
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;