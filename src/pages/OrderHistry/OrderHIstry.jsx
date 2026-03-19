import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft, CheckCircle2, ChefHat, Bike,
  Home, Clock, ChevronDown, Star,
  RotateCcw, Search, MapPin, Package,
} from "lucide-react";
import { Auth } from "../../Provider/AuthProvider.jsx";
// import { Data } from "../../provider/DataProvider";

// ─── Mock data — replace with userOrders from context ────────────────────────

const ORDERS = [
  {
    id: "CKH-2351",
    date: "18 Mar 2025",
    items: [
      { emoji: "🎂", name: "Classic Vanilla Dream", size: "1 kg",   qty: 1 },
      { emoji: "🧁", name: "Assorted Cupcakes",     size: "Box/12", qty: 1 },
    ],
    total: 1700,
    status: "on_the_way",
    deliverySlot: "3pm – 6pm",
    address: "House 12, Road 4, Dhanmondi, Dhaka",
    trackingSteps: [
      { key: "confirmed",  label: "Order Confirmed", time: "10:00 AM", done: true,  active: false },
      { key: "preparing",  label: "Baking Started",  time: "11:15 AM", done: true,  active: false },
      { key: "ready",      label: "Cake Ready",       time: "01:30 PM", done: true,  active: false },
      { key: "on_the_way", label: "Out for Delivery", time: "02:45 PM", done: false, active: true  },
      { key: "delivered",  label: "Delivered",        time: "3pm – 6pm",done: false, active: false },
    ],
  },
  {
    id: "CKH-2347",
    date: "10 Mar 2025",
    items: [
      { emoji: "🍫", name: "Dark Chocolate Fudge", size: "1.5 kg", qty: 2 },
    ],
    total: 3200,
    status: "delivered",
    deliverySlot: "12pm – 3pm",
    address: "House 12, Road 4, Dhanmondi, Dhaka",
    trackingSteps: [],
  },
  {
    id: "CKH-2198",
    date: "18 Feb 2025",
    items: [
      { emoji: "💍", name: "Wedding Bliss Tier", size: "3-tier", qty: 1 },
    ],
    total: 5200,
    status: "delivered",
    deliverySlot: "10am – 12pm",
    address: "Gulshan 2, Dhaka",
    trackingSteps: [],
  },
  {
    id: "CKH-2089",
    date: "30 Jan 2025",
    items: [
      { emoji: "🍓", name: "Strawberry Dream", size: "1 kg", qty: 1 },
      { emoji: "✨", name: "Custom Cake",       size: "2 kg", qty: 1 },
    ],
    total: 3700,
    status: "cancelled",
    deliverySlot: "6pm – 9pm",
    address: "Mirpur 10, Dhaka",
    trackingSteps: [],
  },
  {
    id: "CKH-2044",
    date: "12 Jan 2025",
    items: [
      { emoji: "🎭", name: "Unicorn Theme Cake", size: "2 kg", qty: 1 },
    ],
    total: 2200,
    status: "delivered",
    deliverySlot: "3pm – 6pm",
    address: "Banani, Dhaka",
    trackingSteps: [],
  },
];

// ─── Config maps ──────────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  on_the_way: {
    label: "On the Way",
    emoji: "🚴",
    pill:  "bg-amber-100 text-amber-700 border-amber-200",
    dot:   "bg-amber-400",
  },
  delivered: {
    label: "Delivered",
    emoji: "✓",
    pill:  "bg-green-100 text-green-700 border-green-200",
    dot:   "bg-green-400",
  },
  processing: {
    label: "Processing",
    emoji: "⏳",
    pill:  "bg-blue-100 text-blue-700 border-blue-200",
    dot:   "bg-blue-400",
  },
  cancelled: {
    label: "Cancelled",
    emoji: "✕",
    pill:  "bg-red-100 text-red-500 border-red-200",
    dot:   "bg-red-400",
  },
};

const TRACK_ICON = {
  confirmed:  <CheckCircle2 size={14} />,
  preparing:  <ChefHat      size={14} />,
  ready:      <Package      size={14} />,
  on_the_way: <Bike         size={14} />,
  delivered:  <Home         size={14} />,
};

const FILTERS = ["All", "On the Way", "Delivered", "Cancelled"];

// ─── Live Tracking Card ───────────────────────────────────────────────────────

