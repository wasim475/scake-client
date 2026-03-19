import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Star, Heart, ShoppingCart, ArrowLeft, Share2,
  ChevronLeft, ChevronRight, Check, Plus, Minus,
  Clock, ShieldCheck, Truck, RefreshCw, MessageSquare,
} from "lucide-react";

// ─── Mock Data (replace with API call using useParams id) ─────────────────────

const CAKE = {
  id: 1,
  name: "Classic Vanilla Dream Cake",
  category: "Birthday",
  shortDesc: "Light, fluffy vanilla sponge layered with fresh cream and seasonal fruits.",
  description:
    "Our Classic Vanilla Dream is baked fresh every morning using premium Madagascar vanilla extract, free-range eggs, and locally sourced cream. Each layer is hand-assembled and decorated with seasonal fresh fruits. Perfect for birthdays, anniversaries, or any celebration worth remembering.",
  images: ["🎂", "🍰", "✨", "🎉"],
  imageBgs: [
    "from-rose-100 to-pink-100",
    "from-amber-100 to-yellow-100",
    "from-purple-100 to-indigo-100",
    "from-green-100 to-teal-100",
  ],
  rating: 4.9,
  reviewCount: 42,
  price: 850,
  oldPrice: 1050,
  tag: "Bestseller",
  tagColor: "bg-rose-100 text-rose-600",
  flavors: ["Vanilla", "Chocolate", "Strawberry", "Red Velvet", "Lemon", "Butterscotch"],
  sizes: [
    { label: "500g", price: 0 },
    { label: "1 kg", price: 250 },
    { label: "1.5 kg", price: 500 },
    { label: "2 kg", price: 800 },
  ],
  tiers: ["Single Tier", "2 Tier", "3 Tier"],
  timeSlots: ["10am – 12pm", "12pm – 3pm", "3pm – 6pm", "6pm – 9pm"],
  features: [
    { icon: <Truck size={14} />, text: "Same-day delivery in Dhaka" },
    { icon: <ShieldCheck size={14} />, text: "100% fresh, baked to order" },
    { icon: <Clock size={14} />, text: "Ready in 3–4 hours" },
    { icon: <RefreshCw size={14} />, text: "Free replacement if damaged" },
  ],
  reviews: [
    { id: 1, name: "Rina Ahmed", avatar: "RA", avatarBg: "bg-rose-400", rating: 5, date: "March 10, 2025", text: "Absolutely stunning! The vanilla sponge was so light. Everyone at the party loved it." },
    { id: 2, name: "Karim Hossain", avatar: "KH", avatarBg: "bg-amber-500", rating: 5, date: "Feb 28, 2025", text: "Delivered on time and tasted amazing. Will definitely order again for my next event." },
    { id: 3, name: "Sadia Islam", avatar: "SI", avatarBg: "bg-purple-400", rating: 4, date: "March 5, 2025", text: "Beautiful presentation and great taste. The custom message was a lovely touch!" },
  ],
  related: [
    { id: 2, emoji: "🍫", name: "Dark Chocolate Fudge", price: 1200, rating: 4.8, bg: "from-amber-50 to-yellow-50" },
    { id: 4, emoji: "🍓", name: "Strawberry Dream", price: 1100, rating: 5.0, bg: "from-red-50 to-rose-50" },
    { id: 6, emoji: "🧁", name: "Assorted Cupcakes", price: 600, rating: 4.8, bg: "from-pink-50 to-rose-50" },
    { id: 9, emoji: "🎂", name: "Red Velvet Birthday", price: 1350, rating: 4.7, bg: "from-red-50 to-pink-50" },
  ],
};

// ─── Small helpers ─────────────────────────────────────────────────────────────

function StarRow({ rating, size = 14 }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={size}
          className={i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}
        />
      ))}
    </div>
  );
}

function Chip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-1.5 rounded-full text-sm border font-medium transition-all duration-150 ${
        active
          ? "bg-[#E8627A] text-white border-[#E8627A] shadow-sm"
          : "bg-white text-[#8B7070] border-gray-200 hover:border-[#E8627A] hover:text-[#E8627A]"
      }`}
    >
      {label}
    </button>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function CakeDetailPage() {
  const { id } = useParams();   // use id to fetch real data
  const navigate = useNavigate();
  const cake = CAKE;            // replace: const cake = useCake(id)

  // Gallery
  const [activeImg, setActiveImg] = useState(0);

  // Customization
  const [flavor, setFlavor]     = useState(cake.flavors[0]);
  const [size, setSize]         = useState(0);          // index into cake.sizes
  const [tier, setTier]         = useState(cake.tiers[0]);
  const [message, setMessage]   = useState("");
  const [date, setDate]         = useState("");
  const [timeSlot, setTimeSlot] = useState(cake.timeSlots[0]);
  const [qty, setQty]           = useState(1);

  // UI
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded]           = useState(false);
  const [activeTab, setActiveTab]   = useState("desc"); // "desc" | "reviews"

  const totalPrice = (cake.price + cake.sizes[size].price) * qty;
  const discount   = cake.oldPrice ? Math.round(((cake.oldPrice - cake.price) / cake.oldPrice) * 100) : null;

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    // TODO: dispatch({ type:"ADD", payload:{ ...cake, flavor, size, tier, message, qty } })
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0]">

      {/* ── BREADCRUMB ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-xs text-[#8B7070]">
          <Link to="/" className="hover:text-[#E8627A] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[#E8627A] transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-[#3D1C2C] font-medium truncate">{cake.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── BACK BUTTON ── */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm text-[#8B7070] hover:text-[#E8627A] mb-6 transition-colors"
        >
          <ArrowLeft size={15} /> Back
        </button>

        {/* ── MAIN GRID ── */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">

          {/* LEFT — Gallery */}
          <div className="space-y-3">
            {/* Main image */}
            <div className={`relative bg-gradient-to-br ${cake.imageBgs[activeImg]} rounded-3xl flex items-center justify-center`} style={{ height: 360 }}>
              <span className="text-[120px] select-none drop-shadow-xl">{cake.images[activeImg]}</span>

              {/* Tag */}
              <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${cake.tagColor}`}>
                {cake.tag}
              </span>

              {/* Discount */}
              {discount && (
                <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-bold bg-green-500 text-white">
                  {discount}% OFF
                </span>
              )}

              {/* Gallery arrows */}
              <button
                onClick={() => setActiveImg((p) => (p - 1 + cake.images.length) % cake.images.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center text-[#3D1C2C] hover:bg-white shadow-sm transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setActiveImg((p) => (p + 1) % cake.images.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center text-[#3D1C2C] hover:bg-white shadow-sm transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2">
              {cake.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`flex-1 h-16 rounded-2xl bg-gradient-to-br ${cake.imageBgs[i]} flex items-center justify-center text-3xl border-2 transition-all ${
                    activeImg === i ? "border-[#E8627A] scale-105 shadow-md" : "border-transparent opacity-60 hover:opacity-90"
                  }`}
                >
                  {img}
                </button>
              ))}
            </div>

            {/* Features strip */}
            <div className="grid grid-cols-2 gap-2">
              {cake.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 bg-white rounded-xl px-3 py-2.5 border border-gray-100">
                  <span className="text-[#E8627A]">{f.icon}</span>
                  <span className="text-[11px] text-[#5C3D2E] font-medium">{f.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Info + Customizer */}
          <div className="space-y-5">

            {/* Title + rating */}
            <div>
              <p className="text-xs font-semibold text-[#E8627A] uppercase tracking-widest mb-1">{cake.category}</p>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#3D1C2C] leading-snug mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                {cake.name}
              </h1>
              <div className="flex items-center gap-3">
                <StarRow rating={cake.rating} />
                <span className="text-sm font-semibold text-[#3D1C2C]">{cake.rating}</span>
                <span className="text-sm text-[#8B7070]">({cake.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-[#E8627A]">৳{totalPrice.toLocaleString()}</span>
              {cake.oldPrice && (
                <span className="text-base text-gray-400 line-through">৳{(cake.oldPrice * qty).toLocaleString()}</span>
              )}
              {discount && (
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  Save {discount}%
                </span>
              )}
            </div>

            <p className="text-sm text-[#8B7070] leading-relaxed">{cake.shortDesc}</p>

            {/* ── CUSTOMIZER ── */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 space-y-4">
              <p className="text-sm font-bold text-[#3D1C2C]">🎨 Customize Your Cake</p>

              {/* Flavor */}
              <div>
                <p className="text-xs font-semibold text-[#8B7070] uppercase tracking-wider mb-2">Flavor</p>
                <div className="flex flex-wrap gap-2">
                  {cake.flavors.map((f) => (
                    <Chip key={f} label={f} active={flavor === f} onClick={() => setFlavor(f)} />
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <p className="text-xs font-semibold text-[#8B7070] uppercase tracking-wider mb-2">Size</p>
                <div className="flex flex-wrap gap-2">
                  {cake.sizes.map((s, i) => (
                    <button
                      key={s.label}
                      onClick={() => setSize(i)}
                      className={`px-3.5 py-1.5 rounded-full text-sm border font-medium transition-all ${
                        size === i
                          ? "bg-[#E8627A] text-white border-[#E8627A]"
                          : "bg-white text-[#8B7070] border-gray-200 hover:border-[#E8627A] hover:text-[#E8627A]"
                      }`}
                    >
                      {s.label}
                      {s.price > 0 && <span className="ml-1 text-[10px] opacity-80">+৳{s.price}</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tier */}
              <div>
                <p className="text-xs font-semibold text-[#8B7070] uppercase tracking-wider mb-2">Tier</p>
                <div className="flex flex-wrap gap-2">
                  {cake.tiers.map((t) => (
                    <Chip key={t} label={t} active={tier === t} onClick={() => setTier(t)} />
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <p className="text-xs font-semibold text-[#8B7070] uppercase tracking-wider mb-2">
                  Custom Message <span className="text-[10px] text-[#8B7070] normal-case">(optional)</span>
                </p>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={50}
                  placeholder="e.g. Happy Birthday Rina! 🎉"
                  className="w-full px-4 py-2.5 text-sm bg-[#FFF8F0] border border-gray-200 rounded-xl outline-none focus:border-[#E8627A] focus:ring-2 focus:ring-[#E8627A]/10 transition-all placeholder:text-gray-300 text-[#2A1A1A]"
                />
                <p className="text-right text-[10px] text-gray-400 mt-1">{message.length}/50</p>
              </div>

              {/* Delivery */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs font-semibold text-[#8B7070] uppercase tracking-wider mb-2">Delivery Date</p>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-3 py-2.5 text-sm bg-[#FFF8F0] border border-gray-200 rounded-xl outline-none focus:border-[#E8627A] transition-all text-[#2A1A1A]"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#8B7070] uppercase tracking-wider mb-2">Time Slot</p>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm bg-[#FFF8F0] border border-gray-200 rounded-xl outline-none focus:border-[#E8627A] transition-all text-[#2A1A1A]"
                  >
                    {cake.timeSlots.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Qty + CTA */}
            <div className="flex items-center gap-3">
              {/* Qty */}
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-10 h-11 flex items-center justify-center text-[#8B7070] hover:bg-gray-50 transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center text-sm font-bold text-[#2A1A1A]">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-10 h-11 flex items-center justify-center text-[#8B7070] hover:bg-gray-50 transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Add to cart */}
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-200 active:scale-95 ${
                  added
                    ? "bg-green-500 text-white"
                    : "bg-[#E8627A] hover:bg-[#C04060] text-white shadow-md shadow-[#E8627A]/20"
                }`}
              >
                {added ? <><Check size={16} /> Added to Cart!</> : <><ShoppingCart size={16} /> Add to Cart</>}
              </button>

              {/* Wishlist */}
              <button
                onClick={() => setWishlisted((w) => !w)}
                className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-all ${
                  wishlisted
                    ? "bg-[#FDEEF1] border-[#E8627A] text-[#E8627A]"
                    : "bg-white border-gray-200 text-gray-400 hover:border-[#E8627A] hover:text-[#E8627A]"
                }`}
              >
                <Heart size={16} className={wishlisted ? "fill-[#E8627A]" : ""} />
              </button>

              {/* Share */}
              <button className="w-11 h-11 rounded-xl border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:text-[#E8627A] hover:border-[#E8627A] transition-all">
                <Share2 size={16} />
              </button>
            </div>

          </div>
        </div>

        {/* ── TABS: Description + Reviews ── */}
        <div className="mt-12">
          {/* Tab headers */}
          <div className="flex gap-1 border-b border-gray-200 mb-6">
            {[
              { key: "desc", label: "Description" },
              { key: "reviews", label: `Reviews (${cake.reviewCount})` },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-3 text-sm font-semibold border-b-2 -mb-px transition-colors ${
                  activeTab === tab.key
                    ? "border-[#E8627A] text-[#E8627A]"
                    : "border-transparent text-[#8B7070] hover:text-[#3D1C2C]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Description */}
          {activeTab === "desc" && (
            <div className="max-w-2xl">
              <p className="text-sm text-[#5C3D2E] leading-relaxed">{cake.description}</p>
              <ul className="mt-4 space-y-2">
                {["Made with premium ingredients", "No artificial preservatives", "Custom decoration included", "Gift box packaging available"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-[#5C3D2E]">
                    <Check size={14} className="text-green-500 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Reviews */}
          {activeTab === "reviews" && (
            <div className="space-y-4 max-w-2xl">
              {cake.reviews.map((r) => (
                <div key={r.id} className="bg-white border border-gray-100 rounded-2xl p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-9 h-9 rounded-full ${r.avatarBg} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                      {r.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-[#2A1A1A]">{r.name}</p>
                        <p className="text-[10px] text-[#8B7070]">{r.date}</p>
                      </div>
                      <StarRow rating={r.rating} size={12} />
                    </div>
                  </div>
                  <p className="text-sm text-[#5C3D2E] leading-relaxed">"{r.text}"</p>
                </div>
              ))}

              {/* Write a review CTA */}
              <button className="flex items-center gap-2 text-sm font-semibold text-[#E8627A] hover:underline">
                <MessageSquare size={14} /> Write a Review
              </button>
            </div>
          )}
        </div>

        {/* ── RELATED CAKES ── */}
        <div className="mt-14">
          <h2 className="text-2xl font-bold text-[#3D1C2C] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {cake.related.map((r) => (
              <Link
                key={r.id}
                to={`/shop/${r.id}`}
                className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-200"
              >
                <div className={`h-28 bg-gradient-to-br ${r.bg} flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-300`}>
                  {r.emoji}
                </div>
                <div className="p-3">
                  <p className="text-xs font-semibold text-[#2A1A1A] truncate mb-1">{r.name}</p>
                  <div className="flex items-center gap-1 mb-1">
                    <Star size={10} className="fill-amber-400 text-amber-400" />
                    <span className="text-[10px] text-[#8B7070]">{r.rating}</span>
                  </div>
                  <p className="text-sm font-bold text-[#E8627A]">৳{r.price.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}