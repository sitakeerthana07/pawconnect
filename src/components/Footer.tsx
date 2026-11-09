import React from 'react';
import { Heart, MapPin, Phone, Mail, Clock, ShieldCheck, Database } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
  onOpenPhpGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPhpGuide }) => {
  return (
    <footer className="bg-[#1B4332] text-white pt-16 pb-12 border-t border-[#1b4332]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/15">
          {/* Col 1: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#2D6A4F] text-[#D8F3DC] flex items-center justify-center font-bold">
                🐾
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                PawConnect
              </span>
            </div>
            <p className="text-sm text-white/80 max-w-sm leading-relaxed">
              PawConnect Animal Welfare is a non-profit companion animal rescue, veterinary shelter, and foster network dedicated to zero-euthanasia care, compassionate rehabilitation, and lifetime family matches.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-[#D8F3DC]">
              <ShieldCheck className="w-4 h-4 text-[#74C69D]" />
              <span>Registered 501(c)(3) Public Animal Welfare Organization</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Adopt & Foster
            </h4>
            <ul className="space-y-2 text-sm text-white/75">
              <li>
                <button
                  onClick={() => onNavigate('adopt')}
                  className="hover:text-white transition-colors"
                >
                  Available Dogs & Cats
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('adopt')}
                  className="hover:text-white transition-colors"
                >
                  Urgent Rescue Cases
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('foster')}
                  className="hover:text-white transition-colors"
                >
                  Emergency Foster Drive
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shelter')}
                  className="hover:text-white transition-colors"
                >
                  Shelter Operations Hub
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('donate')}
                  className="hover:text-white transition-colors"
                >
                  Sponsor a Medical Patient
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Shelter Hours & Visiting */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Shelter Hours
            </h4>
            <ul className="space-y-2 text-sm text-white/75">
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#74C69D] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-white">Adoption Visits:</span>
                  <span>Tue – Sun: 11:00 AM – 6:00 PM</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#74C69D] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-white">Intake & Vet Clinic:</span>
                  <span>Mon – Sat: 8:00 AM – 5:00 PM</span>
                </div>
              </li>
              <li className="text-xs text-[#D8F3DC]/80 pt-1">
                Walk-ins welcome; pre-scheduled appointments prioritize meet-and-greets.
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Help */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Rescue Center
            </h4>
            <div className="space-y-2.5 text-sm text-white/75">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#74C69D] shrink-0 mt-0.5" />
                <span>428 Meadowlands Sanctuary Way, Riverbend, OR 97401</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#74C69D] shrink-0" />
                <a href="tel:5550192834" className="hover:text-white">
                  (555) 019-PAWS (7297)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#74C69D] shrink-0" />
                <a href="mailto:adoptions@pawconnect.org" className="hover:text-white">
                  adoptions@pawconnect.org
                </a>
              </div>
              <div className="pt-2">
                <button
                  onClick={onOpenPhpGuide}
                  className="flex items-center gap-1.5 text-xs text-[#D8F3DC] bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-md transition-colors"
                >
                  <Database className="w-3.5 h-3.5 text-[#74C69D]" />
                  <span>PHP / MySQL (XAMPP Ready)</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div>
            © {new Date().getFullYear()} PawConnect Animal Welfare Society. Dedicated to humane companion animal advocacy.
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
              Terms of Adoption
            </button>
            <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
              Intake Protocol
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
