import { useState } from "react";
import {
  Search, Eye, Check, X, MessageSquare,
  Clock, MapPin, ChevronDown, Star,
  DollarSign, Bike, ChefHat, Package,
  CheckCircle2, Home, AlertCircle,
} from "lucide-react";

// ─── Mock data ────────────────────────────────────────────────────────────────

const INITIAL_ORDERS = [
  {
    id: "CKH-C1042",
    customer:    { name: "Rina Ahmed",    email: "rina@email.com",  phone: "+880 1711 000001" },
    occasion:    "🎂 Birthday",
    flavor:      "Vanilla",
    frosting:    "Buttercream",
    size:        "1 kg",
    tier:        "Single",
    theme:       "Floral",
    color:       "Blush Pink",
    message:     "Happy Birthday Rina! 🎉",
    notes:       "Please add extra flowers on top.",
    date:        "2025-03-25",
    slot:        "3pm – 6pm",
    address:     "House 12, Road 4, Dhanmondi, Dhaka",
    estimate:    1150,
    finalPrice:  null,
    status:      "pending",
    receivedAt:  "2025-03-18 10:32 AM",
    adminNote:   "",
  },
  {
    id: "CKH-C1041",
    customer:    { name: "Karim Hossain", email: "karim@email.com", phone: "+880 1711 000002" },
    occasion:    "💍 Wedding",
    flavor:      "Red Velvet",
    frosting:    "Fondant",
    size:        "3 kg",
    tier:        "3 Tier",
    theme:       "Elegant",
    color:       "White Ivory",
    message:     "Forever & Always ♡",
    notes:       "White rose decorations. Delivery to venue directly.",
    date:        "2025-03-30",
    slot:        "10am – 12pm",
    address:     "Radisson Blu Dhaka, Gulshan 1",
    estimate:    4650,
    finalPrice:  5000,
    status:      "confirmed",
    receivedAt:  "2025-03-17 03:15 PM",
    adminNote:   "Venue delivery confirmed. Extra charge applied for 3-tier.",
  },
  {
    id: "CKH-C1040",
    customer:    { name: "Sadia Islam",   email: "sadia@email.com", phone: "+880 1711 000003" },
    occasion:    "🎓 Graduation",
    flavor:      "Chocolate",
    frosting:    "Ganache",
    size:        "1.5 kg",
    tier:        "2 Tier",
    theme:       "Minimalist",
    color:       "Midnight Blue",
    message:     "Congrats Dr. Sadia!",
    notes:       "",
    date:        "2025-03-22",
    slot:        "12pm – 3pm",
    address:     "Banani, Dhaka",
    estimate:    2650,
    finalPrice:  2650,
    status:      "baking",
    receivedAt:  "2025-03-16 09:00 AM",
    adminNote:   "",
  },
  {
    id: "CKH-C1039",
    customer:    { name: "Nadia Chow",    email: "nadia@email.com", phone: "+880 1711 000004" },
    occasion:    "🍼 Baby Shower",
    flavor:      "Strawberry",
    frosting:    "Whipped Cream",
    size:        "1 kg",
    tier:        "Single",
    theme:       "Cartoon",
    color:       "Lavender",
    message:     "Welcome little one!",
    notes:       "Teddy bear topper please.",
    date:        "2025-03-20",
    slot:        "3pm – 6pm",
    address:     "Uttara Sector 7, Dhaka",
    estimate:    1150,
    finalPrice:  1300,
    status:      "delivered",
    receivedAt:  "2025-03-14 02:00 PM",
    adminNote:   "Added teddy bear topper — ৳150 extra.",
  },
  {
    id: "CKH-C1038",
    customer:    { name: "Arif Rahman",   email: "arif@email.com",  phone: "+880 1711 000005" },
    occasion:    "🏢 Corporate",
    flavor:      "Butterscotch",
    frosting:    "Swiss Meringue",
    size:        "2 kg",
    tier:        "Single",
    theme:       "Minimalist",
    color:       "Champagne",
    message:     "Congrats Team! Q1 Achieved ✓",
    notes:       "Office logo on top if possible.",
    date:        "2025-03-19",
    slot:        "10am – 12pm",
    address:     "Bashundhara City, Dhaka",
    estimate:    1650,
    finalPrice:  null,
    status:      "rejected",
    receivedAt:  "2025-03-13 11:45 AM",
    adminNote:   "Cannot print logo — food-safe printing unavailable this week.",
  },
];

