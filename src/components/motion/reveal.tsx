"use client";

import type { ReactNode } from "react";
import { useEffect, useLayoutEffect, useRef } from "react";

export function Reveal({
  children,
  delay = 0,
  y = 24,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const node = ref.current;

    if (!node || typeof window === "undefined") {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    const rect = node.getBoundingClientRect();
    const inViewport = rect.top < window.innerHeight * 0.9 && rect.bottom > 0;

    if (inViewport) {
      return;
    }

    node.dataset.revealPending = "true";
    node.style.opacity = "0";
    node.style.transform = `translateY(${y}px)`;
  }, [y]);

  useEffect(() => {
    const node = ref.current;

    if (
      !node ||
      typeof IntersectionObserver === "undefined" ||
      node.dataset.revealPending !== "true"
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        node.style.opacity = "1";
        node.style.transform = "translateY(0px)";
        node.dataset.revealPending = "false";
        observer.disconnect();
      },
      { threshold: 0.2 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: 1,
        transform: "translateY(0px)",
        transition: `opacity 0.72s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.72s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
