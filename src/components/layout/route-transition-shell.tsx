"use client";

import type { ReactNode } from "react";
import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function RouteTransitionShell({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement | null>(null);
  const firstRenderRef = useRef(true);

  useLayoutEffect(() => {
    const node = ref.current;

    if (!node) {
      return;
    }

    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }

    node.style.opacity = "0.975";
    node.style.transform = "translateY(10px)";

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    const firstFrame = window.requestAnimationFrame(() => {
      const secondFrame = window.requestAnimationFrame(() => {
        if (!node) {
          return;
        }

        node.style.opacity = "1";
        node.style.transform = "translateY(0px)";
      });

      node.dataset.transitionFrame = String(secondFrame);
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);

      if (node.dataset.transitionFrame) {
        window.cancelAnimationFrame(Number(node.dataset.transitionFrame));
      }
    };
  }, [pathname]);

  return (
    <div
      ref={ref}
      style={{
        opacity: 1,
        transform: "translateY(0px)",
        transition: "opacity 220ms ease-out, transform 220ms ease-out",
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
