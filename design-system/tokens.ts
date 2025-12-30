export const tokens = {
  /* ---------------------------------
   * SPACING (layout rhythm)
   * --------------------------------- */
  space: {
    0: "0px",
    1: "4px",    // micro (icon gaps)
    2: "8px",    // tight
    3: "12px",   // compact
    4: "16px",   // base (default)
    5: "24px",   // section inner spacing
    6: "32px",   // card padding
    7: "48px",   // section spacing
    8: "64px",   // major separation
    9: "96px",   // hero vertical spacing
    10: "128px", // page padding top/bottom
  },

  /* ---------------------------------
   * TYPOGRAPHY
   * --------------------------------- */
  fontSize: {
    xs: "12px",   // captions, meta
    sm: "14px",   // helper text
    base: "16px", // body
    lg: "18px",   // emphasis body
    xl: "24px",   // section titles
    "2xl": "32px",
    "3xl": "40px",
    "4xl": "48px",
    "5xl": "56px",
    "6xl": "64px",
  },

  lineHeight: {
    tight: "1.1",
    snug: "1.25",
    normal: "1.5",
    relaxed: "1.7",
  },

  /* ---------------------------------
   * COLORS (dark-mode first)
   * --------------------------------- */
  color: {
    bg: {
      primary: "#0a0a0a",   // main background
      secondary: "#111111",
      subtle: "#161616",
    },
    text: {
      primary: "#f5f5f5",
      secondary: "#cfcfcf",
      muted: "#9a9a9a",
      faint: "#6f6f6f",
    },
    border: {
      subtle: "#242424",
      default: "#2e2e2e",
    },
    accent: {
      primary: "#3f3f46", // neutral, not flashy
    },
  },

  /* ---------------------------------
   * RADIUS (avoid over-rounding)
   * --------------------------------- */
  radius: {
    none: "0px",
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
  },

  /* ---------------------------------
   * SHADOWS (rarely used)
   * --------------------------------- */
  shadow: {
    none: "none",
    subtle: "0 1px 2px rgba(0,0,0,0.4)",
  },
};
