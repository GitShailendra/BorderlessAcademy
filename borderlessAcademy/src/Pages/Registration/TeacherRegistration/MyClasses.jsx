import React, { useState, useEffect } from 'react';
import {
  Users,
  Clock,
  Calendar,
  BookOpen,
  Search,
  Plus,
  Filter,
  MoreVertical,
  ExternalLink
} from 'lucide-react';
import classService from '../../../Components/services/classServices';
import { toast } from 'react-toastify';
import AddClassModal from './AddClassModel'
const MyClasses = () => {
  const [classes, setClasses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalClasses: 0,
    totalStudents: 0,
    teachingHours: '0/week'
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await classService.getClasses();
      console.log(response,'student response')
      setClasses(response.data.classes);
      setStats(response.data.stats);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching classes:', error);
      toast.error('Failed to fetch classes');
      setLoading(false);
    }
  };

  const handleAddClass = async (formData) => {
    try {
      console.log("Creating class with data:", formData); // Debug log
      const response = await classService.createClass(formData);
      
      if (response.success) {
          toast.success('Class created successfully');
          setIsModalOpen(false);
          await fetchClasses(); // Refresh the list
      } else {
          toast.error(response.message || 'Failed to create c lass');
      } // Refresh the list
    } catch (error) {
        console.error('Error creating class:', error);
        toast.error(error.response?.data?.message || 'Failed to create class');
    }
};

  const filteredClasses = classes.filter(classItem =>
    classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    classItem.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
    classItem.subject.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">My Classes</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} />
          <span>Add New Class</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookOpen className="text-blue-600" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Total Classes</h3>
              <p className="text-3xl font-bold text-gray-800">{stats.totalClasses}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="text-green-600" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Total Students</h3>
              <p className="text-3xl font-bold text-gray-800">{stats.totalStudents}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Clock className="text-purple-600" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Teaching Hours</h3>
              <p className="text-3xl font-bold text-gray-800">{stats.teachingHours}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search classes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
          <Filter size={20} />
          <span>Filter</span>
        </button>
      </div>

      {/* Classes List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-1 gap-4 p-6">
          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : filteredClasses.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              {searchTerm ? 'No classes found matching your search.' : 'No classes found. Create your first class!'}
            </div>
          ) : (
            filteredClasses.map((classItem) => (
              <div
                key={classItem._id}
                className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{classItem.name}</h3>
                    <p className="text-sm text-gray-500">{classItem.section}</p>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <MoreVertical size={20} className="text-gray-500" />
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Students</p>
                    <p className="font-semibold">{classItem.students?.length || 0}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Schedule</p>
                    <p className="font-semibold">
                      {classItem.schedule.dayOfWeek.map(day => day.slice(0, 3)).join(', ')}
                      <br />
                      {classItem.schedule.startTime} - {classItem.schedule.endTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Subject</p>
                    <p className="font-semibold">{classItem.subject.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Meeting Link</p>
                    <a
                      href={classItem.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-blue-500 hover:text-blue-600 flex items-center gap-1"
                    >
                      Join <ExternalLink size={16} />
                    </a>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${classItem.progress || 0}%` }}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">Course Progress: {classItem.progress || 0}%</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add Class Modal */}
      <AddClassModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddClass}
      />
    </div>
  );
};

export default MyClasses;