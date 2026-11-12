"use client";

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import { Product, StockStatus, PriceMode } from "./types";

export interface CartItem {
  id: string; // product id
  product_id: string;
  name: string;
  slug: string;
  sku?: string | null;
  price_minor: number;
  price_mode: PriceMode;
  currency: string;
  image_url: string;
  stock_status: StockStatus;
  quantity: number;
  is_price_tbd: boolean;
}

interface CartContextType {
  items: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalCount: number;
  subtotalMinor: number;
  hasTbdItems: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "emax_guest_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Hydrate from localStorage once on client
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch (e) {
      console.warn("Failed to read cart from localStorage:", e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Sync to localStorage on changes
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn("Failed to persist cart to localStorage:", e);
    }
  }, [items, isInitialized]);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);

  const addItem = useCallback((product: Product, quantity: number = 1) => {
    const isTbd =
      product.stock?.status === "contact_to_confirm" ||
      product.price_mode === "quote" ||
      product.price_minor === 0;

    setItems((prev) => {
      const existing = prev.find((i) => i.product_id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product_id === product.id
            ? { ...i, quantity: Math.max(1, i.quantity + quantity) }
            : i
        );
      }

      const newItem: CartItem = {
        id: product.id,
        product_id: product.id,
        name: product.name,
        slug: product.slug,
        sku: product.sku,
        price_minor: product.price_minor || 0,
        price_mode: product.price_mode || "fixed",
        currency: product.currency || "NGN",
        image_url: product.image_url || "/images/products/lithium-battery.jpg",
        stock_status: product.stock?.status || "in_stock",
        quantity: Math.max(1, quantity),
        is_price_tbd: isTbd,
      };

      return [...prev, newItem];
    });

    setIsCartOpen(true);
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.product_id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.product_id !== productId));
    } else {
      setItems((prev) =>
        prev.map((i) =>
          i.product_id === productId ? { ...i, quantity: Math.min(999, quantity) } : i
        )
      );
    }
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const totalCount = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const subtotalMinor = useMemo(() => {
    return items.reduce((sum, item) => {
      if (item.is_price_tbd) return sum;
      return sum + item.price_minor * item.quantity;
    }, 0);
  }, [items]);

  const hasTbdItems = useMemo(() => {
    return items.some((item) => item.is_price_tbd);
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalCount,
        subtotalMinor,
        hasTbdItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

