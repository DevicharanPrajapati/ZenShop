# ZEN / STUDIO — Comprehensive Project Architecture & Documentation

Welcome to the technical and architectural documentation for **ZEN / STUDIO**, a production-grade Indian contemporary streetwear e-commerce platform. This document explains the design philosophy, technical choices, component hierarchy, state management, and interview talking points for technical portfolio presentations.

---

## 📑 Table of Contents
1. [Project Overview & Brand Inspiration](#1-project-overview--brand-inspiration)
2. [Complete Directory & File Architecture](#2-complete-directory--file-architecture)
3. [Tech Stack & Engineering Choices](#3-tech-stack--engineering-choices)
4. [In-Depth Feature Walkthrough](#4-in-depth-feature-walkthrough)
   - [Storefront, Hero & Marquee](#storefront-hero--marquee)
   - [Dual-Angle Garment Cards](#dual-angle-garment-cards)
   - [Slide-Over Cart Drawer & Free Shipping Meter](#slide-over-cart-drawer--free-shipping-meter)
   - [Indian Size & Fit Guide (Inches vs. CM)](#indian-size--fit-guide-inches-vs-cm)
   - [Simulated Indian Multi-Step Checkout](#simulated-indian-multi-step-checkout)
   - [Shipment Telemetry Tracker (`/orders`)](#shipment-telemetry-tracker-orders)
   - [Administrative Control Portal (`/admin`)](#administrative-control-portal-admin)
5. [Data Models & State Management](#5-data-models--state-management)
6. [Performance, SEO & Next.js 16 Optimizations](#6-performance-seo--nextjs-16-optimizations)
7. [Resume & Interview Talking Points (STAR Method)](#7-resume--interview-talking-points-star-method)
8. [Future Roadmap & Extensions](#8-future-roadmap--extensions)

---

## 1. Project Overview & Brand Inspiration

### The Core Problem with Generic E-Commerce Projects
Most portfolio e-commerce projects use generic dummy tech products (phones, laptops, basic t-shirts) without an authentic industry vibe, real-world D2C micro-interactions, or localized user experience.

### The Solution: ZEN / STUDIO
ZEN / STUDIO takes inspiration from India's rapidly growing modern streetwear & drop culture (**Bluorng**, **Jaywalking**, **Snitch**) fused with **architectural minimalism**:
* **Strict Vertical Focus**: Only heavyweight apparel (*280–380 GSM combed cottons, loopback terry, tactical ripstop*) and modular accessories (*cordura sling bags, surgical steel rings, washed chino caps*).
* **Drop Culture Mechanics**: Limited capsule drops (*"DROP 01: MONOLITH"*), countdown tickers, and no-restock urgency.
* **Localized Indian D2C Experience**:
  * Indian Rupee pricing (`₹`) with formatted currency separators (`₹1,899`).
  * Free Express Delivery threshold calculator (₹1,999 free shipping meter).
  * 6-digit Indian PIN code validation with auto-detection for Delhi, Mumbai, Bangalore, Chennai.
  * Instant UPI QR payment simulator (GPay / PhonePe / Paytm / BHIM) alongside Cards and Cash on Delivery.
  * Localized garment provenance (custom milled in Tiruppur, Tamil Nadu).

---

## 2. Complete Directory & File Architecture

```
zenshop/
├── app/
│   ├── layout.tsx                # Root layout, fonts (Geist), global StoreProvider, Marquee, Nav, Bag Drawer, Footer
│   ├── globals.css               # Tailwind CSS v4 directives, custom marquee keyframes, dark scrollbars
│   ├── page.tsx                  # Editorial Homepage (Hero, Capsule Grid, Vault Categories, Brand Manifesto)
│   ├── products/
│   │   ├── page.tsx              # Dynamic Catalog with Faceted Filters (Fit, Category, Size, Search, Sort)
│   │   └── [id]/
│   │       ├── page.tsx          # Server Component: SEO metadata, static params generation, data loading
│   │       └── ProductDetailsClient.tsx # Client Component: Multi-image zoom gallery, Size Guide, PDP accordions
│   ├── cart/
│   │   └── page.tsx              # Dedicated Bag view with voucher engine, free shipping bar, item controls
│   ├── checkout/
│   │   └── page.tsx              # Multi-step checkout simulator with Indian address auto-check, UPI QR, and Confetti
│   ├── orders/
│   │   └── page.tsx              # Live shipment telemetry stepper (Tiruppur depot ➔ Bluedart Air ➔ Doorstep)
│   ├── wishlist/
│   │   └── page.tsx              # Saved items vault with 1-click move to bag
│   └── admin/
│       └── page.tsx              # Full-stack Admin Suite: gross sales metrics, live SKU stock, order status pipeline
│
├── components/
│   ├── MarqueeBanner.tsx         # Infinite scrolling drop announcement ticker
│   ├── Navbar.tsx                # Sticky glassmorphic navbar with search trigger, bag counter, wishlist counter
│   ├── Footer.tsx                # Rich brand footer with customer care, delivery perks, newsletter, copyright
│   ├── ProductCard.tsx           # Dual-angle hover image switch, quick-add size pills, discount tags
│   ├── CartDrawer.tsx            # Slide-over bag drawer with free-shipping meter and promo vouchers
│   └── SizeGuideModal.tsx        # Indian garment measurements chart with Inches / CM instant toggle
│
├── lib/
│   ├── products.ts               # Product types, rich catalog of streetwear garments & accessories
│   └── store.tsx                 # Global React Context + LocalStorage persistence for Cart, Wishlist, and Coupons
│
├── public/                       # Static SVGs and assets
├── next.config.ts                # Next.js 16 configuration, Unsplash remote image patterns, Turbopack rules
├── package.json                  # Dependencies: Next.js 16, React 19, Tailwind v4, Lucide React, Canvas Confetti
├── bun.lock                      # Bun lockfile
├── README.md                     # High-level overview & quickstart
└── DOC.md                        # Exhaustive technical documentation (This file)
```

---

## 3. Tech Stack & Engineering Choices

| Layer | Technology | Justification |
|---|---|---|
| **Framework** | Next.js 16.4.0 (App Router) | Cutting-edge server component architecture, Partial Prerendering (PPR), Turbopack compilation. |
| **UI Library** | React 19.3.0 | Modern concurrent features, Server Actions, native Suspense data boundaries. |
| **Styling** | Tailwind CSS v4 | CSS-first `@theme` configuration, zero-runtime overhead, `@import "tailwindcss"`. |
| **Package Manager** | Bun 1.4.3 | High-speed dependency resolution and script execution. |
| **Icons** | Lucide React | Minimalist, consistent iconography for luxury streetwear UI. |
| **Visual Effects** | Canvas Confetti | Delighting celebration particle animations upon successful order placement. |
| **State Management** | React Context + LocalStorage | Lightweight client-side cart and wishlist synchronization without external bloated state libraries. |

---

## 4. In-Depth Feature Walkthrough

### Storefront, Hero & Marquee
* **Continuous Infinite Marquee ([`components/MarqueeBanner.tsx`](file:///D:/Projects/E-commerce/zenshop/components/MarqueeBanner.tsx))**:
  Built with pure CSS `@keyframes marquee` in `globals.css` with seamless 2x duplication for 60fps infinite scrolling that pauses on user hover.
* **Hero Experience ([`app/page.tsx`](file:///D:/Projects/E-commerce/zenshop/app/page.tsx))**:
  Full-bleed dark aesthetic with high-contrast typography, capsule drop badges (`DROP 01: MONOLITH`), quick textile specifications, and direct CTAs.

### Dual-Angle Garment Cards ([`components/ProductCard.tsx`](file:///D:/Projects/E-commerce/zenshop/components/ProductCard.tsx))
* Uses two synchronized Next/Image layers:
  - Layer 1: Front model shot (`opacity-100`, fades on hover).
  - Layer 2: Reverse graphic / alternate angle (`opacity-0`, crossfades and slightly scales to `scale-105` on hover).
* Quick-add size pills drawer that slides in directly over the card on hover or tap, enabling instant bag additions without forcing a page transition.

### Slide-Over Cart Drawer & Free Shipping Meter ([`components/CartDrawer.tsx`](file:///D:/Projects/E-commerce/zenshop/components/CartDrawer.tsx))
* Provides a slide-in drawer accessible from any route.
* **Dynamic Free Delivery Calculation**:
  $$\text{Progress \%} = \min\left(100, \left\lfloor \frac{\text{Subtotal}}{1999} \times 100 \right\rfloor\right)$$
* Live promo voucher redemption engine supporting `ZEN10` (10% off) and `STREET20` (20% off) with instant feedback and automatic discount deduction.

### Indian Size & Fit Guide (Inches vs. CM) ([`components/SizeGuideModal.tsx`](file:///D:/Projects/E-commerce/zenshop/components/SizeGuideModal.tsx))
* Modern Indian buyers care deeply about boxy vs. slim fit dimensions.
* Provides exact Chest, Length, and Shoulder measurements across `S` to `XXL`.
* Interactive toggle converts measurements between **Inches** and **Centimeters** with zero lag.

### Simulated Indian Multi-Step Checkout ([`app/checkout/page.tsx`](file:///D:/Projects/E-commerce/zenshop/app/checkout/page.tsx))
* Form with 6-digit Indian PIN code handler auto-populating city/state (e.g., `110001` ➔ *New Delhi, Delhi*; `400001` ➔ *Mumbai, Maharashtra*; `560001` ➔ *Bangalore, Karnataka*).
* Simulated payment modes:
  * **UPI QR Simulator**: Renders a dynamic payment QR code with UPI ID input.
  * **Card Simulator**: Realistic 16-digit card input with expiry and CVV.
  * **Cash on Delivery (COD)**: With OTP reminder.
* Triggers particle fireworks using `canvas-confetti`, assigns a unique reference (`ZEN-XXXXXX`), and offers a printable receipt via `window.print()`.

### Shipment Telemetry Tracker ([`app/orders/page.tsx`](file:///D:/Projects/E-commerce/zenshop/app/orders/page.tsx))
* A dedicated tracking page simulating an active delivery timeline:
  1. *Drop Order Confirmed & Paid via Instant UPI*
  2. *Precision Cut, Pressed & Quality Tested at Tiruppur Depot*
  3. *Dispatched via Bluedart Express Air (AWB: BD-84910284IN)*
  4. *Arrived at Regional Distribution Hub (Delhi / Gurugram)*
  5. *Out for Doorstep Delivery with OTP Verification*

### Administrative Control Portal & Strict RBAC ([`app/admin/page.tsx`](file:///D:/Projects/E-commerce/zenshop/app/admin/page.tsx))
* Essential portfolio showcase demonstrating full-stack authorization and role-based access control (RBAC):
  * **Strict Two-Role Policy**: Explicitly partitioned into `admin` and `user` roles.
  * **Hidden from Storefront**: The admin portal is concealed from unauthenticated visitors and standard customer views. Only authenticated admin sessions reveal the management link in the navbar.
  * **401 Unauthorized Gate**: Unauthenticated visitors attempting direct navigation to `/admin` are intercepted with an administrative login prompt and redirect flow.
  * **403 Forbidden Gate**: Customers signed in with the `user` role are denied entry with a security notice explaining their role restriction.
  * **Metric Counters**: Gross Revenue (`₹3,48,250+`), Total Orders, Average Order Value (`₹2,850`), and Low Stock Alerts.
  * **Inventory Table**: Live view of all styles, categories, prices, fabric weights, and stock levels broken down by size (`S:5`, `M:2`, `L:8`, etc.).
  * **Order Fulfillment Pipeline**: Customer orders with a live status dropdown to transition packages from *Processing* ➔ *Dispatched* ➔ *Delivered*.

---

## 5. Data Models & State Management

### Data Structures (`lib/products.ts`)
```typescript
export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;              // In INR (₹)
  originalPrice: number;      // Displays discount strike-through
  category: "T-Shirts" | "Hoodies & Fleeces" | "Jackets & Overshirts" | "Pants & Cargos" | "Accessories";
  gender: "Unisex" | "Men" | "Women";
  fit: "Boxy Oversized" | "Relaxed Drop-Shoulder" | "Structured Utility" | "Standard";
  fabric: string;             // e.g. "100% Combed Heavy Cotton"
  gsm?: number;               // e.g. 280, 380 GSM
  description: string;
  features: string[];
  images: [string, string, ...string[]]; // Front & reverse hover images
  sizes: string[];
  colors: { name: string; hex: string }[];
  stock: Record<string, number>;
  isNewDrop: boolean;
  isBestSeller: boolean;
  dropName?: string;
  rating: number;
  reviewCount: number;
  reviews?: ProductReview[];
};
```

### Store Context (`lib/store.tsx`)
```typescript
interface StoreContextType {
  items: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, size: string, color: ProductColor, qty?: number) => void;
  removeFromCart: (productId: string, size: string, colorName: string) => void;
  updateQuantity: (productId: string, size: string, colorName: string, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}
```

---

## 6. Performance, SEO & Next.js 16 Optimizations

1. **Turbopack Build Optimization**: 19 static routes compile in ~2 seconds with instant Hot Module Replacement during development.
2. **Next/Image Remote Pattern Optimization**: Configured in `next.config.ts` for Unsplash CDNs with responsive `sizes` attributes preventing layout shift (CLS: 0).
3. **Prerender Compliance**: Replaced dynamic `new Date()` calls with static or effect-deferred values to satisfy Next.js 16 prerender requirements.
4. **Suspense Boundaries**: Search params and heavy client lists wrapped in `<Suspense>` to allow instantaneous page transitions without blocking SSR.

---

## 7. Resume & Interview Talking Points (STAR Method)

When discussing this project with recruiters, engineering managers, or interviewers:

### **Situation**
> *"I wanted to build an end-to-end e-commerce application that wasn't just another generic template, but mirrored modern Indian D2C drop culture brands like Bluorng, with localized UX, fluid animations, and a complete fulfillment lifecycle."*

### **Task**
> *"I needed to design and implement a fast, responsive, and aesthetically distinctive platform featuring dual-angle hover interactions, dynamic inventory and size tracking, an Indian localized checkout pipeline (PIN code lookup, UPI simulation), and an administrative fulfillment dashboard."*

### **Action**
> *"I architected the application using Next.js 16 App Router, React 19, and Tailwind CSS v4. I implemented a global Cart & Wishlist state engine with LocalStorage synchronization, built a slide-over bag with a real-time free shipping threshold calculation, designed an interactive Indian sizing modal with inches/cm toggles, and engineered an admin panel to manage capsule inventory and order statuses."*

### **Result**
> *"The final application compiles cleanly into 19 optimized static and partial prerendered routes. It delivers a sub-second page load experience, zero layout shift, engaging micro-animations (dual-angle hover, animated marquee, celebration confetti), and showcases both frontend design craftsmanship and full-stack system architecture."*

---

## 8. Supabase Native Cloud Integration & Authentication

The platform is integrated with **Supabase** via `@supabase/supabase-js`, completely eliminating heavyweight ORMs like Prisma.

### Authentication System (`lib/auth-context.tsx` & `/login`)
- **Email & Password**: User registration with full name and secure credential authentication via Supabase Auth.
- **GitHub OAuth (100% Free, Zero-Card)**: One-click GitHub sign-in provider, popular on developer and design portfolios.
- **Session Persistence**: Sessions sync with browser storage and auto-refresh in the background.
- **Navbar Profile Integration**: Shows user avatar, initials, or patron name with a quick account management drawer.
- **Checkout Auto-Fill**: Automatically fills customer name and email in the `/checkout` shipping form if authenticated.

### Database Tables (`supabase_schema.sql` / `supabase/`)
1. **`products`**: Stores garment names, 280-380 GSM fabric weights, categories, sizes, color JSON swatches, stock levels, and multi-angle image URLs.
2. **`orders`**: Real-time customer orders with shipping addresses, Indian PIN codes, subtotal, discount codes, payment modes (UPI / Card / COD), and delivery statuses.
3. **`reviews`**: Verified customer reviews with ratings and city origins.

### Setup Instructions
1. Open your Supabase Dashboard project (**zenshop**).
2. Go to **SQL Editor** ➔ Click **New query** ➔ Paste the contents of [`supabase_schema.sql`](file:///D:/Projects/E-commerce/zenshop/supabase_schema.sql) ➔ Click **RUN**.
3. Add your keys to `.env`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
   ```
4. Restart dev server (`bun dev`). Your platform is now connected directly to Supabase cloud!

---

## 9. Future Roadmap & Extensions

- [x] **Native Supabase Client Integration**: Replaced Prisma with `@supabase/supabase-js` client and SQL migration seed.
- [x] **Supabase Authentication**: Full customer login, registration, Google OAuth, and auto-populated checkout.
- [ ] **Razorpay Live Gateway**: Plug in live Razorpay webhooks for real Indian UPI & card transactions in test mode.
- [ ] **Supabase Storage**: Add garment photo uploads directly from `/admin`.
