import { useState } from "react";
import { Search, Trash2, ShieldCheck, ShieldOff, Plus, X, Check, Copy, Star, Eye, EyeOff } from "lucide-react";

// ══════════════════════════════════════════════════════════
//  MANAGE USERS
// ══════════════════════════════════════════════════════════

const INITIAL_USERS = [
  { id: 1, name: "Rahim Mia",    email: "rina@email.com",  phone: "+880 171 000 0001", joined: "10 Jan 2026", orders: 12, spent: 14200, role: "user"  },
  { id: 2, name: "Karim Mia", email: "karim@email.com", phone: "+880 171 000 0002", joined: "15 Jan 2026", orders: 8,  spent: 9800,  role: "user"  },
  { id: 2, name: "Halim Khan", email: "karim@email.com", phone: "+880 171 000 0002", joined: "15 Jan 2026", orders: 8,  spent: 9800,  role: "user"  },
  { id: 3, name: "Sadia Islam Shanta",   email: "sadia@email.com", phone: "+880 171 000 0003", joined: "20 Jan 2026", orders: 5,  spent: 18500, role: "user"  },
  { id: 4, name: "Nadia Chow",    email: "nadia@email.com", phone: "+880 171 000 0004", joined: "02 Feb 2026", orders: 3,  spent: 4200,  role: "user"  },
  { id: 5, name: "Sanzida Mithi",   email: "arif@email.com",  phone: "+880 171 000 0005", joined: "14 Feb 2026", orders: 0,  spent: 11300, role: "admin" },
];

