import React, { useState } from 'react';
import { Heart, Menu, X, Database, ShieldAlert, Sparkles, PhoneCall } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string, petId?: string) => void;
  onOpenPhpGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenPhpGuide,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'adopt', label: 'Adopt' },
    { id: 'shelter', label: 'Shelter Hub' },
    { id: 'foster', label: 'Foster & Help' },
    { id: 'donate', label: 'Donate' },
    { id: 'contact', label: 'Visit Us' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#E5DFD7]">
      {/* Top Urgent Shelter Alert Strip */}
      <div className="bg-[#1B4332] text-white px-4 py-1.5 text-xs font-medium flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#E76F51]" />
            <span className="font-semibold text-[#D8F3DC]">URGENT FOSTER CALL:</span>
            <span className="hidden sm:inline text-white/90">
              3 large dogs and 1 senior cat need emergency foster care this week.
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => handleNavClick('foster')}
              className="text-[#D8F3DC] hover:text-white underline font-semibold whitespace-nowrap"
            >
              Learn More →
            </button>
            <span className="hidden md:inline text-white/40">|</span>
            <a
              href="tel:5550192834"
              className="hidden md:flex items-center gap-1 text-white/80 hover:text-white"
            >
              <PhoneCall className="w-3 h-3 text-[#74C69D]" />
              <span>(555) 019-PAWS</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract: Brand | Links | Action */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-8">
          {/* Brand Zone */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left text-[#1B4332] hover:opacity-90 transition-opacity whitespace-nowrap shrink-0 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#1B4332] text-white flex items-center justify-center shadow-warm-sm group-hover:bg-[#2D6A4F] transition-colors">
              {/* Custom Warm Paw Icon */}
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-[#D8F3DC]"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-[#1B4332] block leading-none">
                PawConnect
              </span>
              <span className="text-[11px] font-semibold text-[#59605B] tracking-wider uppercase block mt-0.5">
                Animal Welfare
              </span>
            </div>
          </button>

          {/* Nav Links Zone (Desktop) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#59605B]">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors whitespace-nowrap py-1 relative ${
                  currentPage === link.id
                    ? 'text-[#1B4332] font-bold'
                    : 'hover:text-[#1B4332]'
                }`}
              >
                {link.label}
                {currentPage === link.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1B4332] rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Action Zone */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Developer XAMPP / PHP Helper button */}
            <button
              onClick={onOpenPhpGuide}
              title="PHP & MySQL XAMPP Integration Schema"
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#1B4332] bg-[#D8F3DC] hover:bg-[#a0f4c8] rounded-lg transition-colors border border-[#74C69D]/30"
            >
              <Database className="w-3.5 h-3.5 text-[#1B4332]" />
              <span>PHP / MySQL Schema</span>
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => handleNavClick('adopt')}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-[#1B4332] hover:bg-[#2D6A4F] rounded-full transition-all shadow-warm-sm hover:shadow-warm-md hover:-translate-y-0.5 active:translate-y-0"
            >
              <Heart className="w-4 h-4 fill-white text-white" />
              <span className="whitespace-nowrap">Find a Pet</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden text-[#2D312E] hover:bg-[#F4EFEA] rounded-lg transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#E5DFD7] px-4 pt-3 pb-6 shadow-warm-lg">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-3 py-2.5 rounded-lg text-base font-semibold transition-colors ${
                  currentPage === link.id
                    ? 'bg-[#D8F3DC] text-[#1B4332]'
                    : 'text-[#2D312E] hover:bg-[#F4EFEA]'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="pt-3 border-t border-[#E5DFD7] flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPhpGuide();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#1B4332] bg-[#D8F3DC] rounded-lg border border-[#74C69D]/30"
              >
                <Database className="w-4 h-4" />
                <span>View PHP / MySQL Backend Code</span>
              </button>

              <button
                onClick={() => handleNavClick('adopt')}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-white bg-[#1B4332] rounded-full shadow-warm-sm"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Browse Available Animals</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
