import { ShoppingBag, Users, Package, TrendingUp, ArrowUpRight, Clock, CheckCircle2, Bike } from "lucide-react";
import { getGreeting } from '../utility/GetGreeting';

// ─── Mock stats ───────────────────────────────────────────────────────────────

const STATS = [
  { label: "Total Revenue",  value: "৳1,24,500", change: "+12%", up: true,  icon: <TrendingUp size={18} />, color: "bg-rose-50 text-[#E8627A]" },
  { label: "Total Orders",   value: "284",        change: "+8%",  up: true,  icon: <Package    size={18} />, color: "bg-amber-50 text-amber-600" },
  { label: "Total Cakes",    value: "48",         change: "+3",   up: true,  icon: <ShoppingBag size={18} />, color: "bg-purple-50 text-purple-600" },
  { label: "Total Users",    value: "1,204",      change: "+24",  up: true,  icon: <Users      size={18} />, color: "bg-green-50 text-green-600" },
];

const RECENT_ORDERS = [
  { id: "CKH-2351", customer: "Rina Ahmed",     cake: "Classic Vanilla Dream", total: 1700, status: "on_the_way" },
  { id: "CKH-2350", customer: "Karim Hossain",  cake: "Dark Chocolate Fudge",  total: 2400, status: "processing" },
  { id: "CKH-2349", customer: "Sadia Islam",    cake: "Wedding Bliss Tier",    total: 5200, status: "delivered"  },
  { id: "CKH-2348", customer: "Nadia Chow",     cake: "Strawberry Dream",      total: 1100, status: "delivered"  },
  { id: "CKH-2347", customer: "Arif Rahman",    cake: "Unicorn Theme Cake",    total: 2200, status: "processing" },
];

const TOP_CAKES = [
  { emoji: "🎂", name: "Classic Vanilla Dream", sold: 84,  revenue: "৳71,400" },
  { emoji: "🍫", name: "Dark Chocolate Fudge",  sold: 61,  revenue: "৳73,200" },
  { emoji: "🍓", name: "Strawberry Dream",      sold: 55,  revenue: "৳60,500" },
  { emoji: "💍", name: "Wedding Bliss Tier",    sold: 17,  revenue: "৳88,400" },
  { emoji: "🧁", name: "Assorted Cupcakes",     sold: 102, revenue: "৳61,200" },
];

const STATUS_CONFIG = {
  on_the_way: { label: "On the Way", color: "bg-amber-100 text-amber-700" },
  processing:  { label: "Processing", color: "bg-blue-100 text-blue-700"  },
  delivered:   { label: "Delivered",  color: "bg-green-100 text-green-700"},
  cancelled:   { label: "Cancelled",  color: "bg-red-100 text-red-500"    },
};

// ─── Mini bar chart (CSS only) ────────────────────────────────────────────────

const BAR_DATA = [
  { day: "Mon", val: 60 }, { day: "Tue", val: 80 },
  { day: "Wed", val: 45 }, { day: "Thu", val: 90 },
  { day: "Fri", val: 70 }, { day: "Sat", val: 100 },
  { day: "Sun", val: 55 },
];

// ─── Component ────────────────────────────────────────────────────────────────

const DashboardHome = () => (
  <div className="space-y-6 max-w-7xl mx-auto">

    {/* Header */}
    <div>
      <h1 className="text-2xl font-bold text-[#3D1C2C]"
        style={{ fontFamily: "'Playfair Display', serif" }}>
        {getGreeting()}, Mithi 👋
      </h1>
      <p className="text-sm text-[#8B7070] mt-0.5">Here's what's happening with Sanzida's Cake today.</p>
    </div>

    {/* ── STAT CARDS ── */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {STATS.map((s) => (
        <div key={s.label} className="bg-white border border-gray-100 rounded-2xl p-5 space-y-3 hover:shadow-sm transition-shadow">
          <div className="flex items-center justify-between">
            <span className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
              {s.icon}
            </span>
            <span className={`text-xs font-bold flex items-center gap-0.5 ${s.up ? "text-green-600" : "text-red-500"}`}>
              <ArrowUpRight size={12} /> {s.change}
            </span>
          </div>
          <div>
            <p className="text-2xl font-bold text-[#2A1A1A]">{s.value}</p>
            <p className="text-xs text-[#8B7070] mt-0.5">{s.label}</p>
          </div>
        </div>
      ))}
    </div>

    {/* ── REVENUE CHART + TOP CAKES ── */}
    <div className="grid lg:grid-cols-3 gap-4">

      {/* Bar chart */}
      <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-sm font-bold text-[#3D1C2C]">Weekly Revenue</p>
            <p className="text-xs text-[#8B7070]">This week vs last week</p>
          </div>
          <span className="text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
            +12% ↑
          </span>
        </div>

        {/* Bars */}
        <div className="flex items-end gap-2 h-32">
          {BAR_DATA.map((d) => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5">
              <div
                className="w-full rounded-t-lg bg-gradient-to-t from-[#E8627A] to-[#F4A0B0] transition-all duration-500 hover:from-[#C04060] hover:to-[#E8627A]"
                style={{ height: `${d.val}%` }}
              />
              <span className="text-[10px] text-[#8B7070]">{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top cakes */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5">
        <p className="text-sm font-bold text-[#3D1C2C] mb-4">Top Selling Cakes</p>
        <div className="space-y-3">
          {TOP_CAKES.map((c, i) => (
            <div key={c.name} className="flex items-center gap-3">
              <span className="text-xs font-bold text-[#8B7070] w-4 shrink-0">{i + 1}</span>
              <span className="text-xl w-7 text-center shrink-0">{c.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-[#2A1A1A] truncate">{c.name}</p>
                <p className="text-[10px] text-[#8B7070]">{c.sold} sold</p>
              </div>
              <p className="text-xs font-bold text-[#E8627A] shrink-0">{c.revenue}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* ── RECENT ORDERS ── */}
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
        <p className="text-sm font-bold text-[#3D1C2C]">Recent Orders</p>
        <a href="/admin/orders" className="text-xs font-semibold text-[#E8627A] hover:underline">
          View all →
        </a>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-50">
              {["Order ID", "Customer", "Cake", "Total", "Status"].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-[10px] font-bold text-[#8B7070] uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {RECENT_ORDERS.map((o) => {
              const cfg = STATUS_CONFIG[o.status];
              return (
                <tr key={o.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5 font-mono text-xs text-[#3D1C2C] font-semibold">{o.id}</td>
                  <td className="px-5 py-3.5 text-sm text-[#2A1A1A]">{o.customer}</td>
                  <td className="px-5 py-3.5 text-xs text-[#8B7070] max-w-[150px] truncate">{o.cake}</td>
                  <td className="px-5 py-3.5 text-sm font-bold text-[#E8627A]">৳{o.total.toLocaleString()}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold ${cfg.color}`}>
                      {cfg.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>

  </div>
);

export default DashboardHome;