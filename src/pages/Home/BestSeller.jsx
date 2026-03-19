import { useState } from "react";
import { ShoppingCart, Heart, Star } from "lucide-react";

const filters = ["All", "Birthday", "Wedding", "Chocolate", "Custom"];

const cakes = [
  { id: 1, emoji: "🎂", name: "Classic Vanilla Dream", category: "Birthday", rating: 4.9, reviews: 42, price: 850, oldPrice: 1050, tag: "Bestseller", tagColor: "bg-rose-100 text-rose-600", bg: "bg-rose-50" },
  { id: 2, emoji: "🍫", name: "Dark Chocolate Fudge", category: "Chocolate", rating: 4.8, reviews: 38, price: 1200, oldPrice: null, tag: "New", tagColor: "bg-blue-100 text-blue-600", bg: "bg-amber-50" },
  { id: 3, emoji: "💍", name: "Wedding Bliss Tier", category: "Wedding", rating: 4.7, reviews: 17, price: 3500, oldPrice: 4000, tag: "Premium", tagColor: "bg-purple-100 text-purple-600", bg: "bg-purple-50" },
  { id: 4, emoji: "🍓", name: "Strawberry Dream", category: "Birthday", rating: 5.0, reviews: 55, price: 1100, oldPrice: null, tag: "Top Rated", tagColor: "bg-green-100 text-green-600", bg: "bg-red-50" },
  { id: 5, emoji: "✨", name: "Custom Surprise Cake", category: "Custom", rating: 4.9, reviews: 29, price: 1500, oldPrice: null, tag: "Custom", tagColor: "bg-yellow-100 text-yellow-600", bg: "bg-yellow-50" },
  { id: 6, emoji: "🧁", name: "Assorted Cupcakes", category: "Birthday", rating: 4.8, reviews: 61, price: 600, oldPrice: 750, tag: "Sale", tagColor: "bg-pink-100 text-pink-600", bg: "bg-pink-50" },
  { id: 7, emoji: "🎭", name: "Unicorn Theme Cake", category: "Custom", rating: 4.9, reviews: 33, price: 2200, oldPrice: null, tag: "Trending", tagColor: "bg-indigo-100 text-indigo-600", bg: "bg-indigo-50" },
  { id: 8, emoji: "🍰", name: "Classic Cheesecake", category: "Chocolate", rating: 4.6, reviews: 24, price: 950, oldPrice: 1100, tag: "Favourite", tagColor: "bg-orange-100 text-orange-600", bg: "bg-orange-50" },
];

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={11}
          className={i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : "text-gray-200 fill-gray-200"}
        />
      ))}
    </div>
  );
}

export default function BestSellers() {
  const [active, setActive] = useState("All");
  const [wishlist, setWishlist] = useState([]);

  const filtered = active === "All" ? cakes : cakes.filter((c) => c.category === active);

  const toggleWishlist = (id) =>
    setWishlist((prev) => prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold tracking-widest text-[#E8627A] uppercase">This Week</span>
            <h2 className="mt-1 text-3xl sm:text-4xl font-bold text-[#3D1C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Best Sellers
            </h2>
          </div>
          <a href="/shop" className="text-sm font-semibold text-[#E8627A] hover:underline shrink-0">
            View All →
          </a>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 flex-wrap mb-8">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-150 ${
                active === f
                  ? "bg-[#E8627A] text-white border-[#E8627A] shadow-sm"
                  : "bg-white text-[#8B7070] border-gray-200 hover:border-[#E8627A] hover:text-[#E8627A]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
          {filtered.map((cake) => (
            <div key={cake.id} className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-[0_8px_30px_rgba(232,98,122,0.12)] hover:-translate-y-1 transition-all duration-200">

              {/* Image Area */}
              <div className={`relative ${cake.bg} flex items-center justify-center h-40`}>
                <span className="text-6xl group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
                  {cake.emoji}
                </span>

                {/* Tag */}
                <span className={`absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-semibold ${cake.tagColor}`}>
                  {cake.tag}
                </span>

                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(cake.id)}
                  className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors"
                >
                  <Heart
                    size={13}
                    className={wishlist.includes(cake.id) ? "fill-[#E8627A] text-[#E8627A]" : "text-gray-400"}
                  />
                </button>
              </div>

              {/* Info */}
              <div className="p-3.5">
                <h3 className="text-sm font-semibold text-[#2A1A1A] leading-tight mb-1 truncate">{cake.name}</h3>

                <div className="flex items-center gap-1.5 mb-2.5">
                  <StarRating rating={cake.rating} />
                  <span className="text-[10px] text-[#8B7070]">({cake.reviews})</span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-base font-bold text-[#E8627A]">৳{cake.price.toLocaleString()}</span>
                    {cake.oldPrice && (
                      <span className="text-[11px] text-gray-400 line-through ml-1.5">৳{cake.oldPrice.toLocaleString()}</span>
                    )}
                  </div>
                  <button className="w-8 h-8 rounded-xl bg-[#E8627A] hover:bg-[#C04060] text-white flex items-center justify-center shadow-sm transition-colors active:scale-95">
                    <ShoppingCart size={13} />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}