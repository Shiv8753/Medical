// Type definitions for the application

export type UserRole = 'admin' | 'doctor' | 'patient';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  specialization?: string; // For doctors
  location?: string;
  contact?: string;
}

export interface DetectionResult {
  id: string;
  userId: string;
  detectionType: 'skin' | 'brain' | 'dental';
  imageUrl: string;
  confidence: number;
  diagnosis: string;
  date: string;
  recommendations: string[];
  medications?: Medication[];
  nearbyDoctors?: User[];
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes?: string;
}

export interface MedicalRecord {
  id: string;
  userId: string;
  records: DetectionResult[];
  allergies: string[];
  previousConditions: string[];
  currentMedications: Medication[];
}