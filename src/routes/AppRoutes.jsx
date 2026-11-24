import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { StorefrontLayout } from '../components/layout/StorefrontLayout';
import { AdminLayout } from '../components/layout/AdminLayout';

// Storefront Pages
import { HomePage } from '../pages/home/HomePage';
import { ProductListingPage } from '../pages/products/ProductListingPage';
import { ProductDetailPage } from '../pages/products/ProductDetailPage';
import { WishlistPage } from '../pages/products/WishlistPage';
import { ComparePage } from '../pages/products/ComparePage';
import { CustomPcBuilderPage } from '../pages/services/CustomPcBuilderPage';
import { ServicesPage } from '../pages/services/ServicesPage';
import { LocationLandingPage } from '../pages/services/LocationLandingPage';
import { ContactPage } from '../pages/contact/ContactPage';
import { AboutPage } from '../pages/about/AboutPage';

// Admin Pages
import { AdminLoginPage } from '../pages/admin/AdminLoginPage';
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';
import { AdminProductsPage } from '../pages/admin/AdminProductsPage';
import { AdminProductEditPage } from '../pages/admin/AdminProductEditPage';
import { AdminCategoriesPage } from '../pages/admin/AdminCategoriesPage';
import { AdminBrandsPage } from '../pages/admin/AdminBrandsPage';
import { AdminInventoryPage } from '../pages/admin/AdminInventoryPage';
import { AdminBookingsPage } from '../pages/admin/AdminBookingsPage';
import { AdminAnalyticsPage } from '../pages/admin/AdminAnalyticsPage';
import { AdminHomepageBuilderPage } from '../pages/admin/AdminHomepageBuilderPage';
import { AdminTestimonialsPage } from '../pages/admin/AdminTestimonialsPage';
import { AdminSeoStorePage } from '../pages/admin/AdminSeoStorePage';
import { AdminSettingsPage } from '../pages/admin/AdminSettingsPage';

// Simple Policy Page Component
const PolicyPage = ({ title, content }) => (
  <div className="max-w-4xl mx-auto px-4 py-16 text-sm text-[#B7BBC5] space-y-4">
    <h1 className="font-orbitron font-bold text-2xl text-[#F5F5F7] uppercase">{title}</h1>
    <div className="bg-[#121826] border border-[#303746] rounded-xl p-6 space-y-3 font-inter leading-relaxed">
      <p>{content}</p>
      <p>Dream Computer, Hargovind Bhawan, SP Verma Road Corner, New Dak Bunglow Road, Patna, Bihar – 800001, India.</p>
    </div>
  </div>
);

// 404 Component
const NotFoundPage = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
    <div className="font-orbitron font-black text-6xl text-[#BEF8A1] mb-2">404</div>
    <h2 className="font-orbitron font-bold text-xl text-[#F5F5F7] mb-2">HARDWARE SECTOR NOT FOUND</h2>
    <p className="text-xs text-[#8B929E] max-w-sm mb-6">
      The requested computer hardware page does not exist or has been relocated in our Patna inventory.
    </p>
    <Link
      to="/"
      className="px-6 py-2.5 bg-[#BEF8A1] text-[#0A101E] font-rajdhani font-bold text-sm uppercase rounded shadow-glow-subtle"
    >
      Return to Showroom
    </Link>
  </div>
);

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Customer Storefront Routes */}
      <Route element={<StorefrontLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductListingPage />} />
        <Route path="/product/:slug" element={<ProductDetailPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/custom-pc-builder" element={<CustomPcBuilderPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />

        {/* Dedicated Local SEO Pages for Patna */}
        <Route path="/computer-shop-patna" element={<LocationLandingPage />} />
        <Route path="/laptop-shop-patna" element={<LocationLandingPage />} />
        <Route path="/gaming-pc-builder-patna" element={<LocationLandingPage />} />
        <Route path="/laptop-repair-patna" element={<LocationLandingPage />} />
        <Route path="/chip-level-repair-patna" element={<LocationLandingPage />} />
        <Route path="/computer-accessories-patna" element={<LocationLandingPage />} />
        <Route path="/custom-pc-building-services" element={<LocationLandingPage />} />

        {/* Legal Policies */}
        <Route
          path="/privacy-policy"
          element={
            <PolicyPage
              title="Privacy Policy"
              content="Dream Computer Patna respects customer confidentiality. Contact information provided during WhatsApp booking enquiries is used solely for order processing and official tax invoice generation."
            />
          }
        />
        <Route
          path="/terms-conditions"
          element={
            <PolicyPage
              title="Terms & Store Conditions"
              content="All products sold are covered by official manufacturer brand warranties. Pricing is subject to store availability and component verification at our SP Verma Road showroom."
            />
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Admin Login Route */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* Protected Admin Console Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="products" element={<AdminProductsPage />} />
        <Route path="products/new" element={<AdminProductEditPage />} />
        <Route path="products/edit/:id" element={<AdminProductEditPage />} />
        <Route path="categories" element={<AdminCategoriesPage />} />
        <Route path="brands" element={<AdminBrandsPage />} />
        <Route path="inventory" element={<AdminInventoryPage />} />
        <Route path="bookings" element={<AdminBookingsPage />} />
        <Route path="analytics" element={<AdminAnalyticsPage />} />
        <Route path="homepage-builder" element={<AdminHomepageBuilderPage />} />
        <Route path="testimonials" element={<AdminTestimonialsPage />} />
        <Route path="store-seo" element={<AdminSeoStorePage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
      </Route>
    </Routes>
  );
};
