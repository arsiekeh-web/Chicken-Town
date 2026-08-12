import React from 'react';
import { useCart } from '../context/CartContext';
import { LOCATIONS } from '../data/chickenTownData';
import { MapPin, PhoneCall, Navigation, Clock, CheckCircle2, ArrowRight, Store, Map } from 'lucide-react';
import { motion } from 'motion/react';
import { Branch } from '../types';
import { BranchMap } from '../components/BranchMap';

export const LocationsPage: React.FC = () => {
  const { activeBranch, setActiveBranch, setActivePage } = useCart();

  const handleSelectBranch = (branch: Branch) => {
    setActiveBranch(branch);
  };

  const handleSelectAndOrder = (branch: Branch) => {
    setActiveBranch(branch);
    setActivePage('menu');
  };

  // Helper to check if store is currently open
  const isBranchOpenNow = (openHour: number, closeHour: number) => {
    const now = new Date();
    const currentHour = now.getHours();
    return currentHour >= openHour && currentHour < closeHour;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 pb-20">
      {/* Title Header */}
      <div className="bg-[#1A1A1A] text-[#F5F0E8] p-6 rounded-3xl border-b-4 border-[#C41E2A] shadow-xl">
        <div className="flex items-center gap-3">
          <div className="bg-[#C41E2A] p-2.5 rounded-2xl text-[#F2B705]">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-[#F2B705] uppercase tracking-widest">
              Freetown Locations
            </span>
            <h1 className="text-2xl sm:text-3xl font-black font-[Impact,sans-serif] uppercase tracking-wide">
              Our 5 Branch Spots 📍
            </h1>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-gray-300 mt-3 font-sans">
          Select your nearest branch to view localized menu availability, delivery fees, and order via WhatsApp.
        </p>
      </div>

      {/* Active Branch Callout Banner */}
      <div className="bg-[#262626] border-2 border-[#F2B705] text-[#F5F0E8] p-4 rounded-2xl flex items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#C41E2A] text-white flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6 text-[#F2B705]" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Currently Selected Branch:
            </div>
            <div className="text-base font-black text-[#F2B705]">{activeBranch.name}</div>
            <div className="text-xs text-gray-300">{activeBranch.address}</div>
          </div>
        </div>
        <button
          onClick={() => setActivePage('menu')}
          className="bg-[#C41E2A] hover:bg-[#a51621] text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow cursor-pointer shrink-0"
        >
          Go to Menu <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Interactive Map Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black font-[Impact,sans-serif] uppercase tracking-wide text-[#1A1A1A] flex items-center gap-2">
            <Map className="w-5 h-5 text-[#C41E2A]" /> Freetown Interactive Map
          </h2>
          <span className="text-xs text-gray-500 font-medium">Click markers to select branch</span>
        </div>

        <BranchMap
          branches={LOCATIONS}
          activeBranch={activeBranch}
          onSelectBranch={handleSelectBranch}
          onOrderBranch={handleSelectAndOrder}
        />
      </div>

      {/* Locations List */}
      <div className="space-y-4">
        <h2 className="text-lg font-black font-[Impact,sans-serif] uppercase tracking-wide text-[#1A1A1A]">
          Branch Directory ({LOCATIONS.length})
        </h2>

        {LOCATIONS.map((branch) => {
          const isActive = activeBranch.id === branch.id;
          const isOpen = isBranchOpenNow(branch.openTimeHour, branch.closeTimeHour);

          return (
            <motion.div
              key={branch.id}
              whileHover={{ y: -2 }}
              className={`rounded-3xl border-2 transition-all overflow-hidden shadow-lg ${
                isActive
                  ? 'bg-[#1A1A1A] text-[#F5F0E8] border-[#C41E2A] ring-2 ring-[#C41E2A]/30'
                  : 'bg-[#F5F0E8] text-[#1A1A1A] border-gray-300 hover:border-[#1A1A1A]'
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-3">
                {/* Branch Image */}
                <div className="relative h-44 md:h-full w-full overflow-hidden bg-gray-900">
                  <img
                    src={branch.image}
                    alt={branch.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden" />

                  {/* Status Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    {isOpen ? (
                      <span className="bg-emerald-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" /> OPEN NOW
                      </span>
                    ) : (
                      <span className="bg-amber-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow">
                        OPEN DAILY
                      </span>
                    )}

                    {isActive && (
                      <span className="bg-[#C41E2A] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow">
                        SELECTED
                      </span>
                    )}
                  </div>
                </div>

                {/* Branch Info */}
                <div className="p-5 md:col-span-2 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h2
                        className={`text-2xl font-black font-[Impact,sans-serif] uppercase tracking-wide ${
                          isActive ? 'text-[#F5F0E8]' : 'text-[#1A1A1A]'
                        }`}
                      >
                        {branch.name}
                      </h2>
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                          isActive
                            ? 'bg-[#262626] text-[#F2B705]'
                            : 'bg-amber-100 text-[#1A1A1A]'
                        }`}
                      >
                        Delivery NLE {branch.deliveryFeeNLE}
                      </span>
                    </div>

                    <p
                      className={`text-xs mt-1.5 font-medium flex items-center gap-1.5 ${
                        isActive ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      <MapPin className="w-4 h-4 text-[#C41E2A] shrink-0" />
                      {branch.address}
                    </p>

                    <p
                      className={`text-xs mt-1 italic ${
                        isActive ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    >
                      Landmark: {branch.landmark}
                    </p>

                    <div
                      className={`mt-3 inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-xl ${
                        isActive ? 'bg-[#262626] text-[#F2B705]' : 'bg-gray-200 text-[#1A1A1A]'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      Hours: {branch.hours}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-3 border-t border-gray-500/20 grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {/* Call Button */}
                    <a
                      href={`tel:${branch.phone}`}
                      className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-bold text-xs transition-colors ${
                        isActive
                          ? 'bg-[#262626] hover:bg-[#333333] text-white border border-gray-700'
                          : 'bg-gray-200 hover:bg-gray-300 text-[#1A1A1A]'
                      }`}
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-[#F2B705]" />
                      <span>Call Branch</span>
                    </a>

                    {/* Get Directions Button */}
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        `Chicken Town ${branch.name} Freetown Sierra Leone`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-bold text-xs transition-colors ${
                        isActive
                          ? 'bg-[#262626] hover:bg-[#333333] text-white border border-gray-700'
                          : 'bg-gray-200 hover:bg-gray-300 text-[#1A1A1A]'
                      }`}
                    >
                      <Navigation className="w-3.5 h-3.5 text-[#C41E2A]" />
                      <span>Directions</span>
                    </a>

                    {/* Select Active Branch CTA */}
                    <button
                      onClick={() =>
                        isActive ? handleSelectAndOrder(branch) : handleSelectBranch(branch)
                      }
                      className={`col-span-2 sm:col-span-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow cursor-pointer ${
                        isActive
                          ? 'bg-[#C41E2A] text-white hover:bg-[#a51621]'
                          : 'bg-[#1A1A1A] text-[#F2B705] hover:bg-[#C41E2A] hover:text-white'
                      }`}
                    >
                      {isActive ? 'Order Now 🍗' : 'Select Branch'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
