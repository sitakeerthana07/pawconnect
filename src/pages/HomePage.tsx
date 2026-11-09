import React from 'react';
import { Pet } from '../types';
import { PetCard } from '../components/PetCard';
import { 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  Calendar, 
  ArrowRight, 
  CheckCircle, 
  Users, 
  Home, 
  Activity, 
  Clock, 
  PhoneCall,
  Search,
  Award
} from 'lucide-react';

interface HomePageProps {
  pets: Pet[];
  onSelectPet: (pet: Pet) => void;
  onApplyPet: (pet: Pet) => void;
  onQuickView: (pet: Pet) => void;
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  pets,
  onSelectPet,
  onApplyPet,
  onQuickView,
  onNavigate,
}) => {
  // Urgent & Featured dogs
  const urgentDogs = pets.filter((p) => p.status === 'urgent' && p.species === 'dog').slice(0, 3);
  const featuredDogs = pets.filter((p) => p.species === 'dog');

  return (
    <div className="space-y-20 pb-20">
      {/* 1. Hero Section */}
      <section className="relative pt-8 pb-12 md:py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Value Proposition & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D8F3DC] text-[#1B4332] text-xs font-bold border border-[#74C69D]/30 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#2D6A4F]" />
                <span>Certified 501(c)(3) Dedicated Canine Rescue & Welfare Sanctuary</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1B4332] tracking-tight leading-[1.1] text-balance">
                Every Wagging Tail Deserves a Loving Home.
              </h1>

              <p className="text-lg text-[#59605B] max-w-xl leading-relaxed">
                PawConnect is dedicated to rescuing, medically rehabilitating, and finding forever families for vulnerable and abandoned dogs. Backed by full on-site veterinary surgery, behavioral enrichment, and a compassionate foster network.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('adopt')}
                  className="flex items-center gap-2 px-7 py-3.5 bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-bold text-base rounded-full shadow-warm-md hover:-translate-y-0.5 transition-all"
                >
                  <Heart className="w-5 h-5 fill-white" />
                  <span>Browse Adoptable Dogs</span>
                </button>

                <button
                  onClick={() => onNavigate('foster')}
                  className="flex items-center gap-2 px-6 py-3.5 bg-[#F4EFEA] hover:bg-[#ecefea] text-[#1B4332] font-bold text-base rounded-full border border-[#E5DFD7] transition-colors"
                >
                  <span>Emergency Foster Drive</span>
                  <ArrowRight className="w-4 h-4 text-[#74C69D]" />
                </button>
              </div>

              {/* Quick Trust Pillars */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-[#E5DFD7]">
                <div className="space-y-1">
                  <div className="text-2xl font-extrabold text-[#1B4332] tabular-nums">
                    99.2%
                  </div>
                  <div className="text-xs text-[#59605B] font-semibold">
                    Live Release Rate
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-extrabold text-[#1B4332] tabular-nums">
                    1,840+
                  </div>
                  <div className="text-xs text-[#59605B] font-semibold">
                    Dogs Rescued & Placed
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-extrabold text-[#1B4332] tabular-nums">
                    100%
                  </div>
                  <div className="text-xs text-[#59605B] font-semibold">
                    Vet Inspected & Chipped
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase (High-Impact Rescued Dog) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-warm-lg border border-[#E5DFD7] aspect-[4/5] bg-[#F4EFEA]">
                <img
                  src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1000&q=80"
                  alt="Happy rescued dogs playing joyfully in green grass"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                {/* Floating Urgent Badge Card */}
                <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-white/60 shadow-warm-md flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#FCECE8] text-[#E76F51] flex items-center justify-center font-bold text-lg">
                      🐕
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#1B4332]">
                        Barkley & Cooper Need Fosters
                      </h4>
                      <p className="text-xs text-[#59605B]">
                        Kennel stress cases qualify for free food & medical coverage.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigate('foster')}
                    className="px-3 py-1.5 bg-[#E76F51] hover:bg-[#d05c3f] text-white text-xs font-bold rounded-lg whitespace-nowrap shadow-xs"
                  >
                    Foster a Dog
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Urgent Rescue Dogs Rail */}
      {urgentDogs.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FCECE8]/60 border border-[#E76F51]/30 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E76F51] text-white flex items-center justify-center font-bold">
                  ⚡
                </div>
                <div>
                  <h2 className="text-2xl font-extrabold text-[#1B4332]">
                    High Priority Rescue Dogs
                  </h2>
                  <p className="text-xs sm:text-sm text-[#59605B]">
                    These rescued dogs have extended shelter stays or specialized foster needs. Food, crates, and vet care are 100% sponsored.
                  </p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('adopt')}
                className="text-xs font-bold text-[#E76F51] hover:text-[#d05c3f] flex items-center gap-1 self-start sm:self-auto"
              >
                <span>View All Priority Dogs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {urgentDogs.map((pet) => (
                <PetCard
                  key={pet.id}
                  pet={pet}
                  onSelect={onSelectPet}
                  onApply={onApplyPet}
                  onQuickView={onQuickView}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. Featured Ready-for-Adoption Dogs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-[#2D6A4F] uppercase tracking-wider block">
              Meet Your Future Canine Companion
            </span>
            <h2 className="text-3xl font-extrabold text-[#1B4332] tracking-tight mt-1">
              Ready for Forever Homes
            </h2>
            <p className="text-sm text-[#59605B] mt-1 max-w-xl">
              Every dog at PawConnect is thoroughly evaluated by licensed veterinarians, behaviorally assessed, leash-trained, and fully up to date on all core vaccinations.
            </p>
          </div>

          <button
            onClick={() => onNavigate('adopt')}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-bold text-xs rounded-full transition-colors self-start md:self-auto"
          >
            <span>Explore All Dogs ({featuredDogs.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Pet Grid showing dogs only */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDogs.map((pet) => (
            <PetCard
              key={pet.id}
              pet={pet}
              onSelect={onSelectPet}
              onApply={onApplyPet}
              onQuickView={onQuickView}
            />
          ))}
        </div>

        {/* Bridge banner for other companion animals */}
        <div className="bg-[#F4EFEA] rounded-2xl p-6 sm:p-7 border border-[#E5DFD7] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold text-[#1B4332] flex items-center justify-center sm:justify-start gap-2">
              <span>Looking to Adopt Cats, Rabbits, Birds, or Small Pets?</span>
            </h4>
            <p className="text-xs text-[#59605B]">
              While dogs are the primary sanctuary focus, our adoption center also cares for rescued cats, bunnies, birds, and pocket pets.
            </p>
          </div>
          <button
            onClick={() => onNavigate('adopt')}
            className="px-5 py-2.5 bg-[#1B4332] hover:bg-[#2D6A4F] text-white text-xs font-bold rounded-full transition-colors whitespace-nowrap shadow-xs shrink-0"
          >
            Explore All Animals ({pets.length}) →
          </button>
        </div>
      </section>

      {/* 4. Transparent 4-Step Adoption Workflow */}
      <section className="bg-white py-16 border-y border-[#E5DFD7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-[#2D6A4F] uppercase tracking-wider block">
              Humane & Frictionless Journey
            </span>
            <h2 className="text-3xl font-extrabold text-[#1B4332]">
              How the Adoption Process Works
            </h2>
            <p className="text-sm text-[#59605B]">
              We believe in finding the right match, not creating endless hurdles. Our transparent four-step workflow ensures a happy, lifelong fit for both you and your pet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="p-6 bg-[#FDFBF7] rounded-2xl border border-[#E5DFD7] space-y-3 relative">
              <div className="w-12 h-12 rounded-xl bg-[#D8F3DC] text-[#1B4332] flex items-center justify-center font-bold text-lg">
                1
              </div>
              <h3 className="text-lg font-bold text-[#1B4332]">
                1. Browse & Match
              </h3>
              <p className="text-xs text-[#59605B] leading-relaxed">
                Review verified behavioral profiles, medical timelines, and compatibility indicators for children, dogs, and cats.
              </p>
            </div>

            <div className="p-6 bg-[#FDFBF7] rounded-2xl border border-[#E5DFD7] space-y-3 relative">
              <div className="w-12 h-12 rounded-xl bg-[#D8F3DC] text-[#1B4332] flex items-center justify-center font-bold text-lg">
                2
              </div>
              <h3 className="text-lg font-bold text-[#1B4332]">
                2. Fast Online Application
              </h3>
              <p className="text-xs text-[#59605B] leading-relaxed">
                Fill out our streamlined 3-minute form with your home environment and vet contact. We review applications within 24 hours.
              </p>
            </div>

            <div className="p-6 bg-[#FDFBF7] rounded-2xl border border-[#E5DFD7] space-y-3 relative">
              <div className="w-12 h-12 rounded-xl bg-[#D8F3DC] text-[#1B4332] flex items-center justify-center font-bold text-lg">
                3
              </div>
              <h3 className="text-lg font-bold text-[#1B4332]">
                3. Private Meet & Greet
              </h3>
              <p className="text-xs text-[#59605B] leading-relaxed">
                Spend unhurried time in our fenced play yard or cozy feline socialization room with your family members and existing pets.
              </p>
            </div>

            <div className="p-6 bg-[#FDFBF7] rounded-2xl border border-[#E5DFD7] space-y-3 relative">
              <div className="w-12 h-12 rounded-xl bg-[#D8F3DC] text-[#1B4332] flex items-center justify-center font-bold text-lg">
                4
              </div>
              <h3 className="text-lg font-bold text-[#1B4332]">
                4. Welcome Home
              </h3>
              <p className="text-xs text-[#59605B] leading-relaxed">
                Take home your new family member with full medical records, starter food pack, microchip registration, and 30 days of free insurance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Shelter Medical Rigor & Care Standards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#1B4332] text-white rounded-3xl p-8 sm:p-12 overflow-hidden shadow-warm-lg">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold text-[#74C69D] uppercase tracking-wider block">
              On-Site Veterinary Excellence
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Every Rescued Dog Receives Comprehensive Clinical Care.
            </h2>
            <p className="text-sm text-white/80 leading-relaxed max-w-xl">
              Unlike municipal facilities operating under strained budgets, PawConnect operates a fully equipped, donor-funded canine medical clinic. Every dog is examined, spayed/neutered, vaccinated, dewormed, heartworm-screened, and microchipped before adoption.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-[#74C69D] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Core Canine Vaccines</h4>
                  <p className="text-xs text-white/70">DHPP, Rabies, Bordetella & Lyme series.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-[#74C69D] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Spay & Neuter Surgery</h4>
                  <p className="text-xs text-white/70">Completed by certified veterinary surgeons.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-[#74C69D] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">ISO Microchipped</h4>
                  <p className="text-xs text-white/70">Lifetime nationwide canine registry included.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-[#74C69D] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Behavioral Therapy</h4>
                  <p className="text-xs text-white/70">Positive reinforcement leash & yard training.</p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => onNavigate('shelter')}
                className="px-6 py-3 bg-[#74C69D] hover:bg-[#85d7ad] text-[#1B4332] font-bold text-xs rounded-full transition-colors shadow-sm"
              >
                Inspect Live Shelter Hub & Dog Kennels
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-white/20 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=800&q=80"
                alt="Veterinary doctor examining a calm dog"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Success Stories / Community Proof */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#2D6A4F] uppercase tracking-wider block">
            Heartwarming Matches
          </span>
          <h2 className="text-3xl font-extrabold text-[#1B4332]">
            Stories from the Forever Dog Home Club
          </h2>
          <p className="text-sm text-[#59605B]">
            Over 1,800 rescued dogs have found their permanent families through PawConnect. Read how life changed for our alumni.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-[#E5DFD7] shadow-warm-sm space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                alt="Adopter Sarah Jenkins"
                className="w-12 h-12 rounded-full object-cover border border-[#E5DFD7]"
              />
              <div>
                <h4 className="text-sm font-bold text-[#1B4332]">Sarah & &quot;Mochi&quot;</h4>
                <p className="text-xs text-[#59605B]">Rescued Beagle Mix · Adopted 6 mos ago</p>
              </div>
            </div>
            <p className="text-xs text-[#2D312E] leading-relaxed italic">
              &quot;Mochi came from an emergency rescue seizure and was fearful of doorways. The PawConnect behavioral team provided us with a dedicated 4-week transition plan. Today, he greets everyone at the front door with a wagging tail!&quot;
            </p>
            <div className="pt-2 text-[11px] font-semibold text-[#2D6A4F]">
              Outcome: 100% Rehabilitated & Thriving
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-[#E5DFD7] shadow-warm-sm space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                alt="Adopter David Chen"
                className="w-12 h-12 rounded-full object-cover border border-[#E5DFD7]"
              />
              <div>
                <h4 className="text-sm font-bold text-[#1B4332]">David & &quot;Cooper&quot;</h4>
                <p className="text-xs text-[#59605B]">Golden Mix · Adopted 1 year ago</p>
              </div>
            </div>
            <p className="text-xs text-[#2D312E] leading-relaxed italic">
              &quot;The transparent medical timeline in the app made everything so straightforward. Every canine vaccine and hip check was logged with the vet&apos;s notes. We couldn&apos;t ask for a sweeter companion for our daughter.&quot;
            </p>
            <div className="pt-2 text-[11px] font-semibold text-[#2D6A4F]">
              Outcome: Certified Family Companion
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-[#E5DFD7] shadow-warm-sm space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80"
                alt="Foster Parent Elena"
                className="w-12 h-12 rounded-full object-cover border border-[#E5DFD7]"
              />
              <div>
                <h4 className="text-sm font-bold text-[#1B4332]">The Thorne Family</h4>
                <p className="text-xs text-[#59605B]">Senior Dog Foster Guardians</p>
              </div>
            </div>
            <p className="text-xs text-[#2D312E] leading-relaxed italic">
              &quot;Fostering senior dogs through PawConnect gives older canines the dignified, peaceful environment and soft orthopedic beds they deserve outside the shelter. The staff supplies all food, joint chews, and medications right to our door.&quot;
            </p>
            <div className="pt-2 text-[11px] font-semibold text-[#2D6A4F]">
              Outcome: 14 Senior Dogs Comfortably Placed
            </div>
          </div>
        </div>
      </section>

      {/* 7. Call to Action / Help the Shelter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F4EFEA] border border-[#E5DFD7] rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-[#1B4332] text-white flex items-center justify-center mx-auto shadow-warm-sm">
            <Heart className="w-7 h-7 text-[#D8F3DC] fill-[#D8F3DC]" />
          </div>
          <div className="max-w-xl mx-auto space-y-2">
            <h2 className="text-3xl font-extrabold text-[#1B4332]">
              Can&apos;t Adopt Right Now? You Can Still Save a Life.
            </h2>
            <p className="text-sm text-[#59605B]">
              Whether by opening your guest room for a weekend foster, walking dogs on Saturdays, or sponsoring a medical surgery fund, every contribution directly protects animals.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('foster')}
              className="px-6 py-3 bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-bold text-xs rounded-full transition-colors shadow-sm"
            >
              Sign Up to Volunteer / Foster
            </button>
            <button
              onClick={() => onNavigate('donate')}
              className="px-6 py-3 bg-white hover:bg-[#FDFBF7] text-[#1B4332] font-bold text-xs rounded-full border border-[#E5DFD7] transition-colors"
            >
              Make a Tax-Deductible Donation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
