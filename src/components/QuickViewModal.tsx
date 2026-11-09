import React from 'react';
import { Pet } from '../types';
import { X, Heart, ShieldCheck, MapPin, Sparkles, Check, AlertCircle } from 'lucide-react';

interface QuickViewModalProps {
  pet: Pet | null;
  isOpen: boolean;
  onClose: () => void;
  onApply: (pet: Pet) => void;
  onViewFullProfile: (pet: Pet) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  pet,
  isOpen,
  onClose,
  onApply,
  onViewFullProfile,
}) => {
  if (!isOpen || !pet) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1B4332]/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl border border-[#E5DFD7] shadow-warm-lg overflow-hidden max-h-[90vh] flex flex-col">
        {/* Top bar */}
        <div className="p-4 border-b border-[#E5DFD7] flex items-center justify-between bg-[#FDFBF7]">
          <div className="flex items-center gap-2 text-xs font-bold text-[#1B4332]">
            <span className="w-2 h-2 rounded-full bg-[#74C69D]" />
            <span>Pet Quick Snapshot</span>
            <span className="text-[#59605B]">· Kennel {pet.kennelId}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#59605B] hover:text-[#1B4332] hover:bg-[#F4EFEA] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
            <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-[#F4EFEA]">
              <img
                src={pet.primaryImage}
                alt={pet.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-3">
              <div>
                <h2 className="text-2xl font-bold text-[#1B4332]">{pet.name}</h2>
                <p className="text-sm text-[#59605B] font-medium">{pet.breed}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-[#F4EFEA] rounded-lg">
                  <span className="text-[#59605B] block font-medium">Age:</span>
                  <span className="font-bold text-[#1B4332]">{pet.age}</span>
                </div>
                <div className="p-2.5 bg-[#F4EFEA] rounded-lg">
                  <span className="text-[#59605B] block font-medium">Weight:</span>
                  <span className="font-bold text-[#1B4332]">{pet.weight}</span>
                </div>
                <div className="p-2.5 bg-[#F4EFEA] rounded-lg">
                  <span className="text-[#59605B] block font-medium">Gender:</span>
                  <span className="font-bold text-[#1B4332]">
                    {pet.gender === 'male' ? 'Male' : 'Female'}
                  </span>
                </div>
                <div className="p-2.5 bg-[#F4EFEA] rounded-lg">
                  <span className="text-[#59605B] block font-medium">Energy:</span>
                  <span className="font-bold text-[#1B4332] capitalize">
                    {pet.energyLevel}
                  </span>
                </div>
              </div>

              {/* Status note */}
              {pet.urgentReason && (
                <div className="p-2.5 bg-[#FCECE8] rounded-xl text-xs text-[#E76F51] flex items-start gap-2 border border-[#E76F51]/20">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>{pet.urgentReason}</span>
                </div>
              )}
            </div>
          </div>

          {/* Story & Personality */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1B4332]">
              About {pet.name}
            </h4>
            <p className="text-xs leading-relaxed text-[#2D312E]/90">{pet.story}</p>
          </div>

          {/* Compatibility traits */}
          <div className="p-4 bg-[#FDFBF7] rounded-xl border border-[#E5DFD7] space-y-2">
            <h4 className="text-xs font-bold text-[#1B4332]">Home Compatibility</h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-[#2D312E]">
              <div className="flex items-center gap-1.5">
                <Check className={`w-3.5 h-3.5 ${pet.goodWithKids ? 'text-[#2D6A4F]' : 'text-[#717973]'}`} />
                <span>Good with Children: {pet.goodWithKids ? 'Yes' : 'Adults Preferred'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className={`w-3.5 h-3.5 ${pet.goodWithDogs ? 'text-[#2D6A4F]' : 'text-[#717973]'}`} />
                <span>Good with Dogs: {pet.goodWithDogs ? 'Yes' : 'Single Dog Home'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className={`w-3.5 h-3.5 ${pet.goodWithCats ? 'text-[#2D6A4F]' : 'text-[#717973]'}`} />
                <span>Good with Cats: {pet.goodWithCats ? 'Yes' : 'No Cats'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#2D6A4F]" />
                <span>House Trained: {pet.isHouseTrained ? 'Yes' : 'In Training'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-[#E5DFD7] bg-[#FDFBF7] flex items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              onViewFullProfile(pet);
            }}
            className="px-4 py-2 text-xs font-bold text-[#1B4332] hover:bg-[#F4EFEA] rounded-lg transition-colors border border-[#E5DFD7]"
          >
            Open Full Health & Medical Timeline →
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-2 text-xs font-semibold text-[#59605B] hover:text-[#2D312E]"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onApply(pet);
              }}
              className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-[#1B4332] hover:bg-[#2D6A4F] rounded-lg shadow-sm transition-colors"
            >
              <Heart className="w-3.5 h-3.5 fill-white" />
              <span>Apply to Adopt</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
