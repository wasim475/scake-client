import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart, Trash2, Plus, Minus, Tag,
  ArrowLeft, ArrowRight, Check, X, ChevronRight,
} from "lucide-react";

// ─── Mock cart state (replace with your Context / Zustand / Redux) ────────────

const INITIAL_CART = [
  { id: 1, emoji: "🎂", name: "Classic Vanilla Dream", flavor: "Vanilla", size: "1 kg", message: "Happy Birthday Rina! 🎉", deliveryDate: "2025-03-22", timeSlot: "3pm – 6pm", unitPrice: 1100, qty: 1 },
  { id: 2, emoji: "🍫", name: "Dark Chocolate Fudge",  flavor: "Chocolate", size: "1.5 kg", message: "", deliveryDate: "2025-03-22", timeSlot: "12pm – 3pm", unitPrice: 1600, qty: 2 },
  { id: 6, emoji: "🧁", name: "Assorted Cupcakes",    flavor: "Assorted", size: "Box of 12", message: "", deliveryDate: "2025-03-22", timeSlot: "10am – 12pm", unitPrice: 600, qty: 1 },
];

const VALID_COUPONS = {
  CAKE20:   { type: "percent", value: 20, label: "20% off" },
  BDAY50:   { type: "fixed",   value: 50, label: "৳50 off" },
  FREESHIP: { type: "ship",    value: 0,  label: "Free delivery" },
};

const DELIVERY_FEE = 80;

// ─── Sub-components ───────────────────────────────────────────────────────────

