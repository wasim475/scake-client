import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Home, ShoppingBag } from "lucide-react";
import LogoImage from '../../components/LogoImage';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#1A0A0A] flex flex-col items-center justify-center px-4 relative overflow-hidden">

      {/* ── Background glow blobs ── */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #E8627A, transparent)" }} />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/4 md:w-56 md:h-56 w-96 h-96 rounded-full opacity-8 pointer-events-none"
        style={{ background: "radial-gradient(circle, #C9954C, transparent)" }} />

      {/* ── Content ── */}
      <div className="relative z-10 text-center max-w-md space-y-2">

        {/* Cake emoji with bounce */}
        <div className="flex justify-center">
  <div className="animate-bounce select-none">
    <div className="h-24 sm:h-28 w-44 flex items-center justify-center">
      <LogoImage />
    </div>
  </div>
</div>

        {/* 404 number */}
        <div>
          <h1
            className="text-8xl sm:text-9xl font-bold leading-none"
            style={{
              fontFamily: "'Playfair Display', serif",
              background: "linear-gradient(135deg, #E8627A, #C9954C)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            404
          </h1>
          <p className="text-xl font-bold text-white mt-2"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Page Not Found
          </p>
          <p className="text-sm text-white/40 mt-2 leading-relaxed">
            Oops! Looks like this page got eaten. 🍴<br />
            Let's get you back to something sweeter.
          </p>
        </div>

        {/* Divider */}
        <div className="w-16 h-px bg-white/10 mx-auto" />

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white/70 border border-white/10 rounded-xl hover:bg-white/5 hover:text-white transition-all"
          >
            <ArrowLeft size={15} /> Go Back
          </button>

          <Link
            to="/"
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-[#E8627A] hover:bg-[#C04060] rounded-xl shadow-lg shadow-[#E8627A]/20 transition-all active:scale-95"
          >
            <Home size={15} /> Back to Home
          </Link>

          <Link
            to="/shop"
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white/70 border border-white/10 rounded-xl hover:bg-white/5 hover:text-white transition-all"
          >
            <ShoppingBag size={15} /> Browse Cakes
          </Link>
        </div>

      </div>

    </div>
  );
};

export default ErrorPage;