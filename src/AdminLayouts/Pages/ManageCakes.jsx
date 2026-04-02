import { useState } from "react";
import { Plus, Search, Edit2, Trash2, X, Check, UploadCloud, ChevronDown } from "lucide-react";
import AddCakeModal from './Modal/AddCakeModal';
import { DeleteConfirm, Input, Select } from '../utility/helper';
import { EditCakeModal } from './Modal/EditModal';

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