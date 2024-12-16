import React, { useState } from 'react';
import { 
  Search, Plus, MoreVertical, Edit2, Trash2, 
  Mail, Phone, UserPlus, User, Book 
} from 'lucide-react';

const GuardianManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Static guardian data
  const guardians = [
    {
      id: 1,
      name: "Robert Wilson",
      email: "robert.wilson@gmail.com",
      phone: "+1 (555) 123-4567",
      relation: "Father",
      children: ["John Wilson (Grade 8)", "Emma Wilson (Grade 5)"],
      joinDate: "2023-08-15",
      status: "active"
    },
    {
      id: 2,
      name: "Mary Johnson",
      email: "mary.johnson@gmail.com",
      phone: "+1 (555) 234-5678",
      relation: "Mother",
      children: ["Thomas Johnson (Grade 10)"],
      joinDate: "2023-09-01",
      status: "active"
    },
    {
      id: 3,
      name: "David Chen",
      email: "david.chen@gmail.com",
      phone: "+1 (555) 345-6789",
      relation: "Father",
      children: ["Lily Chen (Grade 6)", "James Chen (Grade 3)"],
      joinDate: "2023-10-15",
      status: "active"
    }
  ];

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Guardian Management</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus size={20} />
          <span>Add Guardian</span>
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search guardians..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Relations</option>
            <option value="father">Father</option>
            <option value="mother">Mother</option>
            <option value="guardian">Guardian</option>
          </select>
          <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Guardians List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Guardians Directory</h2>
          <div className="divide-y">
            {guardians.map((guardian) => (
              <div key={guardian.id} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-xl font-semibold text-gray-600">
                        {guardian.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{guardian.name}</h3>
                      <p className="text-sm text-gray-500">{guardian.relation}</p>
                      <div className="mt-2 flex gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Mail size={16} />
                          {guardian.email}
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone size={16} />
                          {guardian.phone}
                        </div>
                      </div>
                      <div className="mt-2 flex gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <UserPlus size={16} />
                          Joined: {new Date(guardian.joinDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Book size={16} />
                          Children: {guardian.children.join(", ")}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Edit2 size={16} className="text-blue-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Trash2 size={16} className="text-red-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <MoreVertical size={16} className="text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuardianManagement;