import { useState, useEffect } from "react";

// Thin fixed bar at the top of the viewport that fills as the page scrolls.
export default function ScrollProgress({ color }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setPct(max > 0 ? (el.scrollTop / max) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        height: 3,
        zIndex: 1000,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${pct}%`,
          background: color,
          opacity: 0.65,
          transition: "width 0.08s linear",
        }}
      />
    </div>
  );
}
