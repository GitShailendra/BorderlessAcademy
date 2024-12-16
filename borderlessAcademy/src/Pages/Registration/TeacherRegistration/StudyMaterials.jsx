import React, { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  FolderOpen,
  FileText,
  Video,
  Link,
  MoreVertical,
  Download,
  Eye,
  BookOpen,
  File,
  Share2,
  Clock
} from 'lucide-react';

const StudyMaterials = () => {
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  // Dummy data for study materials
  const materials = [
    {
      id: 1,
      title: "Physics Mechanics Notes",
      type: "document",
      subject: "Physics",
      class: "Grade 10-A",
      uploadDate: "2024-12-10",
      fileSize: "2.5 MB",
      format: "PDF",
      views: 145,
      downloads: 78,
      description: "Comprehensive notes covering Newton's laws, momentum, and energy conservation",
      topics: ["Mechanics", "Newton's Laws", "Energy"]
    },
    {
      id: 2,
      title: "Chemical Bonding Video Lecture",
      type: "video",
      subject: "Chemistry",
      class: "Grade 10-B",
      uploadDate: "2024-12-12",
      duration: "45 mins",
      views: 89,
      format: "MP4",
      description: "Detailed explanation of ionic and covalent bonding with examples",
      topics: ["Chemical Bonding", "Ionic Bonds", "Covalent Bonds"]
    },
    {
      id: 3,
      title: "Biology Cell Structure Presentation",
      type: "presentation",
      subject: "Biology",
      class: "Grade 10-C",
      uploadDate: "2024-12-08",
      fileSize: "5.8 MB",
      format: "PPT",
      views: 120,
      downloads: 65,
      description: "Detailed slides on cell structure and organelles",
      topics: ["Cell Biology", "Organelles"]
    },
    {
      id: 4,
      title: "Mathematics Practice Problems",
      type: "worksheet",
      subject: "Mathematics",
      class: "Grade 10-A",
      uploadDate: "2024-12-15",
      fileSize: "1.2 MB",
      format: "PDF",
      views: 95,
      downloads: 82,
      description: "Practice problems for quadratic equations and graphs",
      topics: ["Quadratic Equations", "Graphing"]
    }
  ];

  const subjects = [
    { value: 'all', label: 'All Subjects' },
    { value: 'physics', label: 'Physics' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'biology', label: 'Biology' },
    { value: 'mathematics', label: 'Mathematics' }
  ];

  const materialTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'document', label: 'Documents' },
    { value: 'video', label: 'Videos' },
    { value: 'presentation', label: 'Presentations' },
    { value: 'worksheet', label: 'Worksheets' }
  ];

  const getTypeIcon = (type) => {
    switch(type) {
      case 'video':
        return <Video size={20} className="text-red-500" />;
      case 'presentation':
        return <FileText size={20} className="text-orange-500" />;
      case 'worksheet':
        return <File size={20} className="text-green-500" />;
      default:
        return <BookOpen size={20} className="text-blue-500" />;
    }
  };

  const filteredMaterials = materials.filter(material => {
    if (selectedSubject !== 'all' && material.subject.toLowerCase() !== selectedSubject) return false;
    if (selectedType !== 'all' && material.type !== selectedType) return false;
    return true;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Study Materials</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus size={20} />
          <span>Upload Material</span>
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search study materials..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-4">
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
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {materialTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map((material) => (
          <div key={material.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start gap-3">
                  {getTypeIcon(material.type)}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {material.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {material.subject} | {material.class}
                    </p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical size={20} />
                </button>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                {material.description}
              </p>

              <div className="space-y-3 mb-4">
                <div className="text-sm text-gray-600 flex items-center gap-2">
                  <Clock size={16} />
                  <span>Uploaded: {new Date(material.uploadDate).toLocaleDateString()}</span>
                </div>
                {material.fileSize && (
                  <div className="text-sm text-gray-600">
                    Format: {material.format} | Size: {material.fileSize}
                  </div>
                )}
                {material.duration && (
                  <div className="text-sm text-gray-600">
                    Duration: {material.duration}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {material.topics.map((topic, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                  >
                    {topic}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Eye size={16} />
                    {material.views}
                  </span>
                  {material.downloads && (
                    <span className="flex items-center gap-1">
                      <Download size={16} />
                      {material.downloads}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                    <Eye size={16} />
                    View
                  </button>
                  <button className="text-gray-600 hover:text-gray-700 text-sm font-medium flex items-center gap-1">
                    <Share2 size={16} />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyMaterials;