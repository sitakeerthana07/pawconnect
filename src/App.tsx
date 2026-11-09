import React, { useState } from 'react';
import { Pet, KennelRoom, AdoptionApplication } from './types';
import { INITIAL_PETS, INITIAL_KENNELS } from './data/mockPets';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AdoptPage } from './pages/AdoptPage';
import { PetDetailPage } from './pages/PetDetailPage';
import { ShelterOpsPage } from './pages/ShelterOpsPage';
import { FosterVolunteerPage } from './pages/FosterVolunteerPage';
import { DonatePage } from './pages/DonatePage';
import { ContactPage } from './pages/ContactPage';
import { AdoptionModal } from './components/AdoptionModal';
import { QuickViewModal } from './components/QuickViewModal';
import { PhpIntegrationModal } from './components/PhpIntegrationModal';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [pets, setPets] = useState<Pet[]>(INITIAL_PETS);
  const [kennels, setKennels] = useState<KennelRoom[]>(INITIAL_KENNELS);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [quickViewPet, setQuickViewPet] = useState<Pet | null>(null);
  
  // Modals
  const [isAdoptionModalOpen, setIsAdoptionModalOpen] = useState(false);
  const [isQuickViewModalOpen, setIsQuickViewModalOpen] = useState(false);
  const [isPhpGuideOpen, setIsPhpGuideOpen] = useState(false);

  // Applications tracking
  const [applications, setApplications] = useState<AdoptionApplication[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleNavigate = (page: string, petId?: string) => {
    if (page === 'pet-detail' && petId) {
      const found = pets.find((p) => p.id === petId);
      if (found) setSelectedPet(found);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPet = (pet: Pet) => {
    setSelectedPet(pet);
    setCurrentPage('pet-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplyPet = (pet: Pet) => {
    setSelectedPet(pet);
    setIsAdoptionModalOpen(true);
  };

  const handleQuickView = (pet: Pet) => {
    setQuickViewPet(pet);
    setIsQuickViewModalOpen(true);
  };

  const handleApplicationSuccess = (application: AdoptionApplication) => {
    setApplications((prev) => [application, ...prev]);
    showToast(`Adoption application for ${application.petName} submitted successfully! Reference: ${application.id}`);
  };

  const handleAddNewIntake = (newPet: Pet, kennelCode: string) => {
    setPets((prev) => [newPet, ...prev]);
    setKennels((prev) =>
      prev.map((k) =>
        k.code === kennelCode
          ? {
              ...k,
              status: 'occupied',
              currentPetId: newPet.id,
              currentPetName: newPet.name,
              currentPetSpecies: newPet.species,
              lastCleaned: 'Just now upon admission',
            }
          : k
      )
    );
    showToast(`Animal ${newPet.name} successfully admitted into Kennel ${kennelCode}!`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#2D312E] selection:bg-[#D8F3DC] selection:text-[#1B4332]">
      {/* Toast Feedback Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1B4332] text-white px-5 py-3 rounded-2xl shadow-warm-lg flex items-center gap-3 border border-[#74C69D]/40 animate-bounce">
          <span className="text-lg">🐾</span>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar adhering to Top Bar Contract */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenPhpGuide={() => setIsPhpGuideOpen(true)}
      />

      {/* Main Page Routing */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            pets={pets}
            onSelectPet={handleSelectPet}
            onApplyPet={handleApplyPet}
            onQuickView={handleQuickView}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'adopt' && (
          <AdoptPage
            pets={pets}
            onSelectPet={handleSelectPet}
            onApplyPet={handleApplyPet}
            onQuickView={handleQuickView}
          />
        )}

        {currentPage === 'pet-detail' && selectedPet && (
          <PetDetailPage
            pet={selectedPet}
            onBack={() => handleNavigate('adopt')}
            onApply={handleApplyPet}
          />
        )}

        {currentPage === 'shelter' && (
          <ShelterOpsPage
            pets={pets}
            kennels={kennels}
            onSelectPet={handleSelectPet}
            onAddNewIntake={handleAddNewIntake}
          />
        )}

        {currentPage === 'foster' && (
          <FosterVolunteerPage
            pets={pets}
            onSelectPet={handleSelectPet}
            onApplyPet={handleApplyPet}
          />
        )}

        {currentPage === 'donate' && <DonatePage />}

        {currentPage === 'contact' && <ContactPage />}
      </main>

      {/* Universal Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenPhpGuide={() => setIsPhpGuideOpen(true)}
      />

      {/* Modal Dialogs */}
      <AdoptionModal
        pet={selectedPet}
        isOpen={isAdoptionModalOpen}
        onClose={() => setIsAdoptionModalOpen(false)}
        onSubmitSuccess={handleApplicationSuccess}
      />

      <QuickViewModal
        pet={quickViewPet}
        isOpen={isQuickViewModalOpen}
        onClose={() => setIsQuickViewModalOpen(false)}
        onApply={handleApplyPet}
        onViewFullProfile={handleSelectPet}
      />

      <PhpIntegrationModal
        isOpen={isPhpGuideOpen}
        onClose={() => setIsPhpGuideOpen(false)}
      />
    </div>
  );
}
