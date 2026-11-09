import React, { useState, useMemo } from 'react';
import { Pet, PetSpecies, AdoptionStatus } from '../types';
import { PetCard } from '../components/PetCard';
import { Search, Filter, RotateCcw, Heart, Sparkles, Check } from 'lucide-react';

interface AdoptPageProps {
  pets: Pet[];
  onSelectPet: (pet: Pet) => void;
  onApplyPet: (pet: Pet) => void;
  onQuickView: (pet: Pet) => void;
}

export const AdoptPage: React.FC<AdoptPageProps> = ({
  pets,
  onSelectPet,
  onApplyPet,
  onQuickView,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState<'all' | PetSpecies>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | AdoptionStatus>('all');
  const [selectedAge, setSelectedAge] = useState<string>('all');
  const [goodWithKidsOnly, setGoodWithKidsOnly] = useState(false);
  const [goodWithCatsOnly, setGoodWithCatsOnly] = useState(false);
  const [houseTrainedOnly, setHouseTrainedOnly] = useState(false);

  const filteredPets = useMemo(() => {
    return pets.filter((pet) => {
      // Search term
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = pet.name.toLowerCase().includes(query);
        const matchesBreed = pet.breed.toLowerCase().includes(query);
        const matchesPersonality = pet.personality.some((p) =>
          p.toLowerCase().includes(query)
        );
        if (!matchesName && !matchesBreed && !matchesPersonality) return false;
      }

      // Species
      if (selectedSpecies !== 'all' && pet.species !== selectedSpecies) {
        return false;
      }

      // Status
      if (selectedStatus !== 'all' && pet.status !== selectedStatus) {
        return false;
      }

      // Age group
      if (selectedAge !== 'all' && pet.ageGroup !== selectedAge) {
        return false;
      }

      // Traits
      if (goodWithKidsOnly && !pet.goodWithKids) return false;
      if (goodWithCatsOnly && !pet.goodWithCats) return false;
      if (houseTrainedOnly && !pet.isHouseTrained) return false;

      return true;
    });
  }, [
    pets,
    searchQuery,
    selectedSpecies,
    selectedStatus,
    selectedAge,
    goodWithKidsOnly,
    goodWithCatsOnly,
    houseTrainedOnly,
  ]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedSpecies('all');
    setSelectedStatus('all');
    setSelectedAge('all');
    setGoodWithKidsOnly(false);
    setGoodWithCatsOnly(false);
    setHouseTrainedOnly(false);
  };

  const hasActiveFilters =
    searchQuery ||
    selectedSpecies !== 'all' ||
    selectedStatus !== 'all' ||
    selectedAge !== 'all' ||
    goodWithKidsOnly ||
    goodWithCatsOnly ||
    houseTrainedOnly;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-8 border border-[#E5DFD7] shadow-warm-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#2D6A4F] uppercase tracking-wider block">
            Companion Animal Directory
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1B4332] tracking-tight">
            Find Your Forever Friend
          </h1>
          <p className="text-sm text-[#59605B] max-w-xl">
            All animals are fully vaccinated, spayed or neutered, and microchipped before adoption. Every profile includes our veterinary clinic&apos;s verified records.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-[#FDFBF7] p-4 rounded-2xl border border-[#E5DFD7] self-start md:self-auto">
          <div className="text-center px-3 border-r border-[#E5DFD7]">
            <div className="text-2xl font-extrabold text-[#1B4332] tabular-nums">
              {filteredPets.length}
            </div>
            <div className="text-[11px] font-semibold text-[#59605B]">Available</div>
          </div>
          <div className="text-center px-3">
            <div className="text-2xl font-extrabold text-[#E76F51] tabular-nums">
              {pets.filter((p) => p.status === 'urgent').length}
            </div>
            <div className="text-[11px] font-semibold text-[#59605B]">Urgent</div>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-2xl p-6 border border-[#E5DFD7] shadow-warm-sm space-y-5">
        {/* Row 1: Search & Species Segmented Control */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#717973] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, breed, or temperament (e.g. Barkley, Shepherd, Calm)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5DFD7] text-sm focus:outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#74C69D]/25 bg-[#FDFBF7]"
            />
          </div>

          {/* Species Segmented Tabs for All Companion Animals */}
          <div className="flex items-center gap-1.5 p-1 bg-[#F4EFEA] rounded-xl self-start sm:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => setSelectedSpecies('all')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                selectedSpecies === 'all'
                  ? 'bg-white text-[#1B4332] shadow-xs'
                  : 'text-[#59605B] hover:text-[#1B4332]'
              }`}
            >
              All Animals ({pets.length})
            </button>
            <button
              onClick={() => setSelectedSpecies('dog')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                selectedSpecies === 'dog'
                  ? 'bg-white text-[#1B4332] shadow-xs'
                  : 'text-[#59605B] hover:text-[#1B4332]'
              }`}
            >
              🐕 Dogs ({pets.filter((p) => p.species === 'dog').length})
            </button>
            <button
              onClick={() => setSelectedSpecies('cat')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                selectedSpecies === 'cat'
                  ? 'bg-white text-[#1B4332] shadow-xs'
                  : 'text-[#59605B] hover:text-[#1B4332]'
              }`}
            >
              🐈 Cats ({pets.filter((p) => p.species === 'cat').length})
            </button>
            <button
              onClick={() => setSelectedSpecies('rabbit')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                selectedSpecies === 'rabbit'
                  ? 'bg-white text-[#1B4332] shadow-xs'
                  : 'text-[#59605B] hover:text-[#1B4332]'
              }`}
            >
              🐇 Rabbits ({pets.filter((p) => p.species === 'rabbit').length})
            </button>
            <button
              onClick={() => setSelectedSpecies('bird')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                selectedSpecies === 'bird'
                  ? 'bg-white text-[#1B4332] shadow-xs'
                  : 'text-[#59605B] hover:text-[#1B4332]'
              }`}
            >
              🦜 Birds ({pets.filter((p) => p.species === 'bird').length})
            </button>
            <button
              onClick={() => setSelectedSpecies('small-pet')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                selectedSpecies === 'small-pet'
                  ? 'bg-white text-[#1B4332] shadow-xs'
                  : 'text-[#59605B] hover:text-[#1B4332]'
              }`}
            >
              🐹 Small Pets ({pets.filter((p) => p.species === 'small-pet').length})
            </button>
          </div>
        </div>

        {/* Row 2: Secondary Dropdowns & Trait Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#E5DFD7]">
          <div className="flex flex-wrap items-center gap-3">
            {/* Status Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#59605B]">Status:</span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as any)}
                className="px-3 py-1.5 bg-[#FDFBF7] border border-[#E5DFD7] rounded-lg text-xs font-semibold text-[#1B4332] focus:outline-none focus:border-[#2D6A4F]"
              >
                <option value="all">All Statuses</option>
                <option value="available">Ready for Adoption</option>
                <option value="urgent">Urgent Rescue</option>
                <option value="foster">In Foster Care</option>
              </select>
            </div>

            {/* Age Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#59605B]">Age:</span>
              <select
                value={selectedAge}
                onChange={(e) => setSelectedAge(e.target.value)}
                className="px-3 py-1.5 bg-[#FDFBF7] border border-[#E5DFD7] rounded-lg text-xs font-semibold text-[#1B4332] focus:outline-none focus:border-[#2D6A4F]"
              >
                <option value="all">All Ages</option>
                <option value="puppy-kitten">Baby / Puppy / Kitten</option>
                <option value="young">Young (1-3 yrs)</option>
                <option value="adult">Adult (3-7 yrs)</option>
                <option value="senior">Senior (7+ yrs)</option>
              </select>
            </div>

            {/* Checkbox traits */}
            <label className="flex items-center gap-1.5 text-xs font-semibold text-[#2D312E] cursor-pointer ml-2">
              <input
                type="checkbox"
                checked={goodWithKidsOnly}
                onChange={(e) => setGoodWithKidsOnly(e.target.checked)}
                className="w-3.5 h-3.5 text-[#1B4332] rounded"
              />
              <span>Good with Kids</span>
            </label>

            <label className="flex items-center gap-1.5 text-xs font-semibold text-[#2D312E] cursor-pointer">
              <input
                type="checkbox"
                checked={goodWithCatsOnly}
                onChange={(e) => setGoodWithCatsOnly(e.target.checked)}
                className="w-3.5 h-3.5 text-[#1B4332] rounded"
              />
              <span>Cat Friendly</span>
            </label>

            <label className="flex items-center gap-1.5 text-xs font-semibold text-[#2D312E] cursor-pointer">
              <input
                type="checkbox"
                checked={houseTrainedOnly}
                onChange={(e) => setHouseTrainedOnly(e.target.checked)}
                className="w-3.5 h-3.5 text-[#1B4332] rounded"
              />
              <span>House Trained</span>
            </label>
          </div>

          {/* Reset button */}
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1.5 text-xs font-bold text-[#E76F51] hover:text-[#d05c3f] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Pet Results Grid */}
      {filteredPets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPets.map((pet) => (
            <PetCard
              key={pet.id}
              pet={pet}
              onSelect={onSelectPet}
              onApply={onApplyPet}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#E5DFD7] max-w-lg mx-auto space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#F4EFEA] text-[#59605B] flex items-center justify-center mx-auto text-2xl">
            🐾
          </div>
          <h3 className="text-xl font-bold text-[#1B4332]">
            No Animals Match Your Filters
          </h3>
          <p className="text-xs text-[#59605B]">
            Try relaxing your filter criteria or search terms to see all animals in our care.
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 bg-[#1B4332] hover:bg-[#2D6A4F] text-white text-xs font-bold rounded-lg transition-colors"
          >
            Show All Adoptable Animals
          </button>
        </div>
      )}
    </div>
  );
};
