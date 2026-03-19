import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingBag, Heart, Star, Crown,
  MapPin, Phone, Mail, ChevronRight,
  Bell, Lock, HelpCircle, LogOut,
  Edit, Settings,
} from "lucide-react";
import { Auth } from '../../Provider/AuthProvider';


// ─── Static menu config ───────────────────────────────────────────────────────

const MENU_ITEMS = [
  {
    group: "My Account",
    items: [
      { icon: <ShoppingBag size={15} />, label: "My Orders",       href: "/profile/orders",   badge: null },
      { icon: <Heart size={15} />,       label: "Wishlist",         href: "/profile/wishlist", badge: "5" },
      { icon: <MapPin size={15} />,      label: "Saved Addresses",  href: "/profile/address",  badge: null },
      { icon: <Star size={15} />,        label: "My Reviews",       href: "/profile/reviews",  badge: "3" },
    ],
  },
  {
    group: "Settings",
    items: [
      { icon: <Bell size={15} />,        label: "Notifications",    href: "/profile/notifications", badge: "2" },
      { icon: <Lock size={15} />,        label: "Privacy & Security", href: "/profile/security",  badge: null },
      { icon: <Settings size={15} />,    label: "Account Settings", href: "/profile/settings",  badge: null },
    ],
  },
  {
    group: "Support",
    items: [
      { icon: <HelpCircle size={15} />,  label: "Help & Support",   href: "/profile/help",     badge: null },
    ],
  },
];

const STATS = [
  { icon: <ShoppingBag size={14} />, value: "12", label: "Orders" },
  { icon: <Heart size={14} />,       value: "5",  label: "Wishlist" },
  { icon: <Star size={14} />,        value: "3",  label: "Reviews" },
  { icon: <Crown size={14} />,       value: "Gold", label: "Member" },
];

// ─── Component ────────────────────────────────────────────────────────────────

const ProfileDashboard = () => {
  const { user, logOut } = useContext(Auth);
//   const { userOrders }   = useContext(Data);
  const navigate         = useNavigate();

  const handleLogout = async () => {
    await logOut();
    navigate("/");
  };

  // Membership badge color
  const membershipColor = {
    Gold:     "bg-amber-100 text-amber-700",
    Silver:   "bg-gray-100 text-gray-600",
    Platinum: "bg-purple-100 text-purple-700",
  }["Gold"] ?? "bg-rose-100 text-rose-600";

  return (
    <div className="min-h-screen bg-[#FFF8F0]">

      {/* ── PROFILE HEADER ── */}
      <div className="bg-gradient-to-br from-[#3D1C2C] to-[#5C2A38]">
        <div className="max-w-2xl mx-auto px-4 py-10 flex flex-col items-center text-center gap-3">

          {/* Avatar */}
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-[#E8627A] flex items-center justify-center text-3xl text-white font-bold border-4 border-white/20 shadow-lg">
              {user?.photoURL
                ? <img src={user.photoURL} alt="avatar" className="w-full h-full object-cover rounded-full" />
                : user?.displayName?.[0]?.toUpperCase() ?? "U"
              }
            </div>
            <button
              onClick={() => navigate("/profile/settings")}
              className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
            >
              <Edit size={12} className="text-[#E8627A]" />
            </button>
          </div>

          {/* Name & email */}
          <div>
            <h1
              className="text-xl font-bold text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {user?.displayName ?? "Guest User"}
            </h1>
            <p className="text-xs text-white/50 mt-0.5">{user?.email}</p>
          </div>

          {/* Membership badge */}
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${membershipColor}`}>
            <Crown size={11} /> Gold Member
          </span>

          {/* Stats row */}
          <div className="w-full grid grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden mt-2">
            {STATS.map((stat) => (
              <div key={stat.label} className="bg-white/5 py-3 flex flex-col items-center gap-1">
                <span className="text-white/60">{stat.icon}</span>
                <span className="text-base font-bold text-white">{stat.value}</span>
                <span className="text-[9px] text-white/40 uppercase tracking-wide">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTACT INFO STRIP ── */}
      <div className="max-w-2xl mx-auto px-4 -mt-0 py-4">
        <div className="bg-white border border-gray-100 rounded-2xl divide-y divide-gray-50">
          {[
            { icon: <Phone size={13} />,  value: user?.phone   ?? "+880 1700 000 000" },
            { icon: <Mail size={13} />,   value: user?.email   ?? "user@email.com" },
            { icon: <MapPin size={13} />, value: user?.address ?? "Dhaka, Bangladesh" },
          ].map(({ icon, value }, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3">
              <span className="text-[#E8627A]">{icon}</span>
              <span className="text-sm text-[#5C3D2E]">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── MENU GROUPS ── */}
      <div className="max-w-2xl mx-auto px-4 pb-8 space-y-4">
        {MENU_ITEMS.map((group) => (
          <div key={group.group}>
            <p className="text-[10px] font-bold text-[#8B7070] uppercase tracking-widest mb-2 px-1">
              {group.group}
            </p>
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden divide-y divide-gray-50">
              {group.items.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="flex items-center gap-3 px-4 py-3.5 hover:bg-[#FFF8F0] transition-colors group"
                >
                  <span className="w-8 h-8 rounded-xl bg-[#FDEEF1] flex items-center justify-center text-[#E8627A] shrink-0">
                    {item.icon}
                  </span>

                  <span className="flex-1 text-sm font-medium text-[#2A1A1A] group-hover:text-[#E8627A] transition-colors">
                    {item.label}
                  </span>

                  {item.badge && (
                    <span className="w-5 h-5 rounded-full bg-[#E8627A] text-white text-[9px] font-bold flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}

                  <ChevronRight size={15} className="text-gray-300 group-hover:text-[#E8627A] transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-red-400 bg-white border border-red-100 rounded-2xl hover:bg-red-50 transition-colors active:scale-95"
        >
          <LogOut size={15} /> Log Out
        </button>
      </div>

    </div>
  );
};

export default ProfileDashboard;