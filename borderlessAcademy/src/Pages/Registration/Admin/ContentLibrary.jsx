import React, { useState } from 'react';
import { 
  Search, Plus, FileText, Book, Video, 
  Image, File, Download, MoreVertical,
  Trash2, FolderPlus, Folder
} from 'lucide-react';

const ContentLibrary = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const contentItems = [
    {
      id: 1,
      name: "Mathematics Curriculum Guide",
      type: "document",
      format: "PDF",
      size: "2.4 MB",
      subject: "Mathematics",
      grade: "Grade 8",
      uploadedBy: "Dr. Sarah Wilson",
      uploadDate: "2024-01-15",
      downloads: 145
    },
    {
      id: 2,
      name: "Physics Lab Demonstrations",
      type: "video",
      format: "MP4",
      size: "156 MB",
      subject: "Physics",
      grade: "Grade 9",
      uploadedBy: "Prof. James Murphy",
      uploadDate: "2024-01-20",
      views: 278
    },
    {
      id: 3,
      name: "Literature Study Materials",
      type: "folder",
      items: 12,
      subject: "English",
      grade: "Grade 7-9",
      uploadedBy: "Ms. Emily Chen",
      uploadDate: "2024-01-25",
      lastModified: "2024-02-01"
    }
  ];

  const getIcon = (type) => {
    switch(type) {
      case 'document':
        return <FileText className="text-blue-500" />;
      case 'video':
        return <Video className="text-purple-500" />;
      case 'image':
        return <Image className="text-green-500" />;
      case 'folder':
        return <Folder className="text-yellow-500" />;
      default:
        return <File className="text-gray-500" />;
    }
  };

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Content Library</h1>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
            <FolderPlus size={20} />
            <span>New Folder</span>
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Plus size={20} />
            <span>Upload Content</span>
          </button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex-1 relative min-w-[200px]">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search content..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Types</option>
            <option value="document">Documents</option>
            <option value="video">Videos</option>
            <option value="image">Images</option>
            <option value="folder">Folders</option>
          </select>
          <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Subjects</option>
            <option value="math">Mathematics</option>
            <option value="physics">Physics</option>
            <option value="english">English</option>
          </select>
          <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Grades</option>
            <option value="7">Grade 7</option>
            <option value="8">Grade 8</option>
            <option value="9">Grade 9</option>
          </select>
        </div>
      </div>

      {/* Content List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left pb-4">Name</th>
                  <th className="text-left pb-4">Subject</th>
                  <th className="text-left pb-4">Grade</th>
                  <th className="text-left pb-4">Size</th>
                  <th className="text-left pb-4">Uploaded By</th>
                  <th className="text-left pb-4">Date</th>
                  <th className="text-right pb-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {contentItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        {getIcon(item.type)}
                        <div>
                          <div className="font-medium text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-500">{item.format}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">{item.subject}</td>
                    <td className="py-4">{item.grade}</td>
                    <td className="py-4">{item.size}</td>
                    <td className="py-4">{item.uploadedBy}</td>
                    <td className="py-4">{new Date(item.uploadDate).toLocaleDateString()}</td>
                    <td className="py-4">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <Download size={16} className="text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <Trash2 size={16} className="text-red-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <MoreVertical size={16} className="text-gray-600" />
                        </button>
                      </div>
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

export default ContentLibrary;