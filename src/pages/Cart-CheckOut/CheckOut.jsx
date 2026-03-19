import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft, ChevronRight, Check, MapPin,
  CreditCard, Smartphone, Banknote, Plus,
  ShieldCheck, Lock, Package,
} from "lucide-react";

// ─── Mock data (wire to your real cart context) ───────────────────────────────

const CART_SUMMARY = {
  items: [
    { id: 1, emoji: "🎂", name: "Classic Vanilla Dream", size: "1 kg", qty: 1, price: 1100 },
    { id: 2, emoji: "🍫", name: "Dark Chocolate Fudge",  size: "1.5 kg", qty: 2, price: 3200 },
    { id: 6, emoji: "🧁", name: "Assorted Cupcakes",     size: "Box of 12", qty: 1, price: 600 },
  ],
  subtotal:    4900,
  delivery:    80,
  discount:    980,    // coupon CAKE20 applied
  couponCode:  "CAKE20",
  total:       4000,
};

const SAVED_ADDRESSES = [
  { id: 1, label: "Home", icon: "🏠", address: "House 12, Road 4, Dhanmondi, Dhaka 1205", phone: "+880 1711 000000" },
  { id: 2, label: "Office", icon: "🏢", address: "Level 5, 72 Gulshan Ave, Dhaka 1212", phone: "+880 1711 000001" },
];

const PAYMENT_METHODS = [
  { id: "card",  icon: <CreditCard size={18} />,  label: "Debit / Credit Card", sub: "Visa, Mastercard, AMEX" },
  { id: "bkash", icon: <Smartphone size={18} />,  label: "bKash", sub: "Mobile banking" },
  { id: "nagad", icon: <Smartphone size={18} />,  label: "Nagad", sub: "Mobile banking" },
  { id: "cod",   icon: <Banknote size={18} />,    label: "Cash on Delivery", sub: "Pay when you receive" },
];

// ─── Step indicator ───────────────────────────────────────────────────────────

const STEPS = ["Address", "Payment", "Confirm"];

