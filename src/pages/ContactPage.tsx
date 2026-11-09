import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  AlertTriangle, 
  HelpCircle, 
  CheckCircle,
  MessageSquare
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('adoption-inquiry');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-[#2D6A4F] uppercase tracking-wider block">
          Visit & Connect
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1B4332] tracking-tight">
          Visit Our Animal Sanctuary
        </h1>
        <p className="text-sm text-[#59605B]">
          Meet our adoptable animals in person, drop off donations, or consult with our shelter team.
        </p>
      </div>

      {/* Main Contact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Hours, Location & Emergency Line */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E5DFD7] shadow-warm-sm space-y-6">
            <h3 className="text-lg font-bold text-[#1B4332]">
              Sanctuary Location & Hours
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#74C69D] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#1B4332] font-bold">
                    PawConnect Adoption Center & Clinic
                  </strong>
                  <span className="text-[#59605B]">
                    428 Meadowlands Sanctuary Way, Riverbend, OR 97401
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#74C69D] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#1B4332] font-bold">
                    Adoption Center Hours
                  </strong>
                  <span className="text-[#59605B]">Tuesday – Sunday: 11:00 AM – 6:00 PM</span>
                  <span className="block text-[#717973] text-[11px]">
                    (Closed Mondays for deep medical sanitation)
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#74C69D] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#1B4332] font-bold">
                    Main Reception & Helpline
                  </strong>
                  <a href="tel:5550192834" className="text-[#2D6A4F] hover:underline font-semibold">
                    (555) 019-PAWS (7297)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#74C69D] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#1B4332] font-bold">
                    Direct Email Inquiries
                  </strong>
                  <a href="mailto:adoptions@pawconnect.org" className="text-[#2D6A4F] hover:underline">
                    adoptions@pawconnect.org
                  </a>
                </div>
              </div>
            </div>

            {/* Emergency Hotline Box */}
            <div className="p-4 bg-[#FCECE8] rounded-2xl border border-[#E76F51]/30 space-y-1.5 text-xs text-[#E76F51]">
              <div className="font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>Found an Injured Animal or Stray?</span>
              </div>
              <p className="text-[#2D312E] leading-relaxed">
                If you encounter a companion animal in critical distress outside normal shelter hours, call our 24/7 Field Dispatch at{' '}
                <a href="tel:5550199911" className="font-bold text-[#E76F51] underline">
                  (555) 019-9911
                </a>.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E5DFD7] shadow-warm-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D8F3DC] text-[#1B4332] flex items-center justify-center font-bold">
              <MessageSquare className="w-5 h-5 text-[#2D6A4F]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#1B4332]">
                Send Us a Message
              </h3>
              <p className="text-xs text-[#59605B]">
                Adoption inquiries, surrender support, or community welfare questions.
              </p>
            </div>
          </div>

          {formSubmitted ? (
            <div className="text-center py-10 space-y-3 bg-[#FDFBF7] rounded-2xl border border-[#E5DFD7]">
              <CheckCircle className="w-12 h-12 text-[#2D6A4F] mx-auto" />
              <h4 className="text-lg font-bold text-[#1B4332]">
                Message Delivered!
              </h4>
              <p className="text-xs text-[#59605B] max-w-sm mx-auto">
                Thank you for getting in touch. An adoption coordinator or shelter manager will respond to your email within 24 hours.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="px-5 py-2 bg-[#1B4332] text-white text-xs font-bold rounded-lg mt-2"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#2D312E] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Robin Kelly"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    placeholder="robin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-[#E5DFD7] text-sm focus:outline-none focus:border-[#2D6A4F]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#2D312E] mb-1">
                  Inquiry Category
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-[#E5DFD7] text-sm focus:outline-none focus:border-[#2D6A4F]"
                >
                  <option value="adoption-inquiry">Specific Pet Adoption Inquiry</option>
                  <option value="foster-question">Foster Program Question</option>
                  <option value="lost-found">Report a Lost or Found Animal</option>
                  <option value="donation-inquiry">Donation & Estate Giving</option>
                  <option value="general">General Shelter Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#2D312E] mb-1">
                  Message Details *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="How can we assist you and your animal companion?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-[#E5DFD7] text-sm focus:outline-none focus:border-[#2D6A4F]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                Send Message to Shelter Team
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
