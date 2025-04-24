import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, User, Home } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <span className="text-2xl font-bold">HealthAI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`hover:text-blue-100 transition ${isActive('/') ? 'font-semibold border-b-2 border-white pb-1' : ''}`}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link 
              to="/detection" 
              className={`hover:text-blue-100 transition ${isActive('/detection') ? 'font-semibold border-b-2 border-white pb-1' : ''}`}
              onClick={closeMenu}
            >
              AI Detection
            </Link>
            {currentUser?.role === 'doctor' && (
              <Link 
                to="/doctor-portal" 
                className={`hover:text-blue-100 transition ${isActive('/doctor-portal') ? 'font-semibold border-b-2 border-white pb-1' : ''}`}
                onClick={closeMenu}
              >
                Doctor Portal
              </Link>
            )}
            {currentUser?.role === 'admin' && (
              <Link 
                to="/admin-dashboard" 
                className={`hover:text-blue-100 transition ${isActive('/admin-dashboard') ? 'font-semibold border-b-2 border-white pb-1' : ''}`}
                onClick={closeMenu}
              >
                Admin Dashboard
              </Link>
            )}
            <Link 
              to="/user-portal" 
              className={`hover:text-blue-100 transition ${isActive('/user-portal') ? 'font-semibold border-b-2 border-white pb-1' : ''}`}
              onClick={closeMenu}
            >
              {currentUser ? 'My Profile' : 'User Portal'}
            </Link>
            <Link 
              to="/contact" 
              className={`hover:text-blue-100 transition ${isActive('/contact') ? 'font-semibold border-b-2 border-white pb-1' : ''}`}
              onClick={closeMenu}
            >
              Contact
            </Link>
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <span className="text-white">
                  <User className="inline-block mr-1" size={16} /> {currentUser.name}
                </span>
                <button 
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 rounded bg-red-700 hover:bg-red-800 transition"
                >
                  <LogOut className="mr-1" size={16} /> Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="px-4 py-2 rounded bg-white text-blue-700 hover:bg-blue-50 transition"
                onClick={closeMenu}
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-700 py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-3">
            <Link 
              to="/" 
              className={`text-white py-2 px-4 rounded hover:bg-blue-600 ${isActive('/') ? 'bg-blue-600 font-medium' : ''}`}
              onClick={closeMenu}
            >
              <Home className="inline-block mr-2" size={16} /> Home
            </Link>
            <Link 
              to="/detection" 
              className={`text-white py-2 px-4 rounded hover:bg-blue-600 ${isActive('/detection') ? 'bg-blue-600 font-medium' : ''}`}
              onClick={closeMenu}
            >
              AI Detection
            </Link>
            {currentUser?.role === 'doctor' && (
              <Link 
                to="/doctor-portal" 
                className={`text-white py-2 px-4 rounded hover:bg-blue-600 ${isActive('/doctor-portal') ? 'bg-blue-600 font-medium' : ''}`}
                onClick={closeMenu}
              >
                Doctor Portal
              </Link>
            )}
            {currentUser?.role === 'admin' && (
              <Link 
                to="/admin-dashboard" 
                className={`text-white py-2 px-4 rounded hover:bg-blue-600 ${isActive('/admin-dashboard') ? 'bg-blue-600 font-medium' : ''}`}
                onClick={closeMenu}
              >
                Admin Dashboard
              </Link>
            )}
            <Link 
              to="/user-portal" 
              className={`text-white py-2 px-4 rounded hover:bg-blue-600 ${isActive('/user-portal') ? 'bg-blue-600 font-medium' : ''}`}
              onClick={closeMenu}
            >
              {currentUser ? 'My Profile' : 'User Portal'}
            </Link>
            <Link 
              to="/contact" 
              className={`text-white py-2 px-4 rounded hover:bg-blue-600 ${isActive('/contact') ? 'bg-blue-600 font-medium' : ''}`}
              onClick={closeMenu}
            >
              Contact
            </Link>
            
            {currentUser ? (
              <button 
                onClick={handleLogout}
                className="text-white py-2 px-4 rounded bg-red-700 hover:bg-red-800 transition text-left"
              >
                <LogOut className="inline-block mr-2" size={16} /> Logout
              </button>
            ) : (
              <Link 
                to="/login" 
                className="py-2 px-4 rounded bg-white text-blue-700 hover:bg-blue-50 transition"
                onClick={closeMenu}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;