function StepBar({ current }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {STEPS.map((label, i) => {
        const done    = i < current;
        const active  = i === current;
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                done   ? "bg-[#E8627A] border-[#E8627A] text-white"
                : active ? "bg-white border-[#E8627A] text-[#E8627A]"
                : "bg-white border-gray-200 text-gray-400"
              }`}>
                {done ? <Check size={13} /> : i + 1}
              </div>
              <span className={`text-[10px] font-medium ${active ? "text-[#E8627A]" : done ? "text-[#3D1C2C]" : "text-gray-400"}`}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`w-16 sm:w-24 h-0.5 mb-4 mx-1 transition-colors ${done ? "bg-[#E8627A]" : "bg-gray-200"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Order summary sidebar (shown on all steps) ───────────────────────────────

function OrderSummary() {
  const { items, subtotal, delivery, discount, couponCode, total } = CART_SUMMARY;
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 space-y-4 sticky top-24">
      <p className="text-sm font-bold text-[#3D1C2C]">Order Summary</p>

      {/* Items */}
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <div className="w-10 h-10 shrink-0 bg-rose-50 rounded-xl flex items-center justify-center text-2xl">{item.emoji}</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-[#2A1A1A] truncate">{item.name}</p>
              <p className="text-[10px] text-[#8B7070]">{item.size} × {item.qty}</p>
            </div>
            <p className="text-xs font-bold text-[#E8627A] shrink-0">৳{item.price.toLocaleString()}</p>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-100 pt-3 space-y-2">
        <div className="flex justify-between text-xs text-[#8B7070]"><span>Subtotal</span><span>৳{subtotal.toLocaleString()}</span></div>
        <div className="flex justify-between text-xs text-[#8B7070]"><span>Delivery</span><span>{delivery === 0 ? "FREE" : `৳${delivery}`}</span></div>
        {discount > 0 && (
          <div className="flex justify-between text-xs text-green-600">
            <span>Coupon ({couponCode})</span>
            <span>−৳{discount.toLocaleString()}</span>
          </div>
        )}
        <div className="flex justify-between text-sm font-bold text-[#3D1C2C] border-t border-gray-100 pt-2">
          <span>Total</span>
          <span className="text-[#E8627A] text-base">৳{total.toLocaleString()}</span>
        </div>
      </div>

      {discount > 0 && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl px-3 py-2">
          <Check size={12} className="text-green-600 shrink-0" />
          <p className="text-[10px] text-green-700 font-medium">You're saving ৳{discount.toLocaleString()} 🎉</p>
        </div>
      )}
    </div>
  );
}

// ─── Step 1 — Address ─────────────────────────────────────────────────────────

function AddressStep({ onNext }) {
  const [selected, setSelected]   = useState(1);
  const [newForm, setNewForm]     = useState(false);
  const [form, setForm]           = useState({ name: "", phone: "", address: "", city: "Dhaka", notes: "" });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold text-[#3D1C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
        Delivery Address
      </h2>

      {/* Saved addresses */}
      {!newForm && (
        <div className="space-y-3">
          {SAVED_ADDRESSES.map((addr) => (
            <button
              key={addr.id}
              onClick={() => setSelected(addr.id)}
              className={`w-full text-left flex items-start gap-3 p-4 rounded-2xl border-2 transition-all ${
                selected === addr.id
                  ? "border-[#E8627A] bg-[#FDEEF1]"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <span className="text-xl mt-0.5">{addr.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-[#2A1A1A]">{addr.label}</p>
                  {selected === addr.id && (
                    <span className="w-5 h-5 rounded-full bg-[#E8627A] flex items-center justify-center shrink-0">
                      <Check size={11} className="text-white" />
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#8B7070] mt-0.5">{addr.address}</p>
                <p className="text-xs text-[#8B7070]">{addr.phone}</p>
              </div>
            </button>
          ))}

          <button
            onClick={() => setNewForm(true)}
            className="w-full flex items-center justify-center gap-2 p-3.5 rounded-2xl border-2 border-dashed border-gray-200 text-sm text-[#8B7070] hover:border-[#E8627A] hover:text-[#E8627A] transition-colors"
          >
            <Plus size={14} /> Add New Address
          </button>
        </div>
      )}

      {/* New address form */}
      {newForm && (
        <div className="bg-white border border-gray-100 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-[#3D1C2C]">New Address</p>
            <button onClick={() => setNewForm(false)} className="text-xs text-[#8B7070] hover:text-[#E8627A]">Use saved →</button>
          </div>
          {[
            { key: "name",    label: "Full Name",    placeholder: "Rina Ahmed",              type: "text" },
            { key: "phone",   label: "Phone Number", placeholder: "+880 1XXX XXXXXX",        type: "tel" },
            { key: "address", label: "Full Address", placeholder: "House, Road, Area, City", type: "text" },
          ].map(({ key, label, placeholder, type }) => (
            <div key={key}>
              <label className="block text-xs font-semibold text-[#8B7070] uppercase tracking-wider mb-1.5">{label}</label>
              <input
                type={type}
                value={form[key]}
                onChange={set(key)}
                placeholder={placeholder}
                className="w-full px-4 py-2.5 text-sm bg-[#FFF8F0] border border-gray-200 rounded-xl outline-none focus:border-[#E8627A] focus:ring-2 focus:ring-[#E8627A]/10 transition-all placeholder:text-gray-300 text-[#2A1A1A]"
              />
            </div>
          ))}
          <div>
            <label className="block text-xs font-semibold text-[#8B7070] uppercase tracking-wider mb-1.5">Delivery Notes (optional)</label>
            <input
              type="text"
              value={form.notes}
              onChange={set("notes")}
              placeholder="e.g. Ring the bell twice"
              className="w-full px-4 py-2.5 text-sm bg-[#FFF8F0] border border-gray-200 rounded-xl outline-none focus:border-[#E8627A] focus:ring-2 focus:ring-[#E8627A]/10 transition-all placeholder:text-gray-300 text-[#2A1A1A]"
            />
          </div>
        </div>
      )}

      <button
        onClick={onNext}
        className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#E8627A] hover:bg-[#C04060] text-white text-sm font-bold rounded-xl shadow-md shadow-[#E8627A]/20 transition-colors active:scale-95"
      >
        Continue to Payment <ChevronRight size={15} />
      </button>
    </div>
  );
}

// ─── Step 2 — Payment ─────────────────────────────────────────────────────────

function PaymentStep({ onNext, onBack }) {
  const [method, setMethod] = useState("card");
  const [card, setCard]     = useState({ number: "", name: "", expiry: "", cvv: "" });

  const setC = (key) => (e) => setCard((c) => ({ ...c, [key]: e.target.value }));

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold text-[#3D1C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
        Payment Method
      </h2>

      {/* Method selector */}
      <div className="space-y-2">
        {PAYMENT_METHODS.map((m) => (
          <button
            key={m.id}
            onClick={() => setMethod(m.id)}
            className={`w-full flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
              method === m.id
                ? "border-[#E8627A] bg-[#FDEEF1]"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <span className={`${method === m.id ? "text-[#E8627A]" : "text-[#8B7070]"}`}>{m.icon}</span>
            <div className="flex-1 text-left">
              <p className="text-sm font-semibold text-[#2A1A1A]">{m.label}</p>
              <p className="text-[11px] text-[#8B7070]">{m.sub}</p>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
              method === m.id ? "border-[#E8627A] bg-[#E8627A]" : "border-gray-300"
            }`}>
              {method === m.id && <Check size={11} className="text-white" />}
            </div>
          </button>
        ))}
      </div>

      {/* Card form */}
      {method === "card" && (
        <div className="bg-white border border-gray-100 rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <Lock size={13} className="text-green-500" />
            <p className="text-xs text-green-600 font-medium">SSL encrypted · 100% secure</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#8B7070] uppercase tracking-wider mb-1.5">Card Number</label>
            <input
              type="text"
              value={card.number}
              onChange={setC("number")}
              placeholder="1234  5678  9012  3456"
              maxLength={19}
              className="w-full px-4 py-2.5 text-sm font-mono bg-[#FFF8F0] border border-gray-200 rounded-xl outline-none focus:border-[#E8627A] focus:ring-2 focus:ring-[#E8627A]/10 transition-all placeholder:text-gray-300 text-[#2A1A1A] tracking-widest"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#8B7070] uppercase tracking-wider mb-1.5">Cardholder Name</label>
            <input
              type="text"
              value={card.name}
              onChange={setC("name")}
              placeholder="RINA AHMED"
              className="w-full px-4 py-2.5 text-sm bg-[#FFF8F0] border border-gray-200 rounded-xl outline-none focus:border-[#E8627A] focus:ring-2 focus:ring-[#E8627A]/10 transition-all placeholder:text-gray-300 text-[#2A1A1A] uppercase"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#8B7070] uppercase tracking-wider mb-1.5">Expiry</label>
              <input
                type="text"
                value={card.expiry}
                onChange={setC("expiry")}
                placeholder="MM / YY"
                maxLength={7}
                className="w-full px-4 py-2.5 text-sm font-mono bg-[#FFF8F0] border border-gray-200 rounded-xl outline-none focus:border-[#E8627A] focus:ring-2 focus:ring-[#E8627A]/10 transition-all placeholder:text-gray-300 text-[#2A1A1A]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#8B7070] uppercase tracking-wider mb-1.5">CVV</label>
              <input
                type="password"
                value={card.cvv}
                onChange={setC("cvv")}
                placeholder="•••"
                maxLength={4}
                className="w-full px-4 py-2.5 text-sm font-mono bg-[#FFF8F0] border border-gray-200 rounded-xl outline-none focus:border-[#E8627A] focus:ring-2 focus:ring-[#E8627A]/10 transition-all placeholder:text-gray-300 text-[#2A1A1A]"
              />
            </div>
          </div>
        </div>
      )}

      {/* bKash / Nagad instructions */}
      {(method === "bkash" || method === "nagad") && (
        <div className="bg-[#FFF8F0] border border-gray-100 rounded-2xl p-4 space-y-2">
          <p className="text-sm font-semibold text-[#3D1C2C]">How to pay via {method === "bkash" ? "bKash" : "Nagad"}:</p>
          {["Dial *247# (bKash) or *167# (Nagad)", "Go to 'Send Money'", `Enter merchant: 01700-000000`, "Use your order total as amount", "You'll receive a confirmation SMS"].map((s, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-[#E8627A] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
              <p className="text-xs text-[#5C3D2E]">{s}</p>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-3">
        <button onClick={onBack} className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#8B7070] bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
          <ArrowLeft size={14} /> Back
        </button>
        <button
          onClick={onNext}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#E8627A] hover:bg-[#C04060] text-white text-sm font-bold rounded-xl shadow-md shadow-[#E8627A]/20 transition-colors active:scale-95"
        >
          Review Order <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}

// ─── Step 3 — Confirm ─────────────────────────────────────────────────────────

function ConfirmStep({ onBack, onPlace }) {
  const { items, subtotal, delivery, discount, couponCode, total } = CART_SUMMARY;

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold text-[#3D1C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
        Review Your Order
      </h2>

      {/* Delivery info */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-start gap-3">
        <MapPin size={16} className="text-[#E8627A] shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-semibold text-[#8B7070] uppercase tracking-wider mb-0.5">Delivering to</p>
          <p className="text-sm font-medium text-[#2A1A1A]">House 12, Road 4, Dhanmondi, Dhaka 1205</p>
          <p className="text-xs text-[#8B7070] mt-0.5">+880 1711 000000</p>
        </div>
      </div>

      {/* Items review */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4 space-y-3">
        <p className="text-xs font-bold text-[#3D1C2C] uppercase tracking-wider">Items ({items.length})</p>
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <div className="w-9 h-9 shrink-0 bg-rose-50 rounded-xl flex items-center justify-center text-xl">{item.emoji}</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-[#2A1A1A] truncate">{item.name}</p>
              <p className="text-[10px] text-[#8B7070]">{item.size} × {item.qty}</p>
            </div>
            <p className="text-xs font-bold text-[#E8627A] shrink-0">৳{item.price.toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Price breakdown */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4 space-y-2.5">
        <div className="flex justify-between text-sm text-[#8B7070]"><span>Subtotal</span><span>৳{subtotal.toLocaleString()}</span></div>
        <div className="flex justify-between text-sm text-[#8B7070]"><span>Delivery</span><span>{delivery === 0 ? "FREE" : `৳${delivery}`}</span></div>
        {discount > 0 && <div className="flex justify-between text-sm text-green-600"><span>Coupon ({couponCode})</span><span>−৳{discount.toLocaleString()}</span></div>}
        <div className="flex justify-between text-base font-bold text-[#3D1C2C] border-t border-gray-100 pt-2.5">
          <span>Total Payable</span>
          <span className="text-[#E8627A]">৳{total.toLocaleString()}</span>
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#8B7070] bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
          <ArrowLeft size={14} /> Back
        </button>
        <button
          onClick={onPlace}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#E8627A] hover:bg-[#C04060] text-white text-sm font-bold rounded-xl shadow-md shadow-[#E8627A]/20 transition-colors active:scale-95"
        >
          <ShieldCheck size={15} /> Place Order · ৳{total.toLocaleString()}
        </button>
      </div>
    </div>
  );
}

// ─── Order Confirmed screen ───────────────────────────────────────────────────

function OrderConfirmed() {
  const navigate = useNavigate();
  const orderId = `CKH-${Math.floor(1000 + Math.random() * 9000)}`;

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-5">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
          <Check size={36} className="text-green-600" strokeWidth={2.5} />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-[#3D1C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Order Placed! 🎉
          </h1>
          <p className="text-sm text-[#8B7070] mt-1">Thank you for your order. We're baking it fresh for you!</p>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-5 text-left space-y-2">
          <div className="flex justify-between text-sm"><span className="text-[#8B7070]">Order ID</span><span className="font-mono font-bold text-[#3D1C2C]">#{orderId}</span></div>
          <div className="flex justify-between text-sm"><span className="text-[#8B7070]">Total Paid</span><span className="font-bold text-[#E8627A]">৳{CART_SUMMARY.total.toLocaleString()}</span></div>
          <div className="flex justify-between text-sm"><span className="text-[#8B7070]">Estimated Delivery</span><span className="font-medium text-[#2A1A1A]">Today, 3pm – 6pm</span></div>
          <div className="flex justify-between text-sm"><span className="text-[#8B7070]">Status</span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
              <Package size={10} /> Preparing
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate("/profile/orders")}
            className="flex-1 py-3 text-sm font-bold text-[#E8627A] border-2 border-[#E8627A] rounded-xl hover:bg-[#FDEEF1] transition-colors"
          >
            Track Order
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex-1 py-3 text-sm font-bold text-white bg-[#E8627A] hover:bg-[#C04060] rounded-xl transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Checkout Page ───────────────────────────────────────────────────────

export default function CheckoutPage() {
  const [step, setStep]       = useState(0);
  const [confirmed, setConfirmed] = useState(false);

  if (confirmed) return <OrderConfirmed />;

  return (
    <div className="min-h-screen bg-[#FFF8F0]">

      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3">
          <Link to="/cart" className="p-2 rounded-xl hover:bg-gray-100 text-[#8B7070] transition-colors">
            <ArrowLeft size={16} />
          </Link>
          <h1 className="text-xl font-bold text-[#3D1C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Checkout
          </h1>
          <div className="ml-auto flex items-center gap-1.5 text-xs text-green-600 font-medium">
            <Lock size={12} /> Secure Checkout
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StepBar current={step} />

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">

          {/* Left — steps */}
          <div className="lg:col-span-2">
            {step === 0 && <AddressStep onNext={() => setStep(1)} />}
            {step === 1 && <PaymentStep onNext={() => setStep(2)} onBack={() => setStep(0)} />}
            {step === 2 && <ConfirmStep onBack={() => setStep(1)} onPlace={() => setConfirmed(true)} />}
          </div>

          {/* Right — order summary */}
          <div>
            <OrderSummary />
          </div>

        </div>
      </div>
    </div>
  );
}