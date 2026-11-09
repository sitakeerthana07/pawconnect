import React from 'react';
import { Pet } from '../types';
import { Heart, ShieldCheck, MapPin, Sparkles, AlertCircle } from 'lucide-react';

interface PetCardProps {
  pet: Pet;
  onSelect: (pet: Pet) => void;
  onApply: (pet: Pet) => void;
  onQuickView?: (pet: Pet) => void;
}

export const PetCard: React.FC<PetCardProps> = ({
  pet,
  onSelect,
  onApply,
  onQuickView,
}) => {
  const getStatusBadge = () => {
    switch (pet.status) {
      case 'urgent':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FCECE8] text-[#E76F51] border border-[#E76F51]/20 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E76F51] animate-pulse" />
            URGENT RESCUE
          </span>
        );
      case 'foster':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[#F4EFEA] text-[#59605B] border border-[#E5DFD7]">
            IN FOSTER CARE
          </span>
        );
      case 'available':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-[#D8F3DC] text-[#1B4332] border border-[#74C69D]/30">
            READY FOR ADOPTION
          </span>
        );
    }
  };

  return (
    <div className="group bg-white rounded-2xl border border-[#E5DFD7] overflow-hidden shadow-warm-sm hover:shadow-warm-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Image Container with 4:3 ratio and gradient scrim */}
        <div className="relative aspect-[4/3] w-full bg-[#F4EFEA] overflow-hidden">
          <img
            src={pet.primaryImage}
            alt={`${pet.name} - ${pet.breed}`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              // Graceful fallback to styled neutral illustration container
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80';
            }}
          />
          {/* Subtle gradient scrim for badge legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

          {/* Top badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
            <div>{getStatusBadge()}</div>
            <div className="bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold text-[#1B4332] border border-white/40 shadow-xs">
              Kennel {pet.kennelId}
            </div>
          </div>

          {/* Quick View overlay button */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onQuickView) onQuickView(pet);
                else onSelect(pet);
              }}
              className="px-3 py-1.5 bg-white/95 text-[#1B4332] hover:bg-white text-xs font-bold rounded-lg shadow-sm border border-[#E5DFD7] flex items-center gap-1.5 transition-colors"
            >
              <span>Quick Preview</span>
            </button>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-3.5">
          {/* Name & Basic Info */}
          <div>
            <div className="flex items-baseline justify-between gap-2">
              <h3
                onClick={() => onSelect(pet)}
                className="text-xl font-bold text-[#1B4332] hover:text-[#2D6A4F] cursor-pointer transition-colors"
              >
                {pet.name}
              </h3>
              <span className="text-xs font-semibold text-[#59605B]">
                {pet.age} · {pet.gender === 'male' ? 'Male ♂' : 'Female ♀'}
              </span>
            </div>
            <p className="text-xs text-[#59605B] mt-0.5 line-clamp-1 font-medium">
              {pet.breed}
            </p>
          </div>

          {/* Urgent reason callout if applicable */}
          {pet.urgentReason && (
            <div className="p-2.5 bg-[#FCECE8] rounded-xl text-xs text-[#E76F51] flex items-start gap-2 border border-[#E76F51]/20">
              <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span className="font-medium leading-snug">{pet.urgentReason}</span>
            </div>
          )}

          {/* Story Snippet */}
          <p className="text-xs text-[#2D312E]/80 line-clamp-2 leading-relaxed">
            {pet.story}
          </p>

          {/* Attribute chips */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {pet.isVaccinated && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2D6A4F] bg-white border border-[#D0E4D7] px-2.5 py-0.5 rounded-full">
                <ShieldCheck className="w-3 h-3 text-[#74C69D]" />
                Vaccinated
              </span>
            )}
            {pet.isSpayedNeutered && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2D6A4F] bg-white border border-[#D0E4D7] px-2.5 py-0.5 rounded-full">
                Spayed/Neutered
              </span>
            )}
            {pet.goodWithKids && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2D6A4F] bg-white border border-[#D0E4D7] px-2.5 py-0.5 rounded-full">
                Good with Kids
              </span>
            )}
            {pet.goodWithCats && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2D6A4F] bg-white border border-[#D0E4D7] px-2.5 py-0.5 rounded-full">
                Cat Friendly
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="px-5 pb-5 pt-3 border-t border-[#E5DFD7] flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] uppercase font-bold text-[#59605B] block">
            Adoption Fee
          </span>
          <span className="text-base font-extrabold text-[#1B4332] tabular-nums">
            ${pet.adoptionFee}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelect(pet)}
            className="px-3 py-2 text-xs font-bold text-[#2D312E] bg-[#F4EFEA] hover:bg-[#ecefea] rounded-lg transition-colors border border-[#E5DFD7]"
          >
            Full Profile
          </button>
          <button
            onClick={() => onApply(pet)}
            className="px-3.5 py-2 text-xs font-bold text-white bg-[#1B4332] hover:bg-[#2D6A4F] rounded-lg transition-colors shadow-xs"
          >
            Apply to Adopt
          </button>
        </div>
      </div>
    </div>
  );
};
