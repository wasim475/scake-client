import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart, Star, Sparkles } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const NEW_ARRIVALS = [
  {
    id: 101,
    emoji: "🌸",
    name: "Sakura Blossom Cake",
    category: "Floral",
    price: 1800,
    rating: 4.9,
    reviews: 12,
    bg: "from-pink-100 to-rose-50",
    badge: "Just In",
    badgeColor: "bg-pink-100 text-pink-600",
    isNew: true,
  },
  {
    id: 102,
    emoji: "🍵",
    name: "Matcha Zen Cake",
    category: "Seasonal",
    price: 1450,
    rating: 4.8,
    reviews: 8,
    bg: "from-green-100 to-teal-50",
    badge: "New",
    badgeColor: "bg-green-100 text-green-600",
    isNew: true,
  },
  {
    id: 103,
    emoji: "🫐",
    name: "Blueberry Cloud Cake",
    category: "Fruit",
    price: 1200,
    rating: 5.0,
    reviews: 6,
    bg: "from-indigo-100 to-blue-50",
    badge: "Trending",
    badgeColor: "bg-indigo-100 text-indigo-600",
    isNew: true,
  },
  {
    id: 104,
    emoji: "🍯",
    name: "Honey Walnut Cake",
    category: "Premium",
    price: 1650,
    rating: 4.7,
    reviews: 9,
    bg: "from-amber-100 to-yellow-50",
    badge: "New",
    badgeColor: "bg-amber-100 text-amber-700",
    isNew: true,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

const NewArrivals = () => {
  const [wishlist, setWishlist] = useState([]);
  const [added,    setAdded]    = useState(null);

  const toggleWishlist = (id) =>
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
    );

  const handleAddToCart = (id) => {
    setAdded(id);
    setTimeout(() => setAdded(null), 1500);
    // TODO: dispatch to cart context
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={14} className="text-[#E8627A]" />
              <span className="text-xs font-semibold tracking-widest text-[#E8627A] uppercase">
                Fresh from the Oven
              </span>
            </div>
            <h2
              className="text-3xl sm:text-4xl font-bold text-[#3D1C2C]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              New Arrivals
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-sm font-semibold text-[#E8627A] hover:underline shrink-0"
          >
            View All →
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {NEW_ARRIVALS.map((cake) => (
            <div
              key={cake.id}
              className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-[0_8px_30px_rgba(232,98,122,0.12)] hover:-translate-y-1 transition-all duration-200"
            >
              {/* Image area */}
              <div className={`relative bg-gradient-to-br ${cake.bg} flex items-center justify-center h-44`}>
                <span className="text-6xl group-hover:scale-110 transition-transform duration-300 drop-shadow-md select-none">
                  {cake.emoji}
                </span>

                {/* Badge */}
                <span className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${cake.badgeColor}`}>
                  ✨ {cake.badge}
                </span>

                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(cake.id)}
                  className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors"
                >
                  <Heart
                    size={13}
                    className={
                      wishlist.includes(cake.id)
                        ? "fill-[#E8627A] text-[#E8627A]"
                        : "text-gray-400"
                    }
                  />
                </button>
              </div>

              {/* Info */}
              <div className="p-3.5">
                <p className="text-[10px] text-[#8B7070] mb-0.5">{cake.category}</p>
                <h3 className="text-sm font-semibold text-[#2A1A1A] leading-snug mb-1.5 truncate">
                  {cake.name}
                </h3>

                {/* Stars */}
                <div className="flex items-center gap-1 mb-2.5">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={10}
                        className={
                          i < Math.floor(cake.rating)
                            ? "fill-amber-400 text-amber-400"
                            : "fill-gray-200 text-gray-200"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-[#8B7070]">({cake.reviews})</span>
                </div>

                {/* Price + Cart */}
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-[#E8627A]">
                    ৳{cake.price.toLocaleString()}
                  </span>
                  <button
                    onClick={() => handleAddToCart(cake.id)}
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-sm transition-all active:scale-95 ${
                      added === cake.id
                        ? "bg-green-500 text-white"
                        : "bg-[#E8627A] hover:bg-[#C04060] text-white"
                    }`}
                  >
                    <ShoppingCart size={13} />
                  </button>
                </div>
              </div>

              {/* "New" ribbon */}
              <div className="absolute top-0 right-0 overflow-hidden w-12 h-12 pointer-events-none">
                <div className="absolute top-2 -right-3 rotate-45 bg-[#E8627A] text-white text-[8px] font-bold py-0.5 px-4">
                  NEW
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default NewArrivals;