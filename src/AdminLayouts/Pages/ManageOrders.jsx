import { useState } from "react";
import { Search, Eye, ChevronDown, X, MapPin, Clock, Package } from "lucide-react";

const INITIAL_ORDERS = [
  { id: "CKH-2351", customer: "Rina Ahmed",     email: "rina@email.com",   phone: "+880 171 000 0001", date: "18 Mar 2025", items: [{ emoji: "🎂", name: "Classic Vanilla Dream", qty: 1, price: 1100 }, { emoji: "🧁", name: "Assorted Cupcakes", qty: 1, price: 600 }], subtotal: 1700, delivery: 80, total: 1780, status: "on_the_way",  address: "House 12, Road 4, Dhanmondi, Dhaka",  slot: "3pm – 6pm" },
  { id: "CKH-2350", customer: "Karim Hossain",  email: "karim@email.com",  phone: "+880 171 000 0002", date: "18 Mar 2025", items: [{ emoji: "🍫", name: "Dark Chocolate Fudge", qty: 2, price: 2400 }], subtotal: 2400, delivery: 80, total: 2480, status: "processing",  address: "Gulshan 2, Dhaka",                     slot: "12pm – 3pm" },
  { id: "CKH-2349", customer: "Sadia Islam",    email: "sadia@email.com",  phone: "+880 171 000 0003", date: "17 Mar 2025", items: [{ emoji: "💍", name: "Wedding Bliss Tier", qty: 1, price: 5200 }], subtotal: 5200, delivery: 0, total: 5200, status: "delivered",   address: "Banani, Dhaka",                        slot: "10am – 12pm" },
  { id: "CKH-2348", customer: "Nadia Chow",     email: "nadia@email.com",  phone: "+880 171 000 0004", date: "17 Mar 2025", items: [{ emoji: "🍓", name: "Strawberry Dream", qty: 1, price: 1100 }], subtotal: 1100, delivery: 80, total: 1180, status: "delivered",   address: "Mirpur 10, Dhaka",                     slot: "3pm – 6pm" },
  { id: "CKH-2347", customer: "Arif Rahman",    email: "arif@email.com",   phone: "+880 171 000 0005", date: "16 Mar 2025", items: [{ emoji: "🎭", name: "Unicorn Theme Cake", qty: 1, price: 2200 }], subtotal: 2200, delivery: 80, total: 2280, status: "processing",  address: "Uttara, Dhaka",                        slot: "6pm – 9pm" },
  { id: "CKH-2346", customer: "Mitu Begum",     email: "mitu@email.com",   phone: "+880 171 000 0006", date: "15 Mar 2025", items: [{ emoji: "✨", name: "Custom Surprise Cake", qty: 1, price: 1500 }], subtotal: 1500, delivery: 80, total: 1580, status: "cancelled",  address: "Mohakhali, Dhaka",                     slot: "3pm – 6pm" },
];

const ALL_STATUSES = ["processing", "on_the_way", "delivered", "cancelled"];

const STATUS_CONFIG = {
  processing:  { label: "Processing",   color: "bg-blue-100 text-blue-700",   dot: "bg-blue-400"   },
  on_the_way:  { label: "On the Way",   color: "bg-amber-100 text-amber-700", dot: "bg-amber-400"  },
  delivered:   { label: "Delivered",    color: "bg-green-100 text-green-700", dot: "bg-green-400"  },
  cancelled:   { label: "Cancelled",    color: "bg-red-100 text-red-500",     dot: "bg-red-400"    },
};

const FILTERS = ["All", "Processing", "On the Way", "Delivered", "Cancelled"];

// ─── Order Detail Modal ───────────────────────────────────────────────────────

