import { COLORS_UI } from "../../styles";

export default function InsightRow({ children, onClick, hoverBg }) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: "11px 0",
        borderBottom: `1px solid ${COLORS_UI.rowDivider}`,
        lineHeight: 1.5,
        cursor: onClick ? "pointer" : "default",
      }}
      onMouseEnter={(e) => {
        if (onClick) e.currentTarget.style.background = hoverBg ?? COLORS_UI.hoverBg;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
      }}
    >
      {children}
    </div>
  );
}
