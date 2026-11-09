import React, { useState } from 'react';
import { Pet } from '../types';
import { 
  ArrowLeft, 
  Heart, 
  ShieldCheck, 
  Check, 
  X, 
  Calendar, 
  FileText, 
  Activity, 
  AlertCircle, 
  Share2, 
  Printer, 
  PhoneCall, 
  MapPin, 
  Award,
  Clock
} from 'lucide-react';

interface PetDetailPageProps {
  pet: Pet;
  onBack: () => void;
  onApply: (pet: Pet) => void;
}

export const PetDetailPage: React.FC<PetDetailPageProps> = ({
  pet,
  onBack,
  onApply,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  const images = pet.galleryImages && pet.galleryImages.length > 0 
    ? pet.galleryImages 
    : [pet.primaryImage];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Breadcrumb & Actions */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-[#1B4332] hover:bg-[#F4EFEA] rounded-lg transition-colors border border-[#E5DFD7]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Animals</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#59605B] hover:text-[#1B4332] bg-white border border-[#E5DFD7] rounded-lg transition-colors shadow-xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Link Copied!' : 'Share Profile'}</span>
          </button>
          <button
            onClick={() => window.print()}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#59605B] hover:text-[#1B4332] bg-white border border-[#E5DFD7] rounded-lg transition-colors shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Sheet</span>
          </button>
        </div>
      </div>

      {/* Main Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Multi-Photo Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-[#F4EFEA] border border-[#E5DFD7] shadow-warm-md">
            <img
              src={images[activeImageIndex]}
              alt={`${pet.name} photo`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-all duration-300"
            />
            {pet.status === 'urgent' && (
              <div className="absolute top-4 left-4 bg-[#FCECE8] text-[#E76F51] border border-[#E76F51]/30 px-3.5 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#E76F51] animate-pulse" />
                <span>URGENT FOSTER / RESCUE CASE</span>
              </div>
            )}
            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-mono">
              Kennel Suite: {pet.kennelId}
            </div>
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    activeImageIndex === idx
                      ? 'border-[#1B4332] ring-2 ring-[#74C69D]/30 scale-102'
                      : 'border-[#E5DFD7] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* About & Backstory */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5DFD7] shadow-warm-sm space-y-4">
            <h2 className="text-xl font-bold text-[#1B4332]">
              Meet {pet.name} & Their Story
            </h2>
            <p className="text-sm text-[#2D312E] leading-relaxed">
              {pet.story}
            </p>

            <div className="pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#59605B] mb-2">
                Temperament & Personality Highlights
              </h4>
              <div className="flex flex-wrap gap-2">
                {pet.personality.map((trait, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-[#F4EFEA] text-[#1B4332] text-xs font-bold rounded-full border border-[#E5DFD7]"
                  >
                    🐾 {trait}
                  </span>
                ))}
              </div>
            </div>

            {pet.urgentReason && (
              <div className="p-4 bg-[#FCECE8] rounded-xl border border-[#E76F51]/30 text-xs text-[#E76F51] flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Urgent Placement Need:</strong>
                  <span>{pet.urgentReason}</span>
                </div>
              </div>
            )}
          </div>

          {/* Compatibility Radar Card */}
          <div className="bg-white rounded-2xl p-6 border border-[#E5DFD7] shadow-warm-sm space-y-4">
            <h3 className="text-base font-bold text-[#1B4332]">
              Household Compatibility & Readiness Assessment
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 bg-[#FDFBF7] rounded-xl border border-[#E5DFD7] flex items-center justify-between">
                <span className="text-xs font-semibold text-[#59605B]">Good with Children</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  pet.goodWithKids ? 'bg-[#D8F3DC] text-[#1B4332]' : 'bg-[#F4EFEA] text-[#717973]'
                }`}>
                  {pet.goodWithKids ? '✓ Approved' : 'Adults Preferred'}
                </span>
              </div>
              <div className="p-3 bg-[#FDFBF7] rounded-xl border border-[#E5DFD7] flex items-center justify-between">
                <span className="text-xs font-semibold text-[#59605B]">Good with Other Dogs</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  pet.goodWithDogs ? 'bg-[#D8F3DC] text-[#1B4332]' : 'bg-[#F4EFEA] text-[#717973]'
                }`}>
                  {pet.goodWithDogs ? '✓ Dog Friendly' : 'Solo Dog Recommended'}
                </span>
              </div>
              <div className="p-3 bg-[#FDFBF7] rounded-xl border border-[#E5DFD7] flex items-center justify-between">
                <span className="text-xs font-semibold text-[#59605B]">Good with Cats</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  pet.goodWithCats ? 'bg-[#D8F3DC] text-[#1B4332]' : 'bg-[#FCECE8] text-[#E76F51]'
                }`}>
                  {pet.goodWithCats ? '✓ Feline Friendly' : 'No Cats'}
                </span>
              </div>
              <div className="p-3 bg-[#FDFBF7] rounded-xl border border-[#E5DFD7] flex items-center justify-between">
                <span className="text-xs font-semibold text-[#59605B]">House Training</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#D8F3DC] text-[#1B4332]">
                  {pet.isHouseTrained ? '✓ 100% Trained' : 'In Routine Training'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Key Details, Application CTA, and Pet Medical Timeline */}
        <div className="lg:col-span-5 space-y-6">
          {/* Main Info Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E5DFD7] shadow-warm-sm space-y-6 sticky top-24">
            <div>
              <div className="flex items-center justify-between gap-2">
                <h1 className="text-3xl font-extrabold text-[#1B4332] tracking-tight">
                  {pet.name}
                </h1>
                <div className="text-right">
                  <div className="text-[10px] uppercase font-bold text-[#59605B]">
                    Adoption Fee
                  </div>
                  <div className="text-2xl font-extrabold text-[#1B4332] tabular-nums">
                    ${pet.adoptionFee}
                  </div>
                </div>
              </div>
              <p className="text-sm font-semibold text-[#59605B] mt-0.5">{pet.breed}</p>
            </div>

            {/* Vital Data Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs border-y border-[#E5DFD7] py-4">
              <div className="p-2.5 bg-[#FDFBF7] rounded-lg">
                <span className="text-[#59605B] block font-medium">Age:</span>
                <span className="font-bold text-[#1B4332]">{pet.age}</span>
              </div>
              <div className="p-2.5 bg-[#FDFBF7] rounded-lg">
                <span className="text-[#59605B] block font-medium">Gender:</span>
                <span className="font-bold text-[#1B4332]">
                  {pet.gender === 'male' ? 'Male (Neutered)' : 'Female (Spayed)'}
                </span>
              </div>
              <div className="p-2.5 bg-[#FDFBF7] rounded-lg">
                <span className="text-[#59605B] block font-medium">Weight:</span>
                <span className="font-bold text-[#1B4332]">{pet.weight}</span>
              </div>
              <div className="p-2.5 bg-[#FDFBF7] rounded-lg">
                <span className="text-[#59605B] block font-medium">Kennel Suite:</span>
                <span className="font-bold text-[#1B4332]">{pet.kennelId}</span>
              </div>
              <div className="p-2.5 bg-[#FDFBF7] rounded-lg">
                <span className="text-[#59605B] block font-medium">Intake Date:</span>
                <span className="font-bold text-[#1B4332]">{pet.intakeDate}</span>
              </div>
              <div className="p-2.5 bg-[#FDFBF7] rounded-lg">
                <span className="text-[#59605B] block font-medium">Microchip ID:</span>
                <span className="font-bold text-[#1B4332] truncate font-mono text-[11px]">
                  {pet.microchipId}
                </span>
              </div>
            </div>

            {/* Apply Button */}
            <div className="space-y-3">
              <button
                onClick={() => onApply(pet)}
                className="w-full py-3.5 bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-bold text-sm rounded-xl shadow-warm-md hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Submit Adoption Application for {pet.name}</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-[#59605B]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2D6A4F]" />
                <span>No fee required to apply · 24hr response time</span>
              </div>
            </div>

            {/* Medical Timeline - Exactly following the design system specs! */}
            <div className="pt-4 border-t border-[#E5DFD7] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#1B4332] flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-[#74C69D]" />
                    <span>Pet Medical & Shelter Timeline</span>
                  </h3>
                  <p className="text-[11px] text-[#59605B]">
                    Verified veterinary records from our on-site clinic.
                  </p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D8F3DC] text-[#1B4332]">
                  100% Core Complete
                </span>
              </div>

              {/* Vertical list rhythm with 16px indicator rail */}
              <div className="relative pl-6 space-y-4 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E5DFD7]">
                {pet.medicalTimeline.map((item) => (
                  <div key={item.id} className="relative group">
                    {/* Status indicator on the rail */}
                    {item.status === 'completed' ? (
                      <div className="absolute -left-6 top-1.5 w-4.5 h-4.5 rounded-full bg-[#1B4332] text-white flex items-center justify-center text-[10px] ring-4 ring-[#FDFBF7]">
                        ✓
                      </div>
                    ) : item.status === 'scheduled' ? (
                      <div className="absolute -left-6 top-1.5 w-4.5 h-4.5 rounded-full bg-[#F4A261] text-white flex items-center justify-center text-[10px] ring-4 ring-[#FDFBF7]">
                        ●
                      </div>
                    ) : (
                      <div className="absolute -left-6 top-1.5 w-4.5 h-4.5 rounded-full bg-[#E76F51] text-white flex items-center justify-center text-[10px] ring-4 ring-[#FDFBF7]">
                        !
                      </div>
                    )}

                    {/* Item body in rounded-md white card over cream base canvas */}
                    <div className="bg-[#FDFBF7] p-3.5 rounded-xl border border-[#E5DFD7] hover:border-[#74C69D] transition-colors space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-[#1B4332]">
                          {item.title}
                        </span>
                        <span className="text-[10px] font-mono text-[#59605B]">
                          {item.date}
                        </span>
                      </div>
                      <div className="text-[11px] font-medium text-[#2D6A4F]">
                        {item.veterinarian}
                      </div>
                      <p className="text-[11px] text-[#2D312E]/80 leading-normal">
                        {item.notes}
                      </p>
                      <div className="pt-1 flex items-center justify-between text-[10px]">
                        <span className="capitalize font-semibold text-[#59605B]">
                          Category: {item.category}
                        </span>
                        <span
                          className={`font-bold ${
                            item.status === 'completed'
                              ? 'text-[#2D6A4F]'
                              : 'text-[#E76F51]'
                          }`}
                        >
                          {item.status === 'completed' ? 'Verified Done' : 'Scheduled Ahead'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
