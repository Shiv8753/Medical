import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-semibold mb-4">HealthAI</h3>
            <p className="text-gray-300 mb-4">
              Leading AI-powered healthcare detection platform for skin cancer, brain tumors, 
              and dental issues with 85% accuracy.
            </p>
            <div className="flex space-x-4">
              {/* Social media icons would go here */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link to="/" className="hover:text-blue-400 transition duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/detection" className="hover:text-blue-400 transition duration-300">
                  AI Detection
                </Link>
              </li>
              <li>
                <Link to="/user-portal" className="hover:text-blue-400 transition duration-300">
                  User Portal
                </Link>
              </li>
              <li>
                <Link to="/doctor-portal" className="hover:text-blue-400 transition duration-300">
                  Doctor Portal
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-blue-400 transition duration-300">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-400 transition duration-300">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <MapPin className="mr-2 mt-1 flex-shrink-0" size={18} />
                <span>123 Healthcare Avenue, Vadodara, Gujarat, India - 390001</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 flex-shrink-0" size={18} />
                <span>+91 265 123 4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 flex-shrink-0" size={18} />
                <span>contact@healthai.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} HealthAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;