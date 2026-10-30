# ZEN / STUDIO — Indian Contemporary Streetwear E-Commerce Platform

> A production-grade, high-performance streetwear e-commerce platform inspired by modern Indian D2C drop culture (e.g. *Bluorng*, *Jaywalking*), built with **Next.js 16 (App Router)**, **React 19**, and **Tailwind CSS v4**.

---

## 🌟 Live Features & Highlights

### 1. Storefront & Drop Culture Aesthetic
* **Editorial Hero & Capsules**: Minimalist architectural streetwear branding with high-contrast monochrome tones and cobalt accents.
* **Dual-Angle Hover Effect**: Interactive product cards that seamlessly switch from front model view to the reverse graphic angle upon hover.
* **Animated Drop Ticker**: Real-time announcement marquee highlighting active drops, free Pan-India delivery thresholds, and fabric GSM.
* **Curated Wardrobe Silhouettes**: Focused exclusively on heavyweight apparel (T-Shirts, Hoodies, Cargos, Jackets) and modular accessories.

### 2. High-Performance Discovery & Filters (`/products`)
* **Faceted Filtering**: Filter by category, silhouette fit (*Boxy Oversized*, *Relaxed Drop-Shoulder*, *Structured Utility*), and sizing (`S`–`XXL`).
* **Live Search**: Instant client-side search across garment names, descriptions, and categories.
* **Quick-Add Sizing Drawer**: Choose size and add to shopping bag directly from the browse catalog without leaving the page.

### 3. Product Detail Page (PDP) (`/products/[id]`)
* **Multi-Angle Gallery**: High-resolution image zoom and thumbnail reel.
* **Color Swatches & Size Selector**: Real-time inventory counter with low-stock warnings (*"Only 2 pieces left in L"*).
* **Interactive Size & Fit Guide**: Modal offering chest, length, and shoulder drop measurements with instant toggle between **Inches (in)** and **Centimeters (cm)**.
* **Garment Specifications**: Details on combed cotton GSM weights, reinforced double-needle collars, and care guides.
* **Verified Customer Reviews**: Community feedback from verified Indian buyers with city tags.
* **"Complete the Fit"**: Recommended coordinated garments and accessories.

### 4. Interactive Slide-Over Bag & Dedicated Cart (`/cart`)
* **Slide-Over Bag Drawer**: Persistent cart accessible from any page with smooth backdrop blur.
* **Free Express Shipping Progress Meter**: Dynamic calculation toward the ₹1,999 free delivery threshold.
* **Indian Voucher Engine**: Supports real-time coupon code redemption (`ZEN10` for 10% off, `STREET20` for 20% off).

### 5. Multi-Step Checkout & Simulated Payment (`/checkout`)
* **Indian Shipping Address**: 6-digit PIN code handler with auto-fill for major Indian hubs (Delhi, Mumbai, Bangalore, Chennai).
* **Simulated Payment Gateway**:
  * **UPI / Dynamic QR Code**: GPay, PhonePe, and BHIM QR simulator with timer.
  * **Credit / Debit Cards**: Live card number formatting and validation.
  * **Cash on Delivery (COD)**: Doorstep verification.
* **Celebratory Confetti**: Interactive particle fireworks on order completion.
* **Printable Invoice**: Instant formatted receipt generation.

### 6. Live Shipment Telemetry (`/orders`)
* Order tracking stepper simulating progress:
  * *Drop Order Confirmed ➔ Cut & Pressed in Tiruppur ➔ Dispatched via Bluedart Air ➔ Regional Hub ➔ Out for Doorstep Delivery*.

### 7. Full-Stack Admin Management Suite (`/admin`)
* **Financial Analytics**: Gross revenue metrics, total units dispatched, average order value.
* **Inventory Control**: Live stock management per size and silhouette.
* **Order Status Pipeline**: Switch active customer shipments from *Processing* to *Dispatched* and *Delivered*.

---

## 🛠️ Tech Stack & Architecture

* **Framework**: [Next.js 16](https://nextjs.org) (App Router, Partial Prerendering, Turbopack)
* **Library**: React 19.3.0
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com)
* **Package Manager**: [Bun](https://bun.sh)
* **Icons**: [Lucide React](https://lucide.dev)
* **Visual FX**: Canvas Confetti
* **State Management**: React Context + LocalStorage Persistence

---

## 🚀 Getting Started

### Prerequisites
* [Bun](https://bun.sh) (v1.4+) or Node.js (v20+)

### 1. Installation
```bash
bun install
```

### 2. Run Development Server
```bash
bun run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser.

### 3. Demo Credentials (RBAC)

| Account Type | Email | Password | Role | Permissions |
|---|---|---|---|---|
| **Admin (`byteAdmin`)** | `byteadmin@zenstudio.in` | `Password@123` | `admin` | Full `/admin` dashboard, inventory telemetry, order dispatch manager |
| **User (Customer)** | `patron@zenstudio.in` | `Password@123` | `user` | Shopping bag, checkout simulator, order tracking, `/admin` blocked with 403 |

### 4. Build for Production
```bash
bun run build
```

---

## 📄 License
MIT License. Built for contemporary Indian streetwear enthusiasts.
