"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ArrowRight, Truck, ShieldCheck, Tag, ArrowLeft, Sparkles } from "lucide-react";
import { useStore, FREE_SHIPPING_THRESHOLD } from "@/lib/store";

export default function CartPage() {
  const {
    items,
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

  const [couponCode, setCouponCode] = useState("");
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);

  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const amountNeeded = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const handleApply = (codeToApply?: string) => {
    const code = codeToApply || couponCode;
    if (!code) return;
    const res = applyCoupon(code);
    setFeedback(res);
    if (res.success) setCouponCode("");
    setTimeout(() => setFeedback(null), 4000);
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Breadcrumb / Back */}
      <div className="mb-6">
        <Link
          href="/products"
          className="inline-flex items-center space-x-1.5 text-xs font-mono text-neutral-400 hover:text-white transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Continue Shopping Drop 01</span>
        </Link>
      </div>

      <div className="flex items-baseline space-x-3 mb-8">
        <h1 className="text-2xl sm:text-4xl font-mono font-bold uppercase tracking-tight text-neutral-950 dark:text-white">
          YOUR SHOPPING BAG
        </h1>
        <span className="text-sm font-mono text-neutral-600 dark:text-neutral-400">
          ({items.reduce((acc, i) => acc + i.quantity, 0)} Items)
        </span>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-12 text-center max-w-xl mx-auto my-12 space-y-4">
          <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center mx-auto text-neutral-500">
            <Truck className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-mono font-bold text-neutral-950 dark:text-white uppercase">Your Bag is Empty</h2>
          <p className="text-xs text-neutral-400 font-sans max-w-sm mx-auto leading-relaxed">
            Our capsule drops are limited. Grab your size before it is archived.
          </p>
          <div className="pt-2">
            <Link
              href="/products"
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs uppercase font-bold px-6 py-3.5 rounded-xl transition shadow-lg shadow-blue-900/30"
            >
              <span>Explore Garments</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Items Table / List */}
          <div className="lg:col-span-8 space-y-4">
            {/* Free shipping bar */}
            <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-900/60 p-4">
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="flex items-center space-x-2 text-neutral-700 dark:text-neutral-300">
                  <Truck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  {amountNeeded === 0 ? (
                    <span className="text-blue-600 dark:text-blue-400 font-semibold flex items-center space-x-1">
                      <span>FREE EXPRESS DELIVERY UNLOCKED!</span>
                      <Sparkles className="w-3.5 h-3.5 text-yellow-500 inline" />
                    </span>
                  ) : (
                    <span>
                      Add <strong className="text-neutral-950 dark:text-white">₹{amountNeeded}</strong> more for{" "}
                      <strong className="text-blue-600 dark:text-blue-400">FREE DELIVERY</strong>
                    </span>
                  )}
                </span>
                <span className="text-neutral-500 dark:text-neutral-400">{freeShippingProgress}%</span>
              </div>
              <div className="h-1.5 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-500 rounded-full"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Item rows */}
            <div className="divide-y divide-neutral-200 dark:divide-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-850 bg-white dark:bg-neutral-950 p-4 sm:p-6 space-y-4 shadow-sm dark:shadow-none">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}`}
                  className="pt-4 first:pt-0 flex flex-col sm:flex-row gap-4 sm:items-center justify-between"
                >
                  <div className="flex space-x-4 items-center">
                    <div className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                        {item.product.category}
                      </span>
                      <Link
                        href={`/products/${item.product.id}`}
                        className="block text-sm font-semibold text-neutral-950 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition"
                      >
                        {item.product.name}
                      </Link>

                      <div className="flex items-center space-x-2 text-xs font-mono text-neutral-600 dark:text-neutral-400 pt-1">
                        <span className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 px-2 py-0.5 rounded text-neutral-950 dark:text-white font-bold">
                          Size: {item.selectedSize}
                        </span>
                        <span className="flex items-center space-x-1.5">
                          <span
                            className="w-3 h-3 rounded-full border border-neutral-300 dark:border-neutral-700"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          <span>{item.selectedColor.name}</span>
                        </span>
                      </div>

                      <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400 pt-1 sm:hidden">
                        ₹{item.product.price.toLocaleString("en-IN")} each
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end sm:space-x-8 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-200 dark:border-neutral-900">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 rounded-lg">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.selectedSize,
                            item.selectedColor.name,
                            item.quantity - 1
                          )
                        }
                        className="p-1.5 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-mono font-bold text-neutral-900 dark:text-white">
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
                        className="p-1.5 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right min-w-[90px]">
                      <p className="text-sm font-mono font-bold text-neutral-950 dark:text-white">
                        ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-[10px] font-mono text-neutral-500">
                          ₹{item.product.price.toLocaleString("en-IN")} ea
                        </p>
                      )}
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() =>
                        removeFromCart(
                          item.product.id,
                          item.selectedSize,
                          item.selectedColor.name
                        )
                      }
                      className="p-2 text-neutral-400 hover:text-red-500 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 transition"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 space-y-5">
              <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-neutral-950 dark:text-white border-b border-neutral-200 dark:border-neutral-900 pb-3">
                ORDER SUMMARY
              </h2>

              {/* Coupon Form */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-neutral-400 block">
                  Promotional Voucher
                </label>
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500" />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="e.g. ZEN10"
                      className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-lg pl-8 pr-3 py-2 text-xs font-mono uppercase text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <button
                    onClick={() => handleApply()}
                    className="bg-neutral-200 hover:bg-neutral-300 text-neutral-900 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-white text-xs font-mono px-3.5 py-2 rounded-lg transition font-semibold"
                  >
                    Apply
                  </button>
                </div>

                {feedback && (
                  <p
                    className={`text-[11px] font-mono ${
                      feedback.success ? "text-emerald-600 dark:text-green-400" : "text-red-500 dark:text-red-400"
                    }`}
                  >
                    {feedback.message}
                  </p>
                )}

                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-blue-100 text-blue-900 border border-blue-300 dark:bg-blue-950/40 dark:border-blue-800/40 dark:text-blue-300 px-3 py-1.5 rounded-lg text-xs font-mono">
                    <span>Coupon {appliedCoupon.code} applied (-{appliedCoupon.discountPercentage}%)</span>
                    <button
                      onClick={removeCoupon}
                      className="text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-[10px] font-mono text-neutral-600 dark:text-neutral-400 pt-1">
                    <span>Try:</span>
                    <button
                      onClick={() => handleApply("ZEN10")}
                      className="text-blue-600 dark:text-blue-400 underline hover:text-blue-500"
                    >
                      ZEN10
                    </button>
                    <span>or</span>
                    <button
                      onClick={() => handleApply("STREET20")}
                      className="text-blue-600 dark:text-blue-400 underline hover:text-blue-500"
                    >
                      STREET20
                    </button>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2.5 border-t border-neutral-200 dark:border-neutral-900 pt-4 text-xs font-mono">
                <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                  <span>Bag Subtotal</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-green-400">
                    <span>Voucher Discount</span>
                    <span>-₹{discount.toLocaleString("en-IN")}</span>
                  </div>
                )}

                <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                  <span>Estimated Delivery</span>
                  <span>
                    {shippingFee === 0 ? (
                      <span className="text-blue-600 dark:text-blue-400 font-semibold">FREE</span>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-base font-mono font-bold text-neutral-950 dark:text-white pt-3 border-t border-neutral-200 dark:border-neutral-900">
                  <span>Total Amount</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>
                <p className="text-[10px] font-mono text-neutral-500">
                  * Inclusive of all GST taxes
                </p>
              </div>

              {/* Checkout CTA */}
              <Link
                href="/checkout"
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs uppercase font-bold py-4 rounded-xl transition shadow-lg shadow-blue-900/40 group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Trust badges */}
              <div className="space-y-2 pt-2 border-t border-neutral-900 text-[11px] font-mono text-neutral-400">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-neutral-400" />
                  <span>Encrypted Checkout (UPI, Cards, NetBanking, COD)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="w-4 h-4 text-neutral-400" />
                  <span>Express Air Shipping (2-4 Business Days)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
