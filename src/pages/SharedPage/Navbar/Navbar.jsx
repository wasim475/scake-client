import { useState, useEffect } from "react";
import { ShoppingCart, Search, Heart, Menu, X, ChevronDown, User } from "lucide-react";
import Logo from '../../../components/Logo';

// ─── Sample cart count (replace with your context/state) ───
const CART_COUNT = 3;

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Shop",
    href: "/shop",
    dropdown: [
      { label: "🎂 Birthday Cakes", href: "/shop/birthday" },
      { label: "💍 Wedding Cakes", href: "/shop/wedding" },
      { label: "🍫 Chocolate Cakes", href: "/shop/chocolate" },
      { label: "🍓 Fruit Cakes", href: "/shop/fruit" },
      { label: "✨ Custom Cakes", href: "/shop/custom" },
      { label: "🧁 Cupcakes", href: "/shop/cupcakes" },
    ],
  },
  { label: "Custom Order", href: "/custom-order" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Admin Pannel", href: "/admin" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Shrink navbar on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      {/* ── TOP ANNOUNCEMENT BAR ── */}
      <div className="w-full bg-[#3D1C2C] text-center py-2 px-4">
        <p className="text-xs text-pink-200 tracking-wide">
          🎉 Free delivery on orders over ৳1,500 &nbsp;|&nbsp; Use code{" "}
          <span className="font-bold text-white bg-[#E8627A] px-2 py-0.5 rounded-full text-[10px] ml-1">
            CAKE20
          </span>{" "}
          for 20% off your first order
        </p>
      </div>

      {/* ── MAIN NAVBAR ── */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(200,80,100,0.1)] py-2"
            : "bg-white py-3"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">

            {/* ── LOGO ── */}
            <Logo/>

            {/* ── DESKTOP NAV LINKS ── */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.dropdown ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(link.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[#2A1A1A] hover:text-[#E8627A] rounded-lg hover:bg-[#FDEEF1] transition-all duration-150">
                      {link.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${
                          activeDropdown === link.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    <div
                      className={`absolute top-full left-0 mt-1 w-52 bg-white rounded-2xl shadow-[0_8px_30px_rgba(200,80,100,0.15)] border border-pink-100 overflow-hidden transition-all duration-200 origin-top ${
                        activeDropdown === link.label
                          ? "opacity-100 scale-y-100 pointer-events-auto"
                          : "opacity-0 scale-y-95 pointer-events-none"
                      }`}
                    >
                      <div className="p-2">
                        {link.dropdown.map((item) => (
                          <a
                            key={item.label}
                            href={item.href}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-[#2A1A1A] hover:text-[#E8627A] hover:bg-[#FDEEF1] rounded-xl transition-colors duration-150"
                          >
                            {item.label}
                          </a>
                        ))}
                      </div>
                      {/* Dropdown footer */}
                      <div className="px-4 py-2.5 bg-[#FFF8F0] border-t border-pink-100">
                        <a
                          href="/shop"
                          className="text-xs font-semibold text-[#E8627A] hover:underline"
                        >
                          View All Cakes →
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="px-3 py-2 text-sm font-medium text-[#2A1A1A] hover:text-[#E8627A] rounded-lg hover:bg-[#FDEEF1] transition-all duration-150"
                  >
                    {link.label}
                  </a>
                )
              )}
            </nav>

            {/* ── RIGHT SIDE ICONS ── */}
            <div className="flex items-center gap-1">

              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="btn btn-ghost btn-sm btn-circle hover:bg-[#FDEEF1] hover:text-[#E8627A] text-[#8B7070]"
                aria-label="Search"
              >
                <Search size={18} />
              </button>

              {/* Wishlist — hidden on mobile */}
              <a
                href="/wishlist"
                className="btn btn-ghost btn-sm btn-circle hover:bg-[#FDEEF1] hover:text-[#E8627A] text-[#8B7070] hidden sm:flex"
                aria-label="Wishlist"
              >
                <Heart size={18} />
              </a>

              {/* Cart */}
              <a href="/cart" className="relative" aria-label="Cart">
                <button className="btn btn-ghost btn-sm btn-circle hover:bg-[#FDEEF1] hover:text-[#E8627A] text-[#8B7070]">
                  <ShoppingCart size={18} />
                </button>
                {CART_COUNT > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#E8627A] text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-sm">
                    {CART_COUNT}
                  </span>
                )}
              </a>

              {/* User / Login */}
              <a
                href="/login"
                className="btn btn-ghost btn-sm btn-circle hover:bg-[#FDEEF1] hover:text-[#E8627A] text-[#8B7070] hidden sm:flex"
                aria-label="Account"
              >
                <User size={18} />
              </a>

              {/* Order Now CTA — hidden on small screens */}
              <a
                href="/shop"
                className="hidden md:flex ml-2 items-center gap-1.5 px-4 py-2 bg-[#E8627A] hover:bg-[#C04060] text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-[#E8627A]/40 hover:shadow-lg transition-all duration-200 active:scale-95"
              >
                Order Now
              </a>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="btn btn-ghost btn-sm btn-circle lg:hidden hover:bg-[#FDEEF1] text-[#8B7070]"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* ── SEARCH BAR (slide-down) ── */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              searchOpen ? "max-h-20 mt-3 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B7070]"
              />
              <input
                type="text"
                placeholder="Search for cakes, flavors, occasions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#FFF8F0] border border-pink-100 rounded-xl outline-none focus:border-[#E8627A] focus:ring-2 focus:ring-[#E8627A]/20 transition-all placeholder:text-[#8B7070] text-[#2A1A1A]"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B7070] hover:text-[#E8627A]"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── MOBILE DRAWER MENU ── */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            mobileOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mx-4 mt-2 mb-3 bg-white border border-pink-100 rounded-2xl shadow-lg overflow-hidden">

            {/* Mobile nav links */}
            <nav className="p-3 space-y-0.5">
              {navLinks.map((link) =>
                link.dropdown ? (
                  <details key={link.label} className="group">
                    <summary className="flex items-center justify-between px-3 py-2.5 text-sm font-medium text-[#2A1A1A] hover:text-[#E8627A] hover:bg-[#FDEEF1] rounded-xl cursor-pointer list-none transition-colors">
                      {link.label}
                      <ChevronDown
                        size={14}
                        className="transition-transform duration-200 group-open:rotate-180 text-[#8B7070]"
                      />
                    </summary>
                    <div className="ml-4 mt-1 mb-2 space-y-0.5 border-l-2 border-pink-100 pl-3">
                      {link.dropdown.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          className="block px-3 py-2 text-sm text-[#8B7070] hover:text-[#E8627A] hover:bg-[#FDEEF1] rounded-lg transition-colors"
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </details>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block px-3 py-2.5 text-sm font-medium text-[#2A1A1A] hover:text-[#E8627A] hover:bg-[#FDEEF1] rounded-xl transition-colors"
                  >
                    {link.label}
                  </a>
                )
              )}
            </nav>

            {/* Mobile bottom actions */}
            <div className="px-4 pb-4 pt-2 border-t border-pink-100 space-y-2">
              <a
                href="/shop"
                className="flex items-center justify-center w-full py-3 bg-[#E8627A] hover:bg-[#C04060] text-white text-sm font-bold rounded-xl transition-colors active:scale-95"
              >
                🎂 Order Now
              </a>
              <div className="flex gap-2">
                <a
                  href="/login"
                  className="flex-1 py-2.5 text-center text-sm font-medium text-[#E8627A] border border-[#E8627A] rounded-xl hover:bg-[#FDEEF1] transition-colors"
                >
                  Login
                </a>
                <a
                  href="/sign-up"
                  className="flex-1 py-2.5 text-center text-sm font-medium text-white bg-[#3D1C2C] rounded-xl hover:bg-[#2A1020] transition-colors"
                >
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}