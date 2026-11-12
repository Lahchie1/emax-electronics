"use client";

import React, { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { Product } from "@/lib/types";
import { ShoppingBag, Check } from "lucide-react";

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
  className?: string;
  variant?: "card" | "full" | "icon";
  label?: string;
}

export default function AddToCartButton({
  product,
  quantity = 1,
  className = "",
  variant = "card",
  label,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  const isTbd =
    product.stock?.status === "contact_to_confirm" ||
    product.price_mode === "quote" ||
    product.price_minor === 0;

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-200 ${
          justAdded
            ? "bg-emerald-600 text-white shadow-md scale-105"
            : "bg-[#087E8B]/10 hover:bg-[#087E8B] text-[#087E8B] hover:text-white shadow-xs"
        } ${className}`}
        title={justAdded ? "Added to Cart!" : isTbd ? "Add (Confirm Stock)" : "Add to Cart"}
        aria-label="Add to cart"
      >
        {justAdded ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
      </button>
    );
  }

  if (variant === "full") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`w-full inline-flex items-center justify-center gap-2 font-extrabold text-sm py-3.5 rounded-2xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 ${
          justAdded
            ? "bg-emerald-600 text-white shadow-md"
            : "bg-[#123047] hover:bg-slate-800 text-white shadow-sm"
        } ${className}`}
      >
        {justAdded ? (
          <>
            <Check className="w-4 h-4 text-emerald-300" />
            <span>Added to Cart!</span>
          </>
        ) : (
          <>
            <ShoppingBag className="w-4 h-4 text-[#F2A541]" />
            <span>{label || (isTbd ? "Add to Cart (Confirm Stock)" : "Add to Guest Cart")}</span>
          </>
        )}
      </button>
    );
  }

  // Default "card" variant
  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-all duration-200 ${
        justAdded
          ? "bg-emerald-600 text-white shadow-xs scale-102"
          : "bg-[#087E8B] hover:bg-[#066570] text-white shadow-xs"
      } ${className}`}
      title={isTbd ? "Add to Cart (Confirm Stock)" : "Add to Cart"}
    >
      {justAdded ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-200" />
          <span>Added!</span>
        </>
      ) : (
        <>
          <ShoppingBag className="w-3.5 h-3.5 text-[#F2A541]" />
          <span>Add to Cart</span>
        </>
      )}
    </button>
  );
}

