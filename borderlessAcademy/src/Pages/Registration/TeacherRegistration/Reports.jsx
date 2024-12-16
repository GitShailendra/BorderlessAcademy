import React, { useState } from 'react';
import {
  FileText,
  Download,
  Filter,
  Calendar,
  ChevronDown,
  ChevronUp,
  Clock,
  Users,
  BarChart,
  AlertCircle,
  CheckCircle,
  BookOpen,
  Printer
} from 'lucide-react';

const Reports = () => {
  const [selectedType, setSelectedType] = useState('all');
  const [expandedReport, setExpandedReport] = useState(null);

  // Dummy data for reports
  const reports = [
    {
      id: 1,
      title: "Class Performance Report",
      type: "performance",
      class: "Grade 10-A",
      subject: "Physics",
      generatedDate: "2024-12-10",
      status: "ready",
      description: "Detailed analysis of student performance including grades distribution and improvement trends",
      metrics: [
        { label: "Class Average", value: "85%" },
        { label: "Attendance Rate", value: "92%" },
        { label: "Assignment Completion", value: "88%" }
      ],
      insights: [
        "Overall class performance has improved by 5% since last term",
        "Higher engagement in practical sessions",
        "Need for additional support in wave mechanics topics"
      ]
    },
    {
      id: 2,
      title: "Attendance Summary",
      type: "attendance",
      class: "Grade 10-B",
      subject: "Chemistry",
      generatedDate: "2024-12-12",
      status: "ready",
      description: "Monthly attendance patterns and absence analysis",
      metrics: [
        { label: "Average Attendance", value: "89%" },
        { label: "Late Arrivals", value: "5%" },
        { label: "Perfect Attendance", value: "15 students" }
      ],
      insights: [
        "Attendance rate has improved in morning sessions",
        "Fewer late arrivals compared to last month",
        "Weather-related absences noted during rainy season"
      ]
    },
    {
      id: 3,
      title: "Assessment Analysis",
      type: "assessment",
      class: "Grade 10-C",
      subject: "Biology",
      generatedDate: "2024-12-15",
      status: "processing",
      description: "Comprehensive analysis of recent test results and areas for improvement",
      metrics: [
        { label: "Test Completion Rate", value: "98%" },
        { label: "Average Score", value: "78%" },
        { label: "Top Performers", value: "8 students" }
      ],
      insights: [
        "Strong performance in cellular biology topics",
        "Need for revision in genetics concepts",
        "Improvement in practical lab work scores"
      ]
    }
  ];

  const reportTypes = [
    { value: 'all', label: 'All Reports' },
    { value: 'performance', label: 'Performance Reports' },
    { value: 'attendance', label: 'Attendance Reports' },
    { value: 'assessment', label: 'Assessment Reports' }
  ];

  const filteredReports = selectedType === 'all' 
    ? reports 
    : reports.filter(report => report.type === selectedType);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'ready':
        return <CheckCircle size={20} className="text-green-500" />;
      case 'processing':
        return <Clock size={20} className="text-orange-500" />;
      default:
        return <AlertCircle size={20} className="text-gray-500" />;
    }
  };

  const getReportTypeIcon = (type) => {
    switch(type) {
      case 'performance':
        return <BarChart size={20} className="text-blue-500" />;
      case 'attendance':
        return <Users size={20} className="text-purple-500" />;
      case 'assessment':
        return <BookOpen size={20} className="text-green-500" />;
      default:
        return <FileText size={20} className="text-gray-500" />;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Reports</h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <FileText size={20} />
            <span>Generate New Report</span>
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {reportTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
          <Filter size={20} />
          <span>More Filters</span>
        </button>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.map((report, index) => (
          <div key={report.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div 
              className="p-4 flex justify-between items-center cursor-pointer"
              onClick={() => setExpandedReport(expandedReport === index ? null : index)}
            >
              <div className="flex items-center gap-4">
                {getReportTypeIcon(report.type)}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm text-gray-500">{report.class}</span>
                    <span className="text-sm text-gray-500">{report.subject}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {getStatusIcon(report.status)}
                  <span className="text-sm capitalize text-gray-600">{report.status}</span>
                </div>
                {expandedReport === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </div>

            {expandedReport === index && (
              <div className="p-4 border-t border-gray-200">
                <div className="mb-4">
                  <p className="text-gray-600">{report.description}</p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {report.metrics.map((metric, idx) => (
                    <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600">{metric.label}</div>
                      <div className="text-xl font-semibold text-gray-900 mt-1">{metric.value}</div>
                    </div>
                  ))}
                </div>

                {/* Key Insights */}
                <div className="mb-6">
                  <h4 className="text-md font-semibold text-gray-800 mb-3">Key Insights</h4>
                  <ul className="space-y-2">
                    {report.insights.map((insight, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-600">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        {insight}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                    <Download size={20} />
                    <span>Download PDF</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                    <Printer size={20} />
                    <span>Print Report</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;