const OrderModal = ({ order, onUpdateStatus, onClose }) => {
  const [status, setStatus] = useState(order.status);

  const handleSave = () => {
    onUpdateStatus(order.id, status);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

        <div className="sticky top-0 bg-white flex items-center justify-between px-6 py-4 border-b border-gray-100 rounded-t-2xl z-10">
          <div>
            <h2 className="text-base font-bold text-[#3D1C2C]">Order #{order.id}</h2>
            <p className="text-xs text-[#8B7070]">{order.date}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-[#8B7070]">
            <X size={16} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Customer */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-1">
            <p className="text-xs font-bold text-[#8B7070] uppercase tracking-wider mb-2">Customer</p>
            <p className="text-sm font-semibold text-[#2A1A1A]">{order.customer}</p>
            <p className="text-xs text-[#8B7070]">{order.email}</p>
            <p className="text-xs text-[#8B7070]">{order.phone}</p>
          </div>

          {/* Items */}
          <div>
            <p className="text-xs font-bold text-[#8B7070] uppercase tracking-wider mb-3">Order Items</p>
            <div className="space-y-2.5">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl px-3 py-2.5">
                  <span className="text-xl">{item.emoji}</span>
                  <div className="flex-1"><p className="text-sm font-medium text-[#2A1A1A]">{item.name}</p></div>
                  <span className="text-xs text-[#8B7070]">×{item.qty}</span>
                  <span className="text-sm font-bold text-[#E8627A]">৳{item.price.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Price breakdown */}
          <div className="bg-[#FFF8F0] rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-xs text-[#8B7070]"><span>Subtotal</span><span>৳{order.subtotal.toLocaleString()}</span></div>
            <div className="flex justify-between text-xs text-[#8B7070]"><span>Delivery</span><span>{order.delivery === 0 ? "FREE" : `৳${order.delivery}`}</span></div>
            <div className="flex justify-between text-sm font-bold text-[#3D1C2C] border-t border-[#E8627A]/15 pt-2"><span>Total</span><span className="text-[#E8627A]">৳{order.total.toLocaleString()}</span></div>
          </div>

          {/* Delivery info */}
          <div className="space-y-2">
            <p className="text-xs font-bold text-[#8B7070] uppercase tracking-wider">Delivery</p>
            <div className="flex items-start gap-2"><MapPin size={13} className="text-[#E8627A] shrink-0 mt-0.5" /><p className="text-xs text-[#5C3D2E]">{order.address}</p></div>
            <div className="flex items-center gap-2"><Clock size={13} className="text-[#E8627A]" /><p className="text-xs text-[#5C3D2E]">{order.slot}</p></div>
          </div>

          {/* Status updater */}
          <div>
            <p className="text-xs font-bold text-[#8B7070] uppercase tracking-wider mb-2">Update Status</p>
            <div className="grid grid-cols-2 gap-2">
              {ALL_STATUSES.map((s) => {
                const cfg = STATUS_CONFIG[s];
                return (
                  <button
                    key={s}
                    onClick={() => setStatus(s)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                      status === s ? "border-[#E8627A] bg-[#FDEEF1]" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                    {cfg.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-gray-100 flex gap-3 rounded-b-2xl">
          <button onClick={onClose} className="flex-1 py-2.5 text-sm font-semibold border border-gray-200 rounded-xl hover:bg-gray-50">Cancel</button>
          <button onClick={handleSave} className="flex-1 py-2.5 text-sm font-bold text-white bg-[#E8627A] hover:bg-[#C04060] rounded-xl transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Main ─────────────────────────────────────────────────────────────────────

const ManageOrders = () => {
  const [orders,      setOrders]      = useState(INITIAL_ORDERS);
  const [search,      setSearch]      = useState("");
  const [filter,      setFilter]      = useState("All");
  const [viewOrder,   setViewOrder]   = useState(null);

  const updateStatus = (id, status) =>
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status } : o));

  const filtered = orders.filter((o) => {
    const matchFilter =
      filter === "All"          ? true
      : filter === "Processing" ? o.status === "processing"
      : filter === "On the Way" ? o.status === "on_the_way"
      : filter === "Delivered"  ? o.status === "delivered"
      : filter === "Cancelled"  ? o.status === "cancelled"
      : true;
    const q = search.toLowerCase();
    return matchFilter && (!q || o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q));
  });

  return (
    <div className="space-y-5 max-w-7xl mx-auto">

      <div>
        <h1 className="text-2xl font-bold text-[#3D1C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
          Manage Orders
        </h1>
        <p className="text-sm text-[#8B7070]">{orders.length} total orders</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B7070]" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order ID or customer..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl outline-none focus:border-[#E8627A] focus:ring-2 focus:ring-[#E8627A]/10 transition-all placeholder:text-gray-300 text-[#2A1A1A]"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {FILTERS.map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                filter === f ? "bg-[#E8627A] text-white border-[#E8627A]" : "bg-white text-[#8B7070] border-gray-200 hover:border-[#E8627A] hover:text-[#E8627A]"
              }`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                {["Order ID", "Customer", "Items", "Total", "Date", "Status", "Action"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[10px] font-bold text-[#8B7070] uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((o) => {
                const cfg = STATUS_CONFIG[o.status];
                return (
                  <tr key={o.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3.5 font-mono text-xs font-bold text-[#3D1C2C]">{o.id}</td>
                    <td className="px-4 py-3.5">
                      <p className="font-semibold text-[#2A1A1A] text-sm">{o.customer}</p>
                      <p className="text-[10px] text-[#8B7070]">{o.email}</p>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-[#8B7070]">
                      {o.items.map((i) => i.emoji).join(" ")}
                      <span className="ml-1">({o.items.length})</span>
                    </td>
                    <td className="px-4 py-3.5 font-bold text-[#E8627A]">৳{o.total.toLocaleString()}</td>
                    <td className="px-4 py-3.5 text-xs text-[#8B7070] whitespace-nowrap">{o.date}</td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${cfg.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                        {cfg.label}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <button onClick={() => setViewOrder(o)}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-[#3D1C2C] border border-gray-200 rounded-xl hover:border-[#E8627A] hover:text-[#E8627A] transition-colors">
                        <Eye size={12} /> View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <span className="text-4xl">📦</span>
            <p className="text-sm text-[#8B7070] mt-2">No orders found.</p>
          </div>
        )}
      </div>

      {viewOrder && (
        <OrderModal order={viewOrder} onUpdateStatus={updateStatus} onClose={() => setViewOrder(null)} />
      )}
    </div>
  );
};

export default ManageOrders;