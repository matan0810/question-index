import { COLORS_UI } from "../../../styles";

const chipStyle = (accent) => ({
  marginTop: 8,
  marginInlineEnd: 8,
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  background: `${accent}12`,
  border: `1px solid ${accent}44`,
  padding: "4px 12px",
  fontSize: 12,
  color: COLORS_UI.text,
});

const clearBtnStyle = {
  background: "transparent",
  border: "none",
  cursor: "pointer",
  color: COLORS_UI.muted,
  fontSize: 15,
  lineHeight: 1,
  padding: "0 2px",
};

// An active-filter badge (e.g. "שנים: 2020–2023") with an × to clear it.
export default function FilterChip({ label, onClear, clearTitle, accent }) {
  return (
    <div style={chipStyle(accent)}>
      <span style={{ fontWeight: 600 }}>{label}</span>
      <button onClick={onClear} title={clearTitle} style={clearBtnStyle}>
        ×
      </button>
    </div>
  );
}
