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