export const ManageUsers = () => {
  const [users,  setUsers]  = useState(INITIAL_USERS);
  const [search, setSearch] = useState("");
  const [delId,  setDelId]  = useState(null);

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    return !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
  });

  const toggleRole = (id) =>
    setUsers((prev) => prev.map((u) => u.id === id ? { ...u, role: u.role === "admin" ? "user" : "admin" } : u));

  const deleteUser = (id) => { setUsers((prev) => prev.filter((u) => u.id !== id)); setDelId(null); };

  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-[#3D1C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
          Manage Users
        </h1>
        <p className="text-sm text-[#8B7070]">{users.length} registered users</p>
      </div>

      <div className="relative max-w-sm">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B7070]" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..."
          className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl outline-none focus:border-[#E8627A] focus:ring-2 focus:ring-[#E8627A]/10 transition-all placeholder:text-gray-300 text-[#2A1A1A]"
        />
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                {["User", "Phone", "Joined", "Orders", "Total Spent", "Role", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[10px] font-bold text-[#8B7070] uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#E8627A] flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {u.name[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-[#2A1A1A]">{u.name}</p>
                        <p className="text-[10px] text-[#8B7070]">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-[#8B7070]">{u.phone}</td>
                  <td className="px-4 py-3.5 text-xs text-[#8B7070] whitespace-nowrap">{u.joined}</td>
                  <td className="px-4 py-3.5 text-sm font-semibold text-[#2A1A1A]">{u.orders}</td>
                  <td className="px-4 py-3.5 text-sm font-bold text-[#E8627A]">৳{u.spent.toLocaleString()}</td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      u.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-600"
                    }`}>
                      {u.role === "admin" ? "Admin" : "User"}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => toggleRole(u.id)} title={u.role === "admin" ? "Remove Admin" : "Make Admin"}
                        className={`p-1.5 rounded-lg transition-colors ${u.role === "admin" ? "text-purple-400 hover:bg-purple-50" : "text-gray-400 hover:bg-gray-100"}`}>
                        {u.role === "admin" ? <ShieldOff size={14} /> : <ShieldCheck size={14} />}
                      </button>
                      <button onClick={() => setDelId(u.id)}
                        className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete confirm */}
      {delId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDelId(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto text-2xl">👤</div>
            <div>
              <p className="text-base font-bold text-[#2A1A1A]">Delete this user?</p>
              <p className="text-sm text-[#8B7070] mt-1">All their data will be permanently removed.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setDelId(null)} className="flex-1 py-2.5 text-sm font-semibold border border-gray-200 rounded-xl hover:bg-gray-50">Cancel</button>
              <button onClick={() => deleteUser(delId)} className="flex-1 py-2.5 text-sm font-bold text-white bg-red-500 hover:bg-red-600 rounded-xl">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ══════════════════════════════════════════════════════════
//  MANAGE COUPONS
// ══════════════════════════════════════════════════════════

const INITIAL_COUPONS = [
  { id: 1, code: "CAKE20",   type: "percent", value: 20, minOrder: 500,  uses: 84,  maxUses: 200, active: true,  expires: "2025-12-31" },
  { id: 2, code: "BDAY50",   type: "fixed",   value: 50, minOrder: 800,  uses: 31,  maxUses: 100, active: true,  expires: "2025-06-30" },
  { id: 3, code: "FREESHIP", type: "ship",    value: 0,  minOrder: 1000, uses: 112, maxUses: 500, active: true,  expires: "2025-12-31" },
  { id: 4, code: "SAVE100",  type: "fixed",   value: 100,minOrder: 1500, uses: 18,  maxUses: 50,  active: false, expires: "2025-03-31" },
];

const COUPON_EMPTY = { code: "", type: "percent", value: "", minOrder: "", maxUses: "", expires: "", active: true };

const CouponModal = ({ coupon, onSave, onClose }) => {
  const [form, setForm] = useState(coupon ?? COUPON_EMPTY);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSave = () => {
    if (!form.code.trim() || !form.value) return;
    onSave({ ...form, id: coupon?.id ?? Date.now(), value: Number(form.value), minOrder: Number(form.minOrder), maxUses: Number(form.maxUses), uses: coupon?.uses ?? 0 });
    onClose();
  };

  const LabelInput = ({ label, ...props }) => (
    <div>
      <label className="block text-xs font-semibold text-[#8B7070] uppercase tracking-wider mb-1.5">{label}</label>
      <input {...props} className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#E8627A] focus:ring-2 focus:ring-[#E8627A]/10 transition-all placeholder:text-gray-300 text-[#2A1A1A]" />
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-bold text-[#3D1C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
            {coupon ? "Edit Coupon" : "New Coupon"}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-[#8B7070]"><X size={16} /></button>
        </div>
        <div className="p-6 space-y-4">
          <LabelInput label="Coupon Code" value={form.code} onChange={set("code")} placeholder="e.g. CAKE20" className="uppercase" />
          <div>
            <label className="block text-xs font-semibold text-[#8B7070] uppercase tracking-wider mb-1.5">Type</label>
            <select value={form.type} onChange={set("type")}
              className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#E8627A] transition-all text-[#2A1A1A]">
              <option value="percent">Percentage Discount</option>
              <option value="fixed">Fixed Amount Off</option>
              <option value="ship">Free Shipping</option>
            </select>
          </div>
          {form.type !== "ship" && (
            <div className="grid grid-cols-2 gap-3">
              <LabelInput label={form.type === "percent" ? "Discount (%)" : "Discount (৳)"} type="number" value={form.value} onChange={set("value")} placeholder={form.type === "percent" ? "20" : "50"} />
              <LabelInput label="Min. Order (৳)" type="number" value={form.minOrder} onChange={set("minOrder")} placeholder="500" />
            </div>
          )}
          <div className="grid grid-cols-2 gap-3">
            <LabelInput label="Max Uses" type="number" value={form.maxUses} onChange={set("maxUses")} placeholder="100" />
            <LabelInput label="Expires" type="date" value={form.expires} onChange={set("expires")} />
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <div onClick={() => setForm((f) => ({ ...f, active: !f.active }))}
              className={`w-10 h-6 rounded-full transition-colors relative ${form.active ? "bg-[#E8627A]" : "bg-gray-300"}`}>
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.active ? "translate-x-5" : "translate-x-1"}`} />
            </div>
            <span className="text-sm font-medium text-[#2A1A1A]">Active</span>
          </label>
        </div>
        <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 text-sm font-semibold border border-gray-200 rounded-xl hover:bg-gray-50">Cancel</button>
          <button onClick={handleSave} className="flex-1 py-2.5 text-sm font-bold text-white bg-[#E8627A] hover:bg-[#C04060] rounded-xl transition-colors">
            {coupon ? "Save Changes" : "Create Coupon"}
          </button>
        </div>
      </div>
    </div>
  );
};

export const ManageCoupons = () => {
  const [coupons, setCoupons] = useState(INITIAL_COUPONS);
  const [modal,   setModal]   = useState(null);
  const [copied,  setCopied]  = useState(null);

  const handleSave = (data) => setCoupons((prev) =>
    prev.find((c) => c.id === data.id) ? prev.map((c) => c.id === data.id ? data : c) : [...prev, data]
  );
  const handleDelete = (id) => setCoupons((prev) => prev.filter((c) => c.id !== id));
  const toggleActive = (id) => setCoupons((prev) => prev.map((c) => c.id === id ? { ...c, active: !c.active } : c));
  const copyCode = (code) => { navigator.clipboard.writeText(code); setCopied(code); setTimeout(() => setCopied(null), 1500); };

  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#3D1C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>Manage Coupons</h1>
          <p className="text-sm text-[#8B7070]">{coupons.length} coupons</p>
        </div>
        <button onClick={() => setModal({ type: "add" })}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#E8627A] hover:bg-[#C04060] text-white text-sm font-bold rounded-xl shadow-md shadow-[#E8627A]/20 transition-colors">
          <Plus size={15} /> New Coupon
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {coupons.map((c) => {
          const usePct = Math.round((c.uses / c.maxUses) * 100);
          return (
            <div key={c.id} className={`bg-white border-2 rounded-2xl p-5 space-y-3 transition-all ${c.active ? "border-[#E8627A]/20" : "border-gray-100 opacity-60"}`}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-lg text-[#3D1C2C] tracking-wider">{c.code}</span>
                  <button onClick={() => copyCode(c.code)} className="p-1 text-gray-400 hover:text-[#E8627A] transition-colors">
                    {copied === c.code ? <Check size={13} className="text-green-500" /> : <Copy size={13} />}
                  </button>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => toggleActive(c.id)}
                    className={`w-9 h-5 rounded-full relative transition-colors ${c.active ? "bg-[#E8627A]" : "bg-gray-300"}`}
                    style={{ minWidth: "36px" }}>
                    <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${c.active ? "translate-x-4" : "translate-x-0.5"}`} />
                  </button>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <span className="text-sm font-bold text-[#E8627A]">
                  {c.type === "percent" ? `${c.value}% OFF` : c.type === "fixed" ? `৳${c.value} OFF` : "Free Shipping"}
                </span>
                {c.minOrder > 0 && <span className="text-xs text-[#8B7070] bg-gray-100 px-2 py-0.5 rounded-full">Min ৳{c.minOrder}</span>}
                <span className="text-xs text-[#8B7070] bg-gray-100 px-2 py-0.5 rounded-full">Exp: {c.expires}</span>
              </div>
              <div>
                <div className="flex justify-between text-[10px] text-[#8B7070] mb-1">
                  <span>{c.uses} used</span><span>{c.maxUses} max</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#E8627A] rounded-full transition-all" style={{ width: `${usePct}%` }} />
                </div>
              </div>
              <div className="flex gap-2 pt-1">
                <button onClick={() => setModal({ type: "edit", coupon: c })}
                  className="flex-1 py-2 text-xs font-semibold text-blue-600 border border-blue-200 rounded-xl hover:bg-blue-50 transition-colors">
                  Edit
                </button>
                <button onClick={() => handleDelete(c.id)}
                  className="flex-1 py-2 text-xs font-semibold text-red-500 border border-red-200 rounded-xl hover:bg-red-50 transition-colors">
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {modal?.type === "add"  && <CouponModal                       onSave={handleSave} onClose={() => setModal(null)} />}
      {modal?.type === "edit" && <CouponModal coupon={modal.coupon} onSave={handleSave} onClose={() => setModal(null)} />}
    </div>
  );
};

// ══════════════════════════════════════════════════════════
//  MANAGE REVIEWS
// ══════════════════════════════════════════════════════════

const INITIAL_REVIEWS = [
  { id: 1, customer: "Rina Ahmed",    cake: "Classic Vanilla Dream", rating: 5, text: "Absolutely stunning cake! Light and fluffy sponge, delivered on time.",       date: "10 Mar 2025", visible: true  },
  { id: 2, customer: "Karim Hossain", cake: "Wedding Bliss Tier",    rating: 5, text: "Made our wedding day perfect. The 3-tier cake was a showstopper!",             date: "28 Feb 2025", visible: true  },
  { id: 3, customer: "Sadia Islam",   cake: "Dark Chocolate Fudge",  rating: 4, text: "Rich, decadent, just right. Custom message was a lovely touch.",               date: "05 Mar 2025", visible: true  },
  { id: 4, customer: "Nadia Chow",    cake: "Strawberry Dream",      rating: 5, text: "Fresh strawberries, light cream — delivery was prompt and packaging lovely.",   date: "15 Mar 2025", visible: false },
  { id: 5, customer: "Arif Rahman",   cake: "Unicorn Theme Cake",    rating: 3, text: "Taste was good but delivery was a bit late. Would order again though.",        date: "01 Mar 2025", visible: true  },
];

export const ManageReviews = () => {
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [search,  setSearch]  = useState("");

  const toggleVisible = (id) => setReviews((prev) => prev.map((r) => r.id === id ? { ...r, visible: !r.visible } : r));
  const deleteReview  = (id) => setReviews((prev) => prev.filter((r) => r.id !== id));

  const filtered = reviews.filter((r) => {
    const q = search.toLowerCase();
    return !q || r.customer.toLowerCase().includes(q) || r.cake.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-[#3D1C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>Manage Reviews</h1>
        <p className="text-sm text-[#8B7070]">{reviews.length} total reviews</p>
      </div>

      <div className="relative max-w-sm">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B7070]" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search reviews..."
          className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl outline-none focus:border-[#E8627A] focus:ring-2 focus:ring-[#E8627A]/10 transition-all placeholder:text-gray-300 text-[#2A1A1A]"
        />
      </div>

      <div className="space-y-3">
        {filtered.map((r) => (
          <div key={r.id} className={`bg-white border rounded-2xl p-5 transition-all ${r.visible ? "border-gray-100" : "border-gray-100 opacity-60"}`}>
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#E8627A] flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {r.customer[0]}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#2A1A1A]">{r.customer}</p>
                  <p className="text-xs text-[#8B7070]">{r.cake} · {r.date}</p>
                  <div className="flex gap-0.5 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className={i < r.rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${r.visible ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                  {r.visible ? "Visible" : "Hidden"}
                </span>
                <button onClick={() => toggleVisible(r.id)} title={r.visible ? "Hide review" : "Show review"}
                  className="p-1.5 rounded-lg text-[#8B7070] hover:bg-gray-100 transition-colors">
                  {r.visible ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
                <button onClick={() => deleteReview(r.id)}
                  className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <p className="text-sm text-[#5C3D2E] mt-3 leading-relaxed pl-12">"{r.text}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};