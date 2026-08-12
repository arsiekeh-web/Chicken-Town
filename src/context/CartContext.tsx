import React, { createContext, useContext, useState, useEffect } from 'react';
import { Branch, CartItem, CustomerDetails, FulfillmentType, MenuItem, CategoryType } from '../types';
import { LOCATIONS } from '../data/chickenTownData';

interface CartContextType {
  activeBranch: Branch;
  setActiveBranch: (branch: Branch) => void;
  cart: CartItem[];
  addToCart: (item: MenuItem, quantity?: number, options?: { spiceLevel?: string; dipChoice?: string; specialInstructions?: string }) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  fulfillmentType: FulfillmentType;
  setFulfillmentType: (type: FulfillmentType) => void;
  customerDetails: CustomerDetails;
  setCustomerDetails: React.Dispatch<React.SetStateAction<CustomerDetails>>;
  activePage: string;
  setActivePage: (page: string) => void;
  selectedCategory: CategoryType;
  setSelectedCategory: (cat: CategoryType) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  cartBounceKey: number;
  customizingItem: MenuItem | null;
  openCustomizer: (item: MenuItem) => void;
  closeCustomizer: () => void;
  subtotalNLE: number;
  deliveryFeeNLE: number;
  totalNLE: number;
  totalCartCount: number;
  generateWhatsAppUrl: () => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_STORAGE_BRANCH_KEY = 'chicken_town_active_branch_v1';
const LOCAL_STORAGE_CART_KEY = 'chicken_town_cart_v1';
const LOCAL_STORAGE_CUSTOMER_KEY = 'chicken_town_customer_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeBranch, setActiveBranchState] = useState<Branch>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_BRANCH_KEY);
      if (saved) {
        const found = LOCATIONS.find((b) => b.id === saved);
        if (found) return found;
      }
    } catch {
      // ignore
    }
    return LOCATIONS[2]; // Default to Lumley Roundabout
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  const [fulfillmentType, setFulfillmentType] = useState<FulfillmentType>('delivery');

  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CUSTOMER_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      fullName: '',
      phone: '',
      deliveryAddress: '',
      pickupTime: 'ASAP (approx. 20-30 mins)',
      orderNotes: '',
    };
  });

  const [activePage, setActivePage] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('wings');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [cartBounceKey, setCartBounceKey] = useState<number>(0);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);

  // Save state updates
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_BRANCH_KEY, activeBranch.id);
    } catch {
      // ignore
    }
  }, [activeBranch]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CUSTOMER_KEY, JSON.stringify(customerDetails));
    } catch {
      // ignore
    }
  }, [customerDetails]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const setActiveBranch = (branch: Branch) => {
    setActiveBranchState(branch);
    showToast(`Active Branch set to ${branch.name}`);
  };

  const addToCart = (
    item: MenuItem,
    quantity = 1,
    options?: { spiceLevel?: string; dipChoice?: string; specialInstructions?: string }
  ) => {
    setCart((prev) => {
      // Check if identical item with same options already exists
      const existingIndex = prev.findIndex(
        (ci) =>
          ci.menuItem.id === item.id &&
          (ci.options.spiceLevel || '') === (options?.spiceLevel || '') &&
          (ci.options.dipChoice || '') === (options?.dipChoice || '') &&
          (ci.options.specialInstructions || '') === (options?.specialInstructions || '')
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      const newItemInstance: CartItem = {
        id: `${item.id}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        menuItem: item,
        quantity,
        options: {
          spiceLevel: options?.spiceLevel || item.spiceLevel || 'Standard',
          dipChoice: options?.dipChoice || 'Garlic Mayo Dip',
          specialInstructions: options?.specialInstructions || '',
        },
      };

      return [...prev, newItemInstance];
    });

    setCartBounceKey((k) => k + 1);
    showToast(`Added ${item.name} to Cart! 🍗`);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.id !== cartItemId));
    showToast('Item removed from cart.');
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((ci) => {
          if (ci.id === cartItemId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const openCustomizer = (item: MenuItem) => {
    setCustomizingItem(item);
  };

  const closeCustomizer = () => {
    setCustomizingItem(null);
  };

  const subtotalNLE = cart.reduce((acc, ci) => acc + ci.menuItem.priceNLE * ci.quantity, 0);
  const deliveryFeeNLE = fulfillmentType === 'delivery' ? (subtotalNLE > 350 ? 0 : activeBranch.deliveryFeeNLE) : 0;
  const totalNLE = subtotalNLE + deliveryFeeNLE;
  const totalCartCount = cart.reduce((acc, ci) => acc + ci.quantity, 0);

  const generateWhatsAppUrl = (): string => {
    const rawNumber = activeBranch.whatsapp.replace(/\D/g, '') || '23276111222';

    let msg = `🍗 *CHICKEN TOWN - NEW ORDER* 🍗\n`;
    msg += `_Swit u Mot Swit u Lyf!_\n`;
    msg += `----------------------------------\n`;
    msg += `📍 *Branch:* ${activeBranch.name} (${activeBranch.landmark})\n`;
    msg += `🛵 *Order Type:* ${fulfillmentType.toUpperCase()}\n`;
    msg += `👤 *Customer:* ${customerDetails.fullName || 'Valued Guest'}\n`;
    msg += `📞 *Phone:* ${customerDetails.phone || 'Not provided'}\n`;

    if (fulfillmentType === 'delivery') {
      msg += `🏠 *Delivery Address:* ${customerDetails.deliveryAddress || 'Freetown Central'}\n`;
    } else {
      msg += `⏰ *Pickup Time:* ${customerDetails.pickupTime}\n`;
    }

    msg += `----------------------------------\n`;
    msg += `📋 *ORDER ITEMS:*\n`;

    if (cart.length === 0) {
      msg += `(No items in cart)\n`;
    } else {
      cart.forEach((ci, idx) => {
        const itemTotal = ci.menuItem.priceNLE * ci.quantity;
        msg += `${idx + 1}. *${ci.quantity}x ${ci.menuItem.name}*\n`;
        msg += `   Price: NLE ${ci.menuItem.priceNLE} ea = *NLE ${itemTotal}*\n`;
        if (ci.options.spiceLevel) msg += `   🌶 Spice: ${ci.options.spiceLevel}\n`;
        if (ci.options.dipChoice) msg += `   🥣 Dip: ${ci.options.dipChoice}\n`;
        if (ci.options.specialInstructions) msg += `   📝 Note: ${ci.options.specialInstructions}\n`;
      });
    }

    msg += `----------------------------------\n`;
    msg += `💵 *Subtotal:* NLE ${subtotalNLE}\n`;
    if (fulfillmentType === 'delivery') {
      msg += `🛵 *Delivery Fee:* ${deliveryFeeNLE === 0 ? 'FREE (Orders > NLE 350)' : `NLE ${deliveryFeeNLE}`}\n`;
    }
    msg += `💰 *TOTAL AMOUNT:* NLE ${totalNLE}\n`;

    if (customerDetails.orderNotes) {
      msg += `----------------------------------\n`;
      msg += `💬 *Special Request:* ${customerDetails.orderNotes}\n`;
    }

    msg += `----------------------------------\n`;
    msg += `Sent from Chicken Town Web App 🚀`;

    return `https://wa.me/${rawNumber}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <CartContext.Provider
      value={{
        activeBranch,
        setActiveBranch,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        fulfillmentType,
        setFulfillmentType,
        customerDetails,
        setCustomerDetails,
        activePage,
        setActivePage,
        selectedCategory,
        setSelectedCategory,
        toastMessage,
        showToast,
        cartBounceKey,
        customizingItem,
        openCustomizer,
        closeCustomizer,
        subtotalNLE,
        deliveryFeeNLE,
        totalNLE,
        totalCartCount,
        generateWhatsAppUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
