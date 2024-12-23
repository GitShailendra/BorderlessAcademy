import React, { Suspense, useEffect, useState } from 'react';
import {
  Users, Book, Award, Settings, LogOut,
  Bell, Menu, X, Home, BookOpen,
  FileText, Clock, MessageSquare, BarChart,
  PieChart, Laptop, User
} from 'lucide-react';
import img1 from '../../../assets/Images/Photo/avatar-1.svg'
import img2 from '../../../assets/Images/Photo/avatar-2.svg'
import img3 from '../../../assets/Images/Photo/avatar-3.svg'
import { useNavigate } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router-dom';
import MyStudents from './MyStudents'
import Courses from './Courses';
import Progress from './Progress';
import Assignments from './Assignments'
import Messages from './Messages'
import GuardianSettings from './GuardianSettings'
import authService from '../../../Components/services/authService';
import { useAuth } from '../../../Components/auth/AuthContext';
const GuardianDashboard = () => {
  const {auth} = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentStudent, setCurrentStudent] = useState('student1');
  const navigate = useNavigate();
  useEffect(()=>{
    console.log(auth,'.....')
  })
  const handleLogout = () => {
    try {
      authService.logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  const students = {
    student1: { name: 'John Doe', grade: '4th Grade', image: img1 },
    student2: { name: 'Jane Doe', grade: '2nd Grade', image: img2 }
  };

  return (
    <div className="w-full h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? 'w-64' : 'w-20'
          } bg-white h-screen border-r border-gray-200 transition-all duration-300`}
      >
        {/* Logo Area */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          {sidebarOpen && (
            <span className="text-xl font-bold text-gray-800">Borderless</span>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Student Selector */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <Users className="text-blue-600" size={20} />
            {sidebarOpen && <span className="font-medium">My Students</span>}
          </div>
          {sidebarOpen && (
            <div className="space-y-2">
              {Object.entries(students).map(([id, student]) => (
                <button
                  key={id}
                  onClick={() => setCurrentStudent(id)}
                  className={`w-full p-2 rounded-lg flex items-center gap-2 transition-colors
                    ${currentStudent === id
                      ? 'bg-blue-50 text-blue-600'
                      : 'hover:bg-gray-50 text-gray-700'}`}
                >
                  <img
                    src={student.image}
                    alt={student.name}
                    className="w-8 h-8 rounded-full border"
                  />
                  <div className="text-left">
                    <div className="font-medium text-sm">{student.name}</div>
                    <div className="text-xs text-gray-500">{student.grade}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>


        {/* Navigation */}
        <nav className="p-4 space-y-2">
          <NavItem icon={<Home />} label="Overview" path="/guardian/dashboard" collapsed={!sidebarOpen} />
          <NavItem icon={<User />} label="My Students" path="/guardian/mystudents" collapsed={!sidebarOpen} />
          <NavItem icon={<BookOpen />} label="Courses" path="/guardian/courses" collapsed={!sidebarOpen} />
          <NavItem icon={<FileText />} label="Assignments" path="/guardian/assignments" collapsed={!sidebarOpen} />
          <NavItem icon={<Award />} label="Progress" path="/guardian/progress" collapsed={!sidebarOpen} />
          <NavItem icon={<MessageSquare />} label="Messages" path="/guardian/messages" collapsed={!sidebarOpen} />
          <NavItem icon={<Settings />} label="Settings" path='/guardian/settings' collapsed={!sidebarOpen} />
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-4 left-4">
          <button onClick={handleLogout} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold text-gray-800">
            {students[currentStudent].name}'s Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <Bell size={20} className="text-gray-600" />
            </button>
            <div className="flex items-center gap-3">
              <img
                src={img3}
                alt="Profile"
                className="w-8 h-8 rounded-full border"
              />
              <span className="font-medium text-gray-700">Parent Account</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <Suspense fallback={<div>loading...</div>}>
          <Routes>
            <Route index element={<Navigate to="dashboard" replace />} />

            <Route path="/dashboard" element={<div className="p-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <StatCard
                  title="Attendance"
                  value="95%"
                  icon={<PieChart className="text-blue-500" />}
                  trend="+2.5%"
                />
                <StatCard
                  title="Assignments"
                  value="8/10"
                  icon={<FileText className="text-green-500" />}
                  trend="Due: 2"
                />
                <StatCard
                  title="Live Classes"
                  value="Today: 3"
                  icon={<Laptop className="text-purple-500" />}
                  trend="Next: 2PM"
                />
                <StatCard
                  title="Progress"
                  value="Good"
                  icon={<Award className="text-yellow-500" />}
                  trend="On Track"
                />
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
                  <div className="space-y-4">
                    <ActivityItem
                      title="Math Assignment Submitted"
                      description="Chapter 5 - Fractions"
                      time="2 hours ago"
                      icon={<FileText className="text-blue-500" />}
                    />
                    <ActivityItem
                      title="Science Class Completed"
                      description="Topic: Plant Life Cycle"
                      time="Yesterday"
                      icon={<BookOpen className="text-green-500" />}
                    />
                    <ActivityItem
                      title="New Message from Teacher"
                      description="Mrs. Smith sent a message"
                      time="1 day ago"
                      icon={<MessageSquare className="text-purple-500" />}
                    />
                  </div>
                </div>
              </div>
            </div>}
            />
            <Route path='mystudents' element={<MyStudents />} />
            <Route path='courses' element={<Courses/>}/>
            <Route path='assignments' element={<Assignments/>}/>
            <Route path='progress' element={<Progress/>}/>
            <Route path='messages' element={<Messages/>}/>
            <Route path='settings' element={<GuardianSettings/>}/>
          </Routes>

        </Suspense>

      </main>
    </div>
  );
};

// Helper Components
const NavItem = ({ icon, label, path, active = false, collapsed = false }) => {
  const navigate = useNavigate();
  const isActive = window.location.pathname === path;

  return (
    <button
      onClick={() => navigate(path)}
      className={`
        w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors
        ${isActive
          ? 'bg-blue-50 text-blue-600'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
      `}
    >
      {icon}
      {!collapsed && <span className="text-sm font-medium">{label}</span>}
    </button>
  );
};

const StatCard = ({ title, value, icon, trend }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <div className="flex items-center justify-between mb-4">
      {icon}
      <span className="text-sm text-gray-500">{trend}</span>
    </div>
    <h3 className="font-medium text-gray-600">{title}</h3>
    <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
  </div>
);

const ActivityItem = ({ title, description, time, icon }) => (
  <div className="flex items-start gap-4">
    <div className="p-2 bg-gray-50 rounded-lg">
      {icon}
    </div>
    <div className="flex-1">
      <h4 className="font-medium text-gray-900">{title}</h4>
      <p className="text-sm text-gray-500">{description}</p>
      <span className="text-xs text-gray-400 mt-1">{time}</span>
    </div>
  </div>
);

export default GuardianDashboard;