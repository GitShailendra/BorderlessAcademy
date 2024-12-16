import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, MapPin, Book, TestTube, FileText, Calendar as CalendarIcon } from 'lucide-react';

const Calendars = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Dummy events data
  const events = [
    {
      id: 1,
      title: "Physics Class",
      type: "class",
      date: "2024-12-15",
      time: "10:00 AM",
      duration: "1h 30m",
      location: "Room 301",
      teacher: "Dr. James Miller",
      icon: <Book className="w-4 h-4" />
    },
    {
      id: 2,
      title: "Mathematics Test",
      type: "exam",
      date: "2024-12-15",
      time: "2:00 PM",
      duration: "2h",
      location: "Hall A",
      teacher: "Dr. Sarah Wilson",
      icon: <TestTube className="w-4 h-4" />
    },
    {
      id: 3,
      title: "Biology Assignment Due",
      type: "assignment",
      date: "2024-12-15",
      time: "11:59 PM",
      description: "Cell Structure Analysis",
      icon: <FileText className="w-4 h-4" />
    }
  ];

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
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getEventTypeColor = (type) => {
    const colors = {
      class: "bg-blue-50 text-blue-600",
      exam: "bg-purple-50 text-purple-600",
      assignment: "bg-green-50 text-green-600"
    };
    return colors[type] || "bg-gray-50 text-gray-600";
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const isToday = (date) => {
    const today = new Date();
    return date && 
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const isSelected = (date) => {
    return date && 
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear();
  };

  const EventCard = ({ event }) => (
    <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm">
      <div className={`p-2 rounded-lg ${getEventTypeColor(event.type)}`}>
        {event.icon}
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-gray-900">{event.title}</h4>
        <div className="mt-2 space-y-1">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{event.time} ({event.duration})</span>
          </div>
          {event.location && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{event.location}</span>
            </div>
          )}
          {event.teacher && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Book className="w-4 h-4" />
              <span>{event.teacher}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Calendar</h1>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Today
          </button>
          <select className="px-4 py-2 border rounded-lg text-gray-600 bg-white">
            <option>Month View</option>
            <option>Week View</option>
            <option>Day View</option>
          </select>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Calendar Grid */}
        <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <div className="flex gap-2">
              <button 
                onClick={previousMonth}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={nextMonth}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-px bg-gray-200">
            {/* Day Headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div 
                key={day} 
                className="p-2 text-center text-sm font-medium text-gray-600 bg-white"
              >
                {day}
              </div>
            ))}

            {/* Calendar Days */}
            {getDaysInMonth(currentDate).map((date, index) => (
              <div 
                key={index}
                className={`min-h-[100px] p-2 bg-white ${
                  date ? 'cursor-pointer hover:bg-gray-50' : ''
                }`}
                onClick={() => date && setSelectedDate(date)}
              >
                {date && (
                  <div className={`relative ${
                    isToday(date) 
                      ? 'text-blue-600' 
                      : isSelected(date)
                      ? 'text-white'
                      : 'text-gray-900'
                  }`}>
                    <div className={`
                      w-8 h-8 flex items-center justify-center rounded-full
                      ${isToday(date) ? 'bg-blue-50' : ''}
                      ${isSelected(date) ? 'bg-blue-600' : ''}
                    `}>
                      {date.getDate()}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Events Sidebar */}
        <div className="w-96">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">
                Events for {selectedDate.toLocaleDateString()}
              </h3>
              <CalendarIcon className="w-5 h-5 text-gray-400" />
            </div>

            <div className="space-y-4">
              {events.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendars;