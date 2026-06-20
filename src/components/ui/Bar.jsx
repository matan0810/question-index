import { COLORS_UI, FONTS } from "../../styles";

export default function Bar({ label, val, max, color, pct, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: "10px 0",
        borderBottom: `1px solid ${COLORS_UI.rowDivider}`,
        cursor: onClick ? "pointer" : "default",
      }}
      onMouseEnter={(e) => {
        if (onClick) e.currentTarget.style.background = `${color}15`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 6,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.sans,
            fontWeight: 700,
            fontSize: 13,
            color: COLORS_UI.dark,
          }}
        >
          {label}
        </div>
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: FONTS.sans,
              fontWeight: 800,
              fontSize: 13,
              background: COLORS_UI.dark,
              color: COLORS_UI.bg,
              padding: "2px 9px",
              display: "inline-block",
            }}
          >
            {val}
          </span>
          <span
            style={{
              fontFamily: FONTS.sans,
              fontSize: 11,
              color: COLORS_UI.muted,
              minWidth: 30,
              textAlign: "start",
            }}
          >
            {pct}%
          </span>
        </div>
      </div>
      <div style={{ background: COLORS_UI.barBg, height: 5 }}>
        <div
          style={{
            background: color,
            height: "100%",
            width: `${(val / max) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}
