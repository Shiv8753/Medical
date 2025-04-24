import React, { useState } from 'react';
import { Camera, Upload, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

type DetectionType = 'skin' | 'brain' | 'dental';

interface DetectionOption {
  id: DetectionType;
  title: string;
  description: string;
  imageUrl: string;
}

const detectionOptions: DetectionOption[] = [
  {
    id: 'skin',
    title: 'Skin Cancer Detection',
    description: 'Upload images of skin conditions for AI analysis with 85% accuracy',
    imageUrl: 'https://images.pexels.com/photos/4046567/pexels-photo-4046567.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'brain',
    title: 'Brain Tumor Detection',
    description: 'Upload MRI scans for AI-powered brain tumor detection',
    imageUrl: 'https://images.pexels.com/photos/4226119/pexels-photo-4226119.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'dental',
    title: 'Dental Issue Detection',
    description: 'Upload dental images for AI analysis of common issues',
    imageUrl: 'https://images.pexels.com/photos/3881449/pexels-photo-3881449.jpeg?auto=compress&cs=tinysrgb&w=600',
  }
];

const Detection: React.FC = () => {
  const [selectedDetection, setSelectedDetection] = useState<DetectionType | null>(null);
  const [showWarning, setShowWarning] = useState(true);

  const handleSelectDetection = (type: DetectionType) => {
    setSelectedDetection(type);
    setShowWarning(true); // Reset warning when changing detection type
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">AI-Powered Medical Detection</h1>
      
      {showWarning && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <div className="flex items-start">
            <AlertCircle className="flex-shrink-0 text-yellow-400 mr-3 mt-0.5" size={20} />
            <div>
              <p className="text-sm text-yellow-700">
                <strong>Important:</strong> This AI detection system is not a replacement for professional medical advice. 
                Always consult with a healthcare professional for proper diagnosis and treatment.
              </p>
              <button 
                className="text-sm text-blue-600 hover:text-blue-800 mt-2 font-medium"
                onClick={() => setShowWarning(false)}
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
      
      {!selectedDetection ? (
        <>
          <p className="text-center text-lg mb-10 max-w-3xl mx-auto">
            Choose a detection type below to begin. Our AI system can analyze images with up to 85% accuracy and provide treatment recommendations.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {detectionOptions.map((option) => (
              <div 
                key={option.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
                onClick={() => handleSelectDetection(option.id)}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={option.imageUrl} 
                    alt={option.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
                  <p className="text-gray-600 mb-4">{option.description}</p>
                  <button className="text-blue-600 hover:text-blue-800 font-medium">
                    Start Detection →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <DetectionForm 
          type={selectedDetection} 
          onBack={() => setSelectedDetection(null)} 
        />
      )}
    </div>
  );
};

interface DetectionFormProps {
  type: DetectionType;
  onBack: () => void;
}

const DetectionForm: React.FC<DetectionFormProps> = ({ type, onBack }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  
  const detectionOption = detectionOptions.find(option => option.id === type);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleAnalyze = () => {
    if (!imagePreview) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      // Mock results based on detection type
      let mockResult;
      if (type === 'skin') {
        mockResult = {
          condition: 'Suspicious melanoma',
          confidence: 0.85,
          recommendations: [
            'Consult with a dermatologist immediately',
            'Further biopsy recommended to confirm diagnosis',
            'Avoid sun exposure to the affected area'
          ],
          medications: [
            { name: 'Topical corticosteroid cream', dosage: 'Apply thin layer twice daily', duration: '7 days' }
          ],
          nearbyDoctors: [
            { name: 'Dr. Patel', specialization: 'Dermatology', location: 'Vadodara', contact: '+91-9876543210' },
            { name: 'Dr. Sharma', specialization: 'Oncology', location: 'Vadodara', contact: '+91-9876543211' }
          ]
        };
      } else if (type === 'brain') {
        mockResult = {
          condition: 'Possible meningioma',
          confidence: 0.82,
          recommendations: [
            'Consult with a neurologist immediately',
            'Additional MRI with contrast recommended',
            'Consider neurosurgical consultation'
          ],
          medications: [
            { name: 'Dexamethasone', dosage: '4mg twice daily', duration: 'As directed by neurologist' }
          ],
          nearbyDoctors: [
            { name: 'Dr. Gupta', specialization: 'Neurology', location: 'Vadodara', contact: '+91-9876543212' },
            { name: 'Dr. Singh', specialization: 'Neurosurgery', location: 'Vadodara', contact: '+91-9876543213' }
          ]
        };
      } else {
        mockResult = {
          condition: 'Periodontal disease',
          confidence: 0.88,
          recommendations: [
            'Schedule dental appointment for professional cleaning',
            'Improve oral hygiene practices',
            'Regular flossing recommended'
          ],
          medications: [
            { name: 'Chlorhexidine mouthwash', dosage: 'Rinse twice daily for 30 seconds', duration: '14 days' }
          ],
          nearbyDoctors: [
            { name: 'Dr. Joshi', specialization: 'Dentistry', location: 'Vadodara', contact: '+91-9876543214' },
            { name: 'Dr. Kumar', specialization: 'Periodontist', location: 'Vadodara', contact: '+91-9876543215' }
          ]
        };
      }
      
      setResult(mockResult);
      setIsAnalyzing(false);
    }, 3000);
  };
  
  const resetForm = () => {
    setImagePreview(null);
    setResult(null);
  };
  
  return (
    <div>
      <button 
        onClick={onBack}
        className="mb-6 text-blue-600 hover:text-blue-800 font-medium flex items-center"
      >
        ← Back to Detection Options
      </button>
      
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6">{detectionOption?.title}</h2>
        
        {!result ? (
          <>
            <p className="text-gray-600 mb-8">
              Upload a clear image for {type} analysis. Our AI system will analyze the image with up to 85% accuracy and provide treatment recommendations.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                {!imagePreview ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-500 mb-4">Upload a clear, well-lit image</p>
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md inline-block transition"
                    >
                      Select Image
                    </label>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="mb-4 relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-h-64 mx-auto rounded-lg"
                      />
                    </div>
                    <button
                      onClick={resetForm}
                      className="text-red-600 hover:text-red-800 mb-4 inline-block"
                    >
                      Remove Image
                    </button>
                    <p className="text-gray-600 mb-4">Image ready for analysis</p>
                    <button
                      onClick={handleAnalyze}
                      disabled={isAnalyzing}
                      className={`bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md inline-block transition ${
                        isAnalyzing ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isAnalyzing ? 'Analyzing...' : 'Start Analysis'}
                    </button>
                  </div>
                )}
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Guidelines for Good Images</h3>
                <ul className="space-y-3 text-gray-700">
                  {type === 'skin' && (
                    <>
                      <li className="flex items-start">
                        <span className="bg-blue-200 rounded-full h-5 w-5 flex items-center justify-center text-blue-700 font-medium mr-2 mt-0.5">✓</span>
                        <span>Well-lit, clear image of the skin condition</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-blue-200 rounded-full h-5 w-5 flex items-center justify-center text-blue-700 font-medium mr-2 mt-0.5">✓</span>
                        <span>Include a ruler or coin for size reference if possible</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-blue-200 rounded-full h-5 w-5 flex items-center justify-center text-blue-700 font-medium mr-2 mt-0.5">✓</span>
                        <span>Multiple angles if the condition has irregular shapes</span>
                      </li>
                    </>
                  )}
                  
                  {type === 'brain' && (
                    <>
                      <li className="flex items-start">
                        <span className="bg-blue-200 rounded-full h-5 w-5 flex items-center justify-center text-blue-700 font-medium mr-2 mt-0.5">✓</span>
                        <span>Clear MRI or CT scan images</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-blue-200 rounded-full h-5 w-5 flex items-center justify-center text-blue-700 font-medium mr-2 mt-0.5">✓</span>
                        <span>Multiple views if available (axial, sagittal, coronal)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-blue-200 rounded-full h-5 w-5 flex items-center justify-center text-blue-700 font-medium mr-2 mt-0.5">✓</span>
                        <span>Digital DICOM format preferred, but clear photographs of scans can work</span>
                      </li>
                    </>
                  )}
                  
                  {type === 'dental' && (
                    <>
                      <li className="flex items-start">
                        <span className="bg-blue-200 rounded-full h-5 w-5 flex items-center justify-center text-blue-700 font-medium mr-2 mt-0.5">✓</span>
                        <span>Clear, well-lit images of the affected teeth or gums</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-blue-200 rounded-full h-5 w-5 flex items-center justify-center text-blue-700 font-medium mr-2 mt-0.5">✓</span>
                        <span>Multiple angles showing the problem area</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-blue-200 rounded-full h-5 w-5 flex items-center justify-center text-blue-700 font-medium mr-2 mt-0.5">✓</span>
                        <span>Dental X-rays if available</span>
                      </li>
                    </>
                  )}
                  
                  <li className="flex items-start text-gray-500 text-sm mt-4">
                    <span className="bg-yellow-100 rounded-full h-5 w-5 flex items-center justify-center text-yellow-700 font-medium mr-2 mt-0.5">!</span>
                    <span>This AI detection is not a replacement for professional medical diagnosis</span>
                  </li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4">Analysis Results</h3>
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <img
                      src={imagePreview!}
                      alt="Analyzed image"
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <div className="text-gray-500 text-sm mb-1">Detected condition:</div>
                    <div className="text-xl font-semibold">{result.condition}</div>
                    <div className="flex items-center mt-2">
                      <div className="text-gray-500 text-sm mr-2">Confidence:</div>
                      <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                        {Math.round(result.confidence * 100)}%
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium text-gray-700 mb-2">Recommendations:</h4>
                  <ul className="space-y-2 text-gray-600">
                    {result.recommendations.map((rec: string, i: number) => (
                      <li key={i} className="flex items-start">
                        <span className="bg-green-100 rounded-full h-5 w-5 flex items-center justify-center text-green-700 font-medium mr-2 mt-0.5">
                          {i + 1}
                        </span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {result.medications && result.medications.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-medium text-gray-700 mb-2">Medication Suggestions:</h4>
                    <div className="space-y-4">
                      {result.medications.map((med: any, i: number) => (
                        <div key={i} className="bg-gray-50 p-3 rounded">
                          <div className="font-medium">{med.name}</div>
                          <div className="text-sm text-gray-600">Dosage: {med.dosage}</div>
                          {med.duration && (
                            <div className="text-sm text-gray-600">Duration: {med.duration}</div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="text-sm text-yellow-600 mt-2">
                      * Always consult with a healthcare professional before taking any medication
                    </div>
                  </div>
                )}
                
                <div className="mt-6 flex space-x-4">
                  <button
                    onClick={resetForm}
                    className="text-blue-600 border border-blue-600 hover:bg-blue-50 font-medium py-2 px-4 rounded"
                  >
                    New Analysis
                  </button>
                  <Link
                    to="/user-portal"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
                  >
                    Save to My Profile
                  </Link>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold mb-4">Nearby Specialists in Vadodara</h3>
                {result.nearbyDoctors && result.nearbyDoctors.length > 0 ? (
                  <div className="space-y-4">
                    {result.nearbyDoctors.map((doctor: any, i: number) => (
                      <div key={i} className="bg-white p-4 rounded shadow-sm">
                        <div className="font-medium">{doctor.name}</div>
                        <div className="text-sm text-gray-600">{doctor.specialization}</div>
                        <div className="text-sm text-gray-600">{doctor.location}</div>
                        <div className="text-sm text-blue-600 mt-1">{doctor.contact}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No specialists found in your area.</p>
                )}
                <div className="mt-4 text-sm text-center">
                  <a href="#" className="text-blue-600 hover:text-blue-800">
                    View more doctors →
                  </a>
                </div>
              </div>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex">
                  <AlertCircle className="flex-shrink-0 text-yellow-400 mr-3" size={20} />
                  <div>
                    <p className="text-sm text-yellow-700">
                      <strong>Important:</strong> This is an AI-assisted analysis with {Math.round(result.confidence * 100)}% confidence. 
                      Please consult with a healthcare professional for proper diagnosis and treatment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Detection;