import { useState } from "react";
import { Plus, Search, Edit2, Trash2, X, Check, UploadCloud, ChevronDown } from "lucide-react";
import AddCakeModal from './Modal/AddCakeModal';

// ─── AddCakeModal import করো ──────────────────────────────
// import AddCakeModal from "../components/AddCakeModal";

const INITIAL_CAKES = [
  { id: 1, emoji: "🎂", name: "Classic Vanilla Dream",  category: "Birthday",   price: 850,  stock: true,  rating: 4.9, orders: 84  },
  { id: 2, emoji: "🍫", name: "Dark Chocolate Fudge",   category: "Chocolate",  price: 1200, stock: true,  rating: 4.8, orders: 61  },
  { id: 3, emoji: "💍", name: "Wedding Bliss Tier",     category: "Wedding",    price: 3500, stock: true,  rating: 4.7, orders: 17  },
  { id: 4, emoji: "🍓", name: "Strawberry Dream",       category: "Fruit",      price: 1100, stock: true,  rating: 5.0, orders: 55  },
  { id: 5, emoji: "✨", name: "Custom Surprise Cake",   category: "Custom",     price: 1500, stock: false, rating: 4.9, orders: 29  },
  { id: 6, emoji: "🧁", name: "Assorted Cupcakes",      category: "Cupcakes",   price: 600,  stock: true,  rating: 4.8, orders: 102 },
  { id: 7, emoji: "🎭", name: "Unicorn Theme Cake",     category: "Theme",      price: 2200, stock: true,  rating: 4.9, orders: 33  },
  { id: 8, emoji: "🍰", name: "Classic Cheesecake",     category: "Cheesecake", price: 950,  stock: false, rating: 4.6, orders: 24  },
];

const CATEGORIES = ["Birthday", "Wedding", "Chocolate", "Fruit", "Custom", "Cupcakes", "Theme", "Cheesecake"];

const EMPTY_FORM = { name: "", emoji: "🎂", category: "Birthday", price: "", description: "", stock: true };

// ─── Helpers ──────────────────────────────────────────────────────────────────

const Input = ({ label, ...props }) => (
  <div>
    {label && <label className="block text-xs font-semibold text-[#8B7070] uppercase tracking-wider mb-1.5">{label}</label>}
    <input
      {...props}
      className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#E8627A] focus:ring-2 focus:ring-[#E8627A]/10 transition-all placeholder:text-gray-300 text-[#2A1A1A]"
    />
  </div>
);

const Select = ({ label, children, ...props }) => (
  <div className="relative">
    {label && <label className="block text-xs font-semibold text-[#8B7070] uppercase tracking-wider mb-1.5">{label}</label>}
    <select
      {...props}
      className="w-full appearance-none px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#E8627A] focus:ring-2 focus:ring-[#E8627A]/10 transition-all text-[#2A1A1A] pr-10"
    >
      {children}
    </select>
    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B7070] pointer-events-none" style={{ top: label ? "calc(50% + 10px)" : "50%" }} />
  </div>
);

// ─── Edit Modal (stays here) ──────────────────────────────────────────────────

