# DREAM COMPUTER – Premium E-Commerce Website & Admin Management System

A production-ready, fully responsive e-commerce platform and administrative CMS built for **Dream Computer**, Patna’s premier computer hardware store, custom gaming PC builder, and chip-level repair lab located at SP Verma Road, Patna, Bihar, India.

---

## 📍 Store & Business Information

- **Business Name:** Dream Computer
- **Address:** Hargovind Bhawan, SP Verma Road Corner, New Dak Bunglow Road, Near SBI ATM, opposite Westside Mall lane, Patna, Bihar – 800001, India.
- **Phone / WhatsApp:** [+91 84484 74795](tel:+918448474795) / [WhatsApp Chat](https://wa.me/918448474795)
- **Business Hours:** Monday – Sunday: 9:00 AM – 9:00 PM

---

## 🚀 Key System Features

### 1. Customer-Facing Storefront
- **Cyber Gaming Aesthetics:** Deep navy/black background (`#0A101E`, `#121826`), glowing neon lime-green CTAs (`#BEF8A1`), and modern typography (Orbitron for headings, Rajdhani for navigation/buttons, Inter for body).
- **Interactive Homepage:**
  - Futuristic Hero section with primary CTAs and Patna store badges.
  - Featured hardware categories (Gaming Laptops, Custom PCs, GPUs, Processors, RAM/SSD, Monitors, Peripherals).
  - Best-selling products & signature custom PC collection showcases.
  - Interactive Custom PC Builder studio teaser.
  - Chip-Level repair lab overview.
  - Verified local customer testimonials with ratings.
  - Embedded Google Maps location with 1-click directions.
- **Hardware Catalog & Filters:**
  - Dynamic filtering by category, brand checkboxes, max price slider, and in-stock toggle.
  - Real-time search with hardware token matching (e.g., "RTX 4060 Laptop", "16GB DDR5", "Intel i7").
  - Quick Ctrl+K / Cmd+K global search modal with recent search caching and popular searches.
  - Product comparison drawer: compare up to 4 items side-by-side with full technical specification matrices.
  - Wishlist system with persistence.

### 2. Flexible Multi-Attribute Variation Engine
- Supports unlimited configurable attributes: **RAM, Storage, GPU, Processor, Color**.
- Dynamic SKU, price, MRP, discount %, and real-time stock updating upon variant selection.
- Automatic variant resolution and prevention of unconfigured SKU combinations.
- Real-time image updates and variant-specific WhatsApp message generation.

### 3. WhatsApp Booking & Cart System
- **Booking Cart Drawer:** Multi-item cart with quantity controls and real-time total calculation.
- **Booking Modal:** Captures Customer Name, Phone, optional Email, Pickup or Local Patna Delivery preference, and specific notes.
- **Persistence:** Automatically assigns unique reference ID (e.g., `DC-2026-1042`), saves to Firestore, logs analytics events, and launches prefilled, URL-encoded WhatsApp messages.
- **Celebration & Confirmation:** Integrated confetti celebration and next-step instructions.

### 4. Complete Admin Dashboard / CMS (`/admin`)
- **Protected Access:** Email/Password authentication with session persistence.
  - *Default Demo Admin:* `admin@dreamcomputer.com` / `admin12345`
- **Overview Dashboard:** Live KPI cards (Bookings, Pipeline Value, Visitors, Inquiries), conversion funnel bar chart, traffic sources, and device distribution.
- **Product Management:** Full CRUD with 7-tab studio (Basic info, Pricing, Images, Inventory, Variations, Specs key-value pairs, SEO).
- **Inventory & Stock Control:** Stock counts, low-stock threshold alerts (< 5 units), adjustment modals with mandatory audit reasons, and immutable stock movement logs (`inventoryLogs`).
- **Bookings Management:** Live order tracking with status lifecycle (`New`, `Contacted`, `Confirmed`, `Processing`, `Ready for Pickup`, `Completed`, `Cancelled`), internal notes, CSV export, and 1-click direct WhatsApp/Call buttons.
- **Homepage CMS:** Manage Hero banner slides, promotional tags, and CTAs.
- **Testimonial Queue:** Approve, hide, or create customer reviews.
- **Store & SEO Manager:** Modify store address, phone numbers, opening hours, and Google Maps coordinates.
- **Settings & Seeder:** 1-click catalog re-seeder for quick demonstration and testing.

### 5. Local SEO & Structured Data (Patna, Bihar)
- Dedicated high-intent landing pages for:
  - `/computer-shop-patna`
  - `/laptop-shop-patna`
  - `/gaming-pc-builder-patna`
  - `/laptop-repair-patna`
  - `/chip-level-repair-patna`
  - `/computer-accessories-patna`
  - `/custom-pc-building-services`
- Full Schema.org JSON-LD structured data:
  - `LocalBusiness` / `ComputerStore` schema
  - `Product` & `Offer` schema
  - `BreadcrumbList` schema

---

## 🛠️ Technology Stack

- **Frontend:** React 18, Vite, Tailwind CSS, React Router DOM v6, Lucide React
- **Animation & UI:** Framer Motion, Canvas Confetti, React Hot Toast
- **Analytics & Charts:** Recharts, Firebase Analytics
- **Backend & Cloud:** Google Cloud Firestore, Firebase Auth, Firebase Storage, Firebase Hosting

---

## 💻 Local Development Setup

1. **Clone and Install Dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment Variables:**
   Copy `.env.example` to `.env`:
   ```env
   VITE_APP_NAME="Dream Computer"
   VITE_WHATSAPP_NUMBER="918448474795"
   VITE_PHONE_NUMBER="+91 84484 74795"
   VITE_STORE_ADDRESS="Hargovind Bhawan, SP Verma Road Corner, New Dak Bunglow Road, Near SBI ATM, opposite Westside Mall lane, Patna, Bihar – 800001, India"

   # Optional Firebase Cloud Keys (Leave empty to use built-in local persistence engine)
   VITE_FIREBASE_API_KEY=""
   VITE_FIREBASE_AUTH_DOMAIN=""
   VITE_FIREBASE_PROJECT_ID=""
   VITE_FIREBASE_STORAGE_BUCKET=""
   VITE_FIREBASE_MESSAGING_SENDER_ID=""
   VITE_FIREBASE_APP_ID=""
   ```

3. **Start Development Server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. **Production Build:**
   ```bash
   npm run build
   ```

---

## ☁️ Firebase Hosting Deployment

1. **Login to Firebase CLI:**
   ```bash
   firebase login
   ```

2. **Deploy Hosting, Firestore Rules & Indexes:**
   ```bash
   firebase deploy
   ```
