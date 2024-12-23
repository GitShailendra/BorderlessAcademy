import React, { Suspense, useState } from 'react';
import {
  Users, Settings, LogOut, Bell, Menu, X,
  Home, Library, FileText, BarChart,
  Briefcase, BookOpen, HelpCircle, Database,
  ScrollText, Building2
} from 'lucide-react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Teachers from './Teachers'
import Guardian from './Guardian'
import Students from './Students'
import Academics from './Academics'
import ContentLibrary from './ContentLibrary'
import ClassesManagement from './ClassesManagement';
import Reports from './Reports';
import Finance from './Finance'
import AdminSettings from './AdminSettings';
import authService from '../../../Components/services/authService';
import { useAuth } from '../../../Components/auth/AuthContext';
const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const {auth} = useAuth();
  
  // Add this near the top of your component
const navigationItems = [
  { icon: <Home />, label: "Dashboard", path: "/admin/dashboard" },
  { icon: <Users />, label: "Teacher Management", path: "/admin/teachers" },
  { icon: <Users />, label: "Guardian Management", path: "/admin/guardians" },
  { icon: <Users />, label: "Student Management", path: "/admin/students" },
  { icon: <Briefcase />, label: "Academic", path: "/admin/academic" },
  { icon: <BookOpen />, label: "Classes", path: "/admin/classes" },
  { icon: <Library />, label: "Content Library", path: "/admin/library" },
  { icon: <BarChart />, label: "Reports", path: "/admin/reports" },
  { icon: <Database />, label: "Finance", path: "/admin/finance" },
  { icon: <Settings />, label: "Settings", path: "/admin/settings" }
];
  const handleLogOut = ()=>{
    authService.logout();
    navigate('/login')
  }
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
            <span className="text-xl font-bold text-gray-800">Admin Portal</span>
          )}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Admin Info */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <Users className="text-blue-600" size={20} />
            {sidebarOpen && <span className="font-medium">Administrator</span>}
          </div>
          {sidebarOpen && (
            <div className="flex items-center gap-3 p-2">
              <img 
                src="/api/placeholder/32/32"
                alt="Admin" 
                className="w-8 h-8 rounded-full border"
              />
              <div className="text-left">
                <div className="font-medium text-sm">Admin User</div>
                <div className="text-xs text-gray-500">System Administrator</div>
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
          <button onClick={handleLogOut} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <span className="min-w-[20px]"><LogOut size={20} /></span>
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold text-gray-800">
            Admin Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <Bell size={20} className="text-gray-600" />
            </button>
            <div className="flex items-center gap-3">
              <img 
                src="/api/placeholder/32/32"
                alt="Profile" 
                className="w-8 h-8 rounded-full border"
              />
              <span className="font-medium text-gray-700">Admin Account</span>
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
                   title="Total Users" 
                   value="2,345" 
                   icon={<Users className="text-blue-500" />}
                   trend="+12 Today"
                 />
                 <StatCard 
                   title="Active Classes" 
                   value="186" 
                   icon={<BookOpen className="text-green-500" />}
                   trend="24 New"
                 />
                 <StatCard 
                   title="System Status" 
                   value="Stable" 
                   icon={<Building2 className="text-purple-500" />}
                   trend="99.9% Uptime"
                 />
                 <StatCard 
                   title="Support Tickets" 
                   value="15" 
                   icon={<HelpCircle className="text-yellow-500" />}
                   trend="3 Pending"
                 />
               </div>
     
               {/* Recent Activity */}
               <div className="bg-white rounded-lg shadow">
                 <div className="p-6">
                   <h2 className="text-lg font-semibold mb-4">System Activity</h2>
                   <div className="space-y-4">
                     <ActivityItem 
                       title="New User Registration"
                       description="5 new teacher accounts created"
                       time="30 minutes ago"
                       icon={<Users className="text-blue-500" />}
                     />
                     <ActivityItem 
                       title="System Update"
                       description="Latest security patches applied"
                       time="2 hours ago"
                       icon={<Building2 className="text-green-500" />}
                     />
                     <ActivityItem 
                       title="Database Backup"
                       description="Automated backup completed"
                       time="4 hours ago"
                       icon={<Database className="text-purple-500" />}
                     />
                     <ActivityItem 
                       title="Report Generated"
                       description="Monthly attendance report"
                       time="6 hours ago"
                       icon={<FileText className="text-yellow-500" />}
                     />
                   </div>
                 </div>
               </div>
             </div>
            }/>
            <Route path='teachers' element={<Teachers/>}/>
            <Route path='guardians' element={<Guardian/>}/>
            <Route path='students' element={<Students/>}/>
            <Route path='academic' element={<Academics/>}/>
            <Route path='classes' element={<ClassesManagement/>}/>
            <Route path='library' element={<ContentLibrary/>}/>
            <Route path='reports' element={<Reports/>}/>
            <Route path='finance' element={<Finance/>}/>
            <Route path='settings' element={<AdminSettings/>}/>
          </Routes>

        </Suspense>
       

      </main>
    </div>
  );
};
// NavItem Component
const NavItem = ({ icon, label, path, collapsed = false }) => {
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

export default AdminDashboard;