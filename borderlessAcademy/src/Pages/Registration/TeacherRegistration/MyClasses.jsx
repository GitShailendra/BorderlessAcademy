import React, { useState } from 'react';
import {
  Users,
  Clock,
  Calendar,
  BookOpen,
  GraduationCap,
  Search,
  Plus,
  Filter,
  MoreVertical,
  Book
} from 'lucide-react';

const MyClasses = () => {
  // Sample data - replace with real data later
  const classes = [
    {
      id: 1,
      name: "Physics - Grade 10",
      section: "Section A",
      students: 32,
      schedule: "Mon, Wed 10:00 AM",
      room: "Lab 204",
      nextClass: "Tomorrow, 10:00 AM",
      progress: 75,
    },
    {
      id: 2,
      name: "Chemistry - Grade 11",
      section: "Section B",
      students: 28,
      schedule: "Tue, Thu 11:30 AM",
      room: "Lab 301",
      nextClass: "Today, 11:30 AM",
      progress: 60,
    },
    {
      id: 3,
      name: "Biology - Grade 9",
      section: "Section C",
      students: 35,
      schedule: "Wed, Fri 9:00 AM",
      room: "Room 105",
      nextClass: "Wednesday, 9:00 AM",
      progress: 80,
    },
  ];

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">My Classes</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus size={20} />
          <span>Add New Class</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookOpen className="text-blue-600" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Total Classes</h3>
              <p className="text-3xl font-bold text-gray-800">8</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="text-green-600" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Total Students</h3>
              <p className="text-3xl font-bold text-gray-800">245</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Clock className="text-purple-600" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Teaching Hours</h3>
              <p className="text-3xl font-bold text-gray-800">24/week</p>
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
          {classes.map((classItem) => (
            <div 
              key={classItem.id} 
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
                  <p className="font-semibold">{classItem.students}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Schedule</p>
                  <p className="font-semibold">{classItem.schedule}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Room</p>
                  <p className="font-semibold">{classItem.room}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Next Class</p>
                  <p className="font-semibold">{classItem.nextClass}</p>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${classItem.progress}%` }}
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">Course Progress: {classItem.progress}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyClasses;