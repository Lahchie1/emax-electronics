"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatCurrency, generateWhatsAppUrl } from "@/lib/utils";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Send,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
} from "lucide-react";

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
    totalCount,
    subtotalMinor,
    hasTbdItems,
  } = useCart();

  const [customerName, setCustomerName] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [errors, setErrors] = useState<{ name?: string; location?: string }>({});
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCartOpen, closeCart]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  const handleCheckoutWhatsApp = () => {
    const newErrors: { name?: string; location?: string } = {};

    if (!customerName.trim()) {
      newErrors.name = "Please provide your Full Name";
    }
    if (!deliveryLocation.trim()) {
      newErrors.location = "Please enter your Delivery Location or State";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    // Construct the formatted WhatsApp order summary
    const orderLines = items.map((item) => {
      if (item.is_price_tbd) {
        return `- ${item.quantity}x ${item.name} (Price TBD / Confirm Stock)`;
      }
      const unitPriceFormatted = formatCurrency(item.price_minor);
      const lineTotalFormatted = formatCurrency(item.price_minor * item.quantity);
      return `- ${item.quantity}x ${item.name} (${unitPriceFormatted} each) = ${lineTotalFormatted}`;
    });

    const subtotalFormatted = formatCurrency(subtotalMinor);
    const subtotalLine = hasTbdItems
      ? `${subtotalFormatted} (+ items with Price TBD)`
      : subtotalFormatted;

    const messageText = `Hello Emax Electronics, I would like to place an order from emax.com.ng:

*Customer:* ${customerName.trim()}
*Delivery:* ${deliveryLocation.trim()}

*Order Summary:*
${orderLines.join("\n")}

*Estimated Total:* ${subtotalLine}
*Notes:* ${orderNotes.trim() || "None"}

Please confirm stock availability, payment details, and delivery/waybill cost.`;

    const waUrl = generateWhatsAppUrl(messageText);
    window.open(waUrl, "_blank");
    setOrderSubmitted(true);
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/65 backdrop-blur-sm transition-opacity animate-fadeIn"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Slide-Over Panel */}
      <div className="relative w-full max-w-lg bg-[#0c141c] text-white h-full shadow-2xl border-l border-[#1e3a52] flex flex-col z-10 animate-slideInRight">
        {/* Header */}
        <div className="p-5 border-b border-[#1e3a52] flex items-center justify-between bg-[#122436]/90 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#087E8B]/20 text-[#087E8B] flex items-center justify-center border border-[#087E8B]/40">
              <ShoppingBag className="w-4 h-4 text-[#087E8B]" />
            </div>
            <div>
              <h2 className="font-extrabold text-base tracking-tight text-white flex items-center gap-2">
                <span>Guest Order Cart</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#1e3a52] text-[#F2A541] font-bold">
                  {totalCount} {totalCount === 1 ? "item" : "items"}
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">Direct WhatsApp Technical Handoff</p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeCart}
            className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition"
            aria-label="Close cart"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Post-Submission Banner */}
        {orderSubmitted && (
          <div className="p-3.5 bg-emerald-950/80 border-b border-emerald-800/60 flex items-center justify-between gap-2 text-xs text-emerald-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>WhatsApp order window launched!</span>
            </div>
            <button
              type="button"
              onClick={() => {
                clearCart();
                setOrderSubmitted(false);
              }}
              className="px-2.5 py-1 rounded bg-emerald-900 hover:bg-emerald-800 text-[11px] font-bold text-white transition flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear Cart</span>
            </button>
          </div>
        )}

        {/* Scrollable Cart Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-[#122436] border border-[#1e3a52] flex items-center justify-center mx-auto text-slate-500">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Your cart is empty</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto leading-relaxed">
                  Browse our verified Grade-A cells, smart active BMS boards, and electric mobility components.
                </p>
              </div>
              <Link
                href="/products"
                onClick={closeCart}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#087E8B] hover:bg-[#066570] text-white text-xs font-bold transition shadow-glowTeal"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <>
              {/* Item List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400 pb-1">
                  <span>Selected Components ({totalCount})</span>
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-[11px] text-slate-400 hover:text-rose-400 transition"
                  >
                    Clear All
                  </button>
                </div>

                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#122436] rounded-2xl p-3.5 border border-[#1e3a52] flex gap-3 items-center group transition hover:border-slate-600"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-16 h-16 rounded-xl bg-slate-900 border border-[#1e3a52] overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image_url}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/products/${item.slug}`}
                        onClick={closeCart}
                        className="font-bold text-xs text-white hover:text-[#F2A541] transition line-clamp-1"
                        title={item.name}
                      >
                        {item.name}
                      </Link>

                      <div className="mt-1 flex items-baseline gap-2">
                        {item.is_price_tbd ? (
                          <span className="text-[11px] font-bold text-[#F2A541] bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded-md">
                            Price TBD / Confirm Stock
                          </span>
                        ) : (
                          <span className="text-xs font-extrabold text-emerald-400">
                            {formatCurrency(item.price_minor)}
                          </span>
                        )}
                        {item.sku && (
                          <span className="text-[10px] text-slate-500 font-mono">
                            SKU: {item.sku}
                          </span>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="mt-2.5 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 bg-[#0c141c] rounded-lg p-0.5 border border-[#1e3a52]">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                            className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center text-xs font-mono font-bold text-white">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                            className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          {!item.is_price_tbd && (
                            <span className="text-xs font-bold text-white font-mono">
                              {formatCurrency(item.price_minor * item.quantity)}
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => removeItem(item.product_id)}
                            className="text-slate-500 hover:text-rose-400 p-1 transition"
                            title="Remove item"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Subtotal Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#122436] to-[#0c1824] border border-[#1e3a52] space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Estimated Subtotal
                  </span>
                  <div className="text-right">
                    <span className="text-xl font-extrabold text-[#F2A541]">
                      {formatCurrency(subtotalMinor)}
                    </span>
                    {hasTbdItems && (
                      <p className="text-[10px] text-amber-400 font-medium mt-0.5">
                        * Excludes items marked Price TBD
                      </p>
                    )}
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed border-t border-[#1e3a52]/60 pt-2">
                  Delivery costs and waybill fees are calculated based on your destination during WhatsApp verification.
                </p>
              </div>

              {/* Guest Checkout Inputs */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#087E8B] uppercase tracking-wider">
                  <span>Guest Fulfillment Details</span>
                </div>

                {/* Full Name */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-300">
                    Full Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => {
                      setCustomerName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    placeholder="e.g. Babatunde Adeyemi"
                    className={`w-full rounded-xl border bg-[#122436] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition ${
                      errors.name ? "border-rose-500 focus:border-rose-400" : "border-[#1e3a52] focus:border-[#087E8B]"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-[10px] text-rose-400 flex items-center gap-1 mt-0.5">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Delivery Location / State */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-300">
                    Delivery Location / State <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={deliveryLocation}
                    onChange={(e) => {
                      setDeliveryLocation(e.target.value);
                      if (errors.location) setErrors((prev) => ({ ...prev, location: undefined }));
                    }}
                    placeholder="e.g. Ikeja Pickup, Lagos Mainland, or Interstate Waybill - Abuja"
                    className={`w-full rounded-xl border bg-[#122436] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition ${
                      errors.location ? "border-rose-500 focus:border-rose-400" : "border-[#1e3a52] focus:border-[#087E8B]"
                    }`}
                  />
                  {errors.location && (
                    <p className="text-[10px] text-rose-400 flex items-center gap-1 mt-0.5">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.location}</span>
                    </p>
                  )}
                </div>

                {/* Technical / Order Notes */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-300">
                    Technical / Order Notes <span className="text-slate-500 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    rows={2}
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="e.g. Need 16S matched IR cells with pure copper busbars"
                    className="w-full rounded-xl border border-[#1e3a52] bg-[#122436] px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-[#087E8B] focus:outline-none leading-relaxed"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Checkout Action */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#1e3a52] bg-[#122436]/90 backdrop-blur-md space-y-2">
            <button
              type="button"
              onClick={handleCheckoutWhatsApp}
              className="w-full inline-flex items-center justify-center gap-2.5 bg-[#087E8B] hover:bg-[#066570] text-white font-extrabold text-sm py-3.5 rounded-2xl shadow-glowTeal transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Send className="w-4 h-4 text-[#F2A541]" />
              <span>Complete Order on WhatsApp</span>
            </button>
            <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 pt-1">
              <span>Direct engineer confirmation</span>
              <button
                type="button"
                onClick={clearCart}
                className="text-slate-500 hover:text-slate-300 underline"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

