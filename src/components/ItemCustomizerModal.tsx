import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, Flame, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { StickerBadge } from './StickerBadge';

export const ItemCustomizerModal: React.FC = () => {
  const { customizingItem, closeCustomizer, addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [spiceLevel, setSpiceLevel] = useState<string>('Krio Medium');
  const [dipChoice, setDipChoice] = useState<string>('Signature Garlic Mayo');
  const [specialInstructions, setSpecialInstructions] = useState<string>('');

  if (!customizingItem) return null;

  const handleAdd = () => {
    addToCart(customizingItem, quantity, {
      spiceLevel,
      dipChoice,
      specialInstructions,
    });
    closeCustomizer();
    // Reset defaults
    setQuantity(1);
    setSpecialInstructions('');
  };

  const itemTotal = customizingItem.priceNLE * quantity;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          className="bg-[#1A1A1A] border-t-2 sm:border-2 border-[#C41E2A] text-[#F5F0E8] w-full max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col"
        >
          {/* Header Image banner */}
          <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-[#262626] shrink-0">
            <img
              src={customizingItem.image}
              alt={customizingItem.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-black/40" />

            {/* Close Button */}
            <button
              onClick={closeCustomizer}
              className="absolute top-3 right-3 bg-black/60 hover:bg-black text-white p-2 rounded-full backdrop-blur-md transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Sticker Badge */}
            {customizingItem.stickerTag && (
              <div className="absolute top-3 left-3">
                <StickerBadge label={customizingItem.stickerTag} variant="gold" size="md" />
              </div>
            )}

            {/* Title Overlay */}
            <div className="absolute bottom-3 left-4 right-4">
              <h2 className="text-xl sm:text-2xl font-black text-[#F5F0E8] font-[Impact,sans-serif] tracking-wide drop-shadow-md">
                {customizingItem.name}
              </h2>
              <p className="text-xs text-[#F2B705] font-semibold mt-0.5">
                NLE {customizingItem.priceNLE} per portion
              </p>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-4 sm:p-6 space-y-5 flex-1 overflow-y-auto">
            <p className="text-sm text-gray-300 leading-relaxed font-sans">
              {customizingItem.description}
            </p>

            {/* Spice Level Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#F2B705] flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-[#C41E2A]" /> Choose Spice Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Mild', 'Krio Medium', 'Fiery Pepper 🌶️'].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setSpiceLevel(level)}
                    className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer text-center ${
                      spiceLevel === level
                        ? 'bg-[#C41E2A] border-[#C41E2A] text-white shadow-md'
                        : 'bg-[#262626] border-[#333333] text-gray-300 hover:border-gray-500'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Dip Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#F2B705] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#F2B705]" /> Choose Dipping Sauce
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Signature Garlic Mayo',
                  'Krio Hot Pepper Dip',
                  'Sweet Chili Glaze',
                  'Cheddar Cheese Sauce',
                ].map((dip) => (
                  <button
                    key={dip}
                    type="button"
                    onClick={() => setDipChoice(dip)}
                    className={`px-3 py-2 rounded-xl border text-xs font-medium transition-all cursor-pointer text-left ${
                      dipChoice === dip
                        ? 'bg-[#F2B705] border-[#F2B705] text-[#1A1A1A] font-bold shadow-md'
                        : 'bg-[#262626] border-[#333333] text-gray-300 hover:border-gray-500'
                    }`}
                  >
                    {dip}
                  </button>
                ))}
              </div>
            </div>

            {/* Special Instructions */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-300">
                Special Instructions / Kitchen Request
              </label>
              <textarea
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="e.g. Extra crispy wings, sauce on the side, no onions..."
                rows={2}
                className="w-full bg-[#262626] border border-[#333333] focus:border-[#C41E2A] rounded-xl p-3 text-xs text-[#F5F0E8] placeholder-gray-500 outline-none transition-colors resize-none"
              />
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center justify-between bg-[#262626] p-3 rounded-2xl border border-[#333333]">
              <span className="text-sm font-bold text-gray-200">Quantity</span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 rounded-xl bg-[#333333] hover:bg-[#C41E2A] text-white flex items-center justify-center transition-colors cursor-pointer disabled:opacity-50"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-base font-black w-6 text-center text-[#F2B705]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-9 h-9 rounded-xl bg-[#333333] hover:bg-[#C41E2A] text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Modal Footer / Add Button */}
          <div className="p-4 bg-[#262626] border-t border-[#333333] rounded-b-3xl sm:rounded-b-2xl">
            <button
              onClick={handleAdd}
              className="w-full bg-[#C41E2A] hover:bg-[#a51621] text-[#F5F0E8] py-3.5 px-6 rounded-xl font-black text-base uppercase tracking-wider flex items-center justify-between shadow-xl transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>Add to Order</span>
              <span className="bg-[#1A1A1A]/40 px-3 py-1 rounded-lg text-[#F2B705] font-black">
                NLE {itemTotal}
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
