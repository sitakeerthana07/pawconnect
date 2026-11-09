import React, { useState } from 'react';
import { Pet, KennelRoom, PetSpecies } from '../types';
import { 
  Building2, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Clock, 
  Plus, 
  Activity, 
  ClipboardCheck, 
  BedDouble, 
  Filter,
  User,
  ShieldCheck,
  Check
} from 'lucide-react';

interface ShelterOpsPageProps {
  pets: Pet[];
  kennels: KennelRoom[];
  onSelectPet: (pet: Pet) => void;
  onAddNewIntake: (newPet: Pet, kennelCode: string) => void;
}

export const ShelterOpsPage: React.FC<ShelterOpsPageProps> = ({
  pets,
  kennels,
  onSelectPet,
  onAddNewIntake,
}) => {
  const [selectedWing, setSelectedWing] = useState<string>('all');
  const [selectedKennelId, setSelectedKennelId] = useState<string>(kennels[1]?.id || 'k-2');
  const [isNewIntakeOpen, setIsNewIntakeOpen] = useState(false);

  // New intake form state
  const [newPetName, setNewPetName] = useState('');
  const [newPetSpecies, setNewPetSpecies] = useState<PetSpecies>('dog');
  const [newPetBreed, setNewPetBreed] = useState('');
  const [newPetAge, setNewPetAge] = useState('1 year');
  const [newPetWeight, setNewPetWeight] = useState('30 lbs');
  const [newPetIntakeReason, setNewPetIntakeReason] = useState<'stray' | 'owner-surrender' | 'rescue-transfer'>('stray');
  const [targetKennelCode, setTargetKennelCode] = useState('A-101');

  // Filtered kennels
  const filteredKennels = kennels.filter((k) => {
    if (selectedWing === 'all') return true;
    return k.wing.includes(selectedWing);
  });

  const selectedKennel = kennels.find((k) => k.id === selectedKennelId) || kennels[0];
  const currentPet = selectedKennel?.currentPetId
    ? pets.find((p) => p.id === selectedKennel.currentPetId)
    : null;

  // Shelter metrics
  const totalKennels = kennels.length;
  const occupiedCount = kennels.filter((k) => k.status === 'occupied').length;
  const vacantCount = kennels.filter((k) => k.status === 'vacant').length;
  const cleaningCount = kennels.filter((k) => k.status === 'cleaning' || k.status === 'isolation').length;
  const occupancyRate = Math.round((occupiedCount / totalKennels) * 100);

  const handleCreateIntake = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPetName || !newPetBreed) return;

    const newPet: Pet = {
      id: `pet-${Date.now()}`,
      name: newPetName,
      species: newPetSpecies,
      breed: newPetBreed,
      age: newPetAge,
      ageGroup: 'young',
      gender: 'male',
      size: 'medium',
      weight: newPetWeight,
      status: 'available',
      kennelId: targetKennelCode,
      intakeDate: new Date().toISOString().split('T')[0],
      intakeReason: newPetIntakeReason,
      microchipId: `98514100${Math.floor(100000 + Math.random() * 900000)}`,
      isSpayedNeutered: true,
      isVaccinated: true,
      isHouseTrained: true,
      goodWithKids: true,
      goodWithDogs: true,
      goodWithCats: false,
      energyLevel: 'moderate',
      primaryImage:
        newPetSpecies === 'dog'
          ? 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80'
          : newPetSpecies === 'cat'
          ? 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80'
          : 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=800&q=80',
      galleryImages: [],
      story: `Newly arrived animal admitted under intake protocol for ${newPetIntakeReason}. Undergoing introductory behavioral adjustment and routine wellness quarantine.`,
      personality: ['Gentle', 'Needs Time to Settle', 'Curious'],
      medicalSummary: 'Initial physical exam clear. Core vaccinations and microchip recorded upon intake.',
      medicalTimeline: [
        {
          id: `m-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          title: 'Shelter Admission Exam & Triage',
          category: 'checkup',
          veterinarian: 'Dr. Sarah Lin, DVM',
          notes: 'Standard 4-point triage completed. No active infections, core vaccines administered.',
          status: 'completed',
        },
      ],
      adoptionFee: 120,
    };

    onAddNewIntake(newPet, targetKennelCode);
    setIsNewIntakeOpen(false);
    setNewPetName('');
    setNewPetBreed('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header & Intake Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#2D6A4F] uppercase tracking-wider block">
            Shelter Management & Operations
          </span>
          <h1 className="text-3xl font-extrabold text-[#1B4332] tracking-tight mt-1">
            Kennel Map & Animal Status Hub
          </h1>
          <p className="text-sm text-[#59605B]">
            Real-time kennel occupancy, daily health protocol logs, and intake admissions.
          </p>
        </div>

        <button
          onClick={() => setIsNewIntakeOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#1B4332] hover:bg-[#2D6A4F] text-white text-xs font-bold rounded-xl shadow-warm-sm transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Register New Animal Intake</span>
        </button>
      </div>

      {/* Operational KPI Metric Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#E5DFD7] shadow-warm-sm space-y-1">
          <span className="text-xs font-bold text-[#59605B]">Kennel Capacity</span>
          <div className="text-2xl font-extrabold text-[#1B4332] tabular-nums">
            {occupancyRate}%
          </div>
          <p className="text-[11px] text-[#59605B]">
            {occupiedCount} of {totalKennels} Suites Occupied
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E5DFD7] shadow-warm-sm space-y-1">
          <span className="text-xs font-bold text-[#59605B]">Available Suites</span>
          <div className="text-2xl font-extrabold text-[#2D6A4F] tabular-nums">
            {vacantCount}
          </div>
          <p className="text-[11px] text-[#2D6A4F]">Ready for Immediate Intake</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E5DFD7] shadow-warm-sm space-y-1">
          <span className="text-xs font-bold text-[#59605B]">Quarantine / Triage</span>
          <div className="text-2xl font-extrabold text-[#E76F51] tabular-nums">
            {cleaningCount}
          </div>
          <p className="text-[11px] text-[#E76F51]">Under Medical Observation</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E5DFD7] shadow-warm-sm space-y-1">
          <span className="text-xs font-bold text-[#59605B]">Active Foster Cases</span>
          <div className="text-2xl font-extrabold text-[#1B4332] tabular-nums">
            {pets.filter((p) => p.status === 'foster').length}
          </div>
          <p className="text-[11px] text-[#59605B]">Recovering in Off-Site Homes</p>
        </div>
      </div>

      {/* Wing Filter Strip */}
      <div className="flex items-center gap-2 p-1 bg-[#F4EFEA] rounded-xl overflow-x-auto self-start sm:self-auto">
        <button
          onClick={() => setSelectedWing('all')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
            selectedWing === 'all'
              ? 'bg-white text-[#1B4332] shadow-xs'
              : 'text-[#59605B] hover:text-[#1B4332]'
          }`}
        >
          All Wings ({kennels.length})
        </button>
        <button
          onClick={() => setSelectedWing('Canine Haven')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
            selectedWing === 'Canine Haven'
              ? 'bg-white text-[#1B4332] shadow-xs'
              : 'text-[#59605B] hover:text-[#1B4332]'
          }`}
        >
          🐕 Wing A · Canine Haven
        </button>
        <button
          onClick={() => setSelectedWing('Feline Sanctuary')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
            selectedWing === 'Feline Sanctuary'
              ? 'bg-white text-[#1B4332] shadow-xs'
              : 'text-[#59605B] hover:text-[#1B4332]'
          }`}
        >
          🐈 Wing B · Feline Sanctuary
        </button>
        <button
          onClick={() => setSelectedWing('Medical')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
            selectedWing === 'Medical'
              ? 'bg-white text-[#1B4332] shadow-xs'
              : 'text-[#59605B] hover:text-[#1B4332]'
          }`}
        >
          🏥 Wing C · Medical Quarantine
        </button>
      </div>

      {/* Split Master-Detail Layout from Warm Shelter Specification */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Master: Kennel Grid */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#1B4332] flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#74C69D]" />
              <span>Interactive Kennel Floor Map</span>
            </h3>
            <span className="text-xs text-[#59605B]">
              Click any kennel suite to inspect animal status
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredKennels.map((k) => {
              const isSelected = k.id === selectedKennel.id;
              return (
                <div
                  key={k.id}
                  onClick={() => setSelectedKennelId(k.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer text-left space-y-2.5 ${
                    isSelected
                      ? 'bg-white border-[#1B4332] shadow-warm-md ring-2 ring-[#74C69D]/40'
                      : 'bg-white/90 border-[#E5DFD7] hover:border-[#74C69D] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-mono font-bold text-[#1B4332]">
                      {k.code}
                    </span>
                    <span
                      className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                        k.status === 'occupied'
                          ? 'bg-[#D8F3DC] text-[#1B4332]'
                          : k.status === 'vacant'
                          ? 'bg-[#F4EFEA] text-[#59605B]'
                          : 'bg-[#FCECE8] text-[#E76F51]'
                      }`}
                    >
                      {k.status}
                    </span>
                  </div>

                  <div>
                    <div className="text-xs text-[#59605B] font-medium">{k.wing}</div>
                    <div className="text-sm font-bold text-[#1B4332] mt-0.5">
                      {k.currentPetName ? (
                        <span>🐾 {k.currentPetName}</span>
                      ) : (
                        <span className="text-[#717973] font-normal italic">
                          Vacant Suite
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#E5DFD7] flex items-center justify-between text-[11px] text-[#59605B]">
                    <span>Cleaned: {k.lastCleaned}</span>
                    <span className="font-semibold text-[#2D6A4F]">
                      {k.cleaningStatus === 'clean' ? '✓ Sanitized' : 'Needs Check'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detail: Live Animal Status Sheet */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E5DFD7] shadow-warm-sm space-y-6 sticky top-24">
            <div className="flex items-center justify-between border-b border-[#E5DFD7] pb-4">
              <div>
                <span className="text-[11px] font-bold text-[#59605B] uppercase tracking-wider block">
                  Active Kennel Suite Inspection
                </span>
                <h3 className="text-2xl font-extrabold text-[#1B4332]">
                  Suite {selectedKennel.code}
                </h3>
              </div>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full uppercase ${
                  selectedKennel.status === 'occupied'
                    ? 'bg-[#D8F3DC] text-[#1B4332]'
                    : 'bg-[#F4EFEA] text-[#59605B]'
                }`}
              >
                {selectedKennel.status}
              </span>
            </div>

            {currentPet ? (
              <div className="space-y-5">
                {/* Pet Quick Header */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[#F4EFEA] border border-[#E5DFD7] shrink-0">
                    <img
                      src={currentPet.primaryImage}
                      alt={currentPet.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#1B4332]">
                      {currentPet.name}
                    </h4>
                    <p className="text-xs text-[#59605B]">
                      {currentPet.breed} · {currentPet.age}
                    </p>
                    <button
                      onClick={() => onSelectPet(currentPet)}
                      className="text-xs text-[#2D6A4F] hover:underline font-bold mt-1 block"
                    >
                      Open Full Public Pet Profile →
                    </button>
                  </div>
                </div>

                {/* Daily Care Checklist */}
                <div className="space-y-3 pt-2">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-[#1B4332] flex items-center gap-1.5">
                    <ClipboardCheck className="w-4 h-4 text-[#74C69D]" />
                    <span>Today&apos;s Shelter Care Schedule</span>
                  </h5>

                  <div className="space-y-2 text-xs">
                    <div className="p-3 bg-[#FDFBF7] rounded-xl border border-[#E5DFD7] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#2D6A4F]" />
                        <span>08:00 AM · Morning Dietary Meal (High Protein)</span>
                      </div>
                      <span className="text-[10px] font-bold text-[#2D6A4F] bg-[#D8F3DC] px-2 py-0.5 rounded-full">
                        Completed
                      </span>
                    </div>

                    <div className="p-3 bg-[#FDFBF7] rounded-xl border border-[#E5DFD7] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#2D6A4F]" />
                        <span>10:30 AM · Yard Exercise & Socialization</span>
                      </div>
                      <span className="text-[10px] font-bold text-[#2D6A4F] bg-[#D8F3DC] px-2 py-0.5 rounded-full">
                        Completed
                      </span>
                    </div>

                    <div className="p-3 bg-[#FDFBF7] rounded-xl border border-[#E5DFD7] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#F4A261]" />
                        <span>04:00 PM · Afternoon Wellness & Medication</span>
                      </div>
                      <span className="text-[10px] font-bold text-[#1B4332] bg-[#F4EFEA] px-2 py-0.5 rounded-full">
                        Pending
                      </span>
                    </div>
                  </div>
                </div>

                {/* Veterinary Quick Status */}
                <div className="p-4 bg-[#D8F3DC]/30 rounded-xl border border-[#74C69D]/30 space-y-1.5 text-xs">
                  <div className="font-bold text-[#1B4332] flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-[#2D6A4F]" />
                    <span>Clinical Summary</span>
                  </div>
                  <p className="text-[#2D312E]">{currentPet.medicalSummary}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 space-y-3">
                <BedDouble className="w-10 h-10 text-[#717973] mx-auto" />
                <h4 className="text-sm font-bold text-[#1B4332]">
                  This Suite is Currently Vacant
                </h4>
                <p className="text-xs text-[#59605B] max-w-xs mx-auto">
                  Suite {selectedKennel.code} has been sanitized and is ready to accommodate a new incoming stray or surrendered companion animal.
                </p>
                <button
                  onClick={() => {
                    setTargetKennelCode(selectedKennel.code);
                    setIsNewIntakeOpen(true);
                  }}
                  className="px-4 py-2 bg-[#1B4332] text-white text-xs font-bold rounded-lg hover:bg-[#2D6A4F] transition-colors"
                >
                  Assign New Intake to {selectedKennel.code}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* New Animal Intake Modal */}
      {isNewIntakeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1B4332]/50 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white rounded-2xl border border-[#E5DFD7] shadow-warm-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E5DFD7] pb-3">
              <h3 className="text-lg font-bold text-[#1B4332]">
                New Animal Intake Registration
              </h3>
              <button
                onClick={() => setIsNewIntakeOpen(false)}
                className="text-[#59605B] hover:text-[#1B4332]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateIntake} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#2D312E] mb-1">
                  Animal Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Copper"
                  value={newPetName}
                  onChange={(e) => setNewPetName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#E5DFD7] text-sm focus:outline-none focus:border-[#2D6A4F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#2D312E] mb-1">
                    Species
                  </label>
                  <select
                    value={newPetSpecies}
                    onChange={(e) => setNewPetSpecies(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-[#E5DFD7] text-sm focus:outline-none focus:border-[#2D6A4F]"
                  >
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="rabbit">Rabbit</option>
                    <option value="bird">Bird / Parakeet</option>
                    <option value="small-pet">Small Pet / Guinea Pig</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-[#2D312E] mb-1">
                    Assigned Kennel
                  </label>
                  <select
                    value={targetKennelCode}
                    onChange={(e) => setTargetKennelCode(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#E5DFD7] text-sm focus:outline-none focus:border-[#2D6A4F]"
                  >
                    {kennels.map((k) => (
                      <option key={k.id} value={k.code}>
                        {k.code} ({k.wing})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#2D312E] mb-1">
                    Breed Description *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Beagle Mix"
                    value={newPetBreed}
                    onChange={(e) => setNewPetBreed(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#E5DFD7] text-sm focus:outline-none focus:border-[#2D6A4F]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#2D312E] mb-1">
                    Estimated Age
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 1.5 years"
                    value={newPetAge}
                    onChange={(e) => setNewPetAge(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#E5DFD7] text-sm focus:outline-none focus:border-[#2D6A4F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#2D312E] mb-1">
                    Weight
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 28 lbs"
                    value={newPetWeight}
                    onChange={(e) => setNewPetWeight(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#E5DFD7] text-sm focus:outline-none focus:border-[#2D6A4F]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#2D312E] mb-1">
                    Intake Reason
                  </label>
                  <select
                    value={newPetIntakeReason}
                    onChange={(e) => setNewPetIntakeReason(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-[#E5DFD7] text-sm focus:outline-none focus:border-[#2D6A4F]"
                  >
                    <option value="stray">Stray Intake</option>
                    <option value="owner-surrender">Owner Surrender</option>
                    <option value="rescue-transfer">Rescue Transfer</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-[#E5DFD7]">
                <button
                  type="button"
                  onClick={() => setIsNewIntakeOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#59605B] hover:text-[#2D6A4F]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1B4332] text-white text-xs font-bold rounded-lg hover:bg-[#2D6A4F] transition-colors"
                >
                  Register Animal & Update Kennel Map
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
