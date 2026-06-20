export const FONTS = {
  sans: "Heebo, system-ui, sans-serif",
  serif: "Frank Ruhl Libre, Georgia, serif",
};

// Static UI chrome — does not change between courses.
// Per-course colors (primary, secondary, chapter) are provided by CourseContext.
// Color values are CSS custom properties defined in index.css (light + dark themes).
export const COLORS_UI = {
  primary:    "#c1440e",
  secondary:  "#4a7aab",
  dark:       "var(--dark)",
  bg:         "var(--bg)",
  border:     "var(--border)",
  muted:      "var(--muted)",
  text:       "var(--text)",
  subdued:    "var(--subdued)",
  barBg:      "var(--bar-bg)",
  rowDivider: "var(--row-divider)",
  hoverBg:    "var(--hover-bg)",
  cardBg:     "var(--card-bg)",
  doneBg:     "var(--done-bg)",
  doneBorder: "var(--done-border)",
  doneText:   "var(--done-text)",
};

// Resolve a course's primary accent color, falling back to the static default
// when no per-course colorsUI is available. Used across tabs/components.
export const primaryColor = (colorsUI) => colorsUI?.primary ?? COLORS_UI.primary;

// Card — for places that spread + override (e.g. ExamsTab, FormatBanner).
// Use className="ui-card" when no overrides are needed.
export const card = {
  background: "var(--card-bg)",
  border: `1px solid ${COLORS_UI.border}`,
  padding: 20,
  boxShadow: `2px 2px 0 ${COLORS_UI.dark}`,
  marginBottom: 16,
};

// Form element base
export const inp = {
  fontSize: 13,
  border: `1px solid ${COLORS_UI.border}`,
  padding: "6px 10px",
  background: COLORS_UI.bg,
  color: COLORS_UI.dark,
  outline: "none",
};

export const clearBtn = {
  fontSize: 13,
  background: "transparent",
  border: `1px solid ${COLORS_UI.border}`,
  padding: "5px 12px",
  cursor: "pointer",
  color: COLORS_UI.text,
};

export const countBadge = {
  fontSize: 13,
  fontWeight: 700,
  background: COLORS_UI.dark,
  color: COLORS_UI.bg,
  padding: "4px 10px",
};

