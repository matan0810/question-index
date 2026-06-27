import { COLORS_UI, FONTS } from "../../../styles";

// One compact global-filter dropdown (year-from / year-to / lecturer).
// Selecting the "all" option (empty value) clears it. Highlights in the course
// accent while active.
export default function FilterSelect({ label, value, onChange, options, allLabel, accent }) {
  const active = !!value;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
      <span style={{ fontSize: 11, color: COLORS_UI.muted }}>{label}:</span>
      <select
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        style={{
          fontFamily: FONTS.sans,
          fontSize: 11,
          border: `1px solid ${active ? accent : COLORS_UI.border}`,
          padding: "4px 8px",
          background: active ? `${accent}10` : COLORS_UI.bg,
          color: active ? accent : COLORS_UI.text,
          outline: "none",
          cursor: "pointer",
          fontWeight: active ? 700 : 400,
        }}
      >
        <option value="">{allLabel}</option>
        {options.map(([val, lbl]) => (
          <option key={val} value={val}>{lbl}</option>
        ))}
      </select>
    </span>
  );
}