const EditCakeModal = ({ cake, onSave, onClose }) => {
  const [form, setForm] = useState(cake ?? EMPTY_FORM);

  const set = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const handleSave = () => {
    if (!form.name.trim() || !form.price) return;
    onSave({ ...form, id: cake?.id ?? Date.now(), price: Number(form.price) });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

        <div className="sticky top-0 bg-white flex items-center justify-between px-6 py-4 border-b border-gray-100 rounded-t-2xl z-10">
          <h2 className="text-base font-bold text-[#3D1C2C]"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Edit Cake
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-[#8B7070] transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#8B7070] uppercase tracking-wider mb-1.5">
              Cake Emoji
            </label>
            <div className="flex gap-2 flex-wrap">
              {["🎂","🍫","💍","🍓","✨","🧁","🎭","🍰","🍊","🌈","🦋","🍋"].map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, emoji: e }))}
                  className={`w-10 h-10 text-xl rounded-xl border-2 transition-all ${
                    form.emoji === e
                      ? "border-[#E8627A] bg-[#FDEEF1] scale-110"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          <Input label="Cake Name" value={form.name} onChange={set("name")} placeholder="e.g. Classic Vanilla Dream" />

          <div className="grid grid-cols-2 gap-3">
            <Select label="Category" value={form.category} onChange={set("category")}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </Select>
            <Input label="Base Price (৳)" type="number" value={form.price} onChange={set("price")} placeholder="850" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#8B7070] uppercase tracking-wider mb-1.5">Description</label>
            <textarea
              value={form.description}
              onChange={set("description")}
              rows={3}
              placeholder="Describe the cake..."
              className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#E8627A] focus:ring-2 focus:ring-[#E8627A]/10 transition-all placeholder:text-gray-300 text-[#2A1A1A] resize-none"
            />
          </div>

          <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center gap-2 hover:border-[#E8627A]/40 transition-colors cursor-pointer">
            <UploadCloud size={22} className="text-gray-400" />
            <p className="text-xs text-[#8B7070]">Click to upload cake image</p>
            <p className="text-[10px] text-gray-400">JPG, PNG, WEBP · Max 5MB</p>
          </div>

          <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer">
            <div>
              <p className="text-sm font-semibold text-[#2A1A1A]">In Stock</p>
              <p className="text-xs text-[#8B7070]">Customers can order this cake</p>
            </div>
            <div
              onClick={() => setForm((f) => ({ ...f, stock: !f.stock }))}
              className={`w-11 h-6 rounded-full transition-colors relative ${form.stock ? "bg-[#E8627A]" : "bg-gray-300"}`}
            >
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.stock ? "translate-x-6" : "translate-x-1"}`} />
            </div>
          </label>
        </div>

        <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-gray-100 flex gap-3 rounded-b-2xl">
          <button onClick={onClose} className="flex-1 py-2.5 text-sm font-semibold text-[#8B7070] border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button onClick={handleSave} className="flex-1 py-2.5 text-sm font-bold text-white bg-[#E8627A] hover:bg-[#C04060] rounded-xl transition-colors active:scale-95">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Delete Confirm (stays here) ─────────────────────────────────────────────

const DeleteConfirm = ({ cake, onConfirm, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center space-y-4">
      <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto text-3xl">
        {cake.emoji}
      </div>
      <div>
        <p className="text-base font-bold text-[#2A1A1A]">Delete "{cake.name}"?</p>
        <p className="text-sm text-[#8B7070] mt-1">This action cannot be undone.</p>
      </div>
      <div className="flex gap-3">
        <button onClick={onClose} className="flex-1 py-2.5 text-sm font-semibold border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button onClick={() => { onConfirm(cake.id); onClose(); }}
          className="flex-1 py-2.5 text-sm font-bold text-white bg-red-500 hover:bg-red-600 rounded-xl transition-colors">
          Delete
        </button>
      </div>
    </div>
  </div>
);

// ─── Main ─────────────────────────────────────────────────────────────────────

const ManageCakes = () => {
  const [cakes,     setCakes]     = useState(INITIAL_CAKES);
  const [search,    setSearch]    = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [modal,     setModal]     = useState(null);
  // modal: null | { type: "add" } | { type: "edit", cake } | { type: "delete", cake }

  const filtered = cakes.filter((c) => {
    const matchCat  = catFilter === "All" || c.category === catFilter;
    const matchSrch = !search.trim() || c.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSrch;
  });

  const handleSave = (data) => {
    setCakes((prev) =>
      prev.find((c) => c.id === data.id)
        ? prev.map((c) => (c.id === data.id ? data : c))
        : [...prev, { ...data, rating: 0, orders: 0 }]
    );
  };

  const handleDelete = (id) => setCakes((prev) => prev.filter((c) => c.id !== id));

  const toggleStock = (id) =>
    setCakes((prev) => prev.map((c) => c.id === id ? { ...c, stock: !c.stock } : c));

  return (
    <div className="space-y-5 max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#3D1C2C]"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Manage Cakes
          </h1>
          <p className="text-sm text-[#8B7070]">{cakes.length} total cakes in menu</p>
        </div>
        <button
          onClick={() => setModal({ type: "add" })}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#E8627A] hover:bg-[#C04060] text-white text-sm font-bold rounded-xl shadow-md shadow-[#E8627A]/20 transition-colors active:scale-95"
        >
          <Plus size={15} /> Add New Cake
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B7070]" />
          <input
            type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search cakes..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl outline-none focus:border-[#E8627A] focus:ring-2 focus:ring-[#E8627A]/10 transition-all placeholder:text-gray-300 text-[#2A1A1A]"
          />
        </div>
        <select
          value={catFilter} onChange={(e) => setCatFilter(e.target.value)}
          className="px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl outline-none focus:border-[#E8627A] transition-all text-[#2A1A1A]"
        >
          <option>All</option>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                {["Cake", "Category", "Price", "Rating", "Orders", "Stock", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[10px] font-bold text-[#8B7070] uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((cake) => (
                <tr key={cake.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center text-xl shrink-0">
                        {cake.emoji}
                      </div>
                      <span className="font-semibold text-[#2A1A1A] whitespace-nowrap">{cake.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="px-2.5 py-1 bg-[#FFF8F0] text-[#C9954C] text-[10px] font-bold rounded-full">
                      {cake.category}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 font-bold text-[#E8627A]">
                    ৳{cake.price.toLocaleString()}
                  </td>
                  <td className="px-4 py-3.5 text-amber-500 font-semibold text-xs">
                    ★ {cake.rating}
                  </td>
                  <td className="px-4 py-3.5 text-[#8B7070] text-xs">{cake.orders}</td>
                  <td className="px-4 py-3.5">
                    <button
                      onClick={() => toggleStock(cake.id)}
                      className={`w-10 rounded-full relative transition-colors ${cake.stock ? "bg-green-400" : "bg-gray-300"}`}
                      style={{ height: "22px" }}
                    >
                      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${cake.stock ? "translate-x-5" : "translate-x-0.5"}`} />
                    </button>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setModal({ type: "edit", cake })}
                        className="p-1.5 rounded-lg text-blue-500 hover:bg-blue-50 transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => setModal({ type: "delete", cake })}
                        className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <span className="text-4xl">🔍</span>
            <p className="text-sm text-[#8B7070] mt-2">No cakes found.</p>
          </div>
        )}
      </div>

      {/* ── ADD CAKE MODAL ───────────────────────────────────────────────────── */}
          

          {modal?.type === "add" && (
            <AddCakeModal
              onSave={handleSave}
              onClose={() => setModal(null)}
            />
          )}
      {/* ─────────────────────────────────────────────────────────────────────── */}

      {/* Edit modal  */}
      {modal?.type === "edit" && (
        <EditCakeModal
          cake={modal.cake}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}

      {/* Delete modal */}
      {modal?.type === "delete" && (
        <DeleteConfirm
          cake={modal.cake}
          onConfirm={handleDelete}
          onClose={() => setModal(null)}
        />
      )}

    </div>
  );
};

export default ManageCakes;