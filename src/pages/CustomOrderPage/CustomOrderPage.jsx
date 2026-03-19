import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, Check, ChevronDown,
  Upload, Calendar, Clock, MessageSquare,
  Cake, Palette, Layers, ShoppingCart,
} from "lucide-react";

// ─── Config data ──────────────────────────────────────────────────────────────

const STEPS = [
  { id: 1, label: "Cake Type",    icon: <Cake    size={14} /> },
  { id: 2, label: "Design",       icon: <Palette size={14} /> },
  { id: 3, label: "Details",      icon: <Layers  size={14} /> },
  { id: 4, label: "Confirm",      icon: <Check   size={14} /> },
];

const OCCASIONS = [
  { value: "birthday",    label: "🎂 Birthday" },
  { value: "wedding",     label: "💍 Wedding" },
  { value: "anniversary", label: "💕 Anniversary" },
  { value: "baby_shower", label: "🍼 Baby Shower" },
  { value: "graduation",  label: "🎓 Graduation" },
  { value: "corporate",   label: "🏢 Corporate" },
  { value: "eid",         label: "🌙 Eid Special" },
  { value: "other",       label: "✨ Other" },
];

const FLAVORS = [
  "Vanilla", "Chocolate", "Strawberry", "Red Velvet",
  "Lemon", "Butterscotch", "Black Forest", "Blueberry",
  "Caramel", "Pineapple", "Mango", "Coffee",
];

const FROSTINGS = [
  "Buttercream", "Whipped Cream", "Fondant",
  "Cream Cheese", "Ganache", "Swiss Meringue",
];

const SIZES = [
  { label: "500g",  serves: "3–4 people",  price: 0    },
  { label: "1 kg",  serves: "8–10 people", price: 300  },
  { label: "1.5 kg",serves: "12–15 people",price: 550  },
  { label: "2 kg",  serves: "18–20 people",price: 800  },
  { label: "3 kg",  serves: "25–30 people",price: 1300 },
];

const TIERS = [
  { label: "Single",  emoji: "🎂", price: 0    },
  { label: "2 Tier",  emoji: "🎂", price: 800  },
  { label: "3 Tier",  emoji: "🎂", price: 1800 },
];

const THEMES = [
  { label: "Floral",      emoji: "🌸" },
  { label: "Minimalist",  emoji: "⬜" },
  { label: "Rustic",      emoji: "🪵" },
  { label: "Elegant",     emoji: "✨" },
  { label: "Cartoon",     emoji: "🎨" },
  { label: "Galaxy",      emoji: "🌌" },
  { label: "Vintage",     emoji: "🕰️" },
  { label: "Custom",      emoji: "🖌️" },
];

const COLORS = [
  { label: "Blush Pink",    hex: "#F4A0B0" },
  { label: "Rose Gold",     hex: "#C9954C" },
  { label: "White Ivory",   hex: "#FFF8F0" },
  { label: "Midnight Blue", hex: "#1A3A5C" },
  { label: "Sage Green",    hex: "#8BAF8A" },
  { label: "Lavender",      hex: "#C4B0D8" },
  { label: "Champagne",     hex: "#E8D5A3" },
  { label: "Jet Black",     hex: "#1A1A1A" },
];

const TIME_SLOTS = ["10am – 12pm", "12pm – 3pm", "3pm – 6pm", "6pm – 9pm"];

const BASE_PRICE = 850;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const SectionTitle = ({ children }) => (
  <p className="text-xs font-bold text-[#8B7070] uppercase tracking-widest mb-3">{children}</p>
);

