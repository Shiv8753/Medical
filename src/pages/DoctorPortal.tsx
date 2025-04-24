import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, FileText, Calendar, Search, ChevronRight, Filter } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Mock patient data
const MOCK_PATIENTS = [
  {
    id: 'patient-1',
    name: 'Rahul Patel',
    age: 32,
    gender: 'Male',
    lastVisit: '2025-03-15',
    condition: 'Suspicious melanoma',
    status: 'Follow-up required',
    imageUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'patient-2',
    name: 'Priya Sharma',
    age: 28,
    gender: 'Female',
    lastVisit: '2025-03-10',
    condition: 'Eczema',
    status: 'Stable',
    imageUrl: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'patient-3',
    name: 'Sanjay Singh',
    age: 45,
    gender: 'Male',
    lastVisit: '2025-03-05',
    condition: 'Basal cell carcinoma',
    status: 'Under treatment',
    imageUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'patient-4',
    name: 'Meera Kapoor',
    age: 36,
    gender: 'Female',
    lastVisit: '2025-02-28',
    condition: 'Psoriasis',
    status: 'Improving',
    imageUrl: 'https://images.pexels.com/photos/38554/girl-people-landscape-sun-38554.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'patient-5',
    name: 'Arjun Reddy',
    age: 52,
    gender: 'Male',
    lastVisit: '2025-02-20',
    condition: 'Melanoma',
    status: 'Critical',
    imageUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
];

// Mock appointments
const MOCK_APPOINTMENTS = [
  {
    id: 'appt-1',
    patientName: 'Rahul Patel',
    patientId: 'patient-1',
    date: '2025-04-10',
    time: '10:00 AM',
    reason: 'Follow-up on melanoma treatment',
    status: 'confirmed'
  },
  {
    id: 'appt-2',
    patientName: 'Meera Kapoor',
    patientId: 'patient-4',
    date: '2025-04-10',
    time: '11:30 AM',
    reason: 'Review psoriasis medication',
    status: 'confirmed'
  },
  {
    id: 'appt-3',
    patientName: 'Arjun Reddy',
    patientId: 'patient-5',
    date: '2025-04-11',
    time: '9:15 AM',
    reason: 'Urgent: Melanoma treatment discussion',
    status: 'confirmed'
  },
  {
    id: 'appt-4',
    patientName: 'Sanjay Singh',
    patientId: 'patient-3',
    date: '2025-04-12',
    time: '2:00 PM',
    reason: 'Check progress of treatment',
    status: 'pending'
  }
];

const DoctorPortal: React.FC = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [patients, setPatients] = useState(MOCK_PATIENTS);
  const [appointments, setAppointments] = useState(MOCK_APPOINTMENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<any | null>(null);
  
  useEffect(() => {
    // Redirect if not authenticated or not a doctor
    if (!isAuthenticated || currentUser?.role !== 'doctor') {
      navigate('/login');
    }
  }, [isAuthenticated, currentUser, navigate]);
  
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const todayAppointments = appointments.filter(appt => 
    new Date(appt.date).toDateString() === new Date().toDateString()
  );
  
  const upcomingAppointments = appointments.filter(appt => 
    new Date(appt.date) > new Date() && 
    new Date(appt.date).toDateString() !== new Date().toDateString()
  );
  
  if (!currentUser || currentUser.role !== 'doctor') {
    return null;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Doctor Portal</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 rounded-full p-3">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold">{currentUser.name}</h2>
                <p className="text-gray-600">{currentUser.specialization}</p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full text-left py-2 px-3 rounded mb-2 flex items-center ${
                  activeTab === 'dashboard' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
                }`}
              >
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('patients')}
                className={`w-full text-left py-2 px-3 rounded mb-2 flex items-center ${
                  activeTab === 'patients' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
                }`}
              >
                <User className="h-5 w-5 mr-2" />
                Patients
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
              <button
                onClick={() => setActiveTab('records')}
                className={`w-full text-left py-2 px-3 rounded mb-2 flex items-center ${
                  activeTab === 'records' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
                }`}
              >
                <FileText className="h-5 w-5 mr-2" />
                Medical Records
              </button>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-medium mb-4">Quick Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-700">{patients.length}</div>
                <div className="text-sm text-gray-600">Total Patients</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-700">{todayAppointments.length}</div>
                <div className="text-sm text-gray-600">Today's Appointments</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-700">{upcomingAppointments.length}</div>
                <div className="text-sm text-gray-600">Upcoming</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-yellow-700">24</div>
                <div className="text-sm text-gray-600">This Week</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="lg:w-3/4">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Today's Appointments */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Today's Appointments</h2>
                  <span className="text-sm text-gray-500">
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
                
                {todayAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {todayAppointments.map((appt) => (
                      <div key={appt.id} className="flex items-center border-b border-gray-100 pb-4">
                        <div className="bg-blue-100 rounded-full p-3 mr-4">
                          <User className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{appt.patientName}</h3>
                            <span className="text-gray-500 text-sm">{appt.time}</span>
                          </div>
                          <p className="text-sm text-gray-600">{appt.reason}</p>
                        </div>
                        <button className="ml-4 text-blue-600 hover:text-blue-800">
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No appointments today</h3>
                    <p className="text-gray-600">
                      You have no appointments scheduled for today.
                    </p>
                  </div>
                )}
              </div>
              
              {/* Recent Patients */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Recent Patients</h2>
                  <button 
                    onClick={() => setActiveTab('patients')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View All
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Patient
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Condition
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Visit
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {patients.slice(0, 3).map((patient) => (
                        <tr key={patient.id} className="hover:bg-gray-50 cursor-pointer">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img className="h-10 w-10 rounded-full object-cover" src={patient.imageUrl} alt="" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                                <div className="text-sm text-gray-500">{patient.age}, {patient.gender}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{patient.condition}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              patient.status.toLowerCase().includes('critical') 
                                ? 'bg-red-100 text-red-800' 
                                : patient.status.toLowerCase().includes('follow-up')
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : patient.status.toLowerCase().includes('stable') || patient.status.toLowerCase().includes('improving')
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-blue-100 text-blue-800'
                            }`}>
                              {patient.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(patient.lastVisit).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* AI Detection Insights */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6">AI Detection Insights</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-700 mb-1">85%</div>
                    <div className="text-sm text-gray-600">Average Detection Accuracy</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-700 mb-1">42</div>
                    <div className="text-sm text-gray-600">AI Detections This Month</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-700 mb-1">18</div>
                    <div className="text-sm text-gray-600">Referred to Specialists</div>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="font-medium mb-4">Detection Distribution</h3>
                  <div className="bg-gray-200 rounded-full h-4 w-full mb-4">
                    <div className="flex rounded-full h-4">
                      <div className="bg-red-500 rounded-l-full h-4" style={{ width: '40%' }}></div>
                      <div className="bg-purple-500 h-4" style={{ width: '25%' }}></div>
                      <div className="bg-green-500 rounded-r-full h-4" style={{ width: '35%' }}></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                      <span>Skin (40%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                      <span>Brain (25%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <span>Dental (35%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'patients' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h2 className="text-xl font-semibold">Patient List</h2>
                <div className="flex w-full md:w-auto gap-2">
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search patients..."
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50">
                    <Filter className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
              </div>
              
              {selectedPatient ? (
                <div>
                  <button 
                    onClick={() => setSelectedPatient(null)}
                    className="mb-6 text-blue-600 hover:text-blue-800 font-medium flex items-center"
                  >
                    ← Back to Patient List
                  </button>
                  
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3">
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <div className="flex flex-col items-center mb-6">
                          <img 
                            src={selectedPatient.imageUrl} 
                            alt={selectedPatient.name}
                            className="w-32 h-32 rounded-full object-cover mb-4" 
                          />
                          <h3 className="text-xl font-semibold">{selectedPatient.name}</h3>
                          <p className="text-gray-600">{selectedPatient.age}, {selectedPatient.gender}</p>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <div className="text-sm text-gray-500">Patient ID</div>
                            <div>PT-{selectedPatient.id.slice(-6).toUpperCase()}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Contact</div>
                            <div>+91 98765 43210</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Email</div>
                            <div>{selectedPatient.name.toLowerCase().replace(' ', '.')}@example.com</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Last Visit</div>
                            <div>{new Date(selectedPatient.lastVisit).toLocaleDateString()}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 bg-gray-50 p-6 rounded-lg">
                        <h4 className="font-medium mb-4">Medical Information</h4>
                        <div className="space-y-3">
                          <div>
                            <div className="text-sm text-gray-500">Blood Group</div>
                            <div>B+</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Height</div>
                            <div>175 cm</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Weight</div>
                            <div>68 kg</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Allergies</div>
                            <div>Penicillin, Peanuts</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:w-2/3">
                      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                        <h4 className="font-medium mb-4">Current Condition</h4>
                        <div className="flex items-center mb-4">
                          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                            selectedPatient.status.toLowerCase().includes('critical') 
                              ? 'bg-red-100 text-red-800' 
                              : selectedPatient.status.toLowerCase().includes('follow-up')
                                ? 'bg-yellow-100 text-yellow-800'
                                : selectedPatient.status.toLowerCase().includes('stable') || selectedPatient.status.toLowerCase().includes('improving')
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-blue-100 text-blue-800'
                          }`}>
                            {selectedPatient.condition}
                          </div>
                          <span className="mx-2">•</span>
                          <span className="text-gray-600">{selectedPatient.status}</span>
                        </div>
                        <p className="text-gray-700">
                          Patient presented with symptoms consistent with {selectedPatient.condition.toLowerCase()}. 
                          Initial AI detection showed 85% confidence. Clinical examination confirmed the diagnosis.
                          {selectedPatient.status.toLowerCase().includes('critical') && 
                            " Patient requires immediate attention and referral to specialist."}
                        </p>
                      </div>
                      
                      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-medium">Treatment Plan</h4>
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            Edit Plan
                          </button>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Medications</h5>
                            <ul className="mt-2 space-y-2">
                              <li className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                <div>
                                  <div className="font-medium">Topical Corticosteroid</div>
                                  <div className="text-sm text-gray-600">Apply twice daily</div>
                                </div>
                                <span className="text-sm text-gray-500">14 days</span>
                              </li>
                              <li className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                <div>
                                  <div className="font-medium">Antihistamine</div>
                                  <div className="text-sm text-gray-600">10mg daily</div>
                                </div>
                                <span className="text-sm text-gray-500">7 days</span>
                              </li>
                            </ul>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Procedures</h5>
                            <ul className="mt-2 space-y-2">
                              <li className="p-3 bg-gray-50 rounded">
                                <div className="font-medium">Biopsy</div>
                                <div className="text-sm text-gray-600">Scheduled for next week</div>
                              </li>
                            </ul>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-gray-700">Follow-up</h5>
                            <p className="mt-2 p-3 bg-gray-50 rounded">
                              Follow-up appointment in 2 weeks to assess response to treatment. 
                              Referral to specialist if no improvement.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-medium">Medical History</h4>
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            View All
                          </button>
                        </div>
                        <div className="space-y-4">
                          <div className="border-l-4 border-blue-500 pl-4 py-1">
                            <div className="text-sm text-gray-500 mb-1">
                              {new Date(selectedPatient.lastVisit).toLocaleDateString()}
                            </div>
                            <div className="font-medium">Initial diagnosis of {selectedPatient.condition}</div>
                            <div className="text-sm text-gray-700">
                              AI detection with 85% confidence, confirmed by clinical examination
                            </div>
                          </div>
                          <div className="border-l-4 border-gray-300 pl-4 py-1">
                            <div className="text-sm text-gray-500 mb-1">
                              {new Date(new Date(selectedPatient.lastVisit).setDate(new Date(selectedPatient.lastVisit).getDate() - 14)).toLocaleDateString()}
                            </div>
                            <div className="font-medium">Regular check-up</div>
                            <div className="text-sm text-gray-700">
                              No significant findings
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Patient
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Condition
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Visit
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredPatients.map((patient) => (
                        <tr 
                          key={patient.id} 
                          className="hover:bg-gray-50 cursor-pointer"
                          onClick={() => setSelectedPatient(patient)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img className="h-10 w-10 rounded-full object-cover" src={patient.imageUrl} alt="" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                                <div className="text-sm text-gray-500">{patient.age}, {patient.gender}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{patient.condition}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              patient.status.toLowerCase().includes('critical') 
                                ? 'bg-red-100 text-red-800' 
                                : patient.status.toLowerCase().includes('follow-up')
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : patient.status.toLowerCase().includes('stable') || patient.status.toLowerCase().includes('improving')
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-blue-100 text-blue-800'
                            }`}>
                              {patient.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(patient.lastVisit).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'appointments' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Appointments</h2>
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm">
                  + Add Appointment
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Today's Appointments */}
                {todayAppointments.length > 0 && (
                  <div>
                    <h3 className="font-medium text-gray-700 mb-4">Today</h3>
                    <div className="space-y-4">
                      {todayAppointments.map((appt) => (
                        <div key={appt.id} className="flex items-center border rounded-lg p-4 hover:bg-gray-50">
                          <div className="bg-blue-100 rounded-full p-3 mr-4">
                            <User className="h-6 w-6 text-blue-600" />
                          </div>
                          <div className="flex-grow">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                              <h4 className="font-medium">{appt.patientName}</h4>
                              <div className="flex items-center space-x-2">
                                <span className="text-gray-500 text-sm">{appt.time}</span>
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  appt.status === 'confirmed' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                                </span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{appt.reason}</p>
                          </div>
                          <div className="flex space-x-2 ml-4">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </button>
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Upcoming Appointments */}
                {upcomingAppointments.length > 0 && (
                  <div>
                    <h3 className="font-medium text-gray-700 mb-4">Upcoming</h3>
                    <div className="space-y-4">
                      {upcomingAppointments.map((appt) => (
                        <div key={appt.id} className="flex items-center border rounded-lg p-4 hover:bg-gray-50">
                          <div className="bg-purple-100 rounded-full p-3 mr-4">
                            <User className="h-6 w-6 text-purple-600" />
                          </div>
                          <div className="flex-grow">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                              <h4 className="font-medium">{appt.patientName}</h4>
                              <div className="flex items-center space-x-2">
                                <span className="text-gray-500 text-sm">
                                  {new Date(appt.date).toLocaleDateString()} at {appt.time}
                                </span>
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  appt.status === 'confirmed' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                                </span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{appt.reason}</p>
                          </div>
                          <div className="flex space-x-2 ml-4">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </button>
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {todayAppointments.length === 0 && upcomingAppointments.length === 0 && (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No appointments</h3>
                    <p className="text-gray-600 mb-6">
                      You have no appointments scheduled.
                    </p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md">
                      Add New Appointment
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {activeTab === 'records' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Medical Records</h2>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search records..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-red-100 p-3 rounded-md mr-4">
                        <FileText className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Skin Cancer Detection Report</h3>
                        <p className="text-sm text-gray-600">Rahul Patel</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">15 Mar 2025</div>
                      <div className="text-blue-600 text-sm font-medium cursor-pointer">View</div>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-green-100 p-3 rounded-md mr-4">
                        <FileText className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Dental Detection Report</h3>
                        <p className="text-sm text-gray-600">Priya Sharma</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">10 Mar 2025</div>
                      <div className="text-blue-600 text-sm font-medium cursor-pointer">View</div>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-purple-100 p-3 rounded-md mr-4">
                        <FileText className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Brain Tumor Detection Report</h3>
                        <p className="text-sm text-gray-600">Arjun Reddy</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">05 Mar 2025</div>
                      <div className="text-blue-600 text-sm font-medium cursor-pointer">View</div>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-yellow-100 p-3 rounded-md mr-4">
                        <FileText className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Follow-up Report</h3>
                        <p className="text-sm text-gray-600">Meera Kapoor</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">28 Feb 2025</div>
                      <div className="text-blue-600 text-sm font-medium cursor-pointer">View</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorPortal;