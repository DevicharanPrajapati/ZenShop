"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, CheckCircle2, Truck, Package, Clock, ArrowLeft, ShieldCheck } from "lucide-react";

export default function OrdersPage() {
  const [trackingId, setTrackingId] = useState("ZEN-849201");
  const [activeOrder, setActiveOrder] = useState({
    id: "ZEN-849201",
    status: "In Transit",
    courier: "Bluedart Express Air",
    awb: "BD-84910284IN",
    estimatedDelivery: "In 2 days (Oct 31)",
    origin: "Tiruppur Fulfillment Depot, TN",
    destination: "Connaught Place, New Delhi",
    steps: [
      {
        title: "Drop Order Confirmed & Paid",
        time: "Yesterday, 11:42 AM",
        completed: true,
        desc: "Payment verified via Instant UPI.",
      },
      {
        title: "Precision Cut, Pressed & Quality Tested",
        time: "Yesterday, 04:30 PM",
        completed: true,
        desc: "Passed 280 GSM fabric density and double-needle collar inspection.",
      },
      {
        title: "Dispatched via Bluedart Express Air",
        time: "Today, 06:15 AM",
        completed: true,
        desc: "Departed Coimbatore Airport (CJB) ➔ IGI Airport Delhi.",
      },
      {
        title: "Arrived at Regional Distribution Hub",
        time: "Today, 09:40 AM",
        completed: true,
        desc: "Sorted for final mile delivery in New Delhi.",
      },
      {
        title: "Out for Doorstep Delivery",
        time: "Expected Tomorrow by 02:00 PM",
        completed: false,
        desc: "Will be delivered with OTP verification.",
      },
    ],
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;
    // Updates simulated order status
    setActiveOrder((prev) => ({
      ...prev,
      id: trackingId.toUpperCase(),
    }));
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center space-x-1.5 text-xs font-mono text-neutral-400 hover:text-white transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Storefront</span>
        </Link>
      </div>

      <div className="mb-8 border-b border-neutral-900 pb-4">
        <span className="text-xs font-mono uppercase tracking-widest text-blue-500 font-bold">
          LIVE SHIPMENT CONCIERGE
        </span>
        <h1 className="text-2xl sm:text-4xl font-mono font-bold uppercase text-white tracking-tight mt-1">
          TRACK YOUR DROP ORDER
        </h1>
        <p className="text-xs text-neutral-400 mt-1 font-sans">
          Real-time courier telemetry powered by our Indian logistics network.
        </p>
      </div>

      {/* Tracking Input Bar */}
      <form onSubmit={handleSearch} className="mb-10">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="Enter Order ID (e.g. ZEN-849201)"
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-10 pr-4 py-3 text-xs font-mono uppercase text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs uppercase font-bold px-6 py-3 rounded-xl transition"
          >
            Track Status
          </button>
        </div>
      </form>

      {/* Active Order Card */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8 space-y-8 shadow-2xl">
        {/* Status Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-900 pb-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono">
              <span className="text-neutral-500">ORDER:</span>
              <span className="font-bold text-white tracking-wider">{activeOrder.id}</span>
              <span className="bg-blue-950/80 border border-blue-800 text-blue-400 px-2 py-0.5 rounded text-[10px]">
                {activeOrder.status}
              </span>
            </div>
            <p className="text-sm font-semibold text-white mt-1">
              Estimated Delivery: <span className="text-blue-400">{activeOrder.estimatedDelivery}</span>
            </p>
          </div>

          <div className="text-left sm:text-right font-mono text-xs">
            <p className="text-neutral-400">{activeOrder.courier}</p>
            <p className="text-neutral-500 text-[11px]">AWB: {activeOrder.awb}</p>
          </div>
        </div>

        {/* Stepper Timeline */}
        <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2.5 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-800">
          {activeOrder.steps.map((step, idx) => (
            <div key={idx} className="relative flex items-start space-x-4">
              {/* Stepper Dot */}
              <div
                className={`absolute -left-6 sm:-left-8 top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                  step.completed
                    ? "bg-blue-600 border-blue-500 text-white"
                    : "bg-neutral-900 border-neutral-700 text-neutral-600"
                }`}
              >
                {step.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
              </div>

              {/* Step Info */}
              <div className="space-y-0.5">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                  <h3
                    className={`text-xs font-mono font-bold uppercase ${
                      step.completed ? "text-white" : "text-neutral-500"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <span className="text-[10px] font-mono text-neutral-500">{step.time}</span>
                </div>
                <p className="text-xs text-neutral-400 font-sans">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Origin / Dest Strip */}
        <div className="rounded-xl border border-neutral-850 bg-neutral-900/40 p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div>
            <span className="text-neutral-500 text-[10px] block">DISPATCHED FROM</span>
            <span className="text-neutral-200">{activeOrder.origin}</span>
          </div>
          <div>
            <span className="text-neutral-500 text-[10px] block">DELIVERING TO</span>
            <span className="text-neutral-200">{activeOrder.destination}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
