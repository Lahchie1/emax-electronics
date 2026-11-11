"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollObserver() {
  const pathname = usePathname();

  useEffect(() => {
    // Enable scroll animations on client
    document.documentElement.classList.add("has-scroll-animations");
    document.documentElement.setAttribute("data-scroll-dir", "down");

    const SELECTOR =
      ".reveal-on-scroll, .reveal-scale, .reveal-fade-left, .reveal-fade-right, [data-reveal]";

    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const diff = currentY - lastScrollY;

          if (Math.abs(diff) > 3) {
            const dir = diff > 0 ? "down" : "up";
            document.documentElement.setAttribute("data-scroll-dir", dir);
            lastScrollY = currentY;
          }

          // Safety check: when near top of page, ensure all top elements are revealed
          if (currentY < 100) {
            document.querySelectorAll(SELECTOR).forEach((el) => {
              const rect = el.getBoundingClientRect();
              if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
                el.classList.add("is-revealed");
              }
            });
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // IntersectionObserver that maintains observation for both scroll directions
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
          } else {
            // When an element leaves viewport completely, reset state so it re-triggers on reverse scroll
            const rect = entry.boundingClientRect;
            if (rect.top > window.innerHeight || rect.bottom < 0) {
              entry.target.classList.remove("is-revealed");
            }
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -20px 0px",
      }
    );

    const observeAll = () => {
      const elements = document.querySelectorAll(SELECTOR);
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
          el.classList.add("is-revealed");
        }
        observer.observe(el);
      });
    };

    observeAll();
    const timer = setTimeout(observeAll, 120);

    const mutationObserver = new MutationObserver(() => {
      observeAll();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);

  return null;
}
