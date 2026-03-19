import { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ArrowRight, AlertCircle } from "lucide-react";
import { Auth } from "../../Provider/AuthProvider";

const LoginPage = () => {
  const { signIn, googleSignIn, facebookSignIn } = useContext(Auth);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoad, setGoogleLoad] = useState(false);
  const [error, setError] = useState("");

  const set = (key) => (e) => {
    setError("");
    setForm((f) => ({ ...f, [key]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn(form.email, form.password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(getFriendlyError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    setGoogleLoad(true);
    try {
      await googleSignIn();
      navigate(from, { replace: true });
    } catch (err) {
      setError(getFriendlyError(err.code));
    } finally {
      setGoogleLoad(false);
    }
  };

  const handleFacebook = async () => {
    setError("");
    try {
      await facebookSignIn();
      navigate(from, { replace: true });
    } catch (err) {
      setError(getFriendlyError(err.code));
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex">
      {/* ── LEFT DECORATIVE PANEL (hidden on mobile) ── */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#3D1C2C] via-[#5C2A38] to-[#7A3848] flex-col items-center justify-center p-12 relative overflow-hidden">
        {/* Background blobs */}
        <div
          className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #E8627A, transparent)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-60 h-60 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #C9954C, transparent)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center space-y-6 max-w-sm">
          <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto text-5xl">
            🎂
          </div>

          <div>
            <h2
              className="text-3xl font-bold text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Welcome Back!
            </h2>
            <p className="text-white/50 mt-2 text-sm leading-relaxed">
              Log in to track your orders, manage your wishlist, and enjoy
              exclusive member discounts.
            </p>
          </div>

          {/* Testimonial */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-left">
            <p className="text-white/70 text-sm italic leading-relaxed">
              "CakeHaus never disappoints. The cakes are always fresh and the
              delivery is always on time!"
            </p>
            <div className="flex items-center gap-2 mt-3">
              <div className="w-7 h-7 rounded-full bg-[#E8627A] flex items-center justify-center text-white text-xs font-bold">
                R
              </div>
              <div>
                <p className="text-white text-xs font-semibold">Rina Ahmed</p>
                <p className="text-white/40 text-[10px]">Gold Member</p>
              </div>
              <div className="ml-auto text-amber-400 text-xs">★★★★★</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT FORM PANEL ── */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md space-y-7">
          {/* Logo */}
          <div className="flex flex-col items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E8627A] to-[#C04060] flex items-center justify-center text-xl shadow-md">
                🎂
              </div>
              <span
                className="text-xl font-bold text-[#3D1C2C]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                CakeHaus
              </span>
            </Link>
            <h1
              className="text-2xl font-bold text-[#3D1C2C] mt-1"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Sign In
            </h1>
            <p className="text-sm text-[#8B7070]">
              Welcome back — let's get you some cake 🎉
            </p>
          </div>

          {/* Error alert */}
          {error && (
            <div className="flex items-start gap-2.5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
              <AlertCircle size={15} className="shrink-0 mt-0.5" />
              {error}
            </div>
          )}

          {/* Google button */}
          <button
            onClick={handleGoogle}
            disabled={googleLoad}
            className="w-full flex items-center justify-center gap-3 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-[#2A1A1A] hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95 disabled:opacity-60 shadow-sm"
          >
            {googleLoad ? (
              <span className="w-4 h-4 border-2 border-gray-300 border-t-[#E8627A] rounded-full animate-spin" />
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            )}
            Continue with Google
          </button>

          <button
            onClick={handleFacebook}
            className="w-full flex items-center justify-center gap-3 py-3 bg-[#1877F2] text-white rounded-xl text-sm font-semibold hover:bg-[#166FE5] transition-all active:scale-95 shadow-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="white">
              <path d="M22 12a10 10 0 1 0-11.63 9.87v-6.99H7.9V12h2.47V9.8c0-2.43 1.45-3.78 3.67-3.78 1.06 0 2.17.19 2.17.19v2.39h-1.22c-1.2 0-1.58.74-1.58 1.5V12h2.69l-.43 2.88h-2.26v6.99A10 10 0 0 0 22 12z" />
            </svg>
            Continue with Facebook
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-[#8B7070] font-medium">
              or sign in with email
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-[#8B7070] uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B7070]"
                />
                <input
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  required
                  placeholder="you@email.com"
                  className="w-full pl-10 pr-4 py-3 text-sm bg-[#FFF8F0] border border-gray-200 rounded-xl outline-none focus:border-[#E8627A] focus:ring-2 focus:ring-[#E8627A]/10 transition-all placeholder:text-gray-300 text-[#2A1A1A]"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-[#8B7070] uppercase tracking-wider">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-[#E8627A] font-medium hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B7070]"
                />
                <input
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={set("password")}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 text-sm bg-[#FFF8F0] border border-gray-200 rounded-xl outline-none focus:border-[#E8627A] focus:ring-2 focus:ring-[#E8627A]/10 transition-all placeholder:text-gray-300 text-[#2A1A1A]"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((s) => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8B7070] hover:text-[#E8627A] transition-colors"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#E8627A] hover:bg-[#C04060] text-white text-sm font-bold rounded-xl shadow-md shadow-[#E8627A]/20 transition-all active:scale-95 disabled:opacity-60 mt-2"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          {/* Signup link */}
          <p className="text-center text-sm text-[#8B7070]">
            Don't have an account?{" "}
            <Link
              to="/sign-up"
              className="text-[#E8627A] font-semibold hover:underline"
            >
              Create one free →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

// ─── Helper ───────────────────────────────────────────────────────────────────

function getFriendlyError(code) {
  const map = {
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
    "auth/user-disabled": "This account has been disabled.",
    "auth/invalid-credential": "Invalid email or password.",
    "auth/popup-closed-by-user": "Google sign-in was cancelled.",
  };
  return map[code] ?? "Something went wrong. Please try again.";
}
