import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

// Sample user data
const SAMPLE_USERS = {
  admin: {
    id: 'admin-1',
    name: 'Admin User',
    email: 'admin@healthcare.com',
    role: 'admin' as UserRole,
    password: 'admin123'
  },
  doctor: {
    id: 'doctor-1',
    name: 'Dr. Sharma',
    email: 'doctor@healthcare.com',
    role: 'doctor' as UserRole,
    specialization: 'Dermatology',
    location: 'Vadodara, Gujarat',
    contact: '+91-9876543210',
    password: 'doctor123'
  },
  patient: {
    id: 'patient-1',
    name: 'Rahul Patel',
    email: 'patient@healthcare.com',
    role: 'patient' as UserRole,
    password: 'patient123'
  }
};

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
  loading: true
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on component mount
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    // In a real app, this would be an API call
    setLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let user = null;
    
    // Simple authentication logic - in a real app this would be an API call
    if (role === 'admin' && email === SAMPLE_USERS.admin.email && password === SAMPLE_USERS.admin.password) {
      user = SAMPLE_USERS.admin;
    } else if (role === 'doctor' && email === SAMPLE_USERS.doctor.email && password === SAMPLE_USERS.doctor.password) {
      user = SAMPLE_USERS.doctor;
    } else if (role === 'patient' && email === SAMPLE_USERS.patient.email && password === SAMPLE_USERS.patient.password) {
      user = SAMPLE_USERS.patient;
    }
    
    if (user) {
      // Remove password before storing
      const { password, ...secureUser } = user;
      setCurrentUser(secureUser as User);
      localStorage.setItem('currentUser', JSON.stringify(secureUser));
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated: !!currentUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};