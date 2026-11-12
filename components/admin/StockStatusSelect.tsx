"use client";

import { useState } from "react";
import { StockStatus } from "@/lib/types";
import { getStockStatusDisplay } from "@/lib/utils";
import { Check, Loader2, ChevronDown } from "lucide-react";

interface Props {
  productId: string;
  initialStatus: StockStatus;
}

const STATUS_OPTIONS: { value: StockStatus; label: string; badge: string; dot: string }[] = [
  {
    value: "in_stock",
    label: "In Stock",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-300",
    dot: "bg-emerald-500",
  },
  {
    value: "low_stock",
    label: "Low Stock",
    badge: "bg-amber-50 text-amber-700 border-amber-300",
    dot: "bg-amber-500",
  },
  {
    value: "out_of_stock",
    label: "Out of Stock",
    badge: "bg-rose-50 text-rose-700 border-rose-300",
    dot: "bg-rose-500",
  },
  {
    value: "contact_to_confirm",
    label: "Contact to Confirm",
    badge: "bg-slate-100 text-slate-700 border-slate-300",
    dot: "bg-slate-400",
  },
];

export default function StockStatusSelect({ productId, initialStatus }: Props) {
  const [status, setStatus] = useState<StockStatus>(initialStatus);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  const currentDisplay = getStockStatusDisplay(status);

  const handleStatusChange = async (newStatus: StockStatus) => {
    if (newStatus === status) return;

    setStatus(newStatus);
    setIsUpdating(true);
    setShowSaved(false);

    try {
      const res = await fetch("/api/admin/stock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, status: newStatus }),
      });

      if (res.ok) {
        setShowSaved(true);
        setTimeout(() => setShowSaved(false), 2000);
      }
    } catch (err) {
      console.error("Failed to update stock:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative inline-block">
        <select
          value={status}
          disabled={isUpdating}
          onChange={(e) => handleStatusChange(e.target.value as StockStatus)}
          className={`appearance-none text-[11px] font-bold py-1.5 pl-7 pr-7 rounded-full border cursor-pointer transition shadow-xs focus:outline-none focus:ring-2 focus:ring-[#087E8B]/30 ${currentDisplay.badgeClass} disabled:opacity-60`}
          title="Click to change stock status"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-white text-slate-800 font-semibold py-1">
              {opt.label}
            </option>
          ))}
        </select>

        {/* Status Indicator Dot */}
        <span
          className={`w-2 h-2 rounded-full absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none ${currentDisplay.dotClass}`}
        />

        {/* Chevron Icon */}
        <ChevronDown className="w-3 h-3 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
      </div>

      {/* Loading or Saved indicator */}
      {isUpdating && <Loader2 className="w-3.5 h-3.5 text-slate-400 animate-spin" />}
      {showSaved && (
        <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-800 px-1.5 py-0.5 rounded animate-fadeIn">
          <Check className="w-3 h-3" />
          <span>Saved</span>
        </span>
      )}
    </div>
  );
}

