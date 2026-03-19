import { useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";

const offers = [
  { code: "CAKE20", label: "First Order", discount: "20% OFF", desc: "On your very first order — no minimum required.", emoji: "🎉", expires: "Limited time" },
  { code: "BDAY50", label: "Birthday Special", discount: "৳50 OFF", desc: "On any birthday cake above ৳800.", emoji: "🎂", expires: "Always active" },
  { code: "FREESHIP", label: "Free Delivery", discount: "FREE SHIP", desc: "On all orders within Tangail city.", emoji: "🚴", expires: "Weekdays only" },
];

// Countdown to midnight
function useCountdown() {
  const getSeconds = () => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    return Math.floor((midnight - now) / 1000);
  };
  const [seconds, setSeconds] = useState(getSeconds);
  useEffect(() => {
    const t = setInterval(() => setSeconds(getSeconds()), 1000);
    return () => clearInterval(t);
  }, []);
  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return { h, m, s };
}

function CouponCard({ offer }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(offer.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative bg-white rounded-2xl border border-dashed border-[#E8627A]/40 overflow-hidden flex flex-col sm:flex-row items-center gap-4 p-5 hover:shadow-[0_6px_24px_rgba(232,98,122,0.1)] transition-shadow">
      {/* Left notch effect */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-6 bg-[#FFF8F0] rounded-r-full border-r border-dashed border-[#E8627A]/40" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-6 bg-[#FFF8F0] rounded-l-full border-l border-dashed border-[#E8627A]/40" />

      {/* Emoji circle */}
      <div className="w-14 h-14 rounded-2xl bg-[#FDEEF1] flex items-center justify-center text-3xl shrink-0">
        {offer.emoji}
      </div>

      {/* Text */}
      <div className="flex-1 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2 mb-0.5">
          <span className="text-[10px] font-semibold text-[#8B7070] uppercase tracking-widest">{offer.label}</span>
          <span className="text-[9px] bg-[#FDEEF1] text-[#E8627A] px-2 py-0.5 rounded-full font-medium">{offer.expires}</span>
        </div>
        <p className="text-xl font-bold text-[#3D1C2C]" style={{ fontFamily: "'Playfair Display', serif" }}>{offer.discount}</p>
        <p className="text-xs text-[#8B7070] mt-0.5">{offer.desc}</p>
      </div>

      {/* Code + Copy */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="px-3 py-1.5 bg-[#FFF8F0] border border-dashed border-[#E8627A]/50 rounded-xl">
          <span className="text-sm font-bold tracking-widest text-[#3D1C2C]">{offer.code}</span>
        </div>
        <button
          onClick={copy}
          className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-150 ${
            copied ? "bg-green-500 text-white" : "bg-[#E8627A] text-white hover:bg-[#C04060]"
          }`}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>
    </div>
  );
}

export default function OfferBanner() {
  const { h, m, s } = useCountdown();

  return (
    <section className="py-16 bg-[#FFF8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top promo strip */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#3D1C2C] to-[#5C2A38] rounded-3xl p-8 mb-8 text-center">
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #E8627A, transparent)" }} />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #C9954C, transparent)" }} />

          <span className="relative text-xs font-semibold tracking-widest text-pink-300 uppercase">Today's Special Deal</span>
          <h2 className="relative mt-2 text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            Deals End In
          </h2>

          {/* Countdown */}
          <div className="relative flex items-center justify-center gap-3 mt-5">
            {[{ v: h, l: "Hours" }, { v: m, l: "Mins" }, { v: s, l: "Secs" }].map(({ v, l }, i) => (
              <div key={l} className="flex items-center gap-3">
                <div className="w-16 sm:w-20 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-3 text-center">
                  <span className="block text-2xl sm:text-3xl font-bold text-white tabular-nums">{v}</span>
                  <span className="text-[9px] text-white/50 uppercase tracking-widest">{l}</span>
                </div>
                {i < 2 && <span className="text-2xl font-bold text-white/40 -mt-3">:</span>}
              </div>
            ))}
          </div>

          <p className="relative mt-4 text-sm text-white/50">Midnight reset — fresh deals every day</p>
        </div>

        {/* Coupon Cards */}
        <div className="space-y-3">
          {offers.map((offer) => (
            <CouponCard key={offer.code} offer={offer} />
          ))}
        </div>

      </div>
    </section>
  );
}