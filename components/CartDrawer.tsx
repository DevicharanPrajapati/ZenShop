"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ArrowRight, Truck, Tag, ShieldCheck, Sparkles } from "lucide-react";
import { useStore, FREE_SHIPPING_THRESHOLD } from "@/lib/store";

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    shippingFee,
    discount,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useStore();

  const [couponInput, setCouponInput] = useState("");
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(
    null
  );

  if (!isCartOpen) return null;

  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const handleApplyCoupon = (codeToApply?: string) => {
    const code = codeToApply || couponInput;
    if (!code) return;
    const res = applyCoupon(code);
    setCouponFeedback(res);
    if (res.success) {
      setCouponInput("");
    }
    setTimeout(() => setCouponFeedback(null), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity animate-fadeIn"
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <aside className="w-screen max-w-md bg-neutral-950 border-l border-neutral-800 flex flex-col shadow-2xl text-white">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-800">
            <div className="flex items-baseline space-x-2">
              <h2 className="text-sm font-mono tracking-widest uppercase font-bold">
                SHOPPING BAG
              </h2>
              <span className="text-xs font-mono text-neutral-400">
                ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-900 transition"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-neutral-900/90 px-6 py-3.5 border-b border-neutral-800">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="flex items-center space-x-1.5 text-neutral-300">
                <Truck className="w-4 h-4 text-blue-400" />
                {amountNeededForFreeShipping === 0 ? (
                  <span className="text-blue-400 font-semibold flex items-center space-x-1">
                    <span>FREE EXPRESS SHIPPING UNLOCKED!</span>
                    <Sparkles className="w-3.5 h-3.5 inline text-yellow-400" />
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-white">₹{amountNeededForFreeShipping}</strong> for{" "}
                    <strong className="text-blue-400">FREE DELIVERY</strong>
                  </span>
                )}
              </span>
              <span className="text-[10px] text-neutral-400 font-mono">
                {freeShippingProgress}%
              </span>
            </div>
            <div className="mt-2 h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-600">
                  <Truck className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <p className="text-base font-semibold">Your bag is empty</p>
                  <p className="text-xs text-neutral-400 max-w-xs font-sans">
                    Drop 01 pieces sell out fast. Discover our heavyweight tees, hoodies, and tactical bottoms.
                  </p>
                </div>
                <button
                  onClick={closeCart}
                  className="mt-4 bg-white text-black hover:bg-neutral-200 text-xs font-mono uppercase font-bold px-6 py-3 rounded-lg transition"
                >
                  Explore Drops
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}`}
                  className="flex space-x-4 border-b border-neutral-900 pb-4"
                >
                  <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-neutral-900 border border-neutral-800 shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-xs font-medium text-neutral-200 line-clamp-1 pr-2">
                          {item.product.name}
                        </h3>
                        <button
                          onClick={() =>
                            removeFromCart(
                              item.product.id,
                              item.selectedSize,
                              item.selectedColor.name
                            )
                          }
                          className="text-neutral-500 hover:text-red-400 transition"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="mt-1 flex items-center space-x-2 text-[11px] font-mono text-neutral-400">
                        <span className="bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 rounded text-white">
                          {item.selectedSize}
                        </span>
                        <span className="flex items-center space-x-1">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-neutral-700"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          <span>{item.selectedColor.name}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center border border-neutral-800 bg-neutral-900 rounded-md">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedSize,
                              item.selectedColor.name,
                              item.quantity - 1
                            )
                          }
                          className="p-1 hover:text-white text-neutral-400 transition"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.selectedSize,
                              item.selectedColor.name,
                              item.quantity + 1
                            )
                          }
                          className="p-1 hover:text-white text-neutral-400 transition"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-xs font-mono font-bold text-white">
                          ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="border-t border-neutral-800 bg-neutral-950 p-6 space-y-4">
              {/* Promo Code Input */}
              <div>
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500" />
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Discount code (e.g. ZEN10)"
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-8 pr-3 py-2 text-xs font-mono uppercase text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <button
                    onClick={() => handleApplyCoupon()}
                    className="bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-mono px-3 py-2 rounded-lg transition"
                  >
                    Apply
                  </button>
                </div>

                {/* Feedback or presets */}
                {couponFeedback && (
                  <p
                    className={`text-[11px] font-mono mt-1.5 ${
                      couponFeedback.success ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {couponFeedback.message}
                  </p>
                )}

                {!appliedCoupon ? (
                  <div className="mt-2 flex items-center space-x-2 text-[10px] font-mono text-neutral-400">
                    <span>Try:</span>
                    <button
                      onClick={() => handleApplyCoupon("ZEN10")}
                      className="text-blue-400 underline hover:text-blue-300"
                    >
                      ZEN10 (-10%)
                    </button>
                    <button
                      onClick={() => handleApplyCoupon("STREET20")}
                      className="text-blue-400 underline hover:text-blue-300"
                    >
                      STREET20 (-20%)
                    </button>
                  </div>
                ) : (
                  <div className="mt-2 flex items-center justify-between bg-blue-950/40 border border-blue-800/50 px-2.5 py-1 rounded text-[11px] font-mono text-blue-300">
                    <span>Coupon {appliedCoupon.code} active (-{appliedCoupon.discountPercentage}%)</span>
                    <button
                      onClick={removeCoupon}
                      className="text-neutral-400 hover:text-white ml-2"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

              {/* Subtotal Calculations */}
              <div className="space-y-1.5 text-xs font-mono border-t border-neutral-900 pt-3">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Discount</span>
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
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-neutral-900">
                  <span>Total Amount</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono uppercase font-bold py-3.5 px-4 rounded-xl transition shadow-lg shadow-blue-900/30 group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Micro assurance */}
              <div className="flex items-center justify-center space-x-4 text-[10px] font-mono text-neutral-500 pt-1">
                <span className="flex items-center space-x-1">
                  <ShieldCheck className="w-3 h-3 text-neutral-400" />
                  <span>Secure 256-bit SSL</span>
                </span>
                <span>•</span>
                <span>Pan-India 2-4 Days Express</span>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
