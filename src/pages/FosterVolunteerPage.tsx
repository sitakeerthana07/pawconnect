import React, { useState } from 'react';
import { Pet } from '../types';
import { 
  HeartHandshake, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle, 
  Users, 
  Home, 
  Car, 
  Calendar,
  AlertCircle
} from 'lucide-react';

interface FosterVolunteerPageProps {
  pets: Pet[];
  onSelectPet: (pet: Pet) => void;
  onApplyPet: (pet: Pet) => void;
}

export const FosterVolunteerPage: React.FC<FosterVolunteerPageProps> = ({
  pets,
  onSelectPet,
  onApplyPet,
}) => {
  const [fosterFormSubmitted, setFosterFormSubmitted] = useState(false);
  const [volunteerFormSubmitted, setVolunteerFormSubmitted] = useState(false);

  // Form states
  const [fosterName, setFosterName] = useState('');
  const [fosterEmail, setFosterEmail] = useState('');
  const [fosterPhone, setFosterPhone] = useState('');
  const [fosterType, setFosterType] = useState('dogs');

  const [volName, setVolName] = useState('');
  const [volEmail, setVolEmail] = useState('');
  const [volProgram, setVolProgram] = useState('dog-walking');

  const urgentFosters = pets.filter(
    (p) => p.status === 'urgent' || p.status === 'foster'
  );

  const handleFosterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFosterFormSubmitted(true);
  };

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVolunteerFormSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Hero Banner */}
      <div className="bg-[#1B4332] text-white rounded-3xl p-8 sm:p-12 shadow-warm-lg space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#74C69D]/30 text-[#D8F3DC] text-xs font-bold">
          <HeartHandshake className="w-4 h-4 text-[#74C69D]" />
          <span>Foster Guardians & Volunteer Network</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight max-w-2xl text-balance">
          Be the Bridge Between a Shelter Cage and a Forever Home.
        </h1>
        <p className="text-sm sm:text-base text-white/80 max-w-2xl leading-relaxed">
          Fostering saves lives by freeing up shelter kennels for incoming emergency rescues while giving vulnerable pets a quiet, comforting home to decompress. All veterinary expenses, food, and supplies are 100% paid for by PawConnect.
        </p>
      </div>

      {/* Urgent Foster Spotlight Cards */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#E76F51] uppercase tracking-wider block">
              Time-Sensitive Cases
            </span>
            <h2 className="text-2xl font-extrabold text-[#1B4332]">
              Urgent Foster Placement Needed
            </h2>
          </div>
          <span className="text-xs text-[#59605B]">
            Food, crates, and medical care fully provided
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {urgentFosters.slice(0, 3).map((pet) => (
            <div
              key={pet.id}
              className="bg-white rounded-2xl border border-[#E5DFD7] overflow-hidden shadow-warm-sm flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] bg-[#F4EFEA]">
                  <img
                    src={pet.primaryImage}
                    alt={pet.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#FCECE8] text-[#E76F51] text-xs font-bold px-3 py-1 rounded-full border border-[#E76F51]/20">
                    Needs Foster
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-[#1B4332]">{pet.name}</h3>
                    <span className="text-xs text-[#59605B]">{pet.age}</span>
                  </div>
                  <p className="text-xs text-[#59605B]">{pet.breed}</p>
                  <p className="text-xs text-[#2D312E]/90 pt-1 leading-relaxed">
                    {pet.urgentReason || pet.story}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => onApplyPet(pet)}
                  className="w-full py-2.5 bg-[#E76F51] hover:bg-[#d05c3f] text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
                >
                  Foster {pet.name} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Signup Section: Foster vs Volunteer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Foster Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5DFD7] shadow-warm-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D8F3DC] text-[#1B4332] flex items-center justify-center font-bold">
              🏡
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#1B4332]">
                Join the Emergency Foster Network
              </h3>
              <p className="text-xs text-[#59605B]">
                Open your home for 2 weeks to 2 months. Zero financial obligation.
              </p>
            </div>
          </div>

          {fosterFormSubmitted ? (
            <div className="text-center py-8 space-y-3 bg-[#FDFBF7] rounded-2xl border border-[#E5DFD7]">
              <CheckCircle className="w-12 h-12 text-[#2D6A4F] mx-auto" />
              <h4 className="text-lg font-bold text-[#1B4332]">
                Foster Application Received!
              </h4>
              <p className="text-xs text-[#59605B] max-w-xs mx-auto">
                Thank you for offering your home! Our foster coordinator will reach out within 24 hours to review your pet preferences.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFosterSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#2D312E] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Taylor Smith"
                  value={fosterName}
                  onChange={(e) => setFosterName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-[#E5DFD7] text-sm focus:outline-none focus:border-[#2D6A4F]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#2D312E] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="taylor@example.com"
                    value={fosterEmail}
                    onChange={(e) => setFosterEmail(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-[#E5DFD7] text-sm focus:outline-none focus:border-[#2D6A4F]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#2D312E] mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(555) 123-4567"
                    value={fosterPhone}
                    onChange={(e) => setFosterPhone(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-[#E5DFD7] text-sm focus:outline-none focus:border-[#2D6A4F]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#2D312E] mb-1">
                  Animals You Are Able to Foster
                </label>
                <select
                  value={fosterType}
                  onChange={(e) => setFosterType(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-[#E5DFD7] text-sm focus:outline-none focus:border-[#2D6A4F]"
                >
                  <option value="dogs">Adult Dogs & Seniors</option>
                  <option value="puppies">Litters of Puppies</option>
                  <option value="cats">Adult Cats & Bonded Pairs</option>
                  <option value="kittens">Bottle-Baby & Weaned Kittens</option>
                  <option value="medical">Post-Surgery / Medical Recovery</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                Submit Foster Care Registration
              </button>
            </form>
          )}
        </div>

        {/* Volunteer Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E5DFD7] shadow-warm-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D8F3DC] text-[#1B4332] flex items-center justify-center font-bold">
              🤝
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#1B4332]">
                Volunteer at the Sanctuary
              </h3>
              <p className="text-xs text-[#59605B]">
                Dog walking, cat cuddle rooms, adoption events, or transport.
              </p>
            </div>
          </div>

          {volunteerFormSubmitted ? (
            <div className="text-center py-8 space-y-3 bg-[#FDFBF7] rounded-2xl border border-[#E5DFD7]">
              <CheckCircle className="w-12 h-12 text-[#2D6A4F] mx-auto" />
              <h4 className="text-lg font-bold text-[#1B4332]">
                Volunteer Registration Confirmed!
              </h4>
              <p className="text-xs text-[#59605B] max-w-xs mx-auto">
                Welcome to our volunteer family! We hold volunteer orientation every Saturday at 10:00 AM.
              </p>
            </div>
          ) : (
            <form onSubmit={handleVolunteerSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#2D312E] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Jordan Miller"
                  value={volName}
                  onChange={(e) => setVolName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-[#E5DFD7] text-sm focus:outline-none focus:border-[#2D6A4F]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#2D312E] mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="jordan@example.com"
                  value={volEmail}
                  onChange={(e) => setVolEmail(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-[#E5DFD7] text-sm focus:outline-none focus:border-[#2D6A4F]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#2D312E] mb-1">
                  Preferred Volunteer Role
                </label>
                <select
                  value={volProgram}
                  onChange={(e) => setVolProgram(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-[#E5DFD7] text-sm focus:outline-none focus:border-[#2D6A4F]"
                >
                  <option value="dog-walking">Canine Dog Walker & Agility Play</option>
                  <option value="cat-socialization">Feline Socialization & Grooming</option>
                  <option value="adoption-events">Adoption Event Coordinator</option>
                  <option value="transport">Rescue Transport Driver</option>
                  <option value="clinic-assist">Veterinary Clinic Assistant</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                Sign Up for Volunteer Orientation
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
