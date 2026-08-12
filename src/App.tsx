import React from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Toast } from './components/Toast';
import { ItemCustomizerModal } from './components/ItemCustomizerModal';
import { HomePage } from './pages/HomePage';
import { LocationsPage } from './pages/LocationsPage';
import { MenuPage } from './pages/MenuPage';
import { CartPage } from './pages/CartPage';
import { CateringPage } from './pages/CateringPage';
import { DashboardPage } from './pages/DashboardPage';

const AppContent: React.FC = () => {
  const { activePage, toastMessage } = useCart();

  return (
    <div className="min-h-screen bg-[#F5F0E8] text-[#1A1A1A] font-sans flex flex-col selection:bg-[#C41E2A] selection:text-white">
      {/* Sticky Header */}
      <Header />

      {/* Main Page Area */}
      <main className="flex-1 w-full max-w-6xl mx-auto">
        {activePage === 'home' && <HomePage />}
        {activePage === 'locations' && <LocationsPage />}
        {activePage === 'menu' && <MenuPage />}
        {activePage === 'cart' && <CartPage />}
        {activePage === 'catering' && <CateringPage />}
        {activePage === 'dashboard' && <DashboardPage />}
      </main>

      {/* Floating Elements */}
      <Toast message={toastMessage} />
      <ItemCustomizerModal />

      {/* Persistent Mobile Bottom Navigation Bar */}
      <BottomNav />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
