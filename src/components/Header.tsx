import React from 'react';
import { Logo } from './Logo';
import { useCart } from '../context/CartContext';
import { MapPin, ShoppingBag, ChevronDown, PhoneCall } from 'lucide-react';
import { motion } from 'motion/react';

export const Header: React.FC = () => {
  const { activeBranch, totalCartCount, setActivePage, activePage, cartBounceKey } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-[#1A1A1A] border-b border-[#333333] shadow-md px-3 sm:px-6 py-2.5 text-[#F5F0E8]">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
        {/* Logo */}
        <button
          onClick={() => setActivePage('home')}
          className="hover:opacity-90 transition-opacity text-left cursor-pointer"
        >
          <Logo size="sm" showTagline={false} />
        </button>

        {/* Center: Branch Selector Pill */}
        <button
          onClick={() => setActivePage('locations')}
          className="flex items-center gap-1.5 bg-[#262626] hover:bg-[#333333] border border-[#C41E2A]/40 text-[#F5F0E8] px-2.5 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer max-w-[170px] sm:max-w-xs truncate"
          title="Change active branch"
        >
          <MapPin className="w-3.5 h-3.5 text-[#C41E2A] shrink-0" />
          <span className="truncate text-[11px] sm:text-xs">
            <span className="text-gray-400 font-normal">Branch: </span>
            <span className="text-[#F2B705] font-bold">{activeBranch.name}</span>
          </span>
          <ChevronDown className="w-3 h-3 text-gray-400 shrink-0" />
        </button>

        {/* Right side: Desktop Nav Links & Cart Button */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Desktop quick nav */}
          <nav className="hidden md:flex items-center gap-5 text-sm font-semibold">
            <button
              onClick={() => setActivePage('home')}
              className={`transition-colors cursor-pointer ${
                activePage === 'home' ? 'text-[#C41E2A]' : 'text-[#F5F0E8] hover:text-[#F2B705]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActivePage('menu')}
              className={`transition-colors cursor-pointer ${
                activePage === 'menu' ? 'text-[#C41E2A]' : 'text-[#F5F0E8] hover:text-[#F2B705]'
              }`}
            >
              Menu
            </button>
            <button
              onClick={() => setActivePage('locations')}
              className={`transition-colors cursor-pointer ${
                activePage === 'locations' ? 'text-[#C41E2A]' : 'text-[#F5F0E8] hover:text-[#F2B705]'
              }`}
            >
              Locations
            </button>
            <button
              onClick={() => setActivePage('catering')}
              className={`transition-colors cursor-pointer ${
                activePage === 'catering' ? 'text-[#C41E2A]' : 'text-[#F5F0E8] hover:text-[#F2B705]'
              }`}
            >
              Catering
            </button>
            <button
              onClick={() => setActivePage('dashboard')}
              className={`transition-colors cursor-pointer ${
                activePage === 'dashboard' ? 'text-[#C41E2A]' : 'text-[#F5F0E8] hover:text-[#F2B705]'
              }`}
            >
              Owner View
            </button>
          </nav>

          {/* Direct WhatsApp Call Button */}
          <a
            href={`tel:${activeBranch.phone}`}
            className="hidden sm:flex items-center gap-1 bg-[#262626] hover:bg-[#333333] text-[#F5F0E8] p-2 rounded-xl text-xs font-semibold transition-colors border border-gray-700"
            title={`Call ${activeBranch.name}`}
          >
            <PhoneCall className="w-4 h-4 text-[#F2B705]" />
          </a>

          {/* Cart Button */}
          <motion.button
            key={cartBounceKey}
            animate={cartBounceKey > 0 ? { scale: [1, 1.25, 0.95, 1.1, 1] } : {}}
            transition={{ duration: 0.4 }}
            onClick={() => setActivePage('cart')}
            className={`relative flex items-center justify-center p-2.5 rounded-xl cursor-pointer transition-all shadow-md ${
              activePage === 'cart'
                ? 'bg-[#C41E2A] text-[#F5F0E8]'
                : 'bg-[#C41E2A] hover:bg-[#a51621] text-[#F5F0E8]'
            }`}
          >
            <ShoppingBag className="w-5 h-5" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#F2B705] text-[#1A1A1A] text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#1A1A1A] shadow">
                {totalCartCount}
              </span>
            )}
          </motion.button>
        </div>
      </div>
    </header>
  );
};
