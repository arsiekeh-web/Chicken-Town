import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { MENU_ITEMS } from '../data/chickenTownData';
import { CategoryType, MenuItem } from '../types';
import { StickerBadge } from '../components/StickerBadge';
import {
  MapPin,
  Search,
  Flame,
  Plus,
  X,
  SlidersHorizontal,
  Sparkles,
  Star,
  Leaf,
  RotateCcw,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const MenuPage: React.FC = () => {
  const {
    activeBranch,
    setActivePage,
    selectedCategory,
    setSelectedCategory,
    openCustomizer,
    addToCart,
  } = useCart();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchAllCategories, setSearchAllCategories] = useState(true);

  const categories: { id: CategoryType | 'all'; label: string; icon: string }[] = [
    { id: 'all', label: 'All Menu', icon: '✨' },
    { id: 'wings', label: 'Wings', icon: '🍗' },
    { id: 'strips', label: 'Strips', icon: '🥓' },
    { id: 'nuggets', label: 'Nuggets', icon: '🟡' },
    { id: 'wraps', label: 'Wraps', icon: '🌯' },
    { id: 'fowls', label: 'Fowls', icon: '🐔' },
    { id: 'sides', label: 'Sides', icon: '🍟' },
    { id: 'drinks', label: 'Drinks', icon: '🥤' },
  ];

  // Helper to categorize vegetarian or plantain/sides items
  const isVegetarianOrSide = (item: MenuItem) => {
    return (
      item.category === 'sides' ||
      item.category === 'drinks' ||
      item.name.toLowerCase().includes('plantain') ||
      item.name.toLowerCase().includes('yam') ||
      item.name.toLowerCase().includes('fries') ||
      item.name.toLowerCase().includes('zobo')
    );
  };

  // Filter items based on active category, search query, and filter tag
  const filteredItems = MENU_ITEMS.filter((item) => {
    // 1. Category check
    const matchesCategory =
      selectedCategory === 'all' ||
      (searchQuery.trim() !== '' && searchAllCategories) ||
      item.category === selectedCategory;

    // 2. Search query check
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === '' ||
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      (item.spiceLevel && item.spiceLevel.toLowerCase().includes(query)) ||
      (item.stickerTag && item.stickerTag.toLowerCase().includes(query));

    // 3. Tag Filter check
    let matchesTag = true;
    if (selectedFilter === 'bestseller') {
      matchesTag = !!item.isBestseller;
    } else if (selectedFilter === 'spicy') {
      matchesTag =
        item.spiceLevel === 'Fiery Pepper 🌶️' || item.spiceLevel === 'Krio Medium';
    } else if (selectedFilter === 'mild') {
      matchesTag = item.spiceLevel === 'Mild' || item.spiceLevel === 'None';
    } else if (selectedFilter === 'veg') {
      matchesTag = isVegetarianOrSide(item);
    }

    return matchesCategory && matchesSearch && matchesTag;
  });

  const clearSearch = () => {
    setSearchQuery('');
  };

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedFilter('all');
    setSelectedCategory('all');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 space-y-5 pb-24">
      {/* Persistent Selected Branch Banner */}
      <div className="bg-[#1A1A1A] border-2 border-[#C41E2A] text-[#F5F0E8] p-3.5 sm:p-4 rounded-2xl flex items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="bg-[#C41E2A] p-2 rounded-xl text-[#F2B705] shrink-0">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              Ordering From:
            </div>
            <div className="text-sm sm:text-base font-black text-[#F2B705] truncate">
              {activeBranch.name}{' '}
              <span className="text-xs font-normal text-gray-300">({activeBranch.landmark})</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setActivePage('locations')}
          className="bg-[#262626] hover:bg-[#333333] border border-[#F2B705] text-[#F2B705] px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 transition-colors cursor-pointer"
        >
          Change Branch
        </button>
      </div>

      {/* Main Search & Filter Top Bar */}
      <div className="bg-[#1A1A1A] text-[#F5F0E8] p-4 sm:p-5 rounded-3xl border border-gray-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h1 className="text-2xl font-black font-[Impact,sans-serif] uppercase tracking-wide flex items-center gap-2">
              Menu & Fast Order 🍗
            </h1>
            <p className="text-xs text-gray-400">
              Fresh, hot fried chicken cooked to order in Freetown!
            </p>
          </div>
          <div className="text-xs font-bold text-[#F2B705] bg-[#262626] px-3 py-1 rounded-full self-start sm:self-auto border border-gray-700">
            {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} found
          </div>
        </div>

        {/* Search Input Field */}
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search menu (e.g., 'Wings', 'Honey', 'Jollof', 'Suya', 'Dodo')..."
            className="w-full bg-[#262626] border-2 border-gray-700 focus:border-[#C41E2A] text-[#F5F0E8] text-xs sm:text-sm rounded-2xl pl-10 pr-10 py-3 placeholder-gray-400 outline-none transition-colors shadow-inner font-medium"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-full cursor-pointer transition-colors"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Quick Tag Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider shrink-0 flex items-center gap-1">
            <SlidersHorizontal className="w-3 h-3 text-[#F2B705]" /> Filter:
          </span>

          {[
            { id: 'all', label: 'All Items', icon: '' },
            { id: 'bestseller', label: '⭐ Bestsellers', icon: '' },
            { id: 'spicy', label: '🔥 Spicy / Suya', icon: '' },
            { id: 'mild', label: '🟢 Mild', icon: '' },
            { id: 'veg', label: '🌱 Sides & Drinks', icon: '' },
          ].map((filter) => {
            const isActive = selectedFilter === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border shrink-0 ${
                  isActive
                    ? 'bg-[#F2B705] text-[#1A1A1A] border-[#F2B705] shadow-md font-black'
                    : 'bg-[#262626] text-gray-300 border-gray-700 hover:bg-[#333333]'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Horizontal Scrollable Category Tabs */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">
            Category Selector:
          </span>
          {(searchQuery || selectedFilter !== 'all' || selectedCategory !== 'all') && (
            <button
              onClick={resetAllFilters}
              className="text-xs font-bold text-[#C41E2A] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" /> Reset Filters
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar -mx-4 px-4">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-xs uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer shrink-0 shadow ${
                  isActive
                    ? 'bg-[#C41E2A] text-[#F5F0E8] shadow-lg scale-[1.02]'
                    : 'bg-[#1A1A1A] text-gray-300 hover:bg-[#262626] border border-gray-800'
                }`}
              >
                <span className="text-base">{cat.icon}</span>
                <span>{cat.label}</span>

                {isActive && (
                  <motion.div
                    layoutId="activeCategoryHighlight"
                    className="absolute inset-0 border-2 border-[#F2B705] rounded-2xl pointer-events-none"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Search Result Context Indicator */}
      {searchQuery && (
        <div className="bg-[#262626] border border-gray-700 text-[#F5F0E8] text-xs px-4 py-2.5 rounded-2xl flex items-center justify-between gap-2">
          <span>
            Results matching <span className="font-bold text-[#F2B705]">"{searchQuery}"</span>
          </span>
          <button
            onClick={clearSearch}
            className="text-[11px] font-bold text-gray-400 hover:text-white underline cursor-pointer"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Menu Item Cards Grid */}
      {filteredItems.length === 0 ? (
        <div className="bg-[#1A1A1A] text-center p-8 rounded-3xl border border-gray-800 text-gray-400 my-6 space-y-3 shadow-xl">
          <div className="w-12 h-12 rounded-full bg-[#262626] text-[#F2B705] mx-auto flex items-center justify-center text-xl font-bold">
            🔍
          </div>
          <p className="text-base font-bold text-[#F5F0E8]">No menu items found</p>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            We couldn't find any items matching your search or active filter combination.
          </p>
          <button
            onClick={resetAllFilters}
            className="bg-[#C41E2A] hover:bg-[#a51621] text-white text-xs font-black uppercase tracking-wider px-5 py-2.5 rounded-xl cursor-pointer shadow-md inline-flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="bg-[#1A1A1A] border-2 border-gray-800 hover:border-[#C41E2A] rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between text-[#F5F0E8] transition-all group"
              >
                {/* Image Section */}
                <div className="relative h-44 w-full overflow-hidden bg-gray-900">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-black/20" />

                  {/* Sticker Tag */}
                  {item.stickerTag && (
                    <div className="absolute top-3 left-3">
                      <StickerBadge label={item.stickerTag} variant="gold" size="sm" />
                    </div>
                  )}

                  {/* Portion details or Category tag */}
                  <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
                    {item.pieces && (
                      <div className="bg-black/70 text-[#F5F0E8] text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md">
                        {item.pieces}
                      </div>
                    )}
                    <div className="bg-[#C41E2A]/90 text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow">
                      {item.category}
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-base font-bold text-[#F5F0E8] leading-tight font-sans">
                        {item.name}
                      </h3>
                    </div>

                    <p className="text-xs text-gray-400 mt-1.5 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>

                    {item.spiceLevel && (
                      <div className="mt-2.5 inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-lg bg-[#262626] text-[#F2B705] border border-gray-800">
                        <Flame className="w-3 h-3 text-[#C41E2A]" />
                        <span>Spice: {item.spiceLevel}</span>
                      </div>
                    )}
                  </div>

                  {/* Price & Add Actions */}
                  <div className="pt-3 border-t border-gray-800 flex items-center justify-between gap-2">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-gray-400">Price:</div>
                      <div className="text-lg font-black text-[#F2B705] font-[Impact,sans-serif]">
                        NLE {item.priceNLE}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Customize Button */}
                      <button
                        onClick={() => openCustomizer(item)}
                        className="bg-[#262626] hover:bg-[#333333] text-gray-200 border border-gray-700 px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        Customize
                      </button>

                      {/* Quick Add Button */}
                      <button
                        onClick={() => addToCart(item, 1)}
                        className="bg-[#C41E2A] hover:bg-[#a51621] text-white p-2.5 rounded-xl font-bold transition-transform active:scale-90 shadow-md cursor-pointer flex items-center gap-1"
                        title="Quick Add 1"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