// ─── Config ───────────────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  pending:   { label: "Pending Review", color: "bg-yellow-100 text-yellow-700", dot: "bg-yellow-400",  icon: <Clock       size={11} /> },
  confirmed: { label: "Confirmed",      color: "bg-blue-100 text-blue-700",    dot: "bg-blue-400",    icon: <CheckCircle2 size={11} /> },
  baking:    { label: "Baking",         color: "bg-purple-100 text-purple-700",dot: "bg-purple-400",  icon: <ChefHat     size={11} /> },
  out:       { label: "Out for Delivery",color:"bg-amber-100 text-amber-700",  dot: "bg-amber-400",   icon: <Bike        size={11} /> },
  delivered: { label: "Delivered",      color: "bg-green-100 text-green-700",  dot: "bg-green-400",   icon: <Home        size={11} /> },
  rejected:  { label: "Rejected",       color: "bg-red-100 text-red-500",      dot: "bg-red-400",     icon: <X           size={11} /> },
};

const WORKFLOW = ["pending", "confirmed", "baking", "out", "delivered"];
const FILTERS  = ["All", "Pending", "Confirmed", "Baking", "Delivered", "Rejected"];

// ─── Detail Modal ─────────────────────────────────────────────────────────────

const DetailModal = ({ order, onSave, onClose }) => {
  const [status,    setStatus]    = useState(order.status);
  const [finalPrice,setFinalPrice]= useState(order.finalPrice ?? order.estimate);
  const [adminNote, setAdminNote] = useState(order.adminNote);
  const [message,   setMessage]   = useState("");
  const [tab,       setTab]       = useState("details"); // "details" | "message"

  const handleSave = () => {
    onSave({ ...order, status, finalPrice: Number(finalPrice), adminNote });
    onClose();
  };

  const cfg = STATUS_CONFIG[status];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="sticky top-0 bg-white flex items-center justify-between px-6 py-4 border-b border-gray-100 rounded-t-2xl z-10">
          <div>
            <p className="text-[10px] font-bold text-[#8B7070] uppercase tracking-widest">Custom Order</p>
            <h2 className="text-base font-bold text-[#3D1C2C]">#{order.id}</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${cfg.color}`}>
              {cfg.icon} {cfg.label}
            </span>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-[#8B7070]">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-6 pt-4 border-b border-gray-100">
          {[
            { key: "details", label: "Order Details" },
            { key: "message", label: "Message Customer" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2 text-sm font-semibold border-b-2 -mb-px transition-colors ${
                tab === t.key
                  ? "border-[#E8627A] text-[#E8627A]"
                  : "border-transparent text-[#8B7070] hover:text-[#3D1C2C]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="p-6 space-y-5">
          {tab === "details" && (
            <>
              {/* Customer */}
              <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
                <div className="w-10 h-10 rounded-full bg-[#E8627A] flex items-center justify-center text-white font-bold shrink-0">
                  {order.customer.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#2A1A1A]">{order.customer.name}</p>
                  <p className="text-xs text-[#8B7070]">{order.customer.email} · {order.customer.phone}</p>
                </div>
                <p className="text-[10px] text-[#8B7070] text-right shrink-0">
                  Received<br />{order.receivedAt}
                </p>
              </div>

              {/* Cake spec grid */}
              <div>
                <p className="text-xs font-bold text-[#8B7070] uppercase tracking-widest mb-3">Cake Specifications</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { label: "Occasion",  value: order.occasion  },
                    { label: "Flavor",    value: order.flavor    },
                    { label: "Frosting",  value: order.frosting  },
                    { label: "Size",      value: order.size      },
                    { label: "Tiers",     value: order.tier      },
                    { label: "Theme",     value: order.theme     },
                    { label: "Color",     value: order.color     },
                    { label: "Message",   value: order.message || "—" },
                  ].map((r) => (
                    <div key={r.label} className="bg-[#FFF8F0] rounded-xl px-3 py-2.5">
                      <p className="text-[9px] font-bold text-[#8B7070] uppercase tracking-wider">{r.label}</p>
                      <p className="text-sm font-semibold text-[#2A1A1A] mt-0.5 truncate">{r.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              {order.notes && (
                <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
                  <p className="text-[10px] font-bold text-amber-700 uppercase tracking-wider mb-1">Customer Notes</p>
                  <p className="text-sm text-amber-800">"{order.notes}"</p>
                </div>
              )}

              {/* Delivery */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-[#8B7070] uppercase tracking-widest">Delivery</p>
                <div className="flex items-center gap-2">
                  <Clock size={13} className="text-[#E8627A] shrink-0" />
                  <p className="text-sm text-[#5C3D2E]">{order.date} · {order.slot}</p>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin size={13} className="text-[#E8627A] shrink-0 mt-0.5" />
                  <p className="text-sm text-[#5C3D2E]">{order.address}</p>
                </div>
              </div>

              {/* Price & status controls */}
              <div className="bg-white border border-gray-100 rounded-2xl p-5 space-y-4">
                <p className="text-xs font-bold text-[#8B7070] uppercase tracking-widest">Admin Controls</p>

                {/* Final price */}
                <div>
                  <label className="block text-xs font-semibold text-[#8B7070] uppercase tracking-wider mb-1.5">
                    Final Price (৳) <span className="normal-case text-[10px] text-green-600">Estimate: ৳{order.estimate}</span>
                  </label>
                  <div className="relative">
                    <DollarSign size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B7070]" />
                    <input
                      type="number"
                      value={finalPrice}
                      onChange={(e) => setFinalPrice(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#E8627A] focus:ring-2 focus:ring-[#E8627A]/10 transition-all text-[#2A1A1A] font-bold"
                    />
                  </div>
                </div>

                {/* Status workflow */}
                <div>
                  <p className="text-xs font-semibold text-[#8B7070] uppercase tracking-wider mb-2">Update Status</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
                      <button
                        key={key}
                        onClick={() => setStatus(key)}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 text-xs font-semibold transition-all ${
                          status === key
                            ? "border-[#E8627A] bg-[#FDEEF1] text-[#E8627A]"
                            : "border-gray-200 text-[#8B7070] hover:border-gray-300"
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full shrink-0 ${cfg.dot}`} />
                        {cfg.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Admin note */}
                <div>
                  <label className="block text-xs font-semibold text-[#8B7070] uppercase tracking-wider mb-1.5">
                    Internal Note
                    <span className="ml-1 normal-case text-[10px] text-gray-400">(not visible to customer)</span>
                  </label>
                  <textarea
                    value={adminNote}
                    onChange={(e) => setAdminNote(e.target.value)}
                    rows={2}
                    placeholder="e.g. Extra charge applied for 3-tier..."
                    className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#E8627A] focus:ring-2 focus:ring-[#E8627A]/10 transition-all placeholder:text-gray-300 text-[#2A1A1A] resize-none"
                  />
                </div>
              </div>
            </>
          )}

          {tab === "message" && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 flex items-start gap-2">
                <AlertCircle size={14} className="text-blue-500 shrink-0 mt-0.5" />
                <p className="text-xs text-blue-700">
                  Message will be sent to <span className="font-bold">{order.customer.email}</span> and shown in their order history.
                </p>
              </div>

              {/* Message history placeholder */}
              <div className="bg-gray-50 rounded-2xl p-4 min-h-[120px] flex items-center justify-center">
                <p className="text-xs text-[#8B7070] text-center">
                  No messages yet.<br />Start the conversation below.
                </p>
              </div>

              {/* Message input */}
              <div className="space-y-3">
                <div className="flex gap-2 flex-wrap">
                  {[
                    "Your order has been confirmed! 🎉",
                    "Final price updated. Please check.",
                    "Your cake is ready for delivery! 🚴",
                    "Can you please confirm the delivery address?",
                  ].map((q) => (
                    <button
                      key={q}
                      onClick={() => setMessage(q)}
                      className="text-[10px] px-2.5 py-1 bg-white border border-gray-200 rounded-full text-[#8B7070] hover:border-[#E8627A] hover:text-[#E8627A] transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    placeholder="Type a message to the customer..."
                    className="w-full px-4 py-3 text-sm bg-[#FFF8F0] border border-gray-200 rounded-xl outline-none focus:border-[#E8627A] focus:ring-2 focus:ring-[#E8627A]/10 transition-all placeholder:text-gray-300 text-[#2A1A1A] resize-none pr-24"
                  />
                  <button
                    disabled={!message.trim()}
                    className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 bg-[#E8627A] disabled:opacity-40 text-white text-xs font-bold rounded-lg transition-colors"
                  >
                    <MessageSquare size={11} /> Send
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-gray-100 flex gap-3 rounded-b-2xl">
          {/* Quick approve / reject */}
          {order.status === "pending" && (
            <>
              <button
                onClick={() => { onSave({ ...order, status: "rejected", finalPrice: Number(finalPrice), adminNote }); onClose(); }}
                className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-red-500 border border-red-200 rounded-xl hover:bg-red-50 transition-colors"
              >
                <X size={14} /> Reject
              </button>
              <button
                onClick={() => { onSave({ ...order, status: "confirmed", finalPrice: Number(finalPrice), adminNote }); onClose(); }}
                className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold text-white bg-green-500 hover:bg-green-600 rounded-xl transition-colors"
              >
                <Check size={14} /> Approve
              </button>
            </>
          )}
          <button onClick={onClose} className="px-4 py-2.5 text-sm font-semibold border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button onClick={handleSave} className="flex-1 py-2.5 text-sm font-bold text-white bg-[#E8627A] hover:bg-[#C04060] rounded-xl transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const ManageCustomOrders = () => {
  const [orders,  setOrders]  = useState(INITIAL_ORDERS);
  const [search,  setSearch]  = useState("");
  const [filter,  setFilter]  = useState("All");
  const [modal,   setModal]   = useState(null);

  const handleSave = (updated) =>
    setOrders((prev) => prev.map((o) => o.id === updated.id ? updated : o));

  const filtered = orders.filter((o) => {
    const matchFilter =
      filter === "All"       ? true
      : filter === "Pending"   ? o.status === "pending"
      : filter === "Confirmed" ? o.status === "confirmed"
      : filter === "Baking"    ? o.status === "baking"
      : filter === "Delivered" ? o.status === "delivered"
      : filter === "Rejected"  ? o.status === "rejected"
      : true;

    const q = search.toLowerCase();
    const matchSearch =
      !q || o.id.toLowerCase().includes(q) || o.customer.name.toLowerCase().includes(q);

    return matchFilter && matchSearch;
  });

  const pendingCount = orders.filter((o) => o.status === "pending").length;

  return (
    <div className="space-y-5 max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold text-[#3D1C2C]"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              Custom Orders
            </h1>
            {pendingCount > 0 && (
              <span className="px-2.5 py-0.5 bg-[#E8627A] text-white text-xs font-bold rounded-full animate-pulse">
                {pendingCount} pending
              </span>
            )}
          </div>
          <p className="text-sm text-[#8B7070]">{orders.length} total custom orders</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {Object.entries(STATUS_CONFIG).map(([key, cfg]) => {
          const count = orders.filter((o) => o.status === key).length;
          return (
            <button
              key={key}
              onClick={() => setFilter(key === filter ? "All" : key.charAt(0).toUpperCase() + key.slice(1))}
              className="bg-white border border-gray-100 rounded-2xl p-3 text-center hover:shadow-sm transition-shadow"
            >
              <p className="text-xl font-bold text-[#2A1A1A]">{count}</p>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold mt-1 ${cfg.color}`}>
                {cfg.icon} {cfg.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search + filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B7070]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order ID or customer name..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl outline-none focus:border-[#E8627A] focus:ring-2 focus:ring-[#E8627A]/10 transition-all placeholder:text-gray-300 text-[#2A1A1A]"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                filter === f
                  ? "bg-[#E8627A] text-white border-[#E8627A]"
                  : "bg-white text-[#8B7070] border-gray-200 hover:border-[#E8627A] hover:text-[#E8627A]"
              }`}
            >
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
                {["Order", "Customer", "Occasion", "Delivery", "Estimate", "Final Price", "Status", "Action"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[10px] font-bold text-[#8B7070] uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
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
                      <p className="font-semibold text-[#2A1A1A] text-sm">{o.customer.name}</p>
                      <p className="text-[10px] text-[#8B7070]">{o.customer.phone}</p>
                    </td>
                    <td className="px-4 py-3.5 text-sm">{o.occasion}</td>
                    <td className="px-4 py-3.5">
                      <p className="text-xs text-[#2A1A1A] font-medium whitespace-nowrap">{o.date}</p>
                      <p className="text-[10px] text-[#8B7070]">{o.slot}</p>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-[#8B7070]">৳{o.estimate.toLocaleString()}</td>
                    <td className="px-4 py-3.5">
                      {o.finalPrice
                        ? <span className="text-sm font-bold text-[#E8627A]">৳{o.finalPrice.toLocaleString()}</span>
                        : <span className="text-xs text-gray-400 italic">Not set</span>
                      }
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${cfg.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                        {cfg.label}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <button
                        onClick={() => setModal(o)}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-[#3D1C2C] border border-gray-200 rounded-xl hover:border-[#E8627A] hover:text-[#E8627A] transition-colors"
                      >
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
            <span className="text-4xl">✨</span>
            <p className="text-sm text-[#8B7070] mt-2">No custom orders found.</p>
          </div>
        )}
      </div>

      {modal && (
        <DetailModal
          order={modal}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
};

export default ManageCustomOrders;