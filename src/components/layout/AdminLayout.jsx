import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Layers,
  Award,
  Sliders,
  Boxes,
  CalendarCheck,
  BarChart3,
  Globe,
  SlidersHorizontal,
  MessageSquareQuote,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ShieldAlert,
  Bell,
  Menu,
  X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLayout = () => {
  const { user, loading, logout, isAdmin } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A101E] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#303746] border-t-[#BEF8A1] rounded-full animate-spin" />
      </div>
    );
  }

  // Redirect to login if unauthenticated
  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const menuItems = [
    { name: 'Overview', path: '/admin', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Products', path: '/admin/products', icon: <Package className="w-5 h-5" /> },
    { name: 'Categories', path: '/admin/categories', icon: <Layers className="w-5 h-5" /> },
    { name: 'Brands', path: '/admin/brands', icon: <Award className="w-5 h-5" /> },
    { name: 'Inventory & Stock', path: '/admin/inventory', icon: <Boxes className="w-5 h-5" /> },
    { name: 'Bookings & Orders', path: '/admin/bookings', icon: <CalendarCheck className="w-5 h-5" /> },
    { name: 'Traffic Analytics', path: '/admin/analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { name: 'Homepage CMS', path: '/admin/homepage-builder', icon: <SlidersHorizontal className="w-5 h-5" /> },
    { name: 'Customer Reviews', path: '/admin/testimonials', icon: <MessageSquareQuote className="w-5 h-5" /> },
    { name: 'Store & Local SEO', path: '/admin/store-seo', icon: <Globe className="w-5 h-5" /> },
    { name: 'System Settings', path: '/admin/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#0A101E] text-[#F5F5F7] flex flex-col lg:flex-row">
      {/* Desktop Collapsible Sidebar */}
      <aside
        className={`hidden lg:flex flex-col bg-[#121826] border-r border-[#303746] transition-all duration-300 z-30 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Sidebar Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-[#303746]">
          {!collapsed && (
            <Link to="/admin" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0A101E] border border-[#BEF8A1] flex items-center justify-center">
                <span className="font-orbitron font-black text-sm text-[#BEF8A1]">D</span>
              </div>
              <div className="font-orbitron font-bold text-sm tracking-wider text-[#F5F5F7]">
                DREAM<span className="text-[#BEF8A1]">.ADMIN</span>
              </div>
            </Link>
          )}

          {collapsed && (
            <div className="w-8 h-8 rounded-lg bg-[#0A101E] border border-[#BEF8A1] flex items-center justify-center mx-auto">
              <span className="font-orbitron font-black text-sm text-[#BEF8A1]">D</span>
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded bg-[#191F2D] text-[#8B929E] hover:text-[#F5F5F7] hidden lg:block"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-rajdhani font-bold uppercase tracking-wider transition-all ${
                  isActive
                    ? 'bg-[#191F2D] text-[#BEF8A1] border border-[#BEF8A1]/40 shadow-glow-subtle'
                    : 'text-[#B7BBC5] hover:bg-[#191F2D]/50 hover:text-[#F5F5F7]'
                }`}
                title={collapsed ? item.name : undefined}
              >
                <span className="shrink-0 text-[#BEF8A1]">{item.icon}</span>
                {!collapsed && <span className="truncate">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom User Profile & Logout */}
        <div className="p-3 border-t border-[#303746] bg-[#0A101E]">
          {!collapsed ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#191F2D] border border-[#BEF8A1] flex items-center justify-center text-xs font-bold text-[#BEF8A1]">
                  A
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-[#F5F5F7] truncate">
                    {user.displayName || 'Admin'}
                  </div>
                  <div className="text-[10px] text-[#8B929E] truncate">{user.email}</div>
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <Link
                  to="/"
                  target="_blank"
                  className="flex-1 py-1.5 px-2 bg-[#191F2D] text-[#B7BBC5] hover:text-[#BEF8A1] text-[11px] rounded flex items-center justify-center gap-1 border border-[#303746]"
                >
                  <ExternalLink className="w-3 h-3" /> Store
                </Link>
                <button
                  onClick={handleLogout}
                  className="py-1.5 px-2 bg-red-950/40 text-red-400 hover:text-red-300 text-[11px] rounded border border-red-900/40"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full p-2 text-red-400 hover:bg-red-950/40 rounded flex items-center justify-center"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar Header */}
        <header className="h-16 bg-[#121826] border-b border-[#303746] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-2 text-[#8B929E] hover:text-[#F5F5F7]"
            >
              {mobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="text-xs font-rajdhani uppercase font-bold text-[#8B929E]">
              Patna Store Admin Console
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#191F2D] hover:bg-[#252e42] border border-[#303746] text-xs font-rajdhani font-bold text-[#BEF8A1] uppercase transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Storefront</span>
            </Link>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileSidebarOpen && (
          <div className="lg:hidden bg-[#121826] border-b border-[#303746] p-4 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileSidebarOpen(false)}
                className="flex items-center gap-3 px-3 py-2 text-xs font-rajdhani font-bold text-[#F5F5F7] hover:text-[#BEF8A1] rounded"
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
            <div className="pt-2 border-t border-[#303746]">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 font-bold font-rajdhani uppercase"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          </div>
        )}

        {/* Dynamic Admin Page Outlet */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
