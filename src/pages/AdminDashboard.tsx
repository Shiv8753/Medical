import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  User, 
  BrainCircuit, 
  Activity, 
  Settings, 
  Shield, 
  AlertTriangle,
  Calendar,
  FileText,
  BarChart3,
  PieChart
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminDashboard: React.FC = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  useEffect(() => {
    // Redirect if not authenticated or not an admin
    if (!isAuthenticated || currentUser?.role !== 'admin') {
      navigate('/login');
    }
  }, [isAuthenticated, currentUser, navigate]);
  
  if (!currentUser || currentUser.role !== 'admin') {
    return null;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center mb-6">
              <div className="bg-red-100 rounded-full p-3">
                <Shield className="h-8 w-8 text-red-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold">{currentUser.name}</h2>
                <p className="text-gray-600">System Administrator</p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full text-left py-2 px-3 rounded mb-2 flex items-center ${
                  activeTab === 'dashboard' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
                }`}
              >
                <BarChart3 className="h-5 w-5 mr-2" />
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`w-full text-left py-2 px-3 rounded mb-2 flex items-center ${
                  activeTab === 'users' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
                }`}
              >
                <Users className="h-5 w-5 mr-2" />
                User Management
              </button>
              <button
                onClick={() => setActiveTab('doctors')}
                className={`w-full text-left py-2 px-3 rounded mb-2 flex items-center ${
                  activeTab === 'doctors' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
                }`}
              >
                <User className="h-5 w-5 mr-2" />
                Doctor Management
              </button>
              <button
                onClick={() => setActiveTab('ai')}
                className={`w-full text-left py-2 px-3 rounded mb-2 flex items-center ${
                  activeTab === 'ai' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
                }`}
              >
                <BrainCircuit className="h-5 w-5 mr-2" />
                AI Analytics
              </button>
              <button
                onClick={() => setActiveTab('system')}
                className={`w-full text-left py-2 px-3 rounded mb-2 flex items-center ${
                  activeTab === 'system' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
                }`}
              >
                <Settings className="h-5 w-5 mr-2" />
                System Settings
              </button>
            </div>
          </div>
          
          {/* System Status */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-medium mb-4">System Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Server Status</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">Online</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Database</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">Connected</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">AI Models</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Storage</span>
                <span className="text-sm text-gray-600">76% (152GB/200GB)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '76%' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="lg:w-3/4">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center">
                    <div className="bg-blue-100 rounded-full p-3 mr-4">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Total Users</p>
                      <h3 className="text-2xl font-bold">1,248</h3>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="text-green-500 flex items-center">
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      12.5%
                    </span>
                    <span className="text-gray-500 ml-2">from last month</span>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center">
                    <div className="bg-purple-100 rounded-full p-3 mr-4">
                      <Activity className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">AI Detections</p>
                      <h3 className="text-2xl font-bold">3,856</h3>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="text-green-500 flex items-center">
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      23.8%
                    </span>
                    <span className="text-gray-500 ml-2">from last month</span>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center">
                    <div className="bg-green-100 rounded-full p-3 mr-4">
                      <User className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Active Doctors</p>
                      <h3 className="text-2xl font-bold">42</h3>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <span className="text-green-500 flex items-center">
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      8.3%
                    </span>
                    <span className="text-gray-500 ml-2">from last month</span>
                  </div>
                </div>
              </div>
              
              {/* Detection Distribution */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">AI Detection Distribution</h2>
                  <select className="border border-gray-300 rounded-md py-1 px-3 text-sm">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="col-span-2">
                    {/* This would be a chart in a real application */}
                    <div className="bg-gray-100 rounded-lg p-4 h-64 flex items-center justify-center">
                      <BarChart3 size={64} className="text-gray-400" />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-4">Detection Types</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Skin Cancer</span>
                          <span className="text-sm font-medium">1,582 (41%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '41%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Brain Tumor</span>
                          <span className="text-sm font-medium">926 (24%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: '24%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Dental Issues</span>
                          <span className="text-sm font-medium">1,348 (35%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '35%' }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="font-medium mb-4">Detection Accuracy</h3>
                      <div className="flex items-center">
                        <div className="relative w-24 h-24">
                          {/* This would be a donut chart in a real application */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <PieChart size={64} className="text-blue-500" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <h4 className="text-2xl font-bold">85%</h4>
                          <p className="text-sm text-gray-500">Overall accuracy</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-100 rounded-full p-2 mr-3 mt-1">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-gray-800">Dr. Sharma logged in to the system</p>
                      <p className="text-sm text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-green-100 rounded-full p-2 mr-3 mt-1">
                      <Activity className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-gray-800">Skin cancer detection completed for Rahul Patel</p>
                      <p className="text-sm text-gray-500">3 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-yellow-100 rounded-full p-2 mr-3 mt-1">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-gray-800">System alert: Database backup completed</p>
                      <p className="text-sm text-gray-500">6 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-purple-100 rounded-full p-2 mr-3 mt-1">
                      <Calendar className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-gray-800">New appointment scheduled: Dr. Patel and Meera Kapoor</p>
                      <p className="text-sm text-gray-500">Yesterday</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-red-100 rounded-full p-2 mr-3 mt-1">
                      <FileText className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <p className="text-gray-800">New medical record created for Sanjay Singh</p>
                      <p className="text-sm text-gray-500">Yesterday</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'users' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">User Management</h2>
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm">
                  + Add New User
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">RP</div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">Rahul Patel</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        patient@healthcare.com
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          Patient
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">DS</div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">Dr. Sharma</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        doctor@healthcare.com
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Doctor
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">AU</div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">Admin User</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        admin@healthcare.com
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Admin
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'doctors' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Doctor Management</h2>
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm">
                  + Add New Doctor
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Specialization
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">DS</div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">Dr. Sharma</div>
                            <div className="text-sm text-gray-500">doctor@healthcare.com</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Dermatology
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Vadodara, Gujarat
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">GP</div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">Dr. Gupta</div>
                            <div className="text-sm text-gray-500">gupta@healthcare.com</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Neurology
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Vadodara, Gujarat
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">JM</div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">Dr. Joshi</div>
                            <div className="text-sm text-gray-500">joshi@healthcare.com</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Dentistry
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Vadodara, Gujarat
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'ai' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6">AI Model Performance</h2>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium">Skin Cancer Detection</h3>
                      <span className="text-sm font-medium bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        85% Accuracy
                      </span>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-4 h-40 flex items-center justify-center">
                      <BarChart3 size={48} className="text-gray-400" />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium">Brain Tumor Detection</h3>
                      <span className="text-sm font-medium bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        84% Accuracy
                      </span>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-4 h-40 flex items-center justify-center">
                      <BarChart3 size={48} className="text-gray-400" />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium">Dental Issue Detection</h3>
                      <span className="text-sm font-medium bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        86% Accuracy
                      </span>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-4 h-40 flex items-center justify-center">
                      <BarChart3 size={48} className="text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6">AI Training Status</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-4">
                    <div>
                      <h3 className="font-medium">Skin Cancer Model</h3>
                      <p className="text-sm text-gray-500">Last trained: 2 weeks ago</p>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm">
                      Retrain Model
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center border-b pb-4">
                    <div>
                      <h3 className="font-medium">Brain Tumor Model</h3>
                      <p className="text-sm text-gray-500">Last trained: 3 weeks ago</p>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm">
                      Retrain Model
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Dental Issue Model</h3>
                      <p className="text-sm text-gray-500">Last trained: 1 week ago</p>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm">
                      Retrain Model
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'system' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">System Settings</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">General Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="site-name" className="block text-sm font-medium text-gray-700 mb-1">
                        Site Name
                      </label>
                      <input
                        type="text"
                        id="site-name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        defaultValue="HealthAI"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        defaultValue="contact@healthai.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1">
                        Default Timezone
                      </label>
                      <select
                        id="timezone"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option>Asia/Kolkata (GMT+5:30)</option>
                        <option>UTC (GMT+0:00)</option>
                        <option>America/New_York (GMT-5:00)</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">AI Detection Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between">
                        <label htmlFor="confidence-threshold" className="block text-sm font-medium text-gray-700 mb-1">
                          Confidence Threshold
                        </label>
                        <span className="text-sm text-gray-500">75%</span>
                      </div>
                      <input
                        type="range"
                        id="confidence-threshold"
                        min="50"
                        max="95"
                        defaultValue="75"
                        className="w-full"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Minimum confidence level required for AI detections to be considered valid
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Required Doctor Review
                        </label>
                        <p className="text-xs text-gray-500">
                          Require doctor review for all AI detections before showing to patients
                        </p>
                      </div>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input
                          type="checkbox"
                          id="doctor-review"
                          className="sr-only"
                        />
                        <label
                          htmlFor="doctor-review"
                          className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                        >
                          <span className="block h-6 w-6 rounded-full bg-white transform transition-transform duration-200 ease-in-out translate-x-0"></span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Show Nearby Doctors
                        </label>
                        <p className="text-xs text-gray-500">
                          Show nearby doctor recommendations after AI detection
                        </p>
                      </div>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input
                          type="checkbox"
                          id="nearby-doctors"
                          className="sr-only"
                          defaultChecked
                        />
                        <label
                          htmlFor="nearby-doctors"
                          className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                        >
                          <span className="block h-6 w-6 rounded-full bg-white transform transition-transform duration-200 ease-in-out translate-x-4"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Backup & Maintenance</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Database Backup</h4>
                        <p className="text-sm text-gray-500">Last backup: 12 hours ago</p>
                      </div>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm">
                        Backup Now
                      </button>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">System Maintenance</h4>
                        <p className="text-sm text-gray-500">Schedule maintenance window</p>
                      </div>
                      <button className="border border-gray-300 hover:bg-gray-50 py-2 px-4 rounded-md text-sm">
                        Schedule
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200 flex justify-end">
                  <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md mr-3">
                    Cancel
                  </button>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;