function CartItem({ item, onQtyChange, onRemove }) {
  return (
    <div className="group bg-white border border-gray-100 rounded-2xl p-4 flex gap-4 hover:shadow-sm transition-shadow">

      {/* Emoji thumbnail */}
      <div className="w-20 h-20 shrink-0 bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl flex items-center justify-center text-4xl">
        {item.emoji}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-[#2A1A1A] leading-snug truncate">{item.name}</h3>
          <button
            onClick={() => onRemove(item.id)}
            className="shrink-0 p-1 text-gray-300 hover:text-red-400 rounded-lg hover:bg-red-50 transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>

        <div className="flex flex-wrap gap-x-3 gap-y-0.5">
          <span className="text-[11px] text-[#8B7070]">🍰 {item.flavor}</span>
          <span className="text-[11px] text-[#8B7070]">📏 {item.size}</span>
          {item.message && (
            <span className="text-[11px] text-[#8B7070] truncate max-w-[160px]">💬 "{item.message}"</span>
          )}
        </div>

        <div className="flex flex-wrap gap-x-3 gap-y-0.5">
          <span className="text-[11px] text-[#8B7070]">📅 {item.deliveryDate}</span>
          <span className="text-[11px] text-[#8B7070]">⏰ {item.timeSlot}</span>
        </div>

        <div className="flex items-center justify-between pt-1">
          {/* Qty controls */}
          <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={() => onQtyChange(item.id, item.qty - 1)}
              className="w-8 h-8 flex items-center justify-center text-[#8B7070] hover:bg-gray-50 transition-colors"
            >
              <Minus size={12} />
            </button>
            <span className="w-8 text-center text-sm font-bold text-[#2A1A1A]">{item.qty}</span>
            <button
              onClick={() => onQtyChange(item.id, item.qty + 1)}
              className="w-8 h-8 flex items-center justify-center text-[#8B7070] hover:bg-gray-50 transition-colors"
            >
              <Plus size={12} />
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="text-base font-bold text-[#E8627A]">৳{(item.unitPrice * item.qty).toLocaleString()}</p>
            {item.qty > 1 && (
              <p className="text-[10px] text-[#8B7070]">৳{item.unitPrice.toLocaleString()} each</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CouponInput({ applied, onApply, onRemove }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleApply = () => {
    const coupon = VALID_COUPONS[code.toUpperCase()];
    if (coupon) {
      onApply(code.toUpperCase(), coupon);
      setCode("");
      setError("");
    } else {
      setError("Invalid coupon code. Try CAKE20, BDAY50 or FREESHIP.");
    }
  };

  if (applied) {
    return (
      <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-4 py-3">
        <div className="flex items-center gap-2">
          <Check size={14} className="text-green-600" />
          <span className="text-sm font-semibold text-green-700">{applied.code}</span>
          <span className="text-xs text-green-600">— {applied.label} applied!</span>
        </div>
        <button onClick={onRemove} className="text-green-500 hover:text-red-400 transition-colors">
          <X size={14} />
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B7070]" />
          <input
            type="text"
            value={code}
            onChange={(e) => { setCode(e.target.value.toUpperCase()); setError(""); }}
            onKeyDown={(e) => e.key === "Enter" && handleApply()}
            placeholder="Enter coupon code"
            className="w-full pl-9 pr-3 py-2.5 text-sm bg-[#FFF8F0] border border-gray-200 rounded-xl outline-none focus:border-[#E8627A] focus:ring-2 focus:ring-[#E8627A]/10 transition-all placeholder:text-gray-300 font-mono tracking-wider text-[#2A1A1A] uppercase"
          />
        </div>
        <button
          onClick={handleApply}
          className="px-4 py-2.5 bg-[#3D1C2C] hover:bg-[#2A1020] text-white text-sm font-semibold rounded-xl transition-colors active:scale-95"
        >
          Apply
        </button>
      </div>
      {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
      <p className="text-[11px] text-[#8B7070] mt-1.5">Try: <span className="font-mono text-[#E8627A]">CAKE20</span> · <span className="font-mono text-[#E8627A]">BDAY50</span> · <span className="font-mono text-[#E8627A]">FREESHIP</span></p>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function CartPage() {
  const navigate  = useNavigate();
  const [cart, setCart]       = useState(INITIAL_CART);
  const [coupon, setCoupon]   = useState(null); // { code, label, type, value }

  // Handlers
  const handleQtyChange = (id, qty) => {
    if (qty < 1) return handleRemove(id);
    setCart((prev) => prev.map((item) => item.id === id ? { ...item, qty } : item));
  };

  const handleRemove = (id) => setCart((prev) => prev.filter((item) => item.id !== id));

  const handleApplyCoupon = (code, couponData) => setCoupon({ code, ...couponData });

  // Calculations
  const subtotal     = cart.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);
  const deliveryFee  = coupon?.type === "ship" ? 0 : DELIVERY_FEE;
  const discountAmt  = !coupon ? 0
    : coupon.type === "percent" ? Math.round(subtotal * coupon.value / 100)
    : coupon.type === "fixed"   ? coupon.value
    : 0;
  const total = subtotal + deliveryFee - discountAmt;

  // Empty cart
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#FFF8F0] flex flex-col items-center justify-center gap-4 text-center px-4">
        <span className="text-7xl">🛒</span>
        <h2 className="text-2xl font-bold text-[#3D1C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
          Your cart is empty
        </h2>
        <p className="text-sm text-[#8B7070] max-w-xs">Looks like you haven't added any cakes yet. Go explore our delicious collection!</p>
        <Link
          to="/shop"
          className="mt-2 flex items-center gap-2 px-6 py-3 bg-[#E8627A] text-white text-sm font-bold rounded-2xl hover:bg-[#C04060] transition-colors"
        >
          <ShoppingCart size={15} /> Browse Cakes
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8F0]">

      {/* ── PAGE HEADER ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-gray-100 text-[#8B7070] transition-colors">
              <ArrowLeft size={16} />
            </button>
            <div>
              <h1 className="text-xl font-bold text-[#3D1C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
                My Cart
              </h1>
              <p className="text-xs text-[#8B7070]">{cart.length} item{cart.length > 1 ? "s" : ""}</p>
            </div>
          </div>
          <button
            onClick={() => setCart([])}
            className="text-xs text-red-400 hover:text-red-600 hover:underline transition-colors"
          >
            Clear all
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">

          {/* ── LEFT: CART ITEMS ── */}
          <div className="lg:col-span-2 space-y-3">
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onQtyChange={handleQtyChange}
                onRemove={handleRemove}
              />
            ))}

            {/* Continue shopping */}
            <Link
              to="/shop"
              className="flex items-center gap-2 text-sm font-semibold text-[#E8627A] hover:underline pt-2"
            >
              <ArrowLeft size={14} /> Continue Shopping
            </Link>
          </div>

          {/* ── RIGHT: ORDER SUMMARY ── */}
          <div className="space-y-4">

            {/* Coupon */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5">
              <p className="text-sm font-bold text-[#3D1C2C] mb-3">🏷️ Coupon Code</p>
              <CouponInput
                applied={coupon ? { code: coupon.code, label: coupon.label } : null}
                onApply={handleApplyCoupon}
                onRemove={() => setCoupon(null)}
              />
            </div>

            {/* Summary card */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 space-y-3">
              <p className="text-sm font-bold text-[#3D1C2C]">Order Summary</p>

              {/* Line items */}
              <div className="space-y-2.5">
                <div className="flex justify-between text-sm">
                  <span className="text-[#8B7070]">Subtotal ({cart.reduce((s, i) => s + i.qty, 0)} items)</span>
                  <span className="font-medium text-[#2A1A1A]">৳{subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-[#8B7070]">Delivery fee</span>
                  <span className={deliveryFee === 0 ? "text-green-600 font-medium" : "font-medium text-[#2A1A1A]"}>
                    {deliveryFee === 0 ? "FREE" : `৳${deliveryFee}`}
                  </span>
                </div>

                {discountAmt > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Coupon ({coupon.code})</span>
                    <span className="text-green-600 font-medium">−৳{discountAmt.toLocaleString()}</span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                <span className="font-bold text-[#3D1C2C]">Total</span>
                <span className="text-xl font-bold text-[#E8627A]">৳{total.toLocaleString()}</span>
              </div>

              {/* Savings callout */}
              {discountAmt > 0 && (
                <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl px-3 py-2">
                  <Check size={13} className="text-green-600 shrink-0" />
                  <p className="text-xs text-green-700 font-medium">You're saving ৳{discountAmt.toLocaleString()} on this order!</p>
                </div>
              )}

              {/* Checkout button */}
              <button
                onClick={() => navigate("/checkout")}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#E8627A] hover:bg-[#C04060] text-white text-sm font-bold rounded-xl shadow-md shadow-[#E8627A]/20 transition-colors active:scale-95"
              >
                Proceed to Checkout <ArrowRight size={15} />
              </button>

              <p className="text-[10px] text-center text-[#8B7070]">🔒 Secure checkout · SSL encrypted</p>
            </div>

            {/* Accepted payments */}
            <div className="bg-white border border-gray-100 rounded-2xl p-4">
              <p className="text-[11px] text-[#8B7070] text-center mb-2.5 font-medium uppercase tracking-wider">We Accept</p>
              <div className="flex items-center justify-center gap-2">
                {[
                  { icon: "💳", label: "Card" },
                  { icon: "📱", label: "bKash" },
                  { icon: "🏦", label: "Nagad" },
                  { icon: "💵", label: "COD" },
                ].map((p) => (
                  <div key={p.label} className="flex flex-col items-center gap-0.5 px-3 py-2 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="text-lg">{p.icon}</span>
                    <span className="text-[9px] text-[#8B7070] font-medium">{p.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: "🔒", text: "Secure Payment" },
                { icon: "🚴", text: "Fast Delivery" },
                { icon: "↩️", text: "Free Returns" },
              ].map((b) => (
                <div key={b.text} className="flex flex-col items-center gap-1 bg-white border border-gray-100 rounded-xl p-2.5 text-center">
                  <span className="text-xl">{b.icon}</span>
                  <span className="text-[9px] text-[#8B7070] font-medium leading-tight">{b.text}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}