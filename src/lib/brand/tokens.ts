export const brandTokens = {
  colors: {
    primary: "#2F4A67",
    secondary: "#8A9198",
    background: "#F8FAFC",
    backgroundAlt: "#EEF2F5",
    surface: "#FFFFFF",
    accent: "#4F7CAC",
    text: "#1F2937",
    muted: "#6B7280",
    border: "#E5E7EB",
  },
  radii: {
    sm: "12px",
    md: "18px",
    lg: "28px",
    pill: "999px",
  },
  shadows: {
    soft: "0 16px 40px rgba(47, 74, 103, 0.08)",
    panel: "0 24px 60px rgba(31, 41, 55, 0.10)",
  },
  layout: {
    pageMaxWidth: "1240px",
    textMaxWidth: "760px",
    sectionGutter: "clamp(1.25rem, 3vw, 2rem)",
  },
} as const;
