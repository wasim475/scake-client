import { useState, useContext } from "react";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, ShoppingBag, Users, Package,
  Tag, Star, Settings, LogOut, Menu, X,
  Bell, ChevronRight, TrendingUp,
} from "lucide-react";
import { Auth } from "../Provider/AuthProvider";
import DashboardHome from './Pages/DashboardHome';
import ManageCakes from './Pages/ManageCakes';
import ManageOrders from './Pages/ManageOrders';
import { ManageUsers, ManageCoupons, ManageReviews } from "./Pages/AdminPages";

// ── Pages (imported inline — move to separate files as needed) ────────────────



// ─── Nav config ───────────────────────────────────────────────────────────────

const NAV = [
  { label: "Overview",  icon: <LayoutDashboard size={16} />, href: "/admin" },
  { label: "Cakes",     icon: <ShoppingBag     size={16} />, href: "/admin/cakes",   badge: "48" },
  { label: "Orders",    icon: <Package         size={16} />, href: "/admin/orders",  badge: "6" },
  { label: "Custom Order",    icon: <Package         size={16} />, href: "/admin/custom-order",  badge: "6" },
  { label: "Users",     icon: <Users           size={16} />, href: "/admin/users" },
  { label: "Coupons",   icon: <Tag             size={16} />, href: "/admin/coupons" },
  { label: "Reviews",   icon: <Star            size={16} />, href: "/admin/reviews", badge: "3" },
  { label: "Settings",  icon: <Settings        size={16} />, href: "/admin/settings" },
];

// ─── Sidebar ──────────────────────────────────────────────────────────────────

const Sidebar = ({ open, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logOut } = useContext(Auth);

  const handleLogout = async () => {
    await logOut();
    navigate("/");
  };

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-[#1A0A0A] flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/5">
          <Link to="/admin" className="flex items-center gap-2.5">
           
            <div>
              <AdminLogo/>
            </div>
          </Link>
          <button onClick={onClose} className="lg:hidden text-white/40 hover:text-white transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
          {NAV.map((item) => {
            const active = item.href === "/admin"
              ? location.pathname === "/admin"
              : location.pathname.startsWith(item.href);

            return (
              <Link
                key={item.label}
                to={item.href}
                onClick={onClose}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  active
                    ? "bg-[#E8627A] text-white shadow-lg shadow-[#E8627A]/20"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className={active ? "text-white" : "text-white/40 group-hover:text-white/70 transition-colors"}>
                  {item.icon}
                </span>
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    active ? "bg-white/20 text-white" : "bg-[#E8627A]/20 text-[#E8627A]"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="px-3 py-4 border-t border-white/5 space-y-2">
          <div className="flex items-center gap-3 px-3 py-2.5">
            <div className="w-8 h-8 rounded-full bg-[#E8627A] flex items-center justify-center text-white text-xs font-bold shrink-0">
              {user?.displayName?.[0]?.toUpperCase() ?? "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">
                {user?.displayName ?? "Admin"}
              </p>
              <p className="text-[10px] text-white/30 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400/70 hover:text-red-400 hover:bg-red-400/10 transition-colors"
          >
            <LogOut size={15} /> Log Out
          </button>
        </div>
      </aside>
    </>
  );
};

// ─── Top bar ──────────────────────────────────────────────────────────────────

const Topbar = ({ onMenuClick }) => {
  const location = useLocation();
  const current  = NAV.find((n) =>
    n.href === "/admin"
      ? location.pathname === "/admin"
      : location.pathname.startsWith(n.href)
  );

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl hover:bg-gray-100 text-[#8B7070] transition-colors"
        >
          <Menu size={18} />
        </button>

        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-sm text-[#8B7070]">
          <span>Admin</span>
          {current && current.href !== "/admin" && (
            <>
              <ChevronRight size={13} />
              <span className="font-semibold text-[#3D1C2C]">{current.label}</span>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Notifications */}
        <button className="relative p-2 rounded-xl hover:bg-gray-100 text-[#8B7070] transition-colors">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E8627A] rounded-full" />
        </button>

        {/* View site */}
        <Link
          to="/"
          target="_blank"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#E8627A] border border-[#E8627A]/30 rounded-xl hover:bg-[#FDEEF1] transition-colors"
        >
          <TrendingUp size={12} /> View Site
        </Link>
      </div>
    </header>
  );
};

// ─── Main Layout ──────────────────────────────────────────────────────────────

import { Outlet } from "react-router-dom";
import Logo from '../components/Logo';
import AdminLogo from '../components/AdminLogo';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 lg:flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 px-4 sm:px-6 py-6">
          <Outlet />   {/* 🔥 THIS IS THE FIX */}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;