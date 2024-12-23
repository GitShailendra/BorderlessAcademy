import React, { useEffect, useState } from 'react';
import {
  User,
  Bell,
  Lock,
  Globe,
  Camera,
  Shield,
  ChevronRight,
  Book
} from 'lucide-react';
import { useAuth } from '../../../Components/auth/AuthContext';

const StudentSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState({
    classNotifications: true,
    assignmentReminders: true,
    examReminders: true,
    gradeUpdates: true,
    teacherMessages: true
  });

  const tabItems = [
    { id: 'profile', label: 'Profile Settings', icon: <User size={20} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={20} /> },
    { id: 'security', label: 'Security', icon: <Lock size={20} /> },
    { id: 'preferences', label: 'Preferences', icon: <Globe size={20} /> }
  ];
  const {auth} = useAuth();
  const userInfo = auth.user.info
  useEffect(()=>{
    console.log(userInfo,"hey this is settings page")
  })

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account settings and preferences</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Settings Navigation */}
        <div className="w-full md:w-64 bg-white rounded-lg shadow-sm border border-gray-200">
          <nav className="p-2">
            {tabItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left mb-1
                  ${activeTab === item.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Profile Settings</h2>
                
                {/* Profile Picture */}
                <div className="mb-6">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <img
                        src={userInfo.photo || '/api/placeholder/80/80'}
                        alt="Profile"
                        className="w-20 h-20 rounded-full"
                      />
                      <button className="absolute bottom-0 right-0 p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600">
                        <Camera size={16} />
                      </button>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Profile Picture</h3>
                      <p className="text-sm text-gray-500">JPG, GIF or PNG. Max size of 800K</p>
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={`${userInfo.firstName} ${userInfo.lastName}`}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Student ID
                      </label>
                      <input
                        type="text"
                        value={userInfo.studentId}
                        disabled
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={userInfo.email}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Grade Level
                      </label>
                      <input
                        type="text"
                        value={`Grade ${userInfo.grade}`}
                        disabled
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bio
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Write a short bio about yourself..."
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Settings */}
            {activeTab === 'notifications' && (
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Notification Preferences</h2>
                
                <div className="space-y-6">
                  {Object.entries(notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between pb-4 border-b border-gray-200">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Receive notifications for {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) => setNotifications({
                            ...notifications,
                            [key]: e.target.checked
                          })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Security Settings</h2>
                
                <div className="space-y-6">
                  {/* Change Password */}
                  <div className="pb-6 border-b border-gray-200">
                    <h3 className="font-medium text-gray-900 mb-4">Change Password</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Device History */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-medium text-gray-900">Connected Devices</h3>
                        <p className="text-sm text-gray-500">Manage your active sessions</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center gap-4">
                          <Shield className="w-6 h-6 text-gray-400" />
                          <div>
                            <p className="font-medium text-gray-900">Current Device</p>
                            <p className="text-sm text-gray-500">Last active: Just now</p>
                          </div>
                        </div>
                        <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                          Active
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Settings */}
            {activeTab === 'preferences' && (
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Preferences</h2>
                
                <div className="space-y-6">
                  {/* Language Preference */}
                  <div className="pb-6 border-b border-gray-200">
                    <h3 className="font-medium text-gray-900 mb-4">Language</h3>
                    <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                    </select>
                  </div>

                  {/* Time Zone */}
                  <div className="pb-6 border-b border-gray-200">
                    <h3 className="font-medium text-gray-900 mb-4">Time Zone</h3>
                    <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="EST">Eastern Time (ET)</option>
                      <option value="CST">Central Time (CT)</option>
                      <option value="MST">Mountain Time (MT)</option>
                      <option value="PST">Pacific Time (PT)</option>
                    </select>
                  </div>

                  {/* Theme Preference */}
                  <div className="pb-6 border-b border-gray-200">
                    <h3 className="font-medium text-gray-900 mb-4">Theme</h3>
                    <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="system">System Default</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex justify-end gap-4">
                <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSettings;