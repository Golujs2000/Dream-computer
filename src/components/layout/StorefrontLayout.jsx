import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../common/Navbar';
import { Footer } from '../common/Footer';
import { WhatsAppFloat } from '../common/WhatsAppFloat';
import { GlobalSearchModal } from '../common/GlobalSearchModal';
import { CompareDrawer } from '../common/CompareDrawer';
import { BookingCartDrawer } from '../cart/BookingCartDrawer';

export const StorefrontLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0A101E] text-[#F5F5F7] selection:bg-[#BEF8A1] selection:text-[#0A101E]">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
      <GlobalSearchModal />
      <CompareDrawer />
      <BookingCartDrawer />
    </div>
  );
};
