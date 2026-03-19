import logo from '../assets/logo.png'
const LoadingPage = () => {
  return (
    <div className="min-h-screen bg-[#1A0A0A] flex flex-col items-center justify-center relative overflow-hidden">

      {/* ── Background glow blobs ── */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none opacity-10"
        style={{ background: "radial-gradient(circle, #E8627A, transparent)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full pointer-events-none opacity-5"
        style={{ background: "radial-gradient(circle, #C9954C, transparent)" }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center gap-8">

        {/* Logo + spinning ring */}
        <div className="relative flex items-center justify-center">
          {/* Outer spinning ring */}
          <div
            className="absolute w-24 h-24 rounded-full border-2 border-transparent border-t-[#E8627A] border-r-[#E8627A]/40 animate-spin"
            style={{ animationDuration: "1.2s" }}
          />
          {/* Inner slow ring */}
          <div
            className="absolute w-16 h-16 rounded-full border-2 border-transparent border-b-[#C9954C] border-l-[#C9954C]/40 animate-spin"
            style={{ animationDuration: "2s", animationDirection: "reverse" }}
          />
          {/* Logo icon */}
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#E8627A] to-[#C04060] flex items-center justify-center shadow-lg shadow-[#E8627A]/30">
            <span className="text-2xl"><img src={logo} alt="" /></span>
          </div>
        </div>

        {/* Brand name */}
        <div className="text-center space-y-1">
          <h1
            className="text-2xl font-bold text-white tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Sanzida's Cake
          </h1>
          <p className="text-xs text-white/30 tracking-widest uppercase">
            Artisan Bakery
          </p>
        </div>

        {/* Animated dots */}
        <div className="flex items-center gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[#E8627A]"
              style={{
                animation: "dotPulse 1.2s ease-in-out infinite",
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>

      </div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes dotPulse {
          0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
          40%            { opacity: 1;   transform: scale(1.2); }
        }
      `}</style>

    </div>
  );
};

export default LoadingPage;