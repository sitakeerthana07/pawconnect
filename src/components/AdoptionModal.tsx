import React, { useState } from 'react';
import { Pet, AdoptionApplication } from '../types';
import { X, CheckCircle, ShieldCheck, Heart, User, Home, Activity, FileText, ArrowRight, ArrowLeft } from 'lucide-react';

interface AdoptionModalProps {
  pet: Pet | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (application: AdoptionApplication) => void;
}

export const AdoptionModal: React.FC<AdoptionModalProps> = ({
  pet,
  isOpen,
  onClose,
  onSubmitSuccess,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [formData, setFormData] = useState({
    applicantName: '',
    email: '',
    phone: '',
    city: '',
    state: 'OR',
    homeType: 'own-house' as 'own-house' | 'rent-house' | 'rent-apartment' | 'condo',
    hasFencedYard: true,
    landlordApproval: true,
    householdMembers: 2,
    childrenAges: 'None',
    currentPetsDescription: '1 senior cat, up to date on vaccines',
    hoursAlonePerDay: 4,
    veterinarianContact: 'Riverbend Animal Hospital - Dr. Sarah Jenkins (555-0144)',
    experienceDescription: 'Lifelong pet guardian with dogs and cats. Committed to positive reinforcement training and lifelong medical care.',
  });

  const [submittedApp, setSubmittedApp] = useState<AdoptionApplication | null>(null);
  const [showSqlPayload, setShowSqlPayload] = useState(false);

  if (!isOpen || !pet) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep((step + 1) as 2 | 3);
    } else if (step === 3) {
      // Complete submission
      const newApp: AdoptionApplication = {
        id: `APP-${Math.floor(100000 + Math.random() * 900000)}`,
        petId: pet.id,
        petName: pet.name,
        applicantName: formData.applicantName || 'Alex Taylor',
        email: formData.email || 'alex.taylor@example.com',
        phone: formData.phone || '(555) 392-1084',
        city: formData.city || 'Riverbend',
        state: formData.state,
        homeType: formData.homeType,
        hasFencedYard: formData.hasFencedYard,
        landlordApproval: formData.landlordApproval,
        householdMembers: Number(formData.householdMembers),
        childrenAges: formData.childrenAges,
        currentPetsDescription: formData.currentPetsDescription,
        hoursAlonePerDay: Number(formData.hoursAlonePerDay),
        veterinarianContact: formData.veterinarianContact,
        experienceDescription: formData.experienceDescription,
        submittedAt: new Date().toISOString(),
        status: 'pending-review',
      };
      setSubmittedApp(newApp);
      onSubmitSuccess(newApp);
      setStep(4);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((step - 1) as 1 | 2 | 3);
    }
  };

  const handleModalClose = () => {
    setStep(1);
    setSubmittedApp(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1B4332]/50 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl border border-[#E5DFD7] shadow-warm-lg overflow-hidden my-8">
        {/* Header */}
        <div className="bg-[#1B4332] text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden border border-white/20">
              <img
                src={pet.primaryImage}
                alt={pet.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-xs font-semibold text-[#D8F3DC] uppercase tracking-wider block">
                Official Adoption Application
              </span>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Adopting {pet.name}
                <span className="text-xs bg-[#74C69D]/30 text-white px-2 py-0.5 rounded-full font-normal">
                  Kennel {pet.kennelId}
                </span>
              </h2>
            </div>
          </div>
          <button
            onClick={handleModalClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Indicator */}
        {step < 4 && (
          <div className="bg-[#F4EFEA] px-6 py-3 border-b border-[#E5DFD7] flex items-center justify-between text-xs font-semibold text-[#59605B]">
            <div className="flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  step >= 1 ? 'bg-[#1B4332] text-white' : 'bg-white text-[#59605B]'
                }`}
              >
                1
              </span>
              <span className={step === 1 ? 'text-[#1B4332] font-bold' : ''}>
                Applicant
              </span>
            </div>
            <div className="w-8 h-0.5 bg-[#E5DFD7]" />
            <div className="flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  step >= 2 ? 'bg-[#1B4332] text-white' : 'bg-white text-[#59605B]'
                }`}
              >
                2
              </span>
              <span className={step === 2 ? 'text-[#1B4332] font-bold' : ''}>
                Home & Environment
              </span>
            </div>
            <div className="w-8 h-0.5 bg-[#E5DFD7]" />
            <div className="flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  step >= 3 ? 'bg-[#1B4332] text-white' : 'bg-white text-[#59605B]'
                }`}
              >
                3
              </span>
              <span className={step === 3 ? 'text-[#1B4332] font-bold' : ''}>
                Care & Veterinary
              </span>
            </div>
          </div>
        )}

        {/* Form Content */}
        <div className="p-6 md:p-8">
          {step === 1 && (
            <form onSubmit={handleNext} className="space-y-4">
              <div className="flex items-center gap-2 pb-2 text-[#1B4332] font-bold text-sm border-b border-[#E5DFD7]">
                <User className="w-4 h-4 text-[#74C69D]" />
                <span>Primary Applicant Contact Information</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2D312E] mb-1">
                  Full Legal Name *
                </label>
                <input
                  type="text"
                  name="applicantName"
                  required
                  placeholder="e.g. Alex Morgan Taylor"
                  value={formData.applicantName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#E5DFD7] text-sm focus:outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#74C69D]/30"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#2D312E] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="alex@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#E5DFD7] text-sm focus:outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#74C69D]/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2D312E] mb-1">
                    Primary Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="(555) 000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#E5DFD7] text-sm focus:outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#74C69D]/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-[#2D312E] mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    placeholder="Riverbend"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#E5DFD7] text-sm focus:outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#74C69D]/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2D312E] mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#E5DFD7] text-sm focus:outline-none focus:border-[#2D6A4F]"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-bold text-sm rounded-lg shadow-sm transition-all"
                >
                  <span>Continue to Home & Environment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleNext} className="space-y-4">
              <div className="flex items-center gap-2 pb-2 text-[#1B4332] font-bold text-sm border-b border-[#E5DFD7]">
                <Home className="w-4 h-4 text-[#74C69D]" />
                <span>Dwelling & Household Setup</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#2D312E] mb-1">
                    Residence Type
                  </label>
                  <select
                    name="homeType"
                    value={formData.homeType}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#E5DFD7] text-sm focus:outline-none focus:border-[#2D6A4F]"
                  >
                    <option value="own-house">Single Family Home (Own)</option>
                    <option value="rent-house">Single Family Home (Rent)</option>
                    <option value="rent-apartment">Apartment (Rent)</option>
                    <option value="condo">Condo / Townhouse</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2D312E] mb-1">
                    Total People in Household
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    name="householdMembers"
                    value={formData.householdMembers}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#E5DFD7] text-sm focus:outline-none focus:border-[#2D6A4F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <label className="flex items-center gap-2 text-xs font-medium text-[#2D312E] cursor-pointer p-3 bg-[#F4EFEA] rounded-lg">
                  <input
                    type="checkbox"
                    name="hasFencedYard"
                    checked={formData.hasFencedYard}
                    onChange={handleChange}
                    className="w-4 h-4 text-[#1B4332] rounded focus:ring-0"
                  />
                  <span>Property has securely fenced yard</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-medium text-[#2D312E] cursor-pointer p-3 bg-[#F4EFEA] rounded-lg">
                  <input
                    type="checkbox"
                    name="landlordApproval"
                    checked={formData.landlordApproval}
                    onChange={handleChange}
                    className="w-4 h-4 text-[#1B4332] rounded focus:ring-0"
                  />
                  <span>Landlord permits pets & breed</span>
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2D312E] mb-1">
                  Ages of any children in home
                </label>
                <input
                  type="text"
                  name="childrenAges"
                  placeholder="e.g. 7 and 11, or None"
                  value={formData.childrenAges}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#E5DFD7] text-sm focus:outline-none focus:border-[#2D6A4F]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2D312E] mb-1">
                  Other pets currently in household
                </label>
                <textarea
                  name="currentPetsDescription"
                  rows={2}
                  placeholder="Species, breed, age, and spay/neuter status"
                  value={formData.currentPetsDescription}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#E5DFD7] text-sm focus:outline-none focus:border-[#2D6A4F]"
                />
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#59605B] hover:text-[#2D312E]"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-bold text-sm rounded-lg shadow-sm transition-all"
                >
                  <span>Continue to Care Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleNext} className="space-y-4">
              <div className="flex items-center gap-2 pb-2 text-[#1B4332] font-bold text-sm border-b border-[#E5DFD7]">
                <Activity className="w-4 h-4 text-[#74C69D]" />
                <span>Routine, Healthcare & Commitment</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2D312E] mb-1">
                  Estimated hours pet will spend alone on typical weekdays
                </label>
                <input
                  type="number"
                  min="0"
                  max="16"
                  name="hoursAlonePerDay"
                  value={formData.hoursAlonePerDay}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#E5DFD7] text-sm focus:outline-none focus:border-[#2D6A4F]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2D312E] mb-1">
                  Primary Veterinarian / Clinic Name & Phone *
                </label>
                <input
                  type="text"
                  name="veterinarianContact"
                  required
                  placeholder="Clinic Name and Phone number"
                  value={formData.veterinarianContact}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#E5DFD7] text-sm focus:outline-none focus:border-[#2D6A4F]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2D312E] mb-1">
                  Pet Care Experience & Philosophy
                </label>
                <textarea
                  name="experienceDescription"
                  rows={3}
                  value={formData.experienceDescription}
                  onChange={handleChange}
                  placeholder="Tell us about your history with companion animals..."
                  className="w-full px-4 py-2.5 rounded-lg border border-[#E5DFD7] text-sm focus:outline-none focus:border-[#2D6A4F]"
                />
              </div>

              <div className="p-3 bg-[#D8F3DC]/40 rounded-xl border border-[#74C69D]/30 text-xs text-[#1B4332] flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
                <p>
                  By submitting, I confirm that all information provided is accurate and grant PawConnect permission to contact my listed veterinarian or landlord for routine pet confirmation.
                </p>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#59605B] hover:text-[#2D312E]"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-bold text-sm rounded-lg shadow-sm transition-all"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Submit Application for {pet.name}</span>
                </button>
              </div>
            </form>
          )}

          {step === 4 && submittedApp && (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#D8F3DC] text-[#1B4332] flex items-center justify-center mx-auto shadow-warm-sm">
                <CheckCircle className="w-10 h-10 text-[#2D6A4F]" />
              </div>

              <div>
                <span className="text-xs font-bold text-[#2D6A4F] uppercase tracking-wider block">
                  Application Submitted Successfully
                </span>
                <h3 className="text-2xl font-extrabold text-[#1B4332] mt-1">
                  Thank You, {submittedApp.applicantName}!
                </h3>
                <p className="text-sm text-[#59605B] max-w-md mx-auto mt-2">
                  Your adoption application for <strong className="text-[#1B4332]">{pet.name}</strong> has been logged into the shelter system. Our adoption counselor team will review your application within 24–48 hours.
                </p>
              </div>

              <div className="bg-[#F4EFEA] rounded-xl p-4 max-w-sm mx-auto text-left border border-[#E5DFD7]">
                <div className="text-xs font-semibold text-[#59605B]">Application Reference Code:</div>
                <div className="text-lg font-mono font-bold text-[#1B4332] mt-0.5">
                  {submittedApp.id}
                </div>
                <div className="text-xs text-[#59605B] mt-2 pt-2 border-t border-[#E5DFD7] flex justify-between">
                  <span>Intake Status:</span>
                  <span className="font-semibold text-[#2D6A4F]">Under Staff Review</span>
                </div>
              </div>

              {/* Developer PHP/MySQL toggle for prompt requirement 9 */}
              <div className="pt-2">
                <button
                  onClick={() => setShowSqlPayload(!showSqlPayload)}
                  className="text-xs text-[#1B4332] font-semibold underline hover:text-[#2D6A4F]"
                >
                  {showSqlPayload ? 'Hide' : 'Inspect'} Simulated PHP / MySQL POST Payload
                </button>

                {showSqlPayload && (
                  <div className="mt-3 text-left p-3 bg-[#191c1a] text-[#86af99] rounded-lg text-xs font-mono max-h-48 overflow-y-auto">
                    <div className="text-white/60 mb-1">// POST /api/adoptions.php</div>
                    <pre>{JSON.stringify(submittedApp, null, 2)}</pre>
                  </div>
                )}
              </div>

              <div className="pt-4 flex justify-center">
                <button
                  onClick={handleModalClose}
                  className="px-6 py-2.5 bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-bold text-sm rounded-lg shadow-sm"
                >
                  Return to Pet Showcase
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
