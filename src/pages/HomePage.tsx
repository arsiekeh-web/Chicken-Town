import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { PROMO_BANNERS, MENU_ITEMS, LOCATIONS } from '../data/chickenTownData';
import { Logo } from '../components/Logo';
import { StickerBadge } from '../components/StickerBadge';
import {
  Flame,
  ShoppingBag,
  MapPin,
  MessageSquare,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  PhoneCall,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const HomePage: React.FC = () => {
  const { activeBranch, setActivePage, openCustomizer, generateWhatsAppUrl, setSelectedCategory } =
    useCart();

  const [currentPromoIdx, setCurrentPromoIdx] = useState(0);

  // Auto rotate promos every 5s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPromoIdx((prev) => (prev + 1) % PROMO_BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const bestsellers = MENU_ITEMS.filter((item) => item.isBestseller);

  return (
    <div className="space-y-6 sm:space-y-10 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#1A1A1A] border-b-4 border-[#C41E2A] text-[#F5F0E8] pt-6 pb-10 px-4 sm:px-8 rounded-b-3xl shadow-2xl">
        {/* Background Flame Glow Effects */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#C41E2A]/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#F2B705]/15 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center text-center">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 bg-[#262626] border border-[#F2B705]/50 px-3 py-1 rounded-full text-xs font-bold text-[#F2B705] mb-4 shadow">
            <Flame className="w-4 h-4 text-[#C41E2A] animate-bounce" />
            <span>Freetown's #1 Crispy Spot</span>
          </div>

          {/* Logo & Tagline */}
          <Logo size="xl" showTagline={true} className="justify-center my-2" />

          <p className="mt-4 text-sm sm:text-base text-gray-300 max-w-lg leading-relaxed font-sans">
            Hot, crispy, & peppered chicken cooked fresh daily across 5 Freetown branches.{' '}
            <span className="text-[#F2B705] font-bold">No long talk, order direct on WhatsApp!</span>
          </p>

          {/* Active Branch Callout */}
          <div className="mt-4 bg-[#262626] border border-[#C41E2A]/60 px-4 py-2 rounded-2xl flex items-center justify-between gap-3 max-w-sm w-full text-left shadow-lg">
            <div className="flex items-center gap-2.5 min-w-0">
              <MapPin className="w-5 h-5 text-[#C41E2A] shrink-0" />
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                  Active Branch:
                </div>
                <div className="text-xs font-black text-[#F2B705] truncate">
                  {activeBranch.name} ({activeBranch.landmark})
                </div>
              </div>
            </div>
            <button
              onClick={() => setActivePage('locations')}
              className="text-[11px] font-extrabold text-[#F5F0E8] underline hover:text-[#C41E2A] shrink-0 cursor-pointer"
            >
              Change
            </button>
          </div>

          {/* Primary Action Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md">
            <a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex-1 bg-[#25D366] hover:bg-[#1ebd59] text-white py-3.5 px-6 rounded-2xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-xl transition-all active:scale-[0.98] cursor-pointer"
            >
              <MessageSquare className="w-5 h-5 fill-current" />
              <span>Order on WhatsApp</span>
            </a>

            <button
              onClick={() => setActivePage('menu')}
              className="w-full sm:w-auto flex-1 bg-[#C41E2A] hover:bg-[#a51621] text-[#F5F0E8] py-3.5 px-6 rounded-2xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>Explore Menu</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Rotating Promo Banner */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-[#1A1A1A]">
          <AnimatePresence mode="wait">
            {PROMO_BANNERS.map(
              (promo, index) =>
                index === currentPromoIdx && (
                  <motion.div
                    key={promo.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4 }}
                    className={`bg-gradient-to-r ${promo.bgGradient} p-5 sm:p-8 text-[#F5F0E8] relative flex flex-col justify-between min-h-[160px] sm:min-h-[180px]`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <StickerBadge label={promo.badge} variant="gold" size="md" />
                      <div className="bg-[#1A1A1A]/80 border border-[#F2B705] text-[#F2B705] font-black text-xs px-2.5 py-1 rounded-lg">
                        CODE: {promo.code}
                      </div>
                    </div>

                    <div className="my-3">
                      <h3 className="text-2xl sm:text-3xl font-black font-[Impact,sans-serif] uppercase tracking-wide text-[#F5F0E8] drop-shadow-md">
                        {promo.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-200 mt-1 font-medium">
                        {promo.subtitle}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xl sm:text-2xl font-black text-[#F2B705] font-[Impact,sans-serif]">
                        {promo.discount}
                      </span>
                      <button
                        onClick={() => setActivePage('menu')}
                        className="bg-[#C41E2A] hover:bg-[#a51621] text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow cursor-pointer"
                      >
                        Claim Offer <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )
            )}
          </AnimatePresence>

          {/* Banner dots */}
          <div className="absolute bottom-2 right-4 flex items-center gap-1.5 z-20">
            {PROMO_BANNERS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPromoIdx(i)}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  i === currentPromoIdx ? 'bg-[#F2B705] w-5' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Category Navigation Tiles */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-black text-[#1A1A1A] font-[Impact,sans-serif] uppercase tracking-wide flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#C41E2A]" /> What You Craving?
          </h2>
          <button
            onClick={() => setActivePage('menu')}
            className="text-xs font-extrabold text-[#C41E2A] flex items-center gap-1 hover:underline cursor-pointer"
          >
            Full Menu <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            {
              id: 'wings',
              name: 'Krio Wings',
              badge: 'HOT',
              img: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=400&q=80',
            },
            {
              id: 'strips',
              name: 'Tender Strips',
              badge: 'CRUNCH',
              img: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=400&q=80',
            },
            {
              id: 'wraps',
              name: 'Town Wraps',
              badge: 'FIRE',
              img: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=400&q=80',
            },
            {
              id: 'fowls',
              name: 'Whole Fowls',
              badge: 'FEAST',
              img: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=400&q=80',
            },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id as any);
                setActivePage('menu');
              }}
              className="group relative h-28 sm:h-32 rounded-2xl overflow-hidden shadow-md border-2 border-[#1A1A1A] text-left transition-transform hover:-translate-y-1 cursor-pointer"
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute top-2 right-2">
                <StickerBadge label={cat.badge} variant="red" size="sm" />
              </div>
              <div className="absolute bottom-2 left-3 right-3">
                <span className="text-sm sm:text-base font-black text-[#F5F0E8] font-[Impact,sans-serif] uppercase tracking-wide drop-shadow">
                  {cat.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Bestsellers Spotlight */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-[#1A1A1A] text-[#F5F0E8] p-5 sm:p-8 rounded-3xl border-2 border-[#C41E2A] shadow-xl">
          <div className="flex items-center justify-between mb-5">
            <div>
              <span className="text-xs font-bold text-[#F2B705] uppercase tracking-widest">
                Freetown Favorites
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-[Impact,sans-serif] uppercase tracking-wide text-[#F5F0E8]">
                Bestseller Spotlights 🍗
              </h2>
            </div>
            <button
              onClick={() => setActivePage('menu')}
              className="hidden sm:flex items-center gap-1 text-xs font-bold text-[#F2B705] hover:underline cursor-pointer"
            >
              See All Items <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {bestsellers.map((item) => (
              <div
                key={item.id}
                className="bg-[#262626] rounded-2xl p-3 border border-[#333333] flex flex-col justify-between hover:border-[#C41E2A] transition-all"
              >
                <div>
                  <div className="relative h-32 rounded-xl overflow-hidden mb-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    {item.stickerTag && (
                      <div className="absolute top-2 left-2">
                        <StickerBadge label={item.stickerTag} variant="gold" size="sm" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-sm text-[#F5F0E8] line-clamp-1">{item.name}</h3>
                  <p className="text-xs text-gray-400 line-clamp-2 mt-1">{item.description}</p>
                </div>

                <div className="mt-4 flex items-center justify-between pt-2 border-t border-[#333333]">
                  <span className="text-base font-black text-[#F2B705]">NLE {item.priceNLE}</span>
                  <button
                    onClick={() => openCustomizer(item)}
                    className="bg-[#C41E2A] hover:bg-[#a51621] text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 shadow cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 Locations Quick Grid */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-bold text-[#C41E2A] uppercase tracking-widest">
              5 Branches Across Freetown
            </span>
            <h2 className="text-2xl font-black text-[#1A1A1A] font-[Impact,sans-serif] uppercase tracking-wide">
              Find Chicken Town Near You 📍
            </h2>
          </div>
          <button
            onClick={() => setActivePage('locations')}
            className="text-xs font-black text-[#C41E2A] underline hover:text-[#1A1A1A] cursor-pointer"
          >
            View Map & Hours
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {LOCATIONS.map((loc) => {
            const isCurrent = activeBranch.id === loc.id;

            return (
              <div
                key={loc.id}
                className={`p-4 rounded-2xl border-2 transition-all ${
                  isCurrent
                    ? 'bg-[#1A1A1A] text-[#F5F0E8] border-[#C41E2A] shadow-lg'
                    : 'bg-[#F5F0E8] text-[#1A1A1A] border-gray-300 hover:border-[#1A1A1A]'
                }`}
              >
                <div className="flex items-start justify-between">
                  <h3 className="font-extrabold text-base">{loc.name}</h3>
                  {isCurrent && (
                    <span className="bg-[#C41E2A] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
                      ACTIVE
                    </span>
                  )}
                </div>

                <p className={`text-xs mt-1 ${isCurrent ? 'text-gray-300' : 'text-gray-600'}`}>
                  {loc.landmark}
                </p>

                <div className="mt-3 flex items-center justify-between pt-2 border-t border-gray-500/20 text-xs">
                  <span className="font-semibold text-[#F2B705]">{loc.hours}</span>
                  <a
                    href={`tel:${loc.phone}`}
                    className={`flex items-center gap-1 font-bold ${
                      isCurrent ? 'text-white' : 'text-[#C41E2A]'
                    }`}
                  >
                    <PhoneCall className="w-3.5 h-3.5" /> Call
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Krio Brand Footer Banner */}
      <footer className="max-w-4xl mx-auto px-4 mt-8">
        <div className="bg-[#1A1A1A] border-t-2 border-[#F2B705] text-[#F5F0E8] p-6 rounded-2xl text-center space-y-3">
          <Logo size="md" showTagline={false} className="justify-center" />
          <p className="text-lg font-black text-[#F2B705] font-[Impact,sans-serif] uppercase tracking-wider">
            "Swit u Mot Swit u Lyf"
          </p>
          <p className="text-xs text-gray-400 max-w-md mx-auto">
            Aberdeen • Jui • Lumley • Old Railway Line • Wilberforce
          </p>
          <div className="text-[10px] text-gray-500 pt-2 border-t border-gray-800">
            © {new Date().getFullYear()} Chicken Town Sierra Leone. WhatsApp Order Deep-Link App.
          </div>
        </div>
      </footer>
    </div>
  );
};
