import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Home, Utensils, MapPin, ShoppingBag, Gift, BarChart2, MoreHorizontal, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const BottomNav: React.FC = () => {
  const { activePage, setActivePage, totalCartCount, cartBounceKey } = useCart();
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const mainTabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'menu', label: 'Menu', icon: Utensils },
    { id: 'locations', label: 'Branches', icon: MapPin },
    { id: 'cart', label: 'Cart', icon: ShoppingBag, badge: totalCartCount },
  ];

  const handleTabClick = (pageId: string) => {
    setActivePage(pageId);
    setShowMoreMenu(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* More Options Modal / Drawer */}
      <AnimatePresence>
        {showMoreMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end justify-center p-4 md:hidden"
            onClick={() => setShowMoreMenu(false)}
          >
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              className="bg-[#1A1A1A] border border-[#333333] text-[#F5F0E8] w-full rounded-2xl p-5 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4 border-b border-[#333333] pb-3">
                <h3 className="text-lg font-black tracking-wide text-[#F2B705] font-[Impact,sans-serif] uppercase">
                  More Options
                </h3>
                <button
                  onClick={() => setShowMoreMenu(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-white bg-[#262626]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleTabClick('catering')}
                  className={`p-4 rounded-xl border text-left flex flex-col gap-2 transition-all cursor-pointer ${
                    activePage === 'catering'
                      ? 'bg-[#C41E2A] border-[#C41E2A] text-white'
                      : 'bg-[#262626] border-[#333333] hover:border-[#F2B705] text-[#F5F0E8]'
                  }`}
                >
                  <Gift className="w-6 h-6 text-[#F2B705]" />
                  <div>
                    <div className="font-bold text-sm">Catering & Events</div>
                    <div className="text-[11px] text-gray-300">Bulk party orders</div>
                  </div>
                </button>

                <button
                  onClick={() => handleTabClick('dashboard')}
                  className={`p-4 rounded-xl border text-left flex flex-col gap-2 transition-all cursor-pointer ${
                    activePage === 'dashboard'
                      ? 'bg-[#C41E2A] border-[#C41E2A] text-white'
                      : 'bg-[#262626] border-[#333333] hover:border-[#F2B705] text-[#F5F0E8]'
                  }`}
                >
                  <BarChart2 className="w-6 h-6 text-[#F2B705]" />
                  <div>
                    <div className="font-bold text-sm">Owner View</div>
                    <div className="text-[11px] text-gray-300">Sales & Branch stats</div>
                  </div>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent Bottom Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#1A1A1A] border-t-2 border-[#333333] text-[#F5F0E8] px-2 py-2 shadow-2xl md:hidden">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {mainTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activePage === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`relative flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-all cursor-pointer ${
                  isActive ? 'text-[#C41E2A]' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <div className="relative">
                  <motion.div
                    key={tab.id === 'cart' ? cartBounceKey : undefined}
                    animate={tab.id === 'cart' && cartBounceKey > 0 ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-[#C41E2A] stroke-[2.5]' : ''}`} />
                  </motion.div>

                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className="absolute -top-1.5 -right-2.5 bg-[#F2B705] text-[#1A1A1A] text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-[#1A1A1A] shadow">
                      {tab.badge}
                    </span>
                  )}
                </div>

                <span
                  className={`text-[10px] mt-1 font-bold ${
                    isActive ? 'text-[#F2B705]' : 'text-gray-400'
                  }`}
                >
                  {tab.label}
                </span>

                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute -top-2 w-8 h-1 bg-[#C41E2A] rounded-full"
                  />
                )}
              </button>
            );
          })}

          {/* More Menu Toggle */}
          <button
            onClick={() => setShowMoreMenu(!showMoreMenu)}
            className={`relative flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-all cursor-pointer ${
              activePage === 'catering' || activePage === 'dashboard'
                ? 'text-[#C41E2A]'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <MoreHorizontal className="w-5 h-5" />
            <span className="text-[10px] mt-1 font-bold text-gray-400">More</span>
            {(activePage === 'catering' || activePage === 'dashboard') && (
              <div className="absolute -top-2 w-8 h-1 bg-[#C41E2A] rounded-full" />
            )}
          </button>
        </div>
      </nav>
    </>
  );
};
