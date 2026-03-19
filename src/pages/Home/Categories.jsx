const categories = [
  { emoji: "🎂", label: "Birthday", count: "42 cakes", href: "/shop/birthday", bg: "bg-rose-50", hover: "hover:bg-rose-100", border: "hover:border-rose-300" },
  { emoji: "💍", label: "Wedding", count: "18 cakes", href: "/shop/wedding", bg: "bg-purple-50", hover: "hover:bg-purple-100", border: "hover:border-purple-300" },
  { emoji: "🍫", label: "Chocolate", count: "35 cakes", href: "/shop/chocolate", bg: "bg-amber-50", hover: "hover:bg-amber-100", border: "hover:border-amber-300" },
  { emoji: "✨", label: "Custom", count: "Unlimited", href: "/shop/custom", bg: "bg-yellow-50", hover: "hover:bg-yellow-100", border: "hover:border-yellow-300" },
  { emoji: "🍓", label: "Fruit", count: "22 cakes", href: "/shop/fruit", bg: "bg-red-50", hover: "hover:bg-red-100", border: "hover:border-red-300" },
  { emoji: "🧁", label: "Cupcakes", count: "30 cakes", href: "/shop/cupcakes", bg: "bg-pink-50", hover: "hover:bg-pink-100", border: "hover:border-pink-300" },
  { emoji: "🎭", label: "Theme", count: "15 cakes", href: "/shop/theme", bg: "bg-indigo-50", hover: "hover:bg-indigo-100", border: "hover:border-indigo-300" },
  { emoji: "🍰", label: "Cheesecake", count: "12 cakes", href: "/shop/cheesecake", bg: "bg-orange-50", hover: "hover:bg-orange-100", border: "hover:border-orange-300" },
];

export default function Categories() {
  return (
    <section className="py-16 bg-[#FFF8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-xs font-semibold tracking-widest text-[#E8627A] uppercase">Browse By Type</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-[#3D1C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Explore Categories
          </h2>
          <p className="mt-2 text-sm text-[#8B7070] max-w-md mx-auto">
            Find the perfect cake for every mood, moment, and milestone.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map((cat) => (
            <a
              key={cat.label}
              href={cat.href}
              className={`group flex flex-col items-center gap-2 p-4 rounded-2xl border border-transparent ${cat.bg} ${cat.hover} ${cat.border} transition-all duration-200 hover:-translate-y-1 hover:shadow-md`}
            >
              <span className="text-3xl group-hover:scale-110 transition-transform duration-200">{cat.emoji}</span>
              <span className="text-xs font-semibold text-[#3D1C2C]">{cat.label}</span>
              <span className="text-[9px] text-[#8B7070]">{cat.count}</span>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}