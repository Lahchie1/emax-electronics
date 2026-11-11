"use client";

import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: 50 | 100 | 150 | 200 | 250 | 300 | 350 | 400 | 500;
  animation?: "fade-up" | "fade-left" | "fade-right" | "scale";
}

export default function ScrollReveal({
  children,
  className = "",
  delay,
  animation = "fade-up",
}: ScrollRevealProps) {
  const animClass =
    animation === "scale"
      ? "reveal-scale"
      : animation === "fade-left"
      ? "reveal-fade-left"
      : animation === "fade-right"
      ? "reveal-fade-right"
      : "reveal-on-scroll";

  return (
    <div
      className={`${animClass} ${className}`}
      data-delay={delay ? String(delay) : undefined}
    >
      {children}
    </div>
  );
}

