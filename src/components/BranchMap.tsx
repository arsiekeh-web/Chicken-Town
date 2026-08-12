import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Branch } from '../types';

interface BranchMapProps {
  branches: Branch[];
  activeBranch: Branch;
  onSelectBranch: (branch: Branch) => void;
  onOrderBranch: (branch: Branch) => void;
}

export const BranchMap: React.FC<BranchMapProps> = ({
  branches,
  activeBranch,
  onSelectBranch,
  onOrderBranch,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Center map roughly around Freetown center
    const defaultCenter: [number, number] = [8.465, -13.245];
    const defaultZoom = 12;

    if (!mapRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: defaultCenter,
        zoom: defaultZoom,
        zoomControl: true,
        scrollWheelZoom: false, // Prevent accidental scrolling while browsing
      });

      // Add OpenStreetMap tile layer with warm, sleek theme tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);

      mapRef.current = map;
    }

    const map = mapRef.current;

    // Clear existing markers
    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    // Helper to check if store open
    const isBranchOpenNow = (openHour: number, closeHour: number) => {
      const currentHour = new Date().getHours();
      return currentHour >= openHour && currentHour < closeHour;
    };

    // Add markers for all 5 Freetown branches
    branches.forEach((branch) => {
      const isActive = branch.id === activeBranch.id;
      const isOpen = isBranchOpenNow(branch.openTimeHour, branch.closeTimeHour);

      // Create custom SVG marker HTML
      const markerHtml = `
        <div class="relative group cursor-pointer flex items-center justify-center">
          ${
            isActive
              ? `<div class="absolute -inset-2 rounded-full bg-[#F2B705] opacity-75 animate-ping"></div>`
              : ''
          }
          <div class="relative w-9 h-9 rounded-full ${
            isActive
              ? 'bg-[#C41E2A] text-[#F2B705] border-3 border-[#F2B705] shadow-2xl scale-110'
              : 'bg-[#1A1A1A] text-white border-2 border-[#C41E2A] shadow-lg'
          } flex items-center justify-center text-xs font-black transition-transform hover:scale-125">
            🍗
          </div>
          <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-current rotate-45 ${
            isActive ? 'text-[#F2B705]' : 'text-[#C41E2A]'
          }"></div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: markerHtml,
        className: 'custom-leaflet-pin',
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -32],
      });

      const popupContentHtml = `
        <div class="p-1 font-sans text-[#1A1A1A] max-w-[220px]">
          <div class="flex items-center justify-between gap-1 mb-1">
            <span class="text-[10px] font-bold px-2 py-0.5 rounded ${
              isOpen ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }">
              ${isOpen ? 'Open Now' : 'Open Daily'}
            </span>
            <span class="text-[10px] font-bold bg-red-100 text-[#C41E2A] px-2 py-0.5 rounded">
              NLE ${branch.deliveryFeeNLE} Del.
            </span>
          </div>
          
          <h3 class="font-black text-sm uppercase tracking-wide text-[#1A1A1A] m-0 leading-tight">
            ${branch.name}
          </h3>
          
          <p class="text-xs text-gray-600 my-1 leading-snug">
            📍 ${branch.address}
          </p>
          
          <p class="text-[10px] text-gray-500 italic mb-2">
            ${branch.landmark}
          </p>
          
          <div class="mt-2 pt-2 border-t border-gray-200 flex flex-col gap-1">
            <button
              id="popup-select-${branch.id}"
              class="w-full py-1.5 px-3 rounded-xl font-black text-xs uppercase tracking-wider text-white ${
                isActive
                  ? 'bg-emerald-600 hover:bg-emerald-700'
                  : 'bg-[#C41E2A] hover:bg-[#a51621]'
              } shadow cursor-pointer transition-colors"
            >
              ${isActive ? 'Selected ✓ Order Now' : 'Select Branch 📍'}
            </button>
          </div>
        </div>
      `;

      const marker = L.marker([branch.coordinates.lat, branch.coordinates.lng], {
        icon: customIcon,
        title: branch.name,
      }).addTo(map);

      marker.bindPopup(popupContentHtml, {
        closeButton: true,
        className: 'chicken-town-leaflet-popup',
      });

      // Add event listener when popup opens
      marker.on('popupopen', () => {
        const selectBtn = document.getElementById(`popup-select-${branch.id}`);
        if (selectBtn) {
          selectBtn.onclick = () => {
            onSelectBranch(branch);
            onOrderBranch(branch);
          };
        }
      });

      markersRef.current[branch.id] = marker;
    });

    // Pan to active branch if provided
    if (activeBranch && activeBranch.coordinates) {
      map.panTo([activeBranch.coordinates.lat, activeBranch.coordinates.lng], {
        animate: true,
        duration: 0.8,
      });
    }

    return () => {
      // Clean up map instance on unmount
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []); // Run once on mount

  // Update map when activeBranch changes
  useEffect(() => {
    if (!mapRef.current || !activeBranch) return;

    mapRef.current.panTo([activeBranch.coordinates.lat, activeBranch.coordinates.lng], {
      animate: true,
      duration: 0.8,
    });

    const marker = markersRef.current[activeBranch.id];
    if (marker) {
      marker.openPopup();
    }
  }, [activeBranch]);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border-2 border-[#C41E2A] shadow-2xl bg-[#1A1A1A]">
      {/* Map Header Overlay */}
      <div className="absolute top-3 left-3 right-3 z-[1000] pointer-events-none flex items-center justify-between">
        <div className="bg-[#1A1A1A]/90 backdrop-blur-md text-[#F5F0E8] border border-[#F2B705] px-3.5 py-1.5 rounded-2xl text-xs font-bold shadow-xl pointer-events-auto flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C41E2A] animate-pulse" />
          <span>Interactive Freetown Map</span>
        </div>
      </div>

      {/* Map Container */}
      <div ref={mapContainerRef} className="w-full h-[320px] sm:h-[380px] z-0" />

      {/* Footer Info Banner */}
      <div className="bg-[#1A1A1A] p-3 border-t border-gray-800 text-[#F5F0E8] text-xs flex flex-wrap items-center justify-between gap-2">
        <div className="text-gray-300 font-medium text-[11px]">
          Tap any marker to view location details or set your preferred ordering branch.
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold text-[#F2B705]">
          <span>📍 5 Branches Active</span>
        </div>
      </div>
    </div>
  );
};
