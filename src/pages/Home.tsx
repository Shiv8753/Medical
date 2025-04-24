import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Shield, Brain, Smile } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-white to-blue-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            AI-Powered Healthcare Detection
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Advanced detection for skin cancer, brain tumors, and dental issues with 85% accuracy
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/detection"
              className="bg-white text-blue-700 hover:bg-blue-100 transition px-8 py-3 rounded-full font-semibold text-lg"
            >
              Try AI Detection
            </Link>
            <Link
              to="/login"
              className="bg-transparent hover:bg-blue-700 border-2 border-white transition px-8 py-3 rounded-full font-semibold text-lg"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our AI Detection Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Skin Cancer */}
            <div className="bg-white rounded-lg shadow-lg p-6 transition duration-300 hover:shadow-xl transform hover:-translate-y-1">
              <div className="bg-red-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Shield className="text-red-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Skin Cancer Detection</h3>
              <p className="text-gray-600 mb-4">
                Upload images of skin conditions for AI analysis with 85% accuracy. Get instant results and treatment recommendations.
              </p>
              <Link to="/detection/skin" className="text-blue-600 hover:text-blue-800 font-medium">
                Learn more →
              </Link>
            </div>

            {/* Brain Tumor */}
            <div className="bg-white rounded-lg shadow-lg p-6 transition duration-300 hover:shadow-xl transform hover:-translate-y-1">
              <div className="bg-purple-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Brain className="text-purple-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Brain Tumor Detection</h3>
              <p className="text-gray-600 mb-4">
                Upload MRI scans for AI-powered brain tumor detection. Receive analysis with treatment options and specialist recommendations.
              </p>
              <Link to="/detection/brain" className="text-blue-600 hover:text-blue-800 font-medium">
                Learn more →
              </Link>
            </div>

            {/* Dental */}
            <div className="bg-white rounded-lg shadow-lg p-6 transition duration-300 hover:shadow-xl transform hover:-translate-y-1">
              <div className="bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Smile className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Dental Issue Detection</h3>
              <p className="text-gray-600 mb-4">
                Upload dental images for AI analysis of common issues. Receive diagnosis, treatment plans, and nearby dentist recommendations.
              </p>
              <Link to="/detection/dental" className="text-blue-600 hover:text-blue-800 font-medium">
                Learn more →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 text-blue-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload Image</h3>
              <p className="text-gray-600">
                Upload relevant medical images through our secure platform
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 text-blue-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
              <p className="text-gray-600">
                Our AI engine analyzes the image with 85% accuracy
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 text-blue-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Results</h3>
              <p className="text-gray-600">
                Receive detailed analysis and potential diagnosis
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 text-blue-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="text-xl font-semibold mb-2">Treatment Plan</h3>
              <p className="text-gray-600">
                Get personalized treatment options and specialist recommendations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Try Our AI Detection?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Start your journey to better health with our cutting-edge AI detection technology.
          </p>
          <Link
            to="/detection"
            className="bg-white text-blue-700 hover:bg-blue-100 transition px-8 py-3 rounded-full font-semibold text-lg inline-block"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;