"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import confetti from "canvas-confetti";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  QrCode,
  Banknote,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Printer,
  Sparkles,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { createOrder } from "@/lib/supabase";

type PaymentMethod = "upi" | "card" | "cod";

export default function CheckoutPage() {
  const { items, subtotal, discount, shippingFee, total, appliedCoupon, clearCart } = useStore();

  // Form states
  const [formData, setFormData] = useState({
    fullName: "Aryan Khanna",
    email: "aryan.khanna@example.com",
    phone: "9876543210",
    pincode: "110001",
    city: "New Delhi",
    state: "Delhi",
    address: "Flat 402, Block B, Connaught Place",
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");
  const [upiId, setUpiId] = useState("aryan@okaxis");
  const [cardData, setCardData] = useState({
    number: "4532 •••• •••• 8821",
    name: "ARYAN KHANNA",
    expiry: "09/28",
    cvv: "•••",
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState<{
    orderId: string;
    date: string;
    totalPaid: number;
  } | null>(null);

  // Trigger celebration confetti
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });
      }, 250);
    } catch {
      // Ignore if confetti fails
    }
  };

  const handlePincodeChange = (pin: string) => {
    setFormData((prev) => ({ ...prev, pincode: pin }));
    // Quick auto-fill for sample Indian pincodes
    if (pin.startsWith("11")) {
      setFormData((prev) => ({ ...prev, city: "New Delhi", state: "Delhi" }));
    } else if (pin.startsWith("40")) {
      setFormData((prev) => ({ ...prev, city: "Mumbai", state: "Maharashtra" }));
    } else if (pin.startsWith("56")) {
      setFormData((prev) => ({ ...prev, city: "Bangalore", state: "Karnataka" }));
    } else if (pin.startsWith("60")) {
      setFormData((prev) => ({ ...prev, city: "Chennai", state: "Tamil Nadu" }));
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const generatedOrderId = `ZEN-${Math.floor(100000 + Math.random() * 900000)}`;

    // Save order into Supabase
    await createOrder({
      id: generatedOrderId,
      customerName: formData.fullName,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      pincode: formData.pincode,
      city: formData.city,
      state: formData.state,
      address: formData.address,
      items: items.map((i) => ({
        id: i.product.id,
        name: i.product.name,
        size: i.selectedSize,
        color: i.selectedColor.name,
        price: i.product.price,
        quantity: i.quantity,
      })),
      subtotal,
      discount,
      shippingFee,
      total,
      paymentMethod: paymentMethod.toUpperCase(),
    });

    const completedInfo = {
      orderId: generatedOrderId,
      date: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      totalPaid: total,
    };

    setOrderComplete(completedInfo);
    setIsProcessing(false);
    triggerConfetti();
    clearCart();
  };

  // If order complete screen
  if (orderComplete) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:py-24 text-center">
        <div className="rounded-3xl border border-neutral-800 bg-neutral-950 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="w-20 h-20 rounded-full bg-blue-950/80 border border-blue-500/50 flex items-center justify-center mx-auto text-blue-400 mb-6 animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold">
            DROP ORDER CONFIRMED
          </span>

          <h1 className="text-3xl sm:text-4xl font-mono font-black text-white uppercase mt-2">
            THANK YOU FOR YOUR ORDER
          </h1>

          <p className="text-sm text-neutral-400 font-sans mt-3 max-w-md mx-auto leading-relaxed">
            Your limited capsule pieces have been reserved and routed to our Tiruppur fulfillment depot.
          </p>

          {/* Order Details Card */}
          <div className="mt-8 rounded-2xl border border-neutral-850 bg-neutral-900/60 p-6 text-left max-w-lg mx-auto space-y-3 font-mono text-xs">
            <div className="flex justify-between border-b border-neutral-800 pb-2">
              <span className="text-neutral-500">ORDER REFERENCE</span>
              <span className="font-bold text-white tracking-wider">{orderComplete.orderId}</span>
            </div>
            <div className="flex justify-between border-b border-neutral-800 pb-2">
              <span className="text-neutral-500">DATE</span>
              <span className="text-neutral-300">{orderComplete.date}</span>
            </div>
            <div className="flex justify-between border-b border-neutral-800 pb-2">
              <span className="text-neutral-500">PAYMENT STATUS</span>
              <span className="text-emerald-400 font-bold">PAID VIA {paymentMethod.toUpperCase()}</span>
            </div>
            <div className="flex justify-between border-b border-neutral-800 pb-2">
              <span className="text-neutral-500">DELIVERY TO</span>
              <span className="text-neutral-300 truncate max-w-[200px]">
                {formData.city}, {formData.pincode}
              </span>
            </div>
            <div className="flex justify-between pt-1 text-sm font-bold">
              <span className="text-white">TOTAL AMOUNT</span>
              <span className="text-blue-400">₹{orderComplete.totalPaid.toLocaleString("en-IN")}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/orders"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs uppercase font-bold px-6 py-3.5 rounded-xl transition shadow-lg shadow-blue-900/30"
            >
              <span>Track Live Shipment</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-200 font-mono text-xs uppercase font-bold px-6 py-3.5 rounded-xl transition"
            >
              <Printer className="w-4 h-4" />
              <span>Print Receipt</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If cart is empty and no completed order
  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-mono font-bold text-white uppercase">Your Bag is Empty</h2>
        <p className="text-xs text-neutral-400">Add garments to your shopping bag before proceeding to checkout.</p>
        <Link
          href="/products"
          className="inline-block bg-blue-600 text-white font-mono text-xs uppercase font-bold px-6 py-3 rounded-xl"
        >
          Discover Drops
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/cart"
          className="inline-flex items-center space-x-1.5 text-xs font-mono text-neutral-400 hover:text-white transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Bag</span>
        </Link>
      </div>

      <div className="mb-8">
        <span className="text-xs font-mono uppercase tracking-widest text-blue-500">
          SECURE ENCRYPTED CHECKOUT
        </span>
        <h1 className="text-2xl sm:text-3xl font-mono font-black uppercase text-white mt-1">
          SHIPPING &amp; PAYMENT SIMULATOR
        </h1>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form Column */}
        <div className="lg:col-span-7 space-y-8">
          {/* Section 1: Customer Contact & Indian Shipping Address */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8 space-y-6">
            <div className="flex items-center space-x-3 border-b border-neutral-900 pb-4">
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-mono text-xs font-bold flex items-center justify-center">
                1
              </div>
              <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
                Delivery Address (India)
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-neutral-400">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-400">Email Address (For Invoices)</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-400">Mobile Phone (+91)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">+91</span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 pl-12 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-400">6-Digit PIN Code</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={formData.pincode}
                  onChange={(e) => handlePincodeChange(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                  placeholder="110001"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-neutral-400">City</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-neutral-400">State</label>
                <input
                  type="text"
                  required
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-neutral-400">Street / Flat / Colony Address</label>
                <textarea
                  rows={2}
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 font-sans"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Payment Simulator */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8 space-y-6">
            <div className="flex items-center space-x-3 border-b border-neutral-900 pb-4">
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-mono text-xs font-bold flex items-center justify-center">
                2
              </div>
              <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
                Payment Method (Simulated)
              </h2>
            </div>

            {/* Payment Method Selector Tabs */}
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod("upi")}
                className={`p-3.5 rounded-xl border flex flex-col items-center space-y-2 transition ${
                  paymentMethod === "upi"
                    ? "bg-blue-950/40 border-blue-500 text-white"
                    : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white"
                }`}
              >
                <QrCode className="w-5 h-5 text-blue-400" />
                <span className="text-xs font-mono font-bold">UPI / QR</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`p-3.5 rounded-xl border flex flex-col items-center space-y-2 transition ${
                  paymentMethod === "card"
                    ? "bg-blue-950/40 border-blue-500 text-white"
                    : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white"
                }`}
              >
                <CreditCard className="w-5 h-5 text-blue-400" />
                <span className="text-xs font-mono font-bold">Cards</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("cod")}
                className={`p-3.5 rounded-xl border flex flex-col items-center space-y-2 transition ${
                  paymentMethod === "cod"
                    ? "bg-blue-950/40 border-blue-500 text-white"
                    : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white"
                }`}
              >
                <Banknote className="w-5 h-5 text-blue-400" />
                <span className="text-xs font-mono font-bold">Cash on Delivery</span>
              </button>
            </div>

            {/* Active Payment Method UI */}
            {paymentMethod === "upi" && (
              <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-mono font-bold text-white uppercase">
                      Instant UPI Payment
                    </h3>
                    <p className="text-[11px] text-neutral-400">
                      GPay, PhonePe, Paytm, or BHIM UPI
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded">
                    0% Convenience Fee
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 bg-neutral-950 p-4 rounded-xl border border-neutral-800">
                  <div className="w-28 h-28 bg-white p-2 rounded-lg flex items-center justify-center shrink-0">
                    {/* Simulated SVG QR code */}
                    <div className="w-full h-full border-4 border-black border-dashed flex items-center justify-center text-[10px] font-mono text-black font-bold text-center">
                      ZEN-UPI QR
                    </div>
                  </div>
                  <div className="space-y-2 text-xs font-mono w-full">
                    <label className="text-neutral-400">Or enter your UPI VPA</label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="username@okhdfcbank"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-blue-500"
                    />
                    <p className="text-[10px] text-neutral-500">
                      A payment request will be triggered to your UPI app.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "card" && (
              <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-5 space-y-4 text-xs font-mono">
                <div className="space-y-1">
                  <label className="text-neutral-400">Card Number</label>
                  <input
                    type="text"
                    value={cardData.number}
                    onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-neutral-400">Expiry (MM/YY)</label>
                    <input
                      type="text"
                      value={cardData.expiry}
                      onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-neutral-400">CVV</label>
                    <input
                      type="password"
                      maxLength={3}
                      value={cardData.cvv}
                      onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "cod" && (
              <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-5 space-y-2 text-xs font-mono">
                <div className="flex items-center space-x-2 text-white font-bold">
                  <Banknote className="w-4 h-4 text-emerald-400" />
                  <span>Cash on Delivery Active</span>
                </div>
                <p className="text-neutral-400 text-[11px] leading-relaxed">
                  Pay cash or scan QR with delivery agent at the time of doorstep delivery. Verified with OTP sent to {formData.phone}.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Order Review Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 space-y-5">
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-white border-b border-neutral-900 pb-3">
              BAG ITEMS ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </h2>

            {/* Micro items list */}
            <div className="max-h-64 overflow-y-auto divide-y divide-neutral-900 space-y-3 pr-1">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}`}
                  className="pt-3 first:pt-0 flex items-center space-x-3"
                >
                  <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-neutral-900 shrink-0 border border-neutral-800">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-white truncate">{item.product.name}</p>
                    <p className="text-[10px] font-mono text-neutral-400">
                      Size: {item.selectedSize} • Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right text-xs font-mono font-bold text-white">
                    ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                  </div>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 border-t border-neutral-900 pt-4 text-xs font-mono">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-400">
                  <span>Coupon Discount</span>
                  <span>-₹{discount.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-400">
                <span>Shipping</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-blue-400 font-semibold">FREE</span>
                  ) : (
                    `₹${shippingFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-neutral-900">
                <span>Total Due</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-500 disabled:bg-neutral-800 text-white font-mono text-xs uppercase font-bold py-4 rounded-xl transition shadow-lg shadow-blue-900/40 group cursor-pointer"
            >
              {isProcessing ? (
                <span>Generating Order...</span>
              ) : (
                <>
                  <span>Confirm &amp; Place Order (₹{total.toLocaleString("en-IN")})</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <div className="pt-2 flex items-center justify-center space-x-3 text-[11px] font-mono text-neutral-500 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
              <span>Simulated Payment • Safe &amp; Risk-Free</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
