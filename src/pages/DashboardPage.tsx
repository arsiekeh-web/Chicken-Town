import React, { useState } from 'react';
import { DASHBOARD_SALES_DATA, MOCK_RECENT_ORDERS, LOCATIONS } from '../data/chickenTownData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from 'recharts';
import {
  BarChart2,
  TrendingUp,
  ShoppingBag,
  Flame,
  Clock,
  DollarSign,
  CheckCircle2,
  Truck,
  Store,
  Power,
  RefreshCw,
} from 'lucide-react';
import { StickerBadge } from '../components/StickerBadge';

export const DashboardPage: React.FC = () => {
  const [storeStatuses, setStoreStatuses] = useState<Record<string, 'Open' | 'Busy' | 'Closed'>>({
    aberdeen: 'Open',
    jui: 'Open',
    lumley: 'Busy',
    railway: 'Open',
    wilberforce: 'Open',
  });

  const toggleStoreStatus = (branchId: string) => {
    setStoreStatuses((prev) => {
      const current = prev[branchId];
      const next = current === 'Open' ? 'Busy' : current === 'Busy' ? 'Closed' : 'Open';
      return { ...prev, [branchId]: next };
    });
  };

  const categoryBreakdown = [
    { name: 'Wings', value: 42, color: '#C41E2A' },
    { name: 'Strips & Nuggets', value: 24, color: '#F2B705' },
    { name: 'Wraps', value: 18, color: '#E04856' },
    { name: 'Fowls & Jollof', value: 16, color: '#38A169' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 pb-24">
      {/* Title Header */}
      <div className="bg-[#1A1A1A] text-[#F5F0E8] p-6 rounded-3xl border-b-4 border-[#C41E2A] shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-[#262626] border border-[#F2B705] px-3 py-1 rounded-full text-xs font-bold text-[#F2B705] mb-2">
            <BarChart2 className="w-4 h-4 text-[#C41E2A]" /> Franchise Owner Dashboard
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-[Impact,sans-serif] uppercase tracking-wide">
            Chicken Town Analytics 📊
          </h1>
          <p className="text-xs text-gray-400">
            Real-time branch sales comparison across 5 Freetown locations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="bg-emerald-950 border border-emerald-500 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> LIVE FEED
          </span>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Total Revenue */}
        <div className="bg-[#1A1A1A] text-[#F5F0E8] p-4 rounded-2xl border-2 border-gray-800 space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[11px] font-bold uppercase">Today's Revenue</span>
            <DollarSign className="w-4 h-4 text-[#F2B705]" />
          </div>
          <div className="text-2xl font-black text-[#F2B705] font-[Impact,sans-serif]">
            NLE 63,250
          </div>
          <div className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +18.4% vs yesterday
          </div>
        </div>

        {/* Orders Count */}
        <div className="bg-[#1A1A1A] text-[#F5F0E8] p-4 rounded-2xl border-2 border-gray-800 space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[11px] font-bold uppercase">Total Orders</span>
            <ShoppingBag className="w-4 h-4 text-[#C41E2A]" />
          </div>
          <div className="text-2xl font-black text-[#F5F0E8] font-[Impact,sans-serif]">
            184 Orders
          </div>
          <div className="text-[10px] text-gray-400 font-medium">Avg ~22 orders/hr</div>
        </div>

        {/* Top Seller */}
        <div className="bg-[#1A1A1A] text-[#F5F0E8] p-4 rounded-2xl border-2 border-gray-800 space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[11px] font-bold uppercase">Top-Selling Item</span>
            <Flame className="w-4 h-4 text-[#C41E2A]" />
          </div>
          <div className="text-sm font-black text-[#F5F0E8] truncate">Krio Honey Wings</div>
          <div className="text-[10px] text-[#F2B705] font-bold">112 portions sold today</div>
        </div>

        {/* Avg Order Value */}
        <div className="bg-[#1A1A1A] text-[#F5F0E8] p-4 rounded-2xl border-2 border-gray-800 space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[11px] font-bold uppercase">Avg Order Value</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-[#F2B705] font-[Impact,sans-serif]">
            NLE 343
          </div>
          <div className="text-[10px] text-gray-400 font-medium">Delivery: NLE 390 avg</div>
        </div>
      </div>

      {/* Branch Sales Bar Chart (Recharts) */}
      <div className="bg-[#1A1A1A] text-[#F5F0E8] p-5 sm:p-6 rounded-3xl border-2 border-gray-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black font-[Impact,sans-serif] uppercase text-[#F2B705] tracking-wide">
              Branch Revenue Comparison (NLE)
            </h2>
            <p className="text-xs text-gray-400">
              Comparing daily sales volume across all 5 Freetown branches
            </p>
          </div>
          <StickerBadge label="HOT SPOT: LUMLEY" variant="red" size="sm" />
        </div>

        {/* Chart Container */}
        <div className="h-64 sm:h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={DASHBOARD_SALES_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
              <XAxis dataKey="branchName" stroke="#9CA3AF" tick={{ fontSize: 12, fill: '#F5F0E8' }} />
              <YAxis stroke="#9CA3AF" tick={{ fontSize: 11, fill: '#9CA3AF' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1A1A1A',
                  borderColor: '#C41E2A',
                  borderRadius: '12px',
                  color: '#F5F0E8',
                  fontSize: '12px',
                }}
                formatter={(val: any) => [`NLE ${val}`, 'Revenue']}
              />
              <Bar dataKey="revenueNLE" radius={[8, 8, 0, 0]}>
                {DASHBOARD_SALES_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fillColor} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Breakdown & Branch Operational Control */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Category Sales Share */}
        <div className="bg-[#1A1A1A] text-[#F5F0E8] p-5 rounded-3xl border-2 border-gray-800 space-y-3 shadow-xl">
          <h2 className="text-lg font-black font-[Impact,sans-serif] uppercase text-[#F5F0E8]">
            Category Breakdown (% Volume)
          </h2>
          <div className="h-44 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categoryBreakdown.map((entry, index) => (
                    <Cell key={`pie-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1A1A1A',
                    borderColor: '#F2B705',
                    borderRadius: '8px',
                    color: '#F5F0E8',
                    fontSize: '12px',
                  }}
                  formatter={(val: any) => [`${val}%`, 'Share']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-800 text-xs">
            {categoryBreakdown.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-gray-300 truncate">
                  {item.name}: <strong className="text-white">{item.value}%</strong>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Store Operational Status Controls */}
        <div className="bg-[#1A1A1A] text-[#F5F0E8] p-5 rounded-3xl border-2 border-gray-800 space-y-3 shadow-xl">
          <h2 className="text-lg font-black font-[Impact,sans-serif] uppercase text-[#F5F0E8]">
            Branch Live Status Control
          </h2>
          <p className="text-xs text-gray-400">
            Simulate pausing order intake or setting high-demand status for branches.
          </p>

          <div className="space-y-2 pt-2">
            {LOCATIONS.map((loc) => {
              const status = storeStatuses[loc.id] || 'Open';

              return (
                <div
                  key={loc.id}
                  className="bg-[#262626] p-2.5 rounded-xl border border-gray-800 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-white">{loc.name}</div>
                    <div className="text-[10px] text-gray-400">{loc.landmark}</div>
                  </div>

                  <button
                    onClick={() => toggleStoreStatus(loc.id)}
                    className={`px-3 py-1 rounded-lg font-bold text-[11px] flex items-center gap-1 transition-colors cursor-pointer ${
                      status === 'Open'
                        ? 'bg-emerald-900 text-emerald-300 border border-emerald-500'
                        : status === 'Busy'
                        ? 'bg-amber-900 text-amber-300 border border-amber-500'
                        : 'bg-red-950 text-red-400 border border-red-500'
                    }`}
                  >
                    <Power className="w-3 h-3" />
                    <span>{status.toUpperCase()}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Simulated Live WhatsApp Orders Feed */}
      <div className="bg-[#1A1A1A] text-[#F5F0E8] p-5 rounded-3xl border-2 border-gray-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black font-[Impact,sans-serif] uppercase text-[#F2B705] tracking-wide">
            Recent Incoming WhatsApp Orders ⚡
          </h2>
          <span className="text-xs text-gray-400">Auto-updating</span>
        </div>

        <div className="space-y-2.5">
          {MOCK_RECENT_ORDERS.map((ord) => (
            <div
              key={ord.id}
              className="bg-[#262626] p-3.5 rounded-2xl border border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-[#F5F0E8]">{ord.customerName}</span>
                  <span className="text-[10px] font-mono text-gray-400">({ord.id})</span>
                  <span className="bg-[#1A1A1A] text-[#F2B705] text-[10px] font-bold px-2 py-0.5 rounded">
                    {ord.branchName}
                  </span>
                </div>
                <p className="text-xs text-gray-300 line-clamp-1">{ord.itemsSummary}</p>
                <div className="text-[10px] text-gray-500 flex items-center gap-2">
                  <span>{ord.timeAgo}</span>
                  <span>•</span>
                  <span className="capitalize">{ord.fulfillment}</span>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-gray-800">
                <div className="text-sm font-black text-[#F2B705]">NLE {ord.totalNLE}</div>
                <span
                  className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase ${
                    ord.status === 'Preparing'
                      ? 'bg-amber-900/80 text-amber-300 border border-amber-600'
                      : ord.status === 'Out for Delivery'
                      ? 'bg-blue-900/80 text-blue-300 border border-blue-600'
                      : ord.status === 'Ready for Pickup'
                      ? 'bg-purple-900/80 text-purple-300 border border-purple-600'
                      : 'bg-emerald-900/80 text-emerald-300 border border-emerald-600'
                  }`}
                >
                  {ord.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
