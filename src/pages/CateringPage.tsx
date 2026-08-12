import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { LOCATIONS } from '../data/chickenTownData';
import { Gift, Calendar, Users, MapPin, User, Phone, MessageSquare, Sparkles, CheckCircle } from 'lucide-react';
import { StickerBadge } from '../components/StickerBadge';

export const CateringPage: React.FC = () => {
  const { activeBranch } = useCart();

  const [eventDate, setEventDate] = useState('');
  const [guestCount, setGuestCount] = useState('50 Guests');
  const [preferredBranchId, setPreferredBranchId] = useState(activeBranch.id);
  const [eventType, setEventType] = useState('Beach Jam / Party');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [menuPackageNote, setMenuPackageNote] = useState('');

  const selectedBranchObj = LOCATIONS.find((b) => b.id === preferredBranchId) || activeBranch;

  const handleCateringSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let msg = `🍗 *CHICKEN TOWN - CATERING & EVENT ENQUIRY* 🍗\n`;
    msg += `_Swit u Mot Swit u Lyf!_\n`;
    msg += `----------------------------------\n`;
    msg += `👤 *Contact Name:* ${contactName || 'Valued Client'}\n`;
    msg += `📞 *Phone / WhatsApp:* ${phone || 'Not provided'}\n`;
    msg += `📅 *Event Date:* ${eventDate || 'To be determined'}\n`;
    msg += `👥 *Guest Count:* ${guestCount}\n`;
    msg += `🎉 *Event Type:* ${eventType}\n`;
    msg += `📍 *Preferred Branch:* ${selectedBranchObj.name} (${selectedBranchObj.landmark})\n`;
    msg += `----------------------------------\n`;
    msg += `📝 *Menu Request / Details:*\n${menuPackageNote || 'Custom bulk chicken party order.'}\n`;
    msg += `----------------------------------\n`;
    msg += `Sent from Chicken Town Web App 🚀`;

    const rawNumber = selectedBranchObj.whatsapp.replace(/\D/g, '') || '23276111222';
    const waUrl = `https://wa.me/${rawNumber}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6 pb-24">
      {/* Title Header */}
      <div className="bg-[#1A1A1A] text-[#F5F0E8] p-6 rounded-3xl border-b-4 border-[#C41E2A] shadow-xl space-y-2">
        <div className="inline-flex items-center gap-2 bg-[#262626] border border-[#F2B705] px-3 py-1 rounded-full text-xs font-bold text-[#F2B705]">
          <Sparkles className="w-4 h-4 text-[#C41E2A]" /> Bulk Party & Corporate Events
        </div>
        <h1 className="text-3xl font-black font-[Impact,sans-serif] uppercase tracking-wide">
          Chicken Town Catering 🎁
        </h1>
        <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
          Hosting a beach jam at Aberdeen, wedding, corporate feast, or family reunion? We deliver hot, crispy chicken buckets and Jollof trays direct to your event!
        </p>
      </div>

      {/* Catering Packages Showcase */}
      <div className="space-y-3">
        <h2 className="text-xl font-black text-[#1A1A1A] font-[Impact,sans-serif] uppercase tracking-wide">
          Popular Event Packages 🍗
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              title: 'Beach Jam Pack',
              guests: '20 - 40 Guests',
              items: '100 Wings, 40 Strips, 4 Large Fries & Dips',
              badge: 'POPULAR',
            },
            {
              title: 'Krio Party Bucket',
              guests: '50 - 100 Guests',
              items: '15 Whole Fowls (Cut), 2 Large Jollof Trays, Dodo',
              badge: 'BEST VALUE',
            },
            {
              title: 'Executive Feast',
              guests: '100+ Guests',
              items: 'Custom Wings, Wraps, Jollof, Yam Chips & Drinks',
              badge: 'CUSTOM',
            },
          ].map((pkg, i) => (
            <div
              key={i}
              className="bg-[#1A1A1A] border-2 border-gray-800 p-4 rounded-2xl text-[#F5F0E8] space-y-2 relative"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-[#F2B705]">{pkg.title}</h3>
                <StickerBadge label={pkg.badge} variant="red" size="sm" />
              </div>
              <div className="text-xs font-extrabold text-gray-300 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#C41E2A]" /> {pkg.guests}
              </div>
              <p className="text-[11px] text-gray-400">{pkg.items}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Catering Form */}
      <div className="bg-[#1A1A1A] text-[#F5F0E8] rounded-3xl p-5 sm:p-7 border-2 border-[#C41E2A] shadow-2xl space-y-5">
        <h2 className="text-xl font-black font-[Impact,sans-serif] uppercase text-[#F2B705] tracking-wide border-b border-gray-800 pb-3">
          Request Catering Quote via WhatsApp 💬
        </h2>

        <form onSubmit={handleCateringSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Contact Name */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#F2B705]" /> Full Contact Name
              </label>
              <input
                type="text"
                required
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="e.g. Alpha Touray"
                className="w-full bg-[#262626] border border-gray-800 focus:border-[#C41E2A] rounded-xl p-3 text-xs text-[#F5F0E8] outline-none"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-[#F2B705]" /> Phone / WhatsApp
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +232 76 999 000"
                className="w-full bg-[#262626] border border-gray-800 focus:border-[#C41E2A] rounded-xl p-3 text-xs text-[#F5F0E8] outline-none"
              />
            </div>

            {/* Event Date */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#C41E2A]" /> Event Date
              </label>
              <input
                type="date"
                required
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full bg-[#262626] border border-gray-800 focus:border-[#C41E2A] rounded-xl p-3 text-xs text-[#F5F0E8] outline-none"
              />
            </div>

            {/* Guest Count */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#F2B705]" /> Estimated Guests
              </label>
              <select
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                className="w-full bg-[#262626] border border-gray-800 focus:border-[#C41E2A] rounded-xl p-3 text-xs text-[#F5F0E8] outline-none"
              >
                <option>20 - 35 Guests</option>
                <option>35 - 75 Guests</option>
                <option>75 - 150 Guests</option>
                <option>150 - 300 Guests</option>
                <option>300+ Guests (Major Event)</option>
              </select>
            </div>

            {/* Preferred Branch */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#C41E2A]" /> Nearest Branch
              </label>
              <select
                value={preferredBranchId}
                onChange={(e) => setPreferredBranchId(e.target.value)}
                className="w-full bg-[#262626] border border-gray-800 focus:border-[#C41E2A] rounded-xl p-3 text-xs text-[#F5F0E8] outline-none"
              >
                {LOCATIONS.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name} ({loc.landmark})
                  </option>
                ))}
              </select>
            </div>

            {/* Event Type */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
                <Gift className="w-4 h-4 text-[#F2B705]" /> Event Type
              </label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full bg-[#262626] border border-gray-800 focus:border-[#C41E2A] rounded-xl p-3 text-xs text-[#F5F0E8] outline-none"
              >
                <option>Beach Jam / Party</option>
                <option>Wedding Celebration</option>
                <option>Corporate Lunch / Meeting</option>
                <option>Birthday Party</option>
                <option>School Function / Graduation</option>
                <option>Other / Custom Gathering</option>
              </select>
            </div>
          </div>

          {/* Menu / Special Requests */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-300">
              Food Requests / Package Preferences / Notes
            </label>
            <textarea
              rows={3}
              value={menuPackageNote}
              onChange={(e) => setMenuPackageNote(e.target.value)}
              placeholder="e.g. 50x Krio Honey Glazed Wings, 30x Crispy Wraps, 3 Large Jollof Rice trays..."
              className="w-full bg-[#262626] border border-gray-800 focus:border-[#C41E2A] rounded-xl p-3 text-xs text-[#F5F0E8] placeholder-gray-500 outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#25D366] hover:bg-[#1ebd59] text-white py-4 px-6 rounded-2xl font-black text-base uppercase tracking-wider flex items-center justify-center gap-3 shadow-2xl transition-all active:scale-[0.98] cursor-pointer"
          >
            <MessageSquare className="w-6 h-6 fill-current" />
            <span>Send Catering Request via WhatsApp</span>
          </button>
        </form>
      </div>
    </div>
  );
};
