import { FONTS } from "../../styles";

const TAG = {
  bg: "var(--bar-bg)",
  text: "var(--muted)",
  border: "var(--border)",
};

export default function ExcludedTag() {
  return (
    <span
      style={{
        fontFamily: FONTS.sans,
        fontSize: 10,
        fontWeight: 700,
        background: TAG.bg,
        color: TAG.text,
        border: `1px solid ${TAG.border}`,
        padding: "2px 7px",
        marginLeft: 8,
        verticalAlign: "middle",
        whiteSpace: "nowrap",
        letterSpacing: "0.02em",
      }}
    >
      ✕ לא בחומר
    </span>
  );
}

export const excludedRowStyle = {
  opacity: 0.45,
  filter: "grayscale(1)",
  pointerEvents: "none",
};

// Compact, icon-only marker for a question whose topic is out of the current
// syllabus. Unlike ExcludedTag — which labels rows in the dedicated
// excluded-topic lists (Overview, Heatmap) — this carries no inline text, so it
// doesn't read like part of the question. The meaning lives in the tooltip plus
// the struck-through, dimmed topic it sits beside (see strikeIfExcluded).
export function ExcludedMark() {
  return (
    <span
      title="נושא שאינו בסילבוס הנוכחי"
      aria-label="לא בסילבוס הנוכחי"
      style={{
        fontFamily: FONTS.sans,
        fontSize: 12,
        lineHeight: 1,
        color: "var(--muted)",
        cursor: "help",
      }}
    >
      ⊘
    </span>
  );
}

// Topic-text decoration applied next to an ExcludedMark: struck through so an
// out-of-syllabus topic reads as "dropped" without spelling it out in words.
export const strikeIfExcluded = (excluded) =>
  excluded ? { textDecoration: "line-through" } : null;
