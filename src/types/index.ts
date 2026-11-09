export type PetSpecies = 'dog' | 'cat' | 'rabbit' | 'bird' | 'small-pet' | 'other';
export type PetGender = 'male' | 'female';
export type PetSize = 'small' | 'medium' | 'large' | 'extra-large';
export type PetAgeGroup = 'puppy-kitten' | 'young' | 'adult' | 'senior';
export type AdoptionStatus = 'available' | 'foster' | 'urgent' | 'pending' | 'adopted';

export interface MedicalTimelineItem {
  id: string;
  date: string;
  title: string;
  category: 'vaccination' | 'surgery' | 'checkup' | 'treatment' | 'dental';
  veterinarian: string;
  notes: string;
  status: 'completed' | 'scheduled' | 'overdue';
}

export interface Pet {
  id: string;
  name: string;
  species: PetSpecies;
  breed: string;
  age: string; // e.g. "2 years 3 mos"
  ageGroup: PetAgeGroup;
  gender: PetGender;
  size: PetSize;
  weight: string;
  status: AdoptionStatus;
  kennelId: string;
  intakeDate: string;
  intakeReason: 'stray' | 'owner-surrender' | 'rescue-transfer' | 'emergency-seizure';
  microchipId: string;
  isSpayedNeutered: boolean;
  isVaccinated: boolean;
  isHouseTrained: boolean;
  goodWithKids: boolean;
  goodWithDogs: boolean;
  goodWithCats: boolean;
  energyLevel: 'low' | 'moderate' | 'high' | 'very-high';
  primaryImage: string;
  galleryImages: string[];
  story: string;
  personality: string[];
  medicalSummary: string;
  medicalTimeline: MedicalTimelineItem[];
  adoptionFee: number;
  urgentReason?: string;
}

export interface KennelRoom {
  id: string;
  code: string;
  wing: 'Wing A - Canine Haven' | 'Wing B - Feline Sanctuary' | 'Wing C - Medical & Triage';
  type: 'dog-run' | 'cat-condo' | 'quarantine-suite';
  status: 'occupied' | 'vacant' | 'cleaning' | 'isolation';
  currentPetId?: string;
  currentPetName?: string;
  currentPetSpecies?: PetSpecies;
  cleaningStatus: 'clean' | 'needs-attention' | 'in-progress';
  lastCleaned: string;
}

export interface AdoptionApplication {
  id: string;
  petId: string;
  petName: string;
  applicantName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  homeType: 'own-house' | 'rent-house' | 'rent-apartment' | 'condo';
  hasFencedYard: boolean;
  landlordApproval: boolean;
  householdMembers: number;
  childrenAges: string;
  currentPetsDescription: string;
  hoursAlonePerDay: number;
  veterinarianContact: string;
  experienceDescription: string;
  submittedAt: string;
  status: 'pending-review' | 'interview-scheduled' | 'approved' | 'completed';
}

export interface VolunteerApplication {
  fullName: string;
  email: string;
  phone: string;
  interests: string[];
  availability: string[];
  experience: string;
  emergencyContact: string;
}

export interface DonationRecord {
  amount: number;
  frequency: 'once' | 'monthly';
  fundDesignation: 'emergency-medical' | 'food-shelter' | 'general' | 'kennel-sponsor';
  donorName: string;
  donorEmail: string;
  isAnonymous: boolean;
  date: string;
}