const Chip = ({ label, active, onClick, emoji }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-sm font-medium transition-all duration-150 ${
      active
        ? "bg-[#E8627A] text-white border-[#E8627A] shadow-sm"
        : "bg-white text-[#8B7070] border-gray-200 hover:border-[#E8627A] hover:text-[#E8627A]"
    }`}
  >
    {emoji && <span>{emoji}</span>}
    {label}
  </button>
);

const FieldLabel = ({ children, optional }) => (
  <label className="block text-xs font-semibold text-[#8B7070] uppercase tracking-wider mb-1.5">
    {children}
    {optional && <span className="ml-1 normal-case text-[10px] text-gray-400">(optional)</span>}
  </label>
);

const TextInput = ({ label, optional, ...props }) => (
  <div>
    {label && <FieldLabel optional={optional}>{label}</FieldLabel>}
    <input
      {...props}
      className="w-full px-4 py-2.5 text-sm bg-[#FFF8F0] border border-gray-200 rounded-xl outline-none focus:border-[#E8627A] focus:ring-2 focus:ring-[#E8627A]/10 transition-all placeholder:text-gray-300 text-[#2A1A1A]"
    />
  </div>
);

// ─── Step components ──────────────────────────────────────────────────────────

const StepCakeType = ({ form, setForm }) => {
  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  return (
    <div className="space-y-7">

      {/* Occasion */}
      <div>
        <SectionTitle>Occasion</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {OCCASIONS.map((o) => (
            <Chip
              key={o.value}
              label={o.label}
              active={form.occasion === o.value}
              onClick={() => set("occasion", o.value)}
            />
          ))}
        </div>
      </div>

      {/* Flavor */}
      <div>
        <SectionTitle>Cake Flavor</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {FLAVORS.map((f) => (
            <Chip key={f} label={f} active={form.flavor === f} onClick={() => set("flavor", f)} />
          ))}
        </div>
      </div>

      {/* Frosting */}
      <div>
        <SectionTitle>Frosting Type</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {FROSTINGS.map((f) => (
            <Chip key={f} label={f} active={form.frosting === f} onClick={() => set("frosting", f)} />
          ))}
        </div>
      </div>

      {/* Size */}
      <div>
        <SectionTitle>Cake Size</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {SIZES.map((s, i) => (
            <button
              key={s.label}
              type="button"
              onClick={() => set("size", i)}
              className={`p-4 rounded-2xl border-2 text-left transition-all ${
                form.size === i
                  ? "border-[#E8627A] bg-[#FDEEF1]"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-[#2A1A1A]">{s.label}</span>
                {form.size === i && (
                  <span className="w-5 h-5 rounded-full bg-[#E8627A] flex items-center justify-center">
                    <Check size={11} className="text-white" />
                  </span>
                )}
              </div>
              <p className="text-xs text-[#8B7070]">{s.serves}</p>
              {s.price > 0 && (
                <p className="text-xs text-[#E8627A] font-semibold mt-1">+৳{s.price}</p>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tiers */}
      <div>
        <SectionTitle>Number of Tiers</SectionTitle>
        <div className="flex gap-3 flex-wrap">
          {TIERS.map((t, i) => (
            <button
              key={t.label}
              type="button"
              onClick={() => set("tier", i)}
              className={`flex-1 min-w-[100px] p-4 rounded-2xl border-2 text-center transition-all ${
                form.tier === i
                  ? "border-[#E8627A] bg-[#FDEEF1]"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <p className="text-2xl mb-1">{t.emoji}</p>
              <p className="text-sm font-semibold text-[#2A1A1A]">{t.label}</p>
              {t.price > 0 && (
                <p className="text-xs text-[#E8627A] font-semibold">+৳{t.price}</p>
              )}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────

const StepDesign = ({ form, setForm }) => {
  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  return (
    <div className="space-y-7">

      {/* Theme */}
      <div>
        <SectionTitle>Cake Theme</SectionTitle>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {THEMES.map((t) => (
            <button
              key={t.label}
              type="button"
              onClick={() => set("theme", t.label)}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2 transition-all ${
                form.theme === t.label
                  ? "border-[#E8627A] bg-[#FDEEF1]"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <span className="text-2xl">{t.emoji}</span>
              <span className="text-[10px] font-semibold text-[#5C3D2E] text-center leading-tight">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Color palette */}
      <div>
        <SectionTitle>Primary Color</SectionTitle>
        <div className="flex flex-wrap gap-3">
          {COLORS.map((c) => (
            <button
              key={c.label}
              type="button"
              onClick={() => set("color", c.label)}
              className="flex flex-col items-center gap-1.5 group"
            >
              <div
                className={`w-10 h-10 rounded-full border-4 transition-all ${
                  form.color === c.label ? "border-[#E8627A] scale-110 shadow-md" : "border-transparent hover:border-gray-300"
                }`}
                style={{ backgroundColor: c.hex }}
              />
              <span className="text-[9px] text-[#8B7070] font-medium text-center max-w-[48px] leading-tight">{c.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Message */}
      <div>
        <FieldLabel optional>Custom Message on Cake</FieldLabel>
        <div className="relative">
          <MessageSquare size={15} className="absolute left-3.5 top-3.5 text-[#8B7070]" />
          <input
            type="text"
            value={form.message}
            onChange={(e) => set("message", e.target.value)}
            maxLength={60}
            placeholder="e.g. Happy Birthday Rina! 🎉"
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#FFF8F0] border border-gray-200 rounded-xl outline-none focus:border-[#E8627A] focus:ring-2 focus:ring-[#E8627A]/10 transition-all placeholder:text-gray-300 text-[#2A1A1A]"
          />
        </div>
        <p className="text-right text-[10px] text-gray-400 mt-1">{form.message.length}/60</p>
      </div>

      {/* Reference image upload */}
      <div>
        <SectionTitle>Reference Image</SectionTitle>
        <label className="flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:border-[#E8627A]/40 hover:bg-[#FDEEF1]/30 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-[#FDEEF1] flex items-center justify-center">
            <Upload size={20} className="text-[#E8627A]" />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-[#3D1C2C]">Upload Inspiration Photo</p>
            <p className="text-xs text-[#8B7070] mt-0.5">JPG, PNG · Max 5MB · Optional</p>
          </div>
          <input type="file" accept="image/*" className="hidden" />
        </label>
      </div>

      {/* Special notes */}
      <div>
        <FieldLabel optional>Special Instructions</FieldLabel>
        <textarea
          value={form.notes}
          onChange={(e) => set("notes", e.target.value)}
          rows={3}
          placeholder="Any specific design details, allergen info, or special requests..."
          className="w-full px-4 py-2.5 text-sm bg-[#FFF8F0] border border-gray-200 rounded-xl outline-none focus:border-[#E8627A] focus:ring-2 focus:ring-[#E8627A]/10 transition-all placeholder:text-gray-300 text-[#2A1A1A] resize-none"
        />
      </div>

    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────

const StepDetails = ({ form, setForm }) => {
  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));
  const setField = (key) => (e) => set(key, e.target.value);

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="space-y-6">

      {/* Delivery date & time */}
      <div>
        <SectionTitle>Delivery Schedule</SectionTitle>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <FieldLabel><Calendar size={12} className="inline mr-1" />Delivery Date</FieldLabel>
            <input
              type="date"
              value={form.date}
              min={today}
              onChange={setField("date")}
              className="w-full px-4 py-2.5 text-sm bg-[#FFF8F0] border border-gray-200 rounded-xl outline-none focus:border-[#E8627A] focus:ring-2 focus:ring-[#E8627A]/10 transition-all text-[#2A1A1A]"
            />
          </div>
          <div>
            <FieldLabel><Clock size={12} className="inline mr-1" />Time Slot</FieldLabel>
            <div className="relative">
              <select
                value={form.slot}
                onChange={setField("slot")}
                className="w-full appearance-none px-4 py-2.5 text-sm bg-[#FFF8F0] border border-gray-200 rounded-xl outline-none focus:border-[#E8627A] focus:ring-2 focus:ring-[#E8627A]/10 transition-all text-[#2A1A1A] pr-10"
              >
                {TIME_SLOTS.map((t) => <option key={t}>{t}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B7070] pointer-events-none" />
            </div>
          </div>
        </div>
        <p className="text-[11px] text-[#8B7070] mt-2">
          ⚠️ Custom cakes need at least <span className="font-semibold text-[#E8627A]">48 hours</span> advance notice.
        </p>
      </div>

      {/* Customer info */}
      <div>
        <SectionTitle>Your Details</SectionTitle>
        <div className="space-y-4">
          <TextInput label="Full Name" value={form.name} onChange={setField("name")} placeholder="Rina Ahmed" />
          <TextInput label="Phone Number" type="tel" value={form.phone} onChange={setField("phone")} placeholder="+880 1XXX XXXXXX" />
          <TextInput label="Email Address" type="email" value={form.email} onChange={setField("email")} placeholder="you@email.com" />
        </div>
      </div>

      {/* Delivery address */}
      <div>
        <SectionTitle>Delivery Address</SectionTitle>
        <div className="space-y-3">
          <TextInput value={form.address} onChange={setField("address")} placeholder="House / Road / Area" />
          <div className="grid grid-cols-2 gap-3">
            <TextInput value={form.city} onChange={setField("city")} placeholder="City" />
            <TextInput value={form.district} onChange={setField("district")} placeholder="District" />
          </div>
          <TextInput
            label="Delivery Notes"
            optional
            value={form.deliveryNote}
            onChange={setField("deliveryNote")}
            placeholder="e.g. Ring the bell twice"
          />
        </div>
      </div>

    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────

const StepConfirm = ({ form, totalPrice }) => {
  const sizeLabel  = SIZES[form.size]?.label  ?? "—";
  const tierLabel  = TIERS[form.tier]?.label  ?? "—";
  const occasionLabel = OCCASIONS.find((o) => o.value === form.occasion)?.label ?? "—";

  const rows = [
    { label: "Occasion",   value: occasionLabel },
    { label: "Flavor",     value: form.flavor   || "—" },
    { label: "Frosting",   value: form.frosting || "—" },
    { label: "Size",       value: sizeLabel },
    { label: "Tiers",      value: tierLabel },
    { label: "Theme",      value: form.theme    || "—" },
    { label: "Color",      value: form.color    || "—" },
    { label: "Message",    value: form.message  || "No message" },
    { label: "Delivery",   value: form.date ? `${form.date} · ${form.slot}` : "—" },
    { label: "Address",    value: [form.address, form.city].filter(Boolean).join(", ") || "—" },
  ];

  return (
    <div className="space-y-6">

      {/* Price highlight */}
      <div className="bg-gradient-to-br from-[#3D1C2C] to-[#5C2A38] rounded-2xl p-6 text-center">
        <p className="text-xs text-white/50 uppercase tracking-widest mb-1">Estimated Price</p>
        <p className="text-4xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
          ৳{totalPrice.toLocaleString()}
        </p>
        <p className="text-xs text-white/40 mt-1">Final price confirmed after review by our team</p>
      </div>

      {/* Summary */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-50 bg-gray-50/50">
          <p className="text-xs font-bold text-[#8B7070] uppercase tracking-widest">Order Summary</p>
        </div>
        <div className="divide-y divide-gray-50">
          {rows.map((r) => (
            <div key={r.label} className="flex items-start px-5 py-3 gap-4">
              <span className="text-xs font-semibold text-[#8B7070] w-24 shrink-0 pt-0.5">{r.label}</span>
              <span className="text-sm text-[#2A1A1A] font-medium flex-1">{r.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Customer */}
      <div className="bg-[#FFF8F0] border border-[#E8627A]/15 rounded-2xl p-4 space-y-1">
        <p className="text-xs font-bold text-[#8B7070] uppercase tracking-widest mb-2">Contact</p>
        <p className="text-sm font-semibold text-[#2A1A1A]">{form.name || "—"}</p>
        <p className="text-xs text-[#8B7070]">{form.phone || "—"}</p>
        <p className="text-xs text-[#8B7070]">{form.email || "—"}</p>
      </div>

      <p className="text-xs text-[#8B7070] text-center leading-relaxed">
        By placing this order you agree to our{" "}
        <Link to="/terms" className="text-[#E8627A] font-semibold hover:underline">Terms of Service</Link>.
        Our team will confirm your order within{" "}
        <span className="font-semibold text-[#3D1C2C]">2 hours</span>.
      </p>

    </div>
  );
};

// ─── Order Success ────────────────────────────────────────────────────────────

const OrderSuccess = () => {
  const navigate = useNavigate();
  const orderId  = `CKH-C${Math.floor(1000 + Math.random() * 9000)}`;

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-5">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
          <Check size={36} className="text-green-600" strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#3D1C2C]"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Custom Order Received! 🎉
          </h1>
          <p className="text-sm text-[#8B7070] mt-1">
            Our team will review your order and confirm within 2 hours.
          </p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-4 text-left space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-[#8B7070]">Order ID</span>
            <span className="font-mono font-bold text-[#3D1C2C]">#{orderId}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#8B7070]">Status</span>
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
              Pending Review
            </span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={() => navigate("/profile/orders")}
            className="flex-1 py-3 text-sm font-bold text-[#E8627A] border-2 border-[#E8627A] rounded-xl hover:bg-[#FDEEF1] transition-colors">
            Track Order
          </button>
          <button onClick={() => navigate("/")}
            className="flex-1 py-3 text-sm font-bold text-white bg-[#E8627A] hover:bg-[#C04060] rounded-xl transition-colors">
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const INITIAL_FORM = {
  // Step 1
  occasion: "", flavor: "", frosting: "", size: 0, tier: 0,
  // Step 2
  theme: "", color: "", message: "", notes: "",
  // Step 3
  date: "", slot: TIME_SLOTS[0],
  name: "", phone: "", email: "",
  address: "", city: "", district: "", deliveryNote: "",
};

const CustomOrderPage = () => {
  const navigate    = useNavigate();
  const [step,      setStep]      = useState(0);
  const [form,      setForm]      = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  const totalPrice = (() => {
    const sizeExtra = SIZES[form.size]?.price  ?? 0;
    const tierExtra = TIERS[form.tier]?.price  ?? 0;
    return BASE_PRICE + sizeExtra + tierExtra;
  })();

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep((s) => s + 1);
  };
  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };
  const handleSubmit = () => {
    // TODO: POST /api/custom-orders  { ...form, totalPrice }
    setSubmitted(true);
  };

  if (submitted) return <OrderSuccess />;

  return (
    <div className="min-h-screen bg-[#FFF8F0]">

      {/* ── HEADER ── */}
      <div className="bg-gradient-to-br from-[#3D1C2C] to-[#5C2A38]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 text-center">
          <span className="text-xs font-bold tracking-widest text-pink-300 uppercase">
            Build Your Dream Cake
          </span>
          <h1
            className="mt-2 text-3xl sm:text-4xl font-bold text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Custom Cake Order
          </h1>
          <p className="mt-2 text-sm text-white/50">
            Tell us everything — we'll bake it exactly how you imagine it.
          </p>
        </div>

        {/* Step bar */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-0">
          <div className="flex items-center">
            {STEPS.map((s, i) => {
              const done   = i < step;
              const active = i === step;
              return (
                <div key={s.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center gap-1 shrink-0">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all text-sm ${
                        done   ? "bg-[#E8627A] border-[#E8627A] text-white"
                        : active ? "bg-white border-white text-[#E8627A]"
                        : "bg-white/10 border-white/20 text-white/40"
                      }`}
                    >
                      {done ? <Check size={14} /> : s.icon}
                    </div>
                    <span className={`text-[9px] font-semibold whitespace-nowrap ${active ? "text-white" : "text-white/40"}`}>
                      {s.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-1 mb-4 transition-colors ${i < step ? "bg-[#E8627A]" : "bg-white/15"}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── FORM BODY ── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Main form */}
          <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-[#3D1C2C] mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              {STEPS[step].label}
            </h2>

            {step === 0 && <StepCakeType form={form} setForm={setForm} />}
            {step === 1 && <StepDesign   form={form} setForm={setForm} />}
            {step === 2 && <StepDetails  form={form} setForm={setForm} />}
            {step === 3 && <StepConfirm  form={form} totalPrice={totalPrice} />}

            {/* Nav buttons */}
            <div className="flex gap-3 mt-8 pt-6 border-t border-gray-100">
              {step > 0 ? (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#8B7070] border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft size={14} /> Back
                </button>
              ) : (
                <button
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#8B7070] border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft size={14} /> Cancel
                </button>
              )}

              {step < STEPS.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#E8627A] hover:bg-[#C04060] text-white text-sm font-bold rounded-xl shadow-md shadow-[#E8627A]/20 transition-colors active:scale-95"
                >
                  Continue <ArrowRight size={14} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#E8627A] hover:bg-[#C04060] text-white text-sm font-bold rounded-xl shadow-md shadow-[#E8627A]/20 transition-colors active:scale-95"
                >
                  <ShoppingCart size={14} /> Place Custom Order
                </button>
              )}
            </div>
          </div>

          {/* Sticky price sidebar */}
          <div className="space-y-4">
            <div className="bg-white border border-gray-100 rounded-2xl p-5 sticky top-24 space-y-4">
              <p className="text-xs font-bold text-[#8B7070] uppercase tracking-widest">Price Estimate</p>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#8B7070]">Base price</span>
                  <span className="font-medium text-[#2A1A1A]">৳{BASE_PRICE}</span>
                </div>
                {SIZES[form.size]?.price > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8B7070]">Size ({SIZES[form.size].label})</span>
                    <span className="font-medium text-[#2A1A1A]">+৳{SIZES[form.size].price}</span>
                  </div>
                )}
                {TIERS[form.tier]?.price > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8B7070]">Tiers ({TIERS[form.tier].label})</span>
                    <span className="font-medium text-[#2A1A1A]">+৳{TIERS[form.tier].price}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-[#3D1C2C] border-t border-gray-100 pt-2">
                  <span>Estimate</span>
                  <span className="text-[#E8627A]">৳{totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-100 rounded-xl px-3 py-2.5">
                <p className="text-[11px] text-amber-700 font-medium">
                  ⚠️ Final price may vary based on design complexity. Our team will confirm before payment.
                </p>
              </div>

              {/* Perks */}
              <div className="space-y-2 pt-1">
                {[
                  "🚴 Free delivery on orders ৳1,500+",
                  "🎁 Free gift box included",
                  "🔄 Free revision if unhappy",
                  "📸 Photo before delivery",
                ].map((p) => (
                  <p key={p} className="text-xs text-[#8B7070]">{p}</p>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CustomOrderPage;