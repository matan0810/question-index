import { COLORS_UI, FONTS, primaryColor } from "../../styles";

const SORT_OPTIONS = [
  { value: "date", label: "תאריך" },
  { value: "lecturer", label: "מרצה" },
];

// Sort field + direction selector and a "hide latest year" toggle, shared by
// the Exams and Search tabs. `sortBy`/`sortDir` are the already-resolved
// effective values; `hideLatest` is a boolean.
export default function SortControls({
  sortBy,
  setSortBy,
  sortDir,
  setSortDir,
  hideLatest,
  setHideLatest,
  colorsUI,
}) {
  const accent = primaryColor(colorsUI);

  const group = {
    display: "inline-flex",
    alignItems: "stretch",
    height: 30,
    border: `1px solid ${COLORS_UI.border}`,
    background: COLORS_UI.bg,
    fontFamily: FONTS.sans,
  };
  const cell = {
    border: "none",
    background: "transparent",
    fontFamily: FONTS.sans,
    fontSize: 12,
    color: COLORS_UI.text,
    display: "inline-flex",
    alignItems: "center",
  };
  const divider = `1px solid ${COLORS_UI.border}`;

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      {/* Sort group: label · field · direction */}
      <div style={group}>
        <span
          style={{ ...cell, padding: "0 8px", color: COLORS_UI.muted, fontSize: 11, fontWeight: 700 }}
        >
          מיון
        </span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{ ...cell, borderInlineStart: divider, padding: "0 8px", cursor: "pointer", outline: "none" }}
          title="מיין לפי"
        >
          {SORT_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <button
          onClick={() => setSortDir(sortDir === "asc" ? "desc" : "asc")}
          title={sortDir === "asc" ? "מהישן לחדש (לחץ להיפוך)" : "מהחדש לישן (לחץ להיפוך)"}
          style={{ ...cell, borderInlineStart: divider, padding: "0 10px", cursor: "pointer", color: accent, fontSize: 14, fontWeight: 800 }}
        >
          {sortDir === "asc" ? "↑" : "↓"}
        </button>
      </div>

      {/* Hide-latest-year toggle */}
      <button
        onClick={() => setHideLatest(!hideLatest)}
        title="הסתר את מבחני השנה האחרונה כדי לשמור אותם לסוף"
        style={{
          ...group,
          alignItems: "center",
          padding: "0 12px",
          cursor: "pointer",
          background: hideLatest ? `${accent}14` : COLORS_UI.bg,
          borderColor: hideLatest ? accent : COLORS_UI.border,
          color: hideLatest ? accent : COLORS_UI.muted,
          fontWeight: hideLatest ? 700 : 600,
          fontSize: 12,
          whiteSpace: "nowrap",
        }}
      >
        {hideLatest ? "✓ שנה אחרונה מוסתרת" : "הסתר שנה אחרונה"}
      </button>
    </div>
  );
}
