import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  Users,
  MapPin,
  BookOpen,
  MoreVertical,
  Filter
} from 'lucide-react';

const Calendars = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState('month');

  // Dummy data for calendar events
  const events = [
    {
      id: 1,
      title: "Physics Class",
      type: "class",
      class: "Grade 10-A",
      time: "09:00 AM - 10:30 AM",
      location: "Room 201",
      date: "2024-12-14"
    },
    {
      id: 2,
      title: "Chemistry Lab",
      type: "lab",
      class: "Grade 10-B",
      time: "11:00 AM - 12:30 PM",
      location: "Science Lab",
      date: "2024-12-14"
    },
    {
      id: 3,
      title: "Mid-Term Exam",
      type: "exam",
      class: "Grade 10-A",
      time: "02:00 PM - 04:00 PM",
      location: "Exam Hall",
      date: "2024-12-16"
    },
    {
      id: 4,
      title: "Parent-Teacher Meeting",
      type: "meeting",
      class: "Grade 10-C",
      time: "03:30 PM - 04:30 PM",
      location: "Conference Room",
      date: "2024-12-18"
    }
  ];

  const viewOptions = [
    { value: 'day', label: 'Day' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' }
  ];

  // Get days in current month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const getEventType = (type) => {
    const types = {
      class: "bg-blue-100 text-blue-800 border-blue-200",
      lab: "bg-green-100 text-green-800 border-green-200",
      exam: "bg-purple-100 text-purple-800 border-purple-200",
      meeting: "bg-yellow-100 text-yellow-800 border-yellow-200"
    };
    return types[type] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Calendar</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <Plus size={20} />
          <span>Add Event</span>
        </button>
      </div>

      {/* Calendar Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-lg font-medium">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h2>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="flex gap-4 ml-auto">
          <select
            value={selectedView}
            onChange={(e) => setSelectedView(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {viewOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
            <Filter size={20} />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        {/* Days of Week Header */}
        <div className="grid grid-cols-7 border-b border-gray-200">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="p-4 text-center font-medium text-gray-600">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7">
          {getDaysInMonth(currentDate).map((day, index) => (
            <div
              key={index}
              className={`min-h-[120px] p-2 border-b border-r border-gray-200 ${
                day ? 'bg-white' : 'bg-gray-50'
              }`}
            >
              {day && (
                <>
                  <div className="text-sm font-medium text-gray-600 mb-2">
                    {day}
                  </div>
                  <div className="space-y-1">
                    {events
                      .filter(event => new Date(event.date).getDate() === day)
                      .map(event => (
                        <div
                          key={event.id}
                          className={`p-1 text-xs rounded border ${getEventType(event.type)}`}
                        >
                          <div className="font-medium">{event.title}</div>
                          <div>{event.time}</div>
                        </div>
                      ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="mt-6 bg-white rounded-lg shadow border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Upcoming Events</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {events.map(event => (
            <div key={event.id} className="p-4 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">{event.title}</h4>
                  <p className="text-sm text-gray-500">{event.class}</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical size={20} />
                </button>
              </div>
              <div className="mt-2 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock size={16} />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin size={16} />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendars;