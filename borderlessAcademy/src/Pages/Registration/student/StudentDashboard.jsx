import React, { Suspense, useState } from 'react';
import {
  Users, Book, Award, Settings, LogOut,
  Bell, Menu, X, Home, BookOpen,
  FileText, Clock, MessageSquare, BarChart,
  PieChart, Laptop, Calendar, Brain, ClipboardCheck,
  TestTube, GraduationCap
} from 'lucide-react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import img1 from '../../../assets/Images/Photo/avatar-3.svg'
import MyClasses from './MyClasses';
import Assignments from './Assignments';
import TestsAndExams from './TestsAndExams';
import StudyMaterials from './StudyMaterials'
import ProgressReports from './ProgressReports';
import Certificates from './Certificates';
import Calendars from './Calendars';
import Messages from './Messages';
import StudentSetings from './StudentSettings'
const StudentDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  // Navigation items exactly matching the image
  const navigationItems = [
    { icon: <Home />, label: "Dashboard", path: "/student/dashboard" },
    { icon: <BookOpen />, label: "My Classes", path: "/student/classes" },
    { icon: <ClipboardCheck />, label: "Assignments", path: "/student/assignments" },
    { icon: <TestTube />, label: "Tests & Exams", path: "/student/tests" },
    { icon: <Book />, label: "Study Materials", path: "/student/materials" },
    { icon: <BarChart />, label: "Progress Reports", path: "/student/progress" },
    { icon: <Award />, label: "Certificates", path: "/student/certificates" },
    { icon: <Calendar />, label: "Calendar", path: "/student/calendar" },
    { icon: <MessageSquare />, label: "Messages", path: "/student/messages" },
    { icon: <Settings />, label: "Settings", path: "/student/settings" }
  ];

  return (
    <div className="w-full h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside 
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-white h-screen border-r border-gray-200 transition-all duration-300`}
      >
        {/* Logo Area */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          {sidebarOpen && (
            <span className="text-xl font-bold text-gray-800">Student Dashboard</span>
          )}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Student Info */}
        <div className="p-4 border-b border-gray-200">
          {sidebarOpen && (
            <div className="flex items-center gap-3 p-2">
              <img 
                src={img1}
                alt="Student" 
                className="w-8 h-8 rounded-full border"
              />
              <div className="text-left">
                <div className="font-medium text-sm">Alex Johnson</div>
                <div className="text-xs text-gray-500">Grade 10</div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation - Exactly matching the image */}
        <nav className="p-4 space-y-1">
          {navigationItems.map((item, index) => (
            <NavItem
              key={index}
              icon={item.icon}
              label={item.label}
              active={index === 0}
              collapsed={!sidebarOpen}
              path={item.path}
            />
          ))}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-4 left-4">
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
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
            Student Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <Bell size={20} className="text-gray-600" />
            </button>
            <div className="flex items-center gap-3">
              <img 
                src={img1}
                alt="Profile" 
                className="w-8 h-8 rounded-full border"
              />
              <span className="font-medium text-gray-700">Alex Johnson</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <Suspense fallback={<div>loading...</div>}>
          <Routes>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={
             <div className="p-6">
             {/* Stats Grid */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
               <StatCard 
                 title="Today's Classes" 
                 value="3/5" 
                 icon={<Laptop className="text-blue-500" />}
                 trend="Next: Math 2PM"
               />
               <StatCard 
                 title="Assignments" 
                 value="85%" 
                 icon={<FileText className="text-green-500" />}
                 trend="4 Pending"
               />
               <StatCard 
                 title="Test Score" 
                 value="92%" 
                 icon={<TestTube className="text-purple-500" />}
                 trend="Last: Physics"
               />
               <StatCard 
                 title="Overall Grade" 
                 value="A-" 
                 icon={<Award className="text-yellow-500" />}
                 trend="Top 10%"
               />
             </div>
   
             {/* Recent Activity */}
             <div className="bg-white rounded-lg shadow">
               <div className="p-6">
                 <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
                 <div className="space-y-4">
                   <ActivityItem 
                     title="Physics Test Completed"
                     description="Score: 92% - Chapter 4: Motion Laws"
                     time="1 hour ago"
                     icon={<TestTube className="text-blue-500" />}
                   />
                   <ActivityItem 
                     title="Math Assignment Due"
                     description="Chapter 5: Algebraic Expressions"
                     time="Tomorrow"
                     icon={<FileText className="text-green-500" />}
                   />
                   <ActivityItem 
                     title="Biology Class"
                     description="Topic: Cell Structure"
                     time="2 hours ago"
                     icon={<BookOpen className="text-purple-500" />}
                   />
                 </div>
               </div>
             </div>
           </div>
          } />
          <Route path='classes' element={<MyClasses/>}/>
          <Route path='assignments' element={<Assignments/>}/>
          <Route path='tests' element={<TestsAndExams/>}/>
          <Route path='materials' element={<StudyMaterials/>}/>
          <Route path='progress' element={<ProgressReports/>}/>
          <Route path='certificates' element={<Certificates/>}/>
          <Route path='calendar' element={<Calendars/>}/>
          <Route path='messages' element={<Messages/>}/>
          <Route path='settings' element={<StudentSetings/>}/>
          </Routes>

        </Suspense>
       
      </main>
    </div>
  );
};

// Helper Components
const NavItem = ({ icon, label,path, active = false, collapsed = false }) => {
    const navigate = useNavigate();
    const isActive = window.location.pathname === path;
  return(
    <button
    onClick={()=>{
      console.log(path)
      navigate(path);
    }}
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
  )
 
}

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

export default StudentDashboard;