"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  TrendingUp,
  Package,
  ShoppingBag,
  AlertTriangle,
  ArrowLeft,
  Plus,
  Check,
  Edit2,
  Trash2,
  Sparkles,
} from "lucide-react";
import { products as initialProducts, type Product } from "@/lib/products";

export default function AdminPage() {
  const [productList, setProductList] = useState<Product[]>(initialProducts);
  const [activeTab, setActiveTab] = useState<"inventory" | "orders">("inventory");

  // Simulated orders state
  const [orders, setOrders] = useState([
    {
      id: "ZEN-918234",
      customer: "Aarav Sharma",
      city: "Mumbai, MH",
      items: "Acid Wash Boxy Tee (L) x 1",
      amount: 1899,
      payment: "UPI (GPay)",
      status: "Dispatched",
      date: "Today, 10:14 AM",
    },
    {
      id: "ZEN-918233",
      customer: "Kavya Patel",
      city: "Bangalore, KA",
      items: "Architectural Hoodie (M) x 1",
      amount: 3499,
      payment: "Credit Card",
      status: "Processing",
      date: "Today, 08:30 AM",
    },
    {
      id: "ZEN-918232",
      customer: "Rohan Verma",
      city: "New Delhi, DL",
      items: "Tactical Cargos (L) x 1 + Sling Bag x 1",
      amount: 4498,
      payment: "UPI (PhonePe)",
      status: "Delivered",
      date: "Yesterday, 04:20 PM",
    },
    {
      id: "ZEN-918231",
      customer: "Ananya Deshmukh",
      city: "Pune, MH",
      items: "Typographic Raw Hem Drop Tee (M) x 2",
      amount: 3598,
      payment: "Cash on Delivery",
      status: "Dispatched",
      date: "Yesterday, 02:11 PM",
    },
  ]);

  const totalRevenue = orders.reduce((acc, o) => acc + o.amount, 0) + 340000;
  const totalOrders = orders.length + 120;

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const deleteProduct = (productId: string) => {
    setProductList((prev) => prev.filter((p) => p.id !== productId));
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center space-x-1.5 text-xs font-mono text-neutral-400 hover:text-white transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit Admin Portal</span>
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-neutral-900 pb-6 mb-8 gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-blue-500 font-bold">
            STUDIO CONTROL CENTER
          </span>
          <h1 className="text-2xl sm:text-3xl font-mono font-black uppercase text-white tracking-tight mt-1">
            DROP INVENTORY &amp; TELEMETRY
          </h1>
          <p className="text-xs text-neutral-400 mt-1 font-sans">
            Full-stack administrative management suite for Drop 01 capsules and customer fulfillment.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-neutral-900 p-1 rounded-xl border border-neutral-800 text-xs font-mono">
          <button
            onClick={() => setActiveTab("inventory")}
            className={`px-4 py-2 rounded-lg transition ${
              activeTab === "inventory"
                ? "bg-blue-600 text-white font-bold"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Inventory ({productList.length})
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 rounded-lg transition ${
              activeTab === "orders"
                ? "bg-blue-600 text-white font-bold"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Orders ({orders.length})
          </button>
        </div>
      </div>

      {/* Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="p-5 rounded-2xl border border-neutral-850 bg-neutral-950 space-y-2">
          <div className="flex items-center justify-between text-neutral-500 text-xs font-mono">
            <span>GROSS SALES</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-mono font-black text-white">
            ₹{totalRevenue.toLocaleString("en-IN")}
          </p>
          <p className="text-[11px] font-mono text-emerald-400">+18.4% vs last drop</p>
        </div>

        <div className="p-5 rounded-2xl border border-neutral-850 bg-neutral-950 space-y-2">
          <div className="flex items-center justify-between text-neutral-500 text-xs font-mono">
            <span>TOTAL FULFILLED</span>
            <ShoppingBag className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl font-mono font-black text-white">{totalOrders}</p>
          <p className="text-[11px] font-mono text-blue-400">98.2% on-time dispatch</p>
        </div>

        <div className="p-5 rounded-2xl border border-neutral-850 bg-neutral-950 space-y-2">
          <div className="flex items-center justify-between text-neutral-500 text-xs font-mono">
            <span>AVG ORDER VALUE</span>
            <Package className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-mono font-black text-white">₹2,850</p>
          <p className="text-[11px] font-mono text-neutral-400">2.1 items per bag</p>
        </div>

        <div className="p-5 rounded-2xl border border-neutral-850 bg-neutral-950 space-y-2">
          <div className="flex items-center justify-between text-neutral-500 text-xs font-mono">
            <span>LOW STOCK ALERTS</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-mono font-black text-amber-400">3 SKUs</p>
          <p className="text-[11px] font-mono text-neutral-400">Restock needed soon</p>
        </div>
      </div>

      {/* Tab 1: Inventory Table */}
      {activeTab === "inventory" && (
        <div className="rounded-2xl border border-neutral-850 bg-neutral-950 overflow-hidden shadow-2xl">
          <div className="px-6 py-4 border-b border-neutral-900 flex justify-between items-center">
            <h2 className="text-sm font-mono font-bold uppercase text-white">
              Capsule Garment Catalog
            </h2>
            <span className="text-xs font-mono text-neutral-500">
              {productList.length} active styles
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-neutral-900/60 text-neutral-400 border-b border-neutral-900">
                <tr>
                  <th className="py-3 px-6 font-bold text-white">GARMENT</th>
                  <th className="py-3 px-6">CATEGORY</th>
                  <th className="py-3 px-6">PRICE</th>
                  <th className="py-3 px-6">FABRIC / GSM</th>
                  <th className="py-3 px-6">STOCK SIZES</th>
                  <th className="py-3 px-6 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900">
                {productList.map((product) => (
                  <tr key={product.id} className="hover:bg-neutral-900/30 transition">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="relative w-10 h-12 rounded-lg overflow-hidden bg-neutral-900 shrink-0 border border-neutral-800">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        </div>
                        <span className="font-semibold text-white max-w-xs truncate block">
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-neutral-400">{product.category}</td>
                    <td className="py-4 px-6 text-white font-bold">
                      ₹{product.price.toLocaleString("en-IN")}
                    </td>
                    <td className="py-4 px-6 text-neutral-400">
                      {product.gsm ? `${product.gsm} GSM Combed` : product.fabric}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1">
                        {product.sizes.map((sz) => {
                          const qty = product.stock[sz] ?? 0;
                          return (
                            <span
                              key={sz}
                              className={`text-[10px] px-1.5 py-0.5 rounded border ${
                                qty <= 2
                                  ? "bg-amber-950/40 text-amber-400 border-amber-800/40"
                                  : "bg-neutral-900 text-neutral-300 border-neutral-800"
                              }`}
                            >
                              {sz}:{qty}
                            </span>
                          );
                        })}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="p-1.5 text-neutral-500 hover:text-red-400 rounded-lg transition"
                        title="Delete Garment"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Orders Management Pipeline */}
      {activeTab === "orders" && (
        <div className="rounded-2xl border border-neutral-850 bg-neutral-950 overflow-hidden shadow-2xl">
          <div className="px-6 py-4 border-b border-neutral-900 flex justify-between items-center">
            <h2 className="text-sm font-mono font-bold uppercase text-white">
              Customer Drop Orders
            </h2>
            <span className="text-xs font-mono text-neutral-500">
              Live Pan-India Deliveries
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-neutral-900/60 text-neutral-400 border-b border-neutral-900">
                <tr>
                  <th className="py-3 px-6 font-bold text-white">ORDER ID</th>
                  <th className="py-3 px-6">CUSTOMER &amp; CITY</th>
                  <th className="py-3 px-6">ITEMS</th>
                  <th className="py-3 px-6">TOTAL</th>
                  <th className="py-3 px-6">PAYMENT</th>
                  <th className="py-3 px-6">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-neutral-900/30 transition">
                    <td className="py-4 px-6 font-bold text-blue-400">{order.id}</td>
                    <td className="py-4 px-6">
                      <p className="text-white font-semibold">{order.customer}</p>
                      <p className="text-[10px] text-neutral-500">{order.city}</p>
                    </td>
                    <td className="py-4 px-6 text-neutral-300">{order.items}</td>
                    <td className="py-4 px-6 font-bold text-white">
                      ₹{order.amount.toLocaleString("en-IN")}
                    </td>
                    <td className="py-4 px-6 text-neutral-400">{order.payment}</td>
                    <td className="py-4 px-6">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className={`text-xs font-mono rounded-lg px-2.5 py-1 border focus:outline-none ${
                          order.status === "Delivered"
                            ? "bg-emerald-950/60 text-emerald-400 border-emerald-800"
                            : order.status === "Dispatched"
                            ? "bg-blue-950/60 text-blue-400 border-blue-800"
                            : "bg-amber-950/60 text-amber-400 border-amber-800"
                        }`}
                      >
                        <option value="Processing">Processing</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
