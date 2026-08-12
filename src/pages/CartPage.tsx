import React from 'react';
import { useCart } from '../context/CartContext';
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  MapPin,
  Clock,
  Truck,
  Store,
  MessageSquare,
  ArrowRight,
  Flame,
  User,
  Phone,
  FileText,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CartPage: React.FC = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    activeBranch,
    setActivePage,
    fulfillmentType,
    setFulfillmentType,
    customerDetails,
    setCustomerDetails,
    subtotalNLE,
    deliveryFeeNLE,
    totalNLE,
    generateWhatsAppUrl,
  } = useCart();

  const handleWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const url = generateWhatsAppUrl();
    window.open(url, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-12 text-center space-y-6 pb-24">
        <div className="w-20 h-20 bg-[#1A1A1A] border-2 border-[#C41E2A] text-[#F2B705] rounded-full flex items-center justify-center mx-auto shadow-2xl">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-black font-[Impact,sans-serif] uppercase tracking-wide text-[#1A1A1A]">
            Your Cart is Empty! 🍗
          </h2>
          <p className="text-sm text-gray-600 max-w-sm mx-auto font-sans">
            You haven't added any crispy chicken, wings, or drinks yet. Let's fix that!
          </p>
        </div>
        <button
          onClick={() => setActivePage('menu')}
          className="bg-[#C41E2A] hover:bg-[#a51621] text-[#F5F0E8] py-3.5 px-8 rounded-2xl font-black text-sm uppercase tracking-wider inline-flex items-center gap-2 shadow-xl cursor-pointer"
        >
          <span>Explore Menu</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6 pb-28">
      {/* Title Header */}
      <div className="bg-[#1A1A1A] text-[#F5F0E8] p-5 rounded-3xl border-b-4 border-[#C41E2A] shadow-xl flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-[#F2B705] uppercase tracking-widest">
            WhatsApp Order Checkout
          </span>
          <h1 className="text-2xl sm:text-3xl font-black font-[Impact,sans-serif] uppercase tracking-wide">
            Your Order Basket 🛒
          </h1>
        </div>
        <button
          onClick={() => setActivePage('menu')}
          className="text-xs font-bold text-[#F2B705] hover:underline cursor-pointer"
        >
          + Add More Items
        </button>
      </div>

      {/* Selected Branch Banner */}
      <div className="bg-[#262626] border-2 border-[#F2B705] text-[#F5F0E8] p-4 rounded-2xl flex items-center justify-between gap-3 shadow">
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-[#C41E2A] shrink-0" />
          <div>
            <div className="text-[10px] text-gray-400 font-bold uppercase">Fulfilling Branch:</div>
            <div className="text-sm font-black text-[#F2B705]">{activeBranch.name}</div>
          </div>
        </div>
        <button
          onClick={() => setActivePage('locations')}
          className="text-xs font-extrabold text-[#F5F0E8] underline hover:text-[#C41E2A] cursor-pointer"
        >
          Change
        </button>
      </div>

      {/* Cart Items List */}
      <div className="bg-[#1A1A1A] text-[#F5F0E8] rounded-3xl p-4 sm:p-6 border-2 border-gray-800 space-y-4 shadow-xl">
        <h2 className="text-lg font-black font-[Impact,sans-serif] uppercase text-[#F2B705] tracking-wide border-b border-gray-800 pb-2">
          Items Summary ({cart.length})
        </h2>

        <div className="divide-y divide-gray-800 space-y-4">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="pt-4 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                {/* Left: Image & Info */}
                <div className="flex items-start gap-3 min-w-0">
                  <img
                    src={item.menuItem.image}
                    alt={item.menuItem.name}
                    className="w-16 h-16 rounded-xl object-cover bg-gray-900 shrink-0 border border-gray-700"
                  />
                  <div className="min-w-0">
                    <h3 className="font-bold text-sm text-[#F5F0E8]">{item.menuItem.name}</h3>
                    <div className="text-xs text-[#F2B705] font-bold">
                      NLE {item.menuItem.priceNLE} ea
                    </div>

                    {/* Options list */}
                    <div className="mt-1 space-y-0.5 text-[11px] text-gray-400">
                      {item.options.spiceLevel && (
                        <div>🌶 Spice: {item.options.spiceLevel}</div>
                      )}
                      {item.options.dipChoice && <div>🥣 Dip: {item.options.dipChoice}</div>}
                      {item.options.specialInstructions && (
                        <div className="italic text-gray-300">
                          Note: "{item.options.specialInstructions}"
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Quantity & Line Total */}
                <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-gray-800">
                  <div className="flex items-center gap-2 bg-[#262626] p-1.5 rounded-xl border border-gray-800">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-7 h-7 rounded-lg bg-[#333333] hover:bg-[#C41E2A] text-white flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-black w-5 text-center text-[#F2B705]">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-7 h-7 rounded-lg bg-[#333333] hover:bg-[#C41E2A] text-white flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right min-w-[70px]">
                    <div className="text-sm font-black text-[#F5F0E8]">
                      NLE {item.menuItem.priceNLE * item.quantity}
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-500 hover:text-[#C41E2A] p-1.5 rounded-lg transition-colors cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Fulfillment Type Toggle (Delivery vs Pickup) */}
      <div className="bg-[#1A1A1A] text-[#F5F0E8] rounded-3xl p-5 border-2 border-gray-800 space-y-4 shadow-xl">
        <label className="text-xs font-bold uppercase tracking-wider text-[#F2B705] block">
          Order Fulfillment Method
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setFulfillmentType('delivery')}
            className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
              fulfillmentType === 'delivery'
                ? 'bg-[#C41E2A] border-[#C41E2A] text-white shadow-lg'
                : 'bg-[#262626] border-gray-800 text-gray-300 hover:border-gray-600'
            }`}
          >
            <Truck className="w-5 h-5 text-[#F2B705]" />
            <div>
              <div className="font-extrabold text-xs uppercase">Doorstep Delivery</div>
              <div className="text-[10px] opacity-80">Direct to your address</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setFulfillmentType('pickup')}
            className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
              fulfillmentType === 'pickup'
                ? 'bg-[#C41E2A] border-[#C41E2A] text-white shadow-lg'
                : 'bg-[#262626] border-gray-800 text-gray-300 hover:border-gray-600'
            }`}
          >
            <Store className="w-5 h-5 text-[#F2B705]" />
            <div>
              <div className="font-extrabold text-xs uppercase">Store Pickup</div>
              <div className="text-[10px] opacity-80">Collect at branch counter</div>
            </div>
          </button>
        </div>

        {/* Customer Form Details */}
        <form onSubmit={handleWhatsAppOrder} className="space-y-3 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Name */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-300 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-[#F2B705]" /> Your Full Name
              </label>
              <input
                type="text"
                required
                value={customerDetails.fullName}
                onChange={(e) =>
                  setCustomerDetails((prev) => ({ ...prev, fullName: e.target.value }))
                }
                placeholder="e.g. Mariama Sesay"
                className="w-full bg-[#262626] border border-gray-800 focus:border-[#C41E2A] rounded-xl p-2.5 text-xs text-[#F5F0E8] outline-none"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-300 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-[#F2B705]" /> WhatsApp / Phone Number
              </label>
              <input
                type="tel"
                required
                value={customerDetails.phone}
                onChange={(e) => setCustomerDetails((prev) => ({ ...prev, phone: e.target.value }))}
                placeholder="e.g. +232 76 000 111"
                className="w-full bg-[#262626] border border-gray-800 focus:border-[#C41E2A] rounded-xl p-2.5 text-xs text-[#F5F0E8] outline-none"
              />
            </div>
          </div>

          {/* Conditional Delivery Address vs Pickup Time */}
          {fulfillmentType === 'delivery' ? (
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-300 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#C41E2A]" /> Delivery Address & Landmark
              </label>
              <input
                type="text"
                required
                value={customerDetails.deliveryAddress}
                onChange={(e) =>
                  setCustomerDetails((prev) => ({ ...prev, deliveryAddress: e.target.value }))
                }
                placeholder="e.g. 14 Cape Road, Aberdeen, Near Family Kingdom"
                className="w-full bg-[#262626] border border-gray-800 focus:border-[#C41E2A] rounded-xl p-2.5 text-xs text-[#F5F0E8] outline-none"
              />
            </div>
          ) : (
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-300 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#F2B705]" /> Expected Pickup Time
              </label>
              <input
                type="text"
                value={customerDetails.pickupTime}
                onChange={(e) =>
                  setCustomerDetails((prev) => ({ ...prev, pickupTime: e.target.value }))
                }
                placeholder="e.g. ASAP or 6:30 PM"
                className="w-full bg-[#262626] border border-gray-800 focus:border-[#C41E2A] rounded-xl p-2.5 text-xs text-[#F5F0E8] outline-none"
              />
            </div>
          )}

          {/* Order Notes */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-300 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-gray-400" /> Additional Notes for Branch
            </label>
            <input
              type="text"
              value={customerDetails.orderNotes}
              onChange={(e) =>
                setCustomerDetails((prev) => ({ ...prev, orderNotes: e.target.value }))
              }
              placeholder="e.g. Please bring extra hot pepper sauce!"
              className="w-full bg-[#262626] border border-gray-800 focus:border-[#C41E2A] rounded-xl p-2.5 text-xs text-[#F5F0E8] outline-none"
            />
          </div>

          {/* Summary & Price Breakdown */}
          <div className="bg-[#262626] p-4 rounded-2xl space-y-2 border border-gray-800 my-4">
            <div className="flex justify-between text-xs text-gray-300">
              <span>Subtotal:</span>
              <span className="font-bold text-white">NLE {subtotalNLE}</span>
            </div>

            {fulfillmentType === 'delivery' && (
              <div className="flex justify-between text-xs text-gray-300">
                <span>Delivery Fee ({activeBranch.name}):</span>
                <span className="font-bold text-[#F2B705]">
                  {deliveryFeeNLE === 0 ? 'FREE (Over NLE 350)' : `NLE ${deliveryFeeNLE}`}
                </span>
              </div>
            )}

            <div className="pt-2 border-t border-gray-700 flex justify-between items-center text-base font-black">
              <span className="text-[#F2B705]">TOTAL:</span>
              <span className="text-xl text-[#F2B705] font-[Impact,sans-serif]">
                NLE {totalNLE}
              </span>
            </div>
          </div>

          {/* Send Order via WhatsApp Button */}
          <button
            type="submit"
            className="w-full bg-[#25D366] hover:bg-[#1ebd59] text-white py-4 px-6 rounded-2xl font-black text-base uppercase tracking-wider flex items-center justify-center gap-3 shadow-2xl transition-all active:scale-[0.98] cursor-pointer"
          >
            <MessageSquare className="w-6 h-6 fill-current" />
            <span>Send Order via WhatsApp</span>
          </button>
        </form>
      </div>
    </div>
  );
};
