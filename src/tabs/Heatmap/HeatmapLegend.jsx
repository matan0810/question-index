import { COLORS_UI } from "../../styles";

export default function HeatmapLegend({ legend }) {
  return (
    <div
      style={{
        marginTop: 14,
        paddingTop: 12,
        borderTop: `1px solid ${COLORS_UI.rowDivider}`,
        display: "flex",
        gap: 6,
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <span style={{ fontSize: 11, color: COLORS_UI.subdued, marginLeft: 8 }}>
        מס׳ שאלות לפי מבחן:
      </span>
      {legend.map(({ bg, label }) => (
        <span key={bg} style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span
            style={{
              width: 20,
              height: 20,
              background: bg,
              display: "inline-block",
              border: `1px solid ${COLORS_UI.border}`,
            }}
          />
          <span style={{ fontSize: 11, fontWeight: 600, color: COLORS_UI.text }}>
            {label}
          </span>
        </span>
      ))}
    </div>
  );
}
