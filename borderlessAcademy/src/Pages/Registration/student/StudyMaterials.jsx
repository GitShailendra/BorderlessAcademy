import React, { useState } from 'react';
import { 
  Book, FileText, Video, File, Download, 
  Search, FolderOpen, Clock, BookOpen,
  Filter, ChevronRight, PlayCircle
} from 'lucide-react';

const StudyMaterials = () => {
  const [activeSubject, setActiveSubject] = useState('all');

  // Dummy data for study materials
  const materials = [
    {
      id: 1,
      title: "Physics Mechanics Notes",
      subject: "Physics",
      type: "notes",
      format: "PDF",
      uploadDate: "2024-12-10",
      size: "2.5 MB",
      description: "Comprehensive notes covering Newton's laws, motion, and energy conservation",
      teacher: "Dr. James Miller",
      chapter: "Chapter 3: Motion Laws",
      downloads: 128
    },
    {
      id: 2,
      title: "Cell Biology Video Lecture",
      subject: "Biology",
      type: "video",
      format: "MP4",
      uploadDate: "2024-12-12",
      size: "150 MB",
      description: "Detailed video lecture on cell structure and function",
      teacher: "Ms. Emily Parker",
      chapter: "Chapter 4: Cell Structure",
      duration: "45 mins",
      views: 256
    },
    {
      id: 3,
      title: "Algebra Practice Problems",
      subject: "Mathematics",
      type: "worksheet",
      format: "PDF",
      uploadDate: "2024-12-15",
      size: "1.8 MB",
      description: "Practice problems for algebraic expressions and equations",
      teacher: "Dr. Sarah Wilson",
      chapter: "Chapter 5: Algebraic Expressions",
      downloads: 95
    },
    {
      id: 4,
      title: "Chemistry Lab Manual",
      subject: "Chemistry",
      type: "document",
      format: "PDF",
      uploadDate: "2024-12-14",
      size: "5.2 MB",
      description: "Laboratory procedures and safety guidelines",
      teacher: "Dr. Michael Brown",
      chapter: "Lab Safety and Procedures",
      downloads: 180
    }
  ];

  const subjects = [
    { id: 'all', name: 'All Subjects', count: materials.length },
    { id: 'physics', name: 'Physics', count: materials.filter(m => m.subject === 'Physics').length },
    { id: 'biology', name: 'Biology', count: materials.filter(m => m.subject === 'Biology').length },
    { id: 'mathematics', name: 'Mathematics', count: materials.filter(m => m.subject === 'Mathematics').length },
    { id: 'chemistry', name: 'Chemistry', count: materials.filter(m => m.subject === 'Chemistry').length }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video':
        return <Video className="w-6 h-6 text-purple-500" />;
      case 'notes':
        return <FileText className="w-6 h-6 text-blue-500" />;
      case 'worksheet':
        return <File className="w-6 h-6 text-green-500" />;
      default:
        return <Book className="w-6 h-6 text-orange-500" />;
    }
  };

  const MaterialCard = ({ material }) => (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            {getTypeIcon(material.type)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{material.title}</h3>
            <p className="text-gray-500 text-sm">{material.chapter}</p>
            <span className="text-sm text-gray-500">By {material.teacher}</span>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${
          material.type === 'video' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'
        }`}>
          {material.format}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-4">{material.description}</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            {new Date(material.uploadDate).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {material.type === 'video' ? (
            <>
              <PlayCircle className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">{material.duration}</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">{material.downloads} downloads</span>
            </>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        {material.type === 'video' ? (
          <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
            <PlayCircle className="w-4 h-4" />
            Watch Now
          </button>
        ) : (
          <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
            <Download className="w-4 h-4" />
            Download
          </button>
        )}
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
        <h1 className="text-2xl font-semibold text-gray-800">Study Materials</h1>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search materials..."
              className="pl-10 pr-4 py-2 border rounded-lg text-gray-600 bg-white w-64"
            />
          </div>
          <button className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Subjects</h2>
            <div className="space-y-2">
              {subjects.map(subject => (
                <button
                  key={subject.id}
                  onClick={() => setActiveSubject(subject.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                    activeSubject === subject.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-sm font-medium">{subject.name}</span>
                  <span className="text-sm">{subject.count}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 mt-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Material Type</h2>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-blue-600" />
                <span className="text-sm text-gray-600">Notes</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-blue-600" />
                <span className="text-sm text-gray-600">Video Lectures</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-blue-600" />
                <span className="text-sm text-gray-600">Worksheets</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded text-blue-600" />
                <span className="text-sm text-gray-600">Documents</span>
              </label>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Recent Materials */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {materials.map(material => (
              <MaterialCard key={material.id} material={material} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyMaterials;