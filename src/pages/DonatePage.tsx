import React, { useState } from 'react';
import { 
  Heart, 
  ShieldCheck, 
  CheckCircle, 
  Sparkles, 
  Award, 
  FileCheck, 
  DollarSign, 
  Lock,
  ArrowRight
} from 'lucide-react';

export const DonatePage: React.FC = () => {
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('monthly');
  const [fund, setFund] = useState<string>('emergency-medical');
  const [donorName, setDonorName] = useState<string>('');
  const [donorEmail, setDonorEmail] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [receiptCode, setReceiptCode] = useState<string>('');

  const tiers = [
    {
      amount: 25,
      impact: 'Feeds a shelter dog or cat nourishing food for 2 full weeks.',
    },
    {
      amount: 50,
      impact: 'Provides core DHPP/FVRCP vaccinations, rabies, and ISO microchip.',
    },
    {
      amount: 150,
      impact: 'Covers full spay/neuter surgery and pain management by staff veterinarians.',
    },
    {
      amount: 500,
      impact: 'Funds an emergency orthopedic or dental surgery for an injured rescue.',
    },
  ];

  const effectiveAmount = customAmount ? parseFloat(customAmount) || 0 : selectedAmount;

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    if (effectiveAmount <= 0) return;
    const code = `TAX-501C3-${Math.floor(100000 + Math.random() * 900000)}`;
    setReceiptCode(code);
    setIsSuccess(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-[#2D6A4F] uppercase tracking-wider block">
          Support PawConnect
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1B4332] tracking-tight">
          Help Every Rescued Pet Heal & Find Love
        </h1>
        <p className="text-sm text-[#59605B]">
          100% of public donations go directly to veterinary medications, nutritious food, clean shelter suites, and emergency rescue deployments.
        </p>
      </div>

      {/* Main Donation Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Donation Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E5DFD7] shadow-warm-sm space-y-6">
          {isSuccess ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#D8F3DC] text-[#1B4332] flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle className="w-10 h-10 text-[#2D6A4F]" />
              </div>

              <h3 className="text-2xl font-extrabold text-[#1B4332]">
                Thank You for Your Compassion!
              </h3>
              <p className="text-sm text-[#59605B] max-w-md mx-auto">
                Your tax-deductible contribution of{' '}
                <strong className="text-[#1B4332] font-bold">
                  ${effectiveAmount} ({frequency === 'monthly' ? 'Monthly Guardian' : 'One-Time'})
                </strong>{' '}
                has been processed. You have directly safeguarded vulnerable animals today.
              </p>

              <div className="bg-[#FDFBF7] p-4 rounded-xl border border-[#E5DFD7] max-w-sm mx-auto text-left text-xs space-y-1">
                <div className="font-bold text-[#1B4332]">501(c)(3) Receipt Reference:</div>
                <div className="font-mono text-sm text-[#2D6A4F]">{receiptCode}</div>
                <div className="text-[11px] text-[#59605B]">
                  EIN: 93-8472910 · Tax Exemption Confirmed
                </div>
              </div>

              <button
                onClick={() => setIsSuccess(false)}
                className="px-6 py-2.5 bg-[#1B4332] hover:bg-[#2D6A4F] text-white text-xs font-bold rounded-lg transition-colors"
              >
                Make Another Contribution
              </button>
            </div>
          ) : (
            <form onSubmit={handleDonate} className="space-y-6">
              {/* Frequency Toggle */}
              <div className="flex items-center p-1 bg-[#F4EFEA] rounded-xl">
                <button
                  type="button"
                  onClick={() => setFrequency('monthly')}
                  className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${
                    frequency === 'monthly'
                      ? 'bg-white text-[#1B4332] shadow-xs'
                      : 'text-[#59605B] hover:text-[#1B4332]'
                  }`}
                >
                  ❤️ Monthly Guardian (Most Impact)
                </button>
                <button
                  type="button"
                  onClick={() => setFrequency('once')}
                  className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${
                    frequency === 'once'
                      ? 'bg-white text-[#1B4332] shadow-xs'
                      : 'text-[#59605B] hover:text-[#1B4332]'
                  }`}
                >
                  One-Time Gift
                </button>
              </div>

              {/* Preset Amounts */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#2D312E]">
                  Select Donation Level
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {tiers.map((t) => (
                    <button
                      key={t.amount}
                      type="button"
                      onClick={() => {
                        setSelectedAmount(t.amount);
                        setCustomAmount('');
                      }}
                      className={`p-3.5 rounded-xl border text-center transition-all ${
                        selectedAmount === t.amount && !customAmount
                          ? 'border-[#1B4332] bg-[#D8F3DC]/40 text-[#1B4332] font-extrabold ring-2 ring-[#74C69D]/30'
                          : 'border-[#E5DFD7] bg-[#FDFBF7] text-[#2D312E] hover:border-[#74C69D]'
                      }`}
                    >
                      <div className="text-xl font-extrabold tabular-nums">
                        ${t.amount}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Impact Statement corresponding to active selection */}
                <div className="p-3 bg-[#F4EFEA] rounded-xl text-xs text-[#1B4332] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#74C69D] shrink-0" />
                  <span>
                    {tiers.find((t) => t.amount === selectedAmount)?.impact ||
                      'Supports immediate animal triage and shelter warmth.'}
                  </span>
                </div>
              </div>

              {/* Custom Amount */}
              <div>
                <label className="block text-xs font-bold text-[#2D312E] mb-1">
                  Or Enter a Custom Amount ($ USD)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-[#59605B]">
                    $
                  </span>
                  <input
                    type="number"
                    min="5"
                    step="5"
                    placeholder="Other Amount"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-[#E5DFD7] text-sm focus:outline-none focus:border-[#2D6A4F]"
                  />
                </div>
              </div>

              {/* Fund Designation */}
              <div>
                <label className="block text-xs font-bold text-[#2D312E] mb-1">
                  Designate Your Gift To
                </label>
                <select
                  value={fund}
                  onChange={(e) => setFund(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-[#E5DFD7] text-sm focus:outline-none focus:border-[#2D6A4F]"
                >
                  <option value="emergency-medical">
                    Emergency Veterinary Surgery & Rehabilitation Fund
                  </option>
                  <option value="food-shelter">
                    Food, Warm Bedding & Daily Shelter Comfort
                  </option>
                  <option value="senior-sanctuary">
                    Senior & Special Needs Forever Sanctuary
                  </option>
                  <option value="general">Where Needed Most (Shelter Discretion)</option>
                </select>
              </div>

              {/* Donor info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#2D312E] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Morgan Lee"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#E5DFD7] text-sm focus:outline-none focus:border-[#2D6A4F]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2D312E] mb-1">
                    Email for Tax Receipt *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="morgan@example.com"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#E5DFD7] text-sm focus:outline-none focus:border-[#2D6A4F]"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-bold text-sm rounded-xl shadow-warm-md hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4 text-[#74C69D]" />
                  <span>
                    Complete Secure Gift of ${effectiveAmount}{' '}
                    {frequency === 'monthly' ? '/ Month' : ''}
                  </span>
                </button>
                <p className="text-center text-[11px] text-[#59605B] mt-2">
                  Encrypted 256-bit SSL donation. 100% tax-deductible under federal law.
                </p>
              </div>
            </form>
          )}
        </div>

        {/* Right: Transparency & Allocation Breakdown */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E5DFD7] shadow-warm-sm space-y-6">
            <h3 className="text-lg font-bold text-[#1B4332]">
              Where Every Dollar Goes
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between font-bold text-[#1B4332] mb-1">
                  <span>Veterinary & Critical Surgical Care</span>
                  <span>60%</span>
                </div>
                <div className="w-full h-2.5 bg-[#F4EFEA] rounded-full overflow-hidden">
                  <div className="h-full bg-[#1B4332] rounded-full w-[60%]" />
                </div>
                <p className="text-[11px] text-[#59605B] mt-1">
                  Diagnostics, surgeries, dental cleanings, and prescription medicines.
                </p>
              </div>

              <div>
                <div className="flex justify-between font-bold text-[#1B4332] mb-1">
                  <span>Daily Nutrition, Hygiene & Enrichment</span>
                  <span>25%</span>
                </div>
                <div className="w-full h-2.5 bg-[#F4EFEA] rounded-full overflow-hidden">
                  <div className="h-full bg-[#74C69D] rounded-full w-[25%]" />
                </div>
                <p className="text-[11px] text-[#59605B] mt-1">
                  Species-specific food, warm fleece blankets, toys, and sanitary suite upkeep.
                </p>
              </div>

              <div>
                <div className="flex justify-between font-bold text-[#1B4332] mb-1">
                  <span>Rescue Intake & Foster Support</span>
                  <span>15%</span>
                </div>
                <div className="w-full h-2.5 bg-[#F4EFEA] rounded-full overflow-hidden">
                  <div className="h-full bg-[#F4A261] rounded-full w-[15%]" />
                </div>
                <p className="text-[11px] text-[#59605B] mt-1">
                  Field rescue transport vehicles, foster food drop-offs, and microchip logistics.
                </p>
              </div>
            </div>

            <div className="p-4 bg-[#FDFBF7] rounded-2xl border border-[#E5DFD7] space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1B4332]">
                <ShieldCheck className="w-4 h-4 text-[#2D6A4F]" />
                <span>Charity Accountability & Trust</span>
              </div>
              <p className="text-[11px] text-[#59605B] leading-relaxed">
                PawConnect maintains a 4-Star Charity Navigator rating and GuideStar Platinum Seal of Transparency. Independent financial audits are published each year.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
