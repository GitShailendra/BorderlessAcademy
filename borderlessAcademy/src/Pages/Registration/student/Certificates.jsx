import React, { useState } from 'react';
import { Download, Award, Calendar, Search, Medal, Trophy, Star } from 'lucide-react';

// Rest of the component remains exactly the same, just removed the Certificate icon from imports
const Certificates = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Dummy data for certificates
  const certificates = [
    {
      id: 1,
      title: "Academic Excellence in Physics",
      issueDate: "2024-12-01",
      category: "academic",
      description: "Awarded for outstanding performance in Physics throughout the semester",
      issuer: "Science Department",
      score: "95%",
      validUntil: "2025-12-01",
      type: "Merit Certificate",
      icon: <Trophy className="w-6 h-6" />
    },
    {
      id: 2,
      title: "Mathematics Competition Winner",
      issueDate: "2024-11-15",
      category: "competition",
      description: "First place in the Annual Mathematics Challenge",
      issuer: "Mathematics Society",
      achievement: "1st Place",
      validUntil: "Lifetime",
      type: "Achievement Certificate",
      icon: <Medal className="w-6 h-6" />
    },
    {
      id: 3,
      title: "Science Project Excellence",
      issueDate: "2024-10-20",
      category: "academic",
      description: "Outstanding contribution to the Annual Science Fair",
      issuer: "Science Club",
      achievement: "Best Project",
      validUntil: "Lifetime",
      type: "Recognition Award",
      icon: <Star className="w-6 h-6" />
    },
    {
      id: 4,
      title: "Perfect Attendance Award",
      issueDate: "2024-12-10",
      category: "achievement",
      description: "Maintained 100% attendance throughout the semester",
      issuer: "School Administration",
      period: "Fall Semester 2024",
      validUntil: "Lifetime",
      type: "Achievement Certificate",
      icon: <Award className="w-6 h-6" />
    }
  ];

  const categories = [
    { id: 'all', label: 'All Certificates', count: certificates.length },
    { id: 'academic', label: 'Academic Excellence', count: certificates.filter(c => c.category === 'academic').length },
    { id: 'competition', label: 'Competitions', count: certificates.filter(c => c.category === 'competition').length },
    { id: 'achievement', label: 'Achievements', count: certificates.filter(c => c.category === 'achievement').length }
  ];

  const filteredCertificates = selectedCategory === 'all' 
    ? certificates 
    : certificates.filter(cert => cert.category === selectedCategory);

  const CertificateCard = ({ certificate }) => (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
            {certificate.icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{certificate.title}</h3>
            <p className="text-sm text-gray-500">{certificate.type}</p>
          </div>
        </div>
        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
          {certificate.category.charAt(0).toUpperCase() + certificate.category.slice(1)}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-4">{certificate.description}</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500">Issued By</p>
          <p className="text-sm font-medium text-gray-900">{certificate.issuer}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Issue Date</p>
          <p className="text-sm font-medium text-gray-900">
            {new Date(certificate.issueDate).toLocaleDateString()}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Valid Until</p>
          <p className="text-sm font-medium text-gray-900">{certificate.validUntil}</p>
        </div>
        {certificate.score && (
          <div>
            <p className="text-sm text-gray-500">Score Achieved</p>
            <p className="text-sm font-medium text-gray-900">{certificate.score}</p>
          </div>
        )}
        {certificate.achievement && (
          <div>
            <p className="text-sm text-gray-500">Achievement</p>
            <p className="text-sm font-medium text-gray-900">{certificate.achievement}</p>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
          <Download className="w-4 h-4" />
          Download Certificate
        </button>
        <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Certificates & Achievements</h1>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search certificates..."
              className="pl-10 pr-4 py-2 border rounded-lg text-gray-600 bg-white w-64"
            />
          </div>
          <select className="px-4 py-2 border rounded-lg text-gray-600 bg-white">
            <option>Sort by Date</option>
            <option>Sort by Type</option>
            <option>Sort by Category</option>
          </select>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`p-4 rounded-lg transition-all ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <div className="text-sm">{category.label}</div>
            <div className="text-2xl font-semibold mt-1">{category.count}</div>
          </button>
        ))}
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCertificates.map(certificate => (
          <CertificateCard key={certificate.id} certificate={certificate} />
        ))}
      </div>
    </div>
  );
};

export default Certificates;