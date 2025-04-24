import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, User, Clock, Calendar, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DetectionResult } from '../types';

// Mock medical history data
const mockMedicalHistory: DetectionResult[] = [
  {
    id: '1',
    userId: 'patient-1',
    detectionType: 'skin',
    imageUrl: 'https://images.pexels.com/photos/4046567/pexels-photo-4046567.jpeg?auto=compress&cs=tinysrgb&w=600',
    confidence: 0.85,
    diagnosis: 'Suspicious melanoma',
    date: '2025-03-15',
    recommendations: [
      'Consult with a dermatologist immediately',
      'Further biopsy recommended to confirm diagnosis',
      'Avoid sun exposure to the affected area'
    ],
    medications: [
      { name: 'Topical corticosteroid cream', dosage: 'Apply thin layer twice daily', frequency: 'Twice daily', duration: '7 days' }
    ],
    nearbyDoctors: [
      { id: 'doc-1', name: 'Dr. Patel', email: 'patel@example.com', role: 'doctor', specialization: 'Dermatology', location: 'Vadodara', contact: '+91-9876543210' }
    ]
  },
  {
    id: '2',
    userId: 'patient-1',
    detectionType: 'dental',
    imageUrl: 'https://images.pexels.com/photos/3881449/pexels-photo-3881449.jpeg?auto=compress&cs=tinysrgb&w=600',
    confidence: 0.78,
    diagnosis: 'Periodontitis',
    date: '2025-02-20',
    recommendations: [
      'Schedule dental appointment',
      'Improve oral hygiene practices',
      'Use antibacterial mouthwash'
    ],
    medications: [
      { name: 'Chlorhexidine mouthwash', dosage: 'Rinse twice daily for 30 seconds', frequency: 'Twice daily', duration: '14 days' }
    ],
    nearbyDoctors: [
      { id: 'doc-2', name: 'Dr. Joshi', email: 'joshi@example.com', role: 'doctor', specialization: 'Dentistry', location: 'Vadodara', contact: '+91-9876543214' }
    ]
  }
];

const UserPortal: React.FC = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [medicalHistory, setMedicalHistory] = useState<DetectionResult[]>(mockMedicalHistory);
  
  useEffect(() => {
    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Please log in to access your portal</h1>
        <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md">
          Log In
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">User Portal</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-1/4">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 rounded-full p-3">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold">{currentUser.name}</h2>
                <p className="text-gray-600">{currentUser.email}</p>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4 mt-4">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left py-2 px-3 rounded mb-2 flex items-center ${
                  activeTab === 'profile' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
                }`}
              >
                <User className="h-5 w-5 mr-2" />
                Profile
              </button>
              <button
                onClick={() => setActiveTab('medical-history')}
                className={`w-full text-left py-2 px-3 rounded mb-2 flex items-center ${
                  activeTab === 'medical-history' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
                }`}
              >
                <FileText className="h-5 w-5 mr-2" />
                Medical History
              </button>
              <button
                onClick={() => setActiveTab('appointments')}
                className={`w-full text-left py-2 px-3 rounded mb-2 flex items-center ${
                  activeTab === 'appointments' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
                }`}
              >
                <Calendar className="h-5 w-5 mr-2" />
                Appointments
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-medium mb-4">Quick Actions</h3>
            <Link
              to="/detection"
              className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded mb-3"
            >
              New AI Detection
            </Link>
            <Link
              to="/contact"
              className="block w-full text-center border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 px-4 rounded"
            >
              Contact Support
            </Link>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="md:w-3/4">
          {activeTab === 'profile' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={currentUser.name}
                    disabled
                    className="w-full py-2 px-3 border border-gray-300 rounded-md bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={currentUser.email}
                    disabled
                    className="w-full py-2 px-3 border border-gray-300 rounded-md bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="Add phone number"
                    className="w-full py-2 px-3 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    className="w-full py-2 px-3 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Medical Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                    <select className="w-full py-2 px-3 border border-gray-300 rounded-md">
                      <option>Select blood group</option>
                      <option>A+</option>
                      <option>A-</option>
                      <option>B+</option>
                      <option>B-</option>
                      <option>AB+</option>
                      <option>AB-</option>
                      <option>O+</option>
                      <option>O-</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
                    <input
                      type="number"
                      placeholder="Enter height"
                      className="w-full py-2 px-3 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                    <input
                      type="number"
                      placeholder="Enter weight"
                      className="w-full py-2 px-3 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Allergies</label>
                    <input
                      type="text"
                      placeholder="Enter allergies (if any)"
                      className="w-full py-2 px-3 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Existing Medical Conditions
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Enter any existing medical conditions"
                    className="w-full py-2 px-3 border border-gray-300 rounded-md"
                  ></textarea>
                </div>
                
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Medications
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Enter any medications you are currently taking"
                    className="w-full py-2 px-3 border border-gray-300 rounded-md"
                  ></textarea>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md">
                  Save Changes
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'medical-history' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Medical History</h2>
                <Link
                  to="/detection"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm flex items-center"
                >
                  <span className="mr-1">+</span> New Detection
                </Link>
              </div>
              
              {medicalHistory.length > 0 ? (
                <div className="space-y-6">
                  {medicalHistory.map((record) => (
                    <div 
                      key={record.id} 
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/4 mb-4 md:mb-0">
                          <img 
                            src={record.imageUrl} 
                            alt={record.diagnosis} 
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        </div>
                        <div className="md:w-3/4 md:pl-6">
                          <div className="flex flex-wrap justify-between mb-2">
                            <h3 className="text-lg font-medium">{record.diagnosis}</h3>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-gray-500 mr-1" />
                              <span className="text-sm text-gray-500">
                                {new Date(record.date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center mb-3">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              record.detectionType === 'skin' 
                                ? 'bg-red-100 text-red-800' 
                                : record.detectionType === 'brain'
                                  ? 'bg-purple-100 text-purple-800'
                                  : 'bg-green-100 text-green-800'
                            }`}>
                              {record.detectionType.charAt(0).toUpperCase() + record.detectionType.slice(1)}
                            </span>
                            <span className="ml-3 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                              {Math.round(record.confidence * 100)}% confidence
                            </span>
                          </div>
                          
                          <div className="mt-2">
                            <h4 className="text-sm font-medium mb-1">Recommendations:</h4>
                            <ul className="text-sm text-gray-600 list-disc pl-5">
                              {record.recommendations.slice(0, 2).map((rec, i) => (
                                <li key={i}>{rec}</li>
                              ))}
                              {record.recommendations.length > 2 && (
                                <li className="text-blue-600 cursor-pointer">+ {record.recommendations.length - 2} more</li>
                              )}
                            </ul>
                          </div>
                          
                          {record.medications && record.medications.length > 0 && (
                            <div className="mt-3">
                              <h4 className="text-sm font-medium mb-1">Medications:</h4>
                              <div className="text-sm text-gray-600">
                                {record.medications[0].name} ({record.medications[0].dosage})
                                {record.medications.length > 1 && ` + ${record.medications.length - 1} more`}
                              </div>
                            </div>
                          )}
                          
                          <div className="mt-4">
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                              View Full Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No medical records found</h3>
                  <p className="text-gray-600 mb-6">
                    You don't have any medical records yet. Start by creating a new AI detection.
                  </p>
                  <Link
                    to="/detection"
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md"
                  >
                    Start AI Detection
                  </Link>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'appointments' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Upcoming Appointments</h2>
              
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No upcoming appointments</h3>
                <p className="text-gray-600 mb-6">
                  You don't have any scheduled appointments. Schedule an appointment with a doctor.
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md">
                  Schedule Appointment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPortal;