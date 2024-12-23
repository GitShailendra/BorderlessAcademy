import React, { Suspense, useEffect, useState } from 'react';
import {
  Users, Book, Award, Settings, LogOut,
  Bell, Menu, X, Home, BookOpen,
  FileText, TestTube, MessageSquare, BarChart,
  GraduationCap, Laptop, Calendar, ClipboardCheck,
  ScrollText
} from 'lucide-react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import img1 from '../../../assets/Images/Photo/avatar-2.svg'
import Myclasses from './MyClasses'
import Students from './Students';
import Assignments from './Assignments';
import TestAndExams from './TestAndExams'
import StudyMaterials from './StudyMaterials';
import Grades from './Grades'
import Reports from './Reports'
import Messages from './Messages';
import SettingPage from './SettingPage';
import authService from '../../../Components/services/authService';
import { useAuth } from '../../../Components/auth/AuthContext';
import classService from '../../../Components/services/classServices';
// import Calendars from './Calendars'
const TeacherDashboard = () => {
const {auth,logout} = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [totalStudents, setTotalStudents] = useState(0);
  const [loading, setLoading] = useState(true);
  const userInfo = auth.user.info
  const userInfo2 = auth.user
  useEffect(() => {
    console.log('======',auth,'=====')
    const checkAuth = async () => {
      try {
        // Check if user is authenticated and is a teacher
        if (!authService.isAuthenticated() || !authService.hasRole('teacher')) {
          navigate('/login');
          return;
        }

        // Get user info
        const userInfo = authService.getUserInfo();
        setUserData(userInfo);

      } catch (error) {
        console.error('Auth check failed:', error);
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate]);
  useEffect(() => {
    const fetchTotalStudents = async () => {
      try {
        const response = await classService.getStudents();

        console.log('Total students:', response.data.total);
        setTotalStudents(response.data.total);
      } catch (error) {
        console.error('Error fetching student count:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalStudents();
  }, []);
  const handleLogout = () => {
    try {
      logout();
    navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  // Navigation items exactly matching the teacher dashboard image
  const navigationItems = [
    { icon: <Home />, label: "Dashboard", path: "/teacher/dashboard" },
    { icon: <BookOpen />, label: "My Classes", path: "/teacher/classes" },
    { icon: <Users />, label: "Students", path: "/teacher/students" },
    { icon: <ClipboardCheck />, label: "Assignments", path: "/teacher/assignments" },
    { icon: <TestTube />, label: "Tests & Exams", path: "/teacher/tests" },
    { icon: <Book />, label: "Study Materials", path: "/teacher/materials" },
    { icon: <Award />, label: "Grades", path: "/teacher/grades" },
    { icon: <ScrollText />, label: "Reports", path: "/teacher/reports" },
    // { icon: <Calendar />, label: "Calendar", path: "/teacher/calendar" },
    { icon: <MessageSquare />, label: "Messages", path: "/teacher/messages" },
    { icon: <Settings />, label: "Settings", path: "/teacher/settings" }
  ];


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
            <span className="text-xl font-bold text-gray-800">Teacher Dashboard</span>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Teacher Info */}
        <div className="p-4 border-b border-gray-200">
          {sidebarOpen && (
            <div className="flex items-center gap-3 p-2">
              <img
                src={img1}
                alt="Teacher"
                className="w-8 h-8 rounded-full border"
              />
              <div className="text-left">
                <div className="font-medium text-sm">{userInfo2.name}</div>
                <div className="text-xs text-gray-500">Science Department</div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navigationItems.map((item, index) => (
            <NavItem
              key={index}
              icon={item.icon}
              label={item.label}
              path={item.path}
              collapsed={!sidebarOpen}
            />
          ))}
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
            Teacher Dashboard
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
              <span className="font-medium text-gray-700">{userInfo2.name}</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <Suspense fallback={<div>loading...</div>}>
          <Routes>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path='dashboard' element={
              <div className="p-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  <StatCard
                    title={loading ? '...' : totalStudents}
                    
                    icon={<Users className="text-blue-500" />}
                    trend="↑ 12 New"
                  />
                  <StatCard
                    title="Active Classes"
                    value="8"
                    icon={<BookOpen className="text-green-500" />}
                    trend="4 Today"
                  />
                  <StatCard
                    title="Pending Assignments"
                    value="23"
                    icon={<ClipboardCheck className="text-purple-500" />}
                    trend="12 Due Today"
                  />
                  <StatCard
                    title="Average Performance"
                    value="87%"
                    icon={<Award className="text-yellow-500" />}
                    trend="↑ 3.2%"
                  />
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow">
                  <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
                    <div className="space-y-4">
                      <ActivityItem
                        title="Physics Test Graded"
                        description="Grade 10 - Chapter 4: Motion Laws"
                        time="1 hour ago"
                        icon={<TestTube className="text-blue-500" />}
                      />
                      <ActivityItem
                        title="New Assignment Posted"
                        description="Mathematics - Algebraic Expressions"
                        time="2 hours ago"
                        icon={<FileText className="text-green-500" />}
                      />
                      <ActivityItem
                        title="Class Schedule Updated"
                        description="Biology Lab - Room 204"
                        time="3 hours ago"
                        icon={<Calendar className="text-purple-500" />}
                      />
                      <ActivityItem
                        title="Student Reports Generated"
                        description="Mid-term Performance Analysis"
                        time="5 hours ago"
                        icon={<ScrollText className="text-yellow-500" />}
                      />
                    </div>
                  </div>
                </div>
              </div>
            } />
            <Route path='classes' element={<Myclasses />} />
            <Route path='students' element={<Students/>}/>
            <Route path='assignments' element={<Assignments/>}/>
            <Route path='tests' element={<TestAndExams/>}/>
            <Route path='materials' element={<StudyMaterials/>}/>
            <Route path='grades' element={<Grades/>}/>
            <Route path='reports' element={<Reports/>}/>
            {/* <Route path='calendar' element={<Calendars/>}/> */}
            <Route path='messages' element={<Messages/>}/>
            <Route path='settings' element={<SettingPage/>}/>
            </Routes>

        </Suspense>

      </main>
    </div>
  );
};

// Helper Components
const NavItem = ({ icon, label, path, active = false, collapsed = false }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(path)}
      className={`
        w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors
        ${window.location.pathname === path
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

export default TeacherDashboard;