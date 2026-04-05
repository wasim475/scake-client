import { useState, useEffect } from "react";
import { ArrowRight, Star, Clock, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { slides } from './utils/HeroData';

// ── Slide data (replace image URLs with your actual cake images) ──


const stats = [
  { icon: <Star size={14} className="fill-[#E8A020] text-[#E8A020]" />, value: "4.9/5", label: "Rating" },
  { icon: "🎂", value: "5,000+", label: "Cakes Sold" },
  { icon: <Clock size={14} />, value: "Same Day", label: "Delivery" },
  { icon: <ShieldCheck size={14} />, value: "100%", label: "Fresh" },
];

const floatingBadges = [
  { emoji: "⭐", text: "Rated #1 Cake Shop", sub: "Dhaka 2024", top: "12%", left: "2%", delay: "0s" },
  { emoji: "🚴", text: "Fast Delivery", sub: "2–4 hours", top: "60%", right: "2%", delay: "0.4s" },
  { emoji: "🎁", text: "Free Gift Box", sub: "On every order", bottom: "14%", left: "2%", delay: "0.8s" },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = (index) => {
    if (animating || index === current) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 700);
  };

  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = () => goTo((current + 1) % slides.length);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [current]);

  const slide = slides[current];

  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: "92vh" }}>

      {/* ── BACKGROUND ── */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${slide.imageBg} transition-all duration-700`}
      />

      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute top-0 right-0 w-[60%] h-full opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 80% 40%, ${slide.accent}55 0%, transparent 65%)`,
          transition: "background 0.7s ease",
        }}
      />
      <div className="absolute bottom-0 left-0 w-[40%] h-[50%] opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 20% 80%, #ffffff22 0%, transparent 70%)" }}
      />

      {/* ── FLOATING BADGES (desktop only) ── */}
      {floatingBadges.map((b, i) => (
        <div
          key={i}
          className="hidden lg:flex absolute items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-3.5 py-2.5 shadow-xl z-20"
          style={{
            top: b.top,
            left: b.left,
            right: b.right,
            bottom: b.bottom,
            animation: `floatY 3s ease-in-out infinite`,
            animationDelay: b.delay,
          }}
        >
          <span className="text-xl">{b.emoji}</span>
          <div>
            <p className="text-white text-[11px] font-semibold leading-tight">{b.text}</p>
            <p className="text-white/50 text-[9px]">{b.sub}</p>
          </div>
        </div>
      ))}

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center"
        style={{ minHeight: "92vh" }}>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full py-16 lg:py-0">

          {/* LEFT: TEXT CONTENT */}
          <div
            className={`flex flex-col gap-5 transition-all duration-300 ${
              animating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
            }`}
          >
            {/* Badge */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-[11px] font-medium tracking-wide">
                {slide.badge}
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.15] text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {slide.headline.map((line, i) =>
                line.includes(slide.highlight) ? (
                  <span key={i} className="block">
                    {line.replace(slide.highlight, "").trim()}{" "}
                    <span
                      className="relative inline-block"
                      style={{
                        color: slide.accent,
                        textShadow: `0 0 40px ${slide.accent}66`,
                      }}
                    >
                      {slide.highlight}
                      {/* Underline squiggle */}
                      <svg
                        className="absolute -bottom-2 left-0 w-full"
                        height="6"
                        viewBox="0 0 200 6"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M0 4 Q25 0 50 4 Q75 8 100 4 Q125 0 150 4 Q175 8 200 4"
                          fill="none"
                          stroke={slide.accent}
                          strokeWidth="2"
                          strokeLinecap="round"
                          opacity="0.6"
                        />
                      </svg>
                    </span>
                  </span>
                ) : (
                  <span key={i} className="block">{line}</span>
                )
              )}
            </h1>

            {/* Subtext */}
            <p className="text-white/65 text-base sm:text-lg leading-relaxed max-w-lg">
              {slide.sub}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 mt-1">
              <a
                href={slide.cta.href}
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold text-white shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  background: `linear-gradient(135deg, ${slide.accent}, ${slide.accent}cc)`,
                  boxShadow: `0 8px 24px ${slide.accent}44`,
                }}
              >
                {slide.cta.label}
                <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
              </a>
              <a
                href={slide.secondary.href}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-semibold text-white/90 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                {slide.secondary.label}
              </a>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-4 mt-2 pt-4 border-t border-white/10">
              {stats.map((s, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="text-white/70 flex items-center text-sm">{s.icon}</span>
                  <div>
                    <p className="text-white text-[13px] font-bold leading-tight">{s.value}</p>
                    <p className="text-white/45 text-[9px] uppercase tracking-wide">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: CAKE VISUAL CARD */}
          <div
            className={`flex justify-center lg:justify-end transition-all duration-300 ${
              animating ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          >
            <div className="relative">

              {/* Main cake card */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                {/* Outer glow ring */}
                <div
                  className="absolute inset-0 rounded-full opacity-20 blur-3xl"
                  style={{ background: slide.accent }}
                />
                {/* Card */}
                <div className="absolute inset-4 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 flex flex-col items-center justify-center gap-3 shadow-2xl">
                  <span className="text-[100px] sm:text-[120px] drop-shadow-2xl leading-none"
                    style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.3))" }}>
                    {slide.image}
                  </span>

                  {/* Price tag */}
                  <div
                    className="px-4 py-1.5 rounded-full text-white text-xs font-bold tracking-wide"
                    style={{ background: slide.accent }}
                  >
                    {slide.price}
                  </div>
                </div>

                {/* Tag bubble */}
                <div className="absolute -top-3 -right-3 bg-white text-[#2A1A1A] px-3 py-1.5 rounded-full text-[10px] font-bold shadow-lg border border-pink-100">
                  🔥 {slide.tag}
                </div>

                {/* Review bubble */}
                <div className="absolute -bottom-3 -left-3 bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl px-3 py-2 flex items-center gap-2 shadow-lg">
                  <div className="flex -space-x-1">
                    {["🧑", "👩", "👨"].map((e, i) => (
                      <div key={i} className="w-6 h-6 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-[10px]">{e}</div>
                    ))}
                  </div>
                  <div>
                    <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={8} className="fill-[#E8A020] text-[#E8A020]" />)}</div>
                    <p className="text-white/70 text-[9px]">500+ happy customers</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ── SLIDER CONTROLS ── */}
      <div className="absolute bottom-8 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          {/* Dots */}
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-7 h-2.5 bg-white"
                    : "w-2.5 h-2.5 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          {/* Prev / Next */}
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ── BOTTOM SCROLL HINT ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-1 opacity-40">
        <span className="text-white text-[9px] uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-8 bg-white/50 animate-pulse" />
      </div>

      {/* ── KEYFRAMES ── */}
      <style>{`
        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </section>
  );
}