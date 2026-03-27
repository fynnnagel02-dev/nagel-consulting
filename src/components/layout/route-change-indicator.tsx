"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function RouteChangeIndicator() {
  const pathname = usePathname();
  const lineRef = useRef<HTMLDivElement | null>(null);
  const firstRenderRef = useRef(true);

  useEffect(() => {
    const node = lineRef.current;

    if (!node) {
      return;
    }

    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }

    node.style.opacity = "1";
    node.style.transform = "translateX(0%)";

    const timeout = window.setTimeout(() => {
      node.style.opacity = "0";
      node.style.transform = "translateX(-28%)";
    }, 420);

    return () => window.clearTimeout(timeout);
  }, [pathname]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] overflow-hidden"
    >
      <div
        ref={lineRef}
        className="h-full bg-[linear-gradient(90deg,_rgba(79,124,172,0),_rgba(79,124,172,0.9),_rgba(79,124,172,0))] transition-[opacity,transform] duration-300 ease-out"
        style={{
          opacity: 0,
          transform: "translateX(-28%)",
        }}
      />
    </div>
  );
}
