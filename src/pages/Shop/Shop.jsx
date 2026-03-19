import { useState, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Search, SlidersHorizontal, X, Star,
  ShoppingCart, Heart, ChevronDown, ArrowUpDown, LayoutGrid, List
} from "lucide-react";
import LoadingPage from '../../components/Loading';

// ─── Data ────────────────────────────────────────────────────────────────────

const CATEGORIES = ["All", "Birthday", "Wedding", "Chocolate", "Fruit", "Custom", "Cupcakes", "Theme", "Cheesecake"];

const SORT_OPTIONS = [
  { value: "popular",   label: "Most Popular" },
  { value: "newest",    label: "Newest First" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc",label: "Price: High to Low" },
  { value: "rating",    label: "Top Rated" },
];

const ALL_CAKES = [
  { id: 1,  emoji: "🎂", name: "Classic Vanilla Dream",    category: "Birthday",    rating: 4.9, reviews: 42, price: 850,  oldPrice: 1050, tag: "Bestseller", tagColor: "bg-rose-100 text-rose-600",    bg: "from-rose-50 to-pink-50",    isNew: false, popular: 95 },
  { id: 2,  emoji: "🍫", name: "Dark Chocolate Fudge",     category: "Chocolate",   rating: 4.8, reviews: 38, price: 1200, oldPrice: null,  tag: "New",        tagColor: "bg-blue-100 text-blue-600",    bg: "from-amber-50 to-yellow-50", isNew: true,  popular: 88 },
  { id: 3,  emoji: "💍", name: "Wedding Bliss Tier",       category: "Wedding",     rating: 4.7, reviews: 17, price: 3500, oldPrice: 4000,  tag: "Premium",    tagColor: "bg-purple-100 text-purple-600",bg: "from-purple-50 to-indigo-50",isNew: false, popular: 72 },
  { id: 4,  emoji: "🍓", name: "Strawberry Dream",         category: "Fruit",       rating: 5.0, reviews: 55, price: 1100, oldPrice: null,  tag: "Top Rated",  tagColor: "bg-green-100 text-green-600",  bg: "from-red-50 to-rose-50",     isNew: false, popular: 92 },
  { id: 5,  emoji: "✨", name: "Custom Surprise Cake",     category: "Custom",      rating: 4.9, reviews: 29, price: 1500, oldPrice: null,  tag: "Custom",     tagColor: "bg-yellow-100 text-yellow-600",bg: "from-yellow-50 to-amber-50", isNew: false, popular: 80 },
  { id: 6,  emoji: "🧁", name: "Assorted Cupcakes",        category: "Cupcakes",    rating: 4.8, reviews: 61, price: 600,  oldPrice: 750,   tag: "Sale",       tagColor: "bg-pink-100 text-pink-600",    bg: "from-pink-50 to-rose-50",    isNew: false, popular: 85 },
  { id: 7,  emoji: "🎭", name: "Unicorn Theme Cake",       category: "Theme",       rating: 4.9, reviews: 33, price: 2200, oldPrice: null,  tag: "Trending",   tagColor: "bg-indigo-100 text-indigo-600",bg: "from-indigo-50 to-purple-50",isNew: true,  popular: 78 },
  { id: 8,  emoji: "🍰", name: "Classic Cheesecake",       category: "Cheesecake",  rating: 4.6, reviews: 24, price: 950,  oldPrice: 1100,  tag: "Favourite",  tagColor: "bg-orange-100 text-orange-600",bg: "from-orange-50 to-amber-50", isNew: false, popular: 68 },
  { id: 9,  emoji: "🎂", name: "Red Velvet Birthday",      category: "Birthday",    rating: 4.7, reviews: 31, price: 1350, oldPrice: null,  tag: "Popular",    tagColor: "bg-rose-100 text-rose-600",    bg: "from-red-50 to-pink-50",     isNew: true,  popular: 76 },
  { id: 10, emoji: "🍫", name: "Nutella Drip Cake",        category: "Chocolate",   rating: 4.9, reviews: 47, price: 1600, oldPrice: 1900,  tag: "Bestseller", tagColor: "bg-amber-100 text-amber-700",  bg: "from-amber-50 to-orange-50", isNew: false, popular: 90 },
  { id: 11, emoji: "🍊", name: "Orange Zest Sponge",       category: "Fruit",       rating: 4.5, reviews: 19, price: 900,  oldPrice: null,  tag: "New",        tagColor: "bg-blue-100 text-blue-600",    bg: "from-orange-50 to-yellow-50",isNew: true,  popular: 60 },
  { id: 12, emoji: "💒", name: "Floral Wedding Cake",      category: "Wedding",     rating: 4.8, reviews: 22, price: 4500, oldPrice: 5000,  tag: "Premium",    tagColor: "bg-purple-100 text-purple-600",bg: "from-pink-50 to-purple-50",  isNew: false, popular: 70 },
  { id: 13, emoji: "🌈", name: "Rainbow Layer Cake",       category: "Custom",      rating: 4.7, reviews: 28, price: 1800, oldPrice: null,  tag: "Trending",   tagColor: "bg-indigo-100 text-indigo-600",bg: "from-violet-50 to-pink-50",  isNew: true,  popular: 82 },
  { id: 14, emoji: "🧁", name: "Chocolate Cupcakes Box",   category: "Cupcakes",    rating: 4.6, reviews: 39, price: 750,  oldPrice: 900,   tag: "Sale",       tagColor: "bg-pink-100 text-pink-600",    bg: "from-amber-50 to-rose-50",   isNew: false, popular: 74 },
  { id: 15, emoji: "🦋", name: "Butterfly Theme Cake",     category: "Theme",       rating: 4.8, reviews: 15, price: 2500, oldPrice: null,  tag: "New",        tagColor: "bg-blue-100 text-blue-600",    bg: "from-teal-50 to-blue-50",    isNew: true,  popular: 66 },
  { id: 16, emoji: "🍋", name: "Lemon Blueberry Cake",     category: "Fruit",       rating: 4.6, reviews: 21, price: 1000, oldPrice: 1200,  tag: "Favourite",  tagColor: "bg-green-100 text-green-600",  bg: "from-yellow-50 to-blue-50",  isNew: false, popular: 63 },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function sortCakes(cakes, sort) {
  return [...cakes].sort((a, b) => {
    if (sort === "price_asc")  return a.price - b.price;
    if (sort === "price_desc") return b.price - a.price;
    if (sort === "rating")     return b.rating - a.rating;
    if (sort === "newest")     return b.isNew - a.isNew;
    return b.popular - a.popular; // default: popular
  });
}

function StarRating({ rating, reviews }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={10}
            className={i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}
          />
        ))}
      </div>
      <span className="text-[10px] text-[#8B7070]">({reviews})</span>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SortDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
 
  const current = SORT_OPTIONS.find((o) => o.value === value);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#3D1C2C] bg-white border border-gray-200 rounded-xl hover:border-[#E8627A] transition-colors"
      >
        <ArrowUpDown size={13} className="text-[#8B7070]" />
        <span className="hidden sm:inline">{current.label}</span>
        <span className="sm:hidden">Sort</span>
        <ChevronDown size={13} className={`text-[#8B7070] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1.5 z-20 w-48 bg-white border border-gray-100 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden">
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                  opt.value === value
                    ? "bg-[#FDEEF1] text-[#E8627A] font-semibold"
                    : "text-[#2A1A1A] hover:bg-[#FFF8F0]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function CakeCard({ cake, view, onAddToCart, onToggleWishlist, wishlisted }) {
  const discount = cake.oldPrice
    ? Math.round(((cake.oldPrice - cake.price) / cake.oldPrice) * 100)
    : null;

  if (view === "list") {
    return (
      <div className="group flex gap-4 bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-[0_6px_24px_rgba(232,98,122,0.1)] hover:-translate-y-0.5 transition-all duration-200">
        <div className={`w-28 sm:w-36 shrink-0 bg-gradient-to-br ${cake.bg} flex items-center justify-center text-5xl`}>
          {cake.emoji}
        </div>
        <div className="flex flex-1 flex-col justify-between py-3.5 pr-4 gap-2">
          <div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-semibold ${cake.tagColor} mb-1`}>{cake.tag}</span>
                <h3 className="text-sm font-semibold text-[#2A1A1A] leading-snug">{cake.name}</h3>
                <p className="text-[10px] text-[#8B7070] mt-0.5">{cake.category}</p>
              </div>
              <button onClick={() => onToggleWishlist(cake.id)} className="shrink-0 mt-0.5">
                <Heart size={15} className={wishlisted ? "fill-[#E8627A] text-[#E8627A]" : "text-gray-300"} />
              </button>
            </div>
            <StarRating rating={cake.rating} reviews={cake.reviews} />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-[#E8627A]">৳{cake.price.toLocaleString()}</span>
              {cake.oldPrice && <span className="text-xs text-gray-400 line-through">৳{cake.oldPrice.toLocaleString()}</span>}
              {discount && <span className="text-[9px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">{discount}% OFF</span>}
            </div>
            <button
              onClick={() => onAddToCart(cake)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#E8627A] hover:bg-[#C04060] text-white text-xs font-semibold rounded-xl transition-colors active:scale-95"
            >
              <ShoppingCart size={12} /> Add
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-[0_8px_30px_rgba(232,98,122,0.12)] hover:-translate-y-1 transition-all duration-200 cursor-pointer">
      {/* Image */}
      <div className={`relative bg-gradient-to-br ${cake.bg} flex items-center justify-center h-40 sm:h-44`}>
        <span className="text-6xl group-hover:scale-110 transition-transform duration-300 drop-shadow-md select-none">
          {cake.emoji}
        </span>

        {/* Tag */}
        <span className={`absolute top-3 left-3 px-2 py-0.5 rounded-full text-[9px] font-bold ${cake.tagColor}`}>
          {cake.tag}
        </span>

        {/* Discount badge */}
        {discount && (
          <span className="absolute bottom-3 left-3 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-green-500 text-white">
            {discount}% OFF
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleWishlist(cake.id); }}
          className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors"
        >
          <Heart size={13} className={wishlisted ? "fill-[#E8627A] text-[#E8627A]" : "text-gray-400"} />
        </button>
      </div>

      {/* Info */}
      <div className="p-3.5">
        <p className="text-[10px] text-[#8B7070] mb-0.5">{cake.category}</p>
        <h3 className="text-sm font-semibold text-[#2A1A1A] leading-snug mb-1.5 truncate">{cake.name}</h3>
        <StarRating rating={cake.rating} reviews={cake.reviews} />

        <div className="flex items-center justify-between mt-2.5">
          <div>
            <span className="text-base font-bold text-[#E8627A]">৳{cake.price.toLocaleString()}</span>
            {cake.oldPrice && (
              <span className="text-[11px] text-gray-400 line-through ml-1.5">৳{cake.oldPrice.toLocaleString()}</span>
            )}
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onAddToCart(cake); }}
            className="w-8 h-8 rounded-xl bg-[#E8627A] hover:bg-[#C04060] text-white flex items-center justify-center shadow-sm transition-colors active:scale-95"
          >
            <ShoppingCart size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();

   const [loading, setLoading]= useState(true)

 
  // State — sync active category with URL ?cat=
  const [search, setSearch]       = useState("");
  const [sort, setSort]           = useState("popular");
  const [view, setView]           = useState("grid"); // "grid" | "list"
  const [wishlist, setWishlist]   = useState([]);
  const [cartAdded, setCartAdded] = useState(null); // id of last added
  const [filterOpen, setFilterOpen] = useState(false);

  const activeCategory = searchParams.get("cat") || "All";

  const setCategory = (cat) => {
    if (cat === "All") searchParams.delete("cat");
    else searchParams.set("cat", cat);
    setSearchParams(searchParams, { replace: true });
  };

  const toggleWishlist = useCallback((id) => {
    setWishlist((prev) => prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]);
  }, []);

  const handleAddToCart = useCallback((cake) => {
    setCartAdded(cake.id);
    setTimeout(() => setCartAdded(null), 1500);
    // TODO: dispatch to your cart context/store
  }, []);

  const filtered = useMemo(() => {
    let result = ALL_CAKES;
    if (activeCategory !== "All") result = result.filter((c) => c.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((c) => c.name.toLowerCase().includes(q) || c.category.toLowerCase().includes(q));
    }
    return sortCakes(result, sort);
  }, [activeCategory, search, sort]);


  return (
    <div className="min-h-screen bg-[#FFF8F0]">

      {/* ── PAGE HEADER ── */}
      <div className="bg-gradient-to-br from-[#3D1C2C] to-[#5C2A38] py-10 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-xs font-semibold tracking-widest text-pink-300 uppercase">Our Collection</span>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            All Cakes
          </h1>
          <p className="mt-2 text-sm text-white/50">
            {ALL_CAKES.length} handcrafted cakes — made fresh, delivered with love
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── SEARCH + CONTROLS ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">

          {/* Search */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B7070]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search cakes, flavors, occasions..."
              className="w-full pl-10 pr-10 py-2.5 text-sm bg-white border border-gray-200 rounded-xl outline-none focus:border-[#E8627A] focus:ring-2 focus:ring-[#E8627A]/10 transition-all placeholder:text-[#8B7070] text-[#2A1A1A]"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#E8627A]">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2 shrink-0">
            <SortDropdown value={sort} onChange={setSort} />

            {/* View toggle */}
            <div className="flex border border-gray-200 rounded-xl overflow-hidden bg-white">
              <button
                onClick={() => setView("grid")}
                className={`p-2.5 transition-colors ${view === "grid" ? "bg-[#E8627A] text-white" : "text-[#8B7070] hover:bg-gray-50"}`}
              >
                <LayoutGrid size={15} />
              </button>
              <button
                onClick={() => setView("list")}
                className={`p-2.5 transition-colors ${view === "list" ? "bg-[#E8627A] text-white" : "text-[#8B7070] hover:bg-gray-50"}`}
              >
                <List size={15} />
              </button>
            </div>

            {/* Mobile filter toggle */}
            <button
              onClick={() => setFilterOpen((o) => !o)}
              className="sm:hidden flex items-center gap-1.5 px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-[#3D1C2C]"
            >
              <SlidersHorizontal size={14} />
              Filter
            </button>
          </div>
        </div>

        {/* ── CATEGORY FILTER CHIPS ── */}
        <div className={`${filterOpen || "hidden sm:flex"} flex flex-wrap gap-2 mb-6`}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-150 whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-[#E8627A] text-white border-[#E8627A] shadow-sm shadow-[#E8627A]/20"
                  : "bg-white text-[#8B7070] border-gray-200 hover:border-[#E8627A] hover:text-[#E8627A]"
              }`}
            >
              {cat}
            </button>
          ))}

          {/* Active filters summary */}
          {(activeCategory !== "All" || search) && (
            <button
              onClick={() => { setCategory("All"); setSearch(""); }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium text-red-500 border border-red-200 bg-red-50 hover:bg-red-100 transition-colors"
            >
              <X size={11} /> Clear all
            </button>
          )}
        </div>

        {/* ── RESULTS META ── */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-[#8B7070]">
            <span className="font-semibold text-[#3D1C2C]">{filtered.length}</span> cakes found
            {activeCategory !== "All" && <span> in <span className="text-[#E8627A] font-medium">{activeCategory}</span></span>}
            {search && <span> for "<span className="text-[#E8627A] font-medium">{search}</span>"</span>}
          </p>
        </div>

        {/* ── PRODUCT GRID / LIST ── */}
        {filtered.length > 0 ? (
          <div className={
            view === "grid"
              ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
              : "flex flex-col gap-3"
          }>
            {filtered.map((cake) => (
              <CakeCard
                key={cake.id}
                cake={cake}
                view={view}
                onAddToCart={handleAddToCart}
                onToggleWishlist={toggleWishlist}
                wishlisted={wishlist.includes(cake.id)}
              />
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="text-6xl mb-4">🍰</span>
            <h3 className="text-lg font-bold text-[#3D1C2C] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
              No cakes found
            </h3>
            <p className="text-sm text-[#8B7070] mb-4">
              Try a different search term or category.
            </p>
            <button
              onClick={() => { setSearch(""); setCategory("All"); }}
              className="px-5 py-2 bg-[#E8627A] text-white text-sm font-semibold rounded-xl hover:bg-[#C04060] transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

      </div>

      {/* ── ADD TO CART TOAST ── */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        cartAdded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}>
        <div className="flex items-center gap-2 px-5 py-3 bg-[#3D1C2C] text-white text-sm font-medium rounded-2xl shadow-xl">
          <ShoppingCart size={15} className="text-[#E8627A]" />
          Added to cart!
        </div>
      </div>

    </div>
  );
}