import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {isSubmitted ? (
            <div className="text-center py-12">
              <div className="bg-green-100 p-4 rounded-full inline-flex items-center justify-center mb-6">
                <svg className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
              <p className="text-gray-600 mb-6">
                Your message has been sent successfully. We will get back to you shortly.
              </p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8">
                Have questions about our AI healthcare detection platform? We're here to help. Fill out the form below and our team will respond promptly.
              </p>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email address"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="What is this regarding?"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Please provide details about your inquiry..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md flex items-center justify-center transition ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
        
        {/* Contact Information */}
        <div>
          <div className="bg-blue-600 text-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="mr-4 mt-1 h-6 w-6 flex-shrink-0" />
                <div>
                  <h3 className="font-medium mb-1">Address</h3>
                  <p>123 Healthcare Avenue, Vadodara, Gujarat, India - 390001</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="mr-4 mt-1 h-6 w-6 flex-shrink-0" />
                <div>
                  <h3 className="font-medium mb-1">Phone</h3>
                  <p>+91 265 123 4567</p>
                  <p className="text-sm text-blue-200 mt-1">Monday to Friday, 9am to 6pm</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="mr-4 mt-1 h-6 w-6 flex-shrink-0" />
                <div>
                  <h3 className="font-medium mb-1">Email</h3>
                  <p>contact@healthai.com</p>
                  <p className="text-sm text-blue-200 mt-1">We'll respond as soon as possible</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-lg mb-2">How accurate is the AI detection?</h3>
                <p className="text-gray-600">Our AI healthcare detection system achieves an accuracy rate of 85% across all three detection types (skin cancer, brain tumors, and dental issues).</p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">Is my medical data secure?</h3>
                <p className="text-gray-600">Yes, we implement industry-standard security measures to protect your sensitive medical information. All data is encrypted and stored securely.</p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">Can I get a second opinion from a doctor?</h3>
                <p className="text-gray-600">Absolutely! Our platform connects you with qualified healthcare professionals for follow-up consultations after AI detection.</p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">How do I schedule an appointment with a doctor?</h3>
                <p className="text-gray-600">After receiving your AI detection results, you can schedule an appointment with a recommended doctor directly through our platform.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;