const LiveTrackingCard = ({ order }) => (
  <div className="bg-white border-2 border-[#E8627A]/25 rounded-2xl overflow-hidden">

    {/* Dark header */}
    <div className="bg-gradient-to-r from-[#3D1C2C] to-[#5C2A38] px-5 py-3.5 flex items-center justify-between">
      <div>
        <p className="text-[10px] font-bold text-pink-300 uppercase tracking-widest mb-0.5">
          Live Tracking
        </p>
        <p className="text-sm font-bold text-white">Order #{order.id}</p>
      </div>
      <div className="flex items-center gap-1.5 bg-white/10 border border-white/20 px-3 py-1 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
        <span className="text-xs font-semibold text-white">Live</span>
      </div>
    </div>

    <div className="px-5 pt-5 pb-4">

      {/* Timeline */}
      <div className="mb-5">
        {order.trackingSteps.map((step, i) => {
          const isLast = i === order.trackingSteps.length - 1;

          return (
            <div key={step.key} className="flex gap-4">

              {/* Dot + vertical line */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  {/* Ping ring on active step */}
                  {step.active && (
                    <span className="absolute inset-0 rounded-full border-2 border-[#E8627A] animate-ping opacity-40" />
                  )}
                  <div
                    className={`relative w-9 h-9 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300 ${
                      step.active
                        ? "border-[#E8627A] bg-[#E8627A] text-white shadow-[0_0_0_5px_rgba(232,98,122,0.12)]"
                        : step.done
                        ? "border-[#E8627A] bg-[#E8627A] text-white"
                        : "border-gray-200 bg-white text-gray-300"
                    }`}
                  >
                    {TRACK_ICON[step.key]}
                  </div>
                </div>

                {!isLast && (
                  <div
                    className={`w-0.5 min-h-[28px] flex-1 my-1 transition-colors duration-300 ${
                      step.done ? "bg-[#E8627A]" : "bg-gray-100"
                    }`}
                  />
                )}
              </div>

              {/* Text */}
              <div className="pb-5 pt-1.5 flex-1 flex items-start justify-between gap-2">
                <div>
                  <p
                    className={`text-sm font-semibold ${
                      step.active
                        ? "text-[#E8627A]"
                        : step.done
                        ? "text-[#2A1A1A]"
                        : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </p>
                  {step.active && (
                    <p className="text-[10px] text-[#E8627A] font-medium mt-0.5">
                      In progress...
                    </p>
                  )}
                </div>
                <span className="text-[11px] text-[#8B7070] flex items-center gap-1 shrink-0 mt-0.5">
                  <Clock size={10} /> {step.time}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ETA strip */}
      <div className="flex items-center justify-between bg-[#FFF8F0] border border-[#E8627A]/15 rounded-xl px-4 py-3">
        <div className="flex items-center gap-2">
          <Bike size={15} className="text-[#E8627A]" />
          <span className="text-sm font-medium text-[#5C3D2E]">Estimated delivery</span>
        </div>
        <span className="text-sm font-bold text-[#E8627A]">{order.deliverySlot}</span>
      </div>

      {/* Address */}
      <div className="flex items-start gap-2 mt-3 px-1">
        <MapPin size={12} className="text-[#8B7070] shrink-0 mt-0.5" />
        <p className="text-xs text-[#8B7070]">{order.address}</p>
      </div>
    </div>
  </div>
);

// ─── Past Order Card ──────────────────────────────────────────────────────────

const OrderCard = ({ order }) => {
  const [open, setOpen] = useState(false);
  const cfg = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.processing;

  return (
    <div className={`bg-white border rounded-2xl overflow-hidden transition-shadow ${open ? "border-gray-200 shadow-sm" : "border-gray-100"}`}>

      {/* Always-visible summary */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3.5 px-4 py-4 text-left"
      >
        {/* Emoji */}
        <div className="relative w-12 h-12 shrink-0">
          <div className="w-full h-full bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl flex items-center justify-center text-2xl">
            {order.items[0].emoji}
          </div>
          {order.items.length > 1 && (
            <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#E8627A] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              +{order.items.length - 1}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <p className="text-sm font-bold text-[#2A1A1A]">#{order.id}</p>
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${cfg.pill}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
              {cfg.emoji} {cfg.label}
            </span>
          </div>

          <p className="text-xs text-[#8B7070] truncate">
            {order.items.map((i) => i.name).join(" · ")}
          </p>

          <div className="flex items-center justify-between mt-1.5">
            <span className="text-[11px] text-[#8B7070] flex items-center gap-1">
              <Clock size={10} /> {order.date}
            </span>
            <span className="text-sm font-bold text-[#E8627A]">
              ৳{order.total.toLocaleString()}
            </span>
          </div>
        </div>

        <ChevronDown
          size={15}
          className={`text-gray-300 shrink-0 ml-1 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Expanded detail */}
      {open && (
        <div className="border-t border-gray-50 px-4 pb-4 pt-3 space-y-3.5">

          {/* Items */}
          <div className="space-y-2.5">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xl w-8 text-center shrink-0">{item.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[#2A1A1A] truncate">{item.name}</p>
                  <p className="text-[10px] text-[#8B7070]">{item.size} × {item.qty}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery info */}
          <div className="bg-[#FFF8F0] rounded-xl px-3.5 py-3 space-y-1.5">
            <div className="flex items-start gap-2">
              <MapPin size={12} className="text-[#E8627A] shrink-0 mt-0.5" />
              <p className="text-xs text-[#5C3D2E]">{order.address}</p>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={12} className="text-[#E8627A] shrink-0" />
              <p className="text-xs text-[#5C3D2E]">Slot: {order.deliverySlot}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            {order.status === "delivered" && (
              <>
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-[#E8627A] border border-[#E8627A]/30 rounded-xl hover:bg-[#FDEEF1] transition-colors">
                  <Star size={12} /> Write Review
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-[#3D1C2C] border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                  <RotateCcw size={12} /> Reorder
                </button>
              </>
            )}
            {order.status === "cancelled" && (
              <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-white bg-[#E8627A] rounded-xl hover:bg-[#C04060] transition-colors active:scale-95">
                <RotateCcw size={12} /> Order Again
              </button>
            )}
            {order.status === "on_the_way" && (
              <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-amber-700 border border-amber-200 bg-amber-50 rounded-xl hover:bg-amber-100 transition-colors">
                <Bike size={12} /> Track Live
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const OrderHistory = () => {
  const { user }       = useContext(Auth);
//   const { userOrders } = useContext(Data);  // swap ORDERS → userOrders when API ready
  const navigate       = useNavigate();

  const [search,       setSearch]       = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const liveOrder = ORDERS.find((o) => o.status === "on_the_way");

  const filtered = ORDERS.filter((order) => {
    const matchFilter =
      activeFilter === "All"          ? true
      : activeFilter === "On the Way" ? order.status === "on_the_way"
      : activeFilter === "Delivered"  ? order.status === "delivered"
      : activeFilter === "Cancelled"  ? order.status === "cancelled"
      : true;

    const q = search.trim().toLowerCase();
    const matchSearch =
      !q ||
      order.id.toLowerCase().includes(q) ||
      order.items.some((i) => i.name.toLowerCase().includes(q));

    return matchFilter && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#FFF8F0]">

      {/* ── STICKY HEADER ── */}
      <div className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl hover:bg-gray-100 text-[#8B7070] transition-colors"
          >
            <ArrowLeft size={16} />
          </button>
          <div className="flex-1">
            <h1
              className="text-xl font-bold text-[#3D1C2C]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Order History
            </h1>
            <p className="text-[11px] text-[#8B7070]">{ORDERS.length} total orders</p>
          </div>
          <Link to="/shop" className="text-xs font-semibold text-[#E8627A] hover:underline">
            + New Order
          </Link>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">

        {/* ── LIVE TRACKING — only shown when an order is active ── */}
        {liveOrder && <LiveTrackingCard order={liveOrder} />}

        {/* ── SEARCH ── */}
        <div className="relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B7070]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order ID or cake name..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl outline-none focus:border-[#E8627A] focus:ring-2 focus:ring-[#E8627A]/10 transition-all placeholder:text-gray-300 text-[#2A1A1A]"
          />
        </div>

        {/* ── FILTER CHIPS ── */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border whitespace-nowrap transition-all ${
                activeFilter === f
                  ? "bg-[#E8627A] text-white border-[#E8627A] shadow-sm"
                  : "bg-white text-[#8B7070] border-gray-200 hover:border-[#E8627A] hover:text-[#E8627A]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* ── ORDER LIST ── */}
        {filtered.length > 0 ? (
          <div className="space-y-3">
            {filtered.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="text-6xl mb-4">📦</span>
            <p
              className="text-lg font-bold text-[#3D1C2C]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              No orders found
            </p>
            <p className="text-sm text-[#8B7070] mt-1 mb-5">
              {search ? `No results for "${search}"` : "You haven't placed any orders yet."}
            </p>
            <Link
              to="/shop"
              className="px-6 py-3 bg-[#E8627A] text-white text-sm font-bold rounded-xl hover:bg-[#C04060] transition-colors"
            >
              🎂 Order Something Delicious
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default OrderHistory;