export type CategoryType = 
  | 'wings' 
  | 'strips' 
  | 'nuggets' 
  | 'wraps' 
  | 'fowls' 
  | 'sides' 
  | 'drinks';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  priceNLE: number;
  category: CategoryType;
  image: string;
  spiceLevel?: 'None' | 'Mild' | 'Krio Medium' | 'Fiery Pepper 🌶️';
  isBestseller?: boolean;
  stickerTag?: 'HOT & CRISPY' | 'SWIT DEAL' | 'POPULAR' | 'NEW' | 'KRIO FAV';
  pieces?: string;
  calories?: string;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  landmark: string;
  hours: string;
  phone: string;
  whatsapp: string;
  openTimeHour: number; // 24h format e.g. 10
  closeTimeHour: number; // 24h format e.g. 23
  coordinates: {
    lat: number;
    lng: number;
  };
  deliveryFeeNLE: number;
  image: string;
}

export interface CartItemOption {
  spiceLevel?: string;
  dipChoice?: string;
  specialInstructions?: string;
}

export interface CartItem {
  id: string; // unique item instance id
  menuItem: MenuItem;
  quantity: number;
  options: CartItemOption;
}

export type FulfillmentType = 'delivery' | 'pickup';

export interface CustomerDetails {
  fullName: string;
  phone: string;
  deliveryAddress: string;
  pickupTime: string;
  orderNotes: string;
}

export interface PromoBanner {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  discount: string;
  bgGradient: string;
  code?: string;
}

export interface DailySalesData {
  branchName: string;
  ordersCount: number;
  revenueNLE: number;
  fillColor: string;
}

export interface RecentOrder {
  id: string;
  customerName: string;
  branchName: string;
  itemsSummary: string;
  totalNLE: number;
  fulfillment: FulfillmentType;
  timeAgo: string;
  status: 'Preparing' | 'Out for Delivery' | 'Ready for Pickup' | 'Completed';
}
