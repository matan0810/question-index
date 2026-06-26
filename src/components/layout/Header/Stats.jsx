import { COLORS_UI, FONTS, primaryColor } from "../../../styles";
import { questionTopics } from "../../../utils/exam";
import ProgressWidget from "./ProgressWidget";

// One compact global-filter dropdown (year / moed / lecturer). Selecting the
// "all" option clears it. Highlights in the course accent when active.
function Filter({ label, value, onChange, options, allLabel, pri }) {
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
          border: `1px solid ${active ? pri : COLORS_UI.border}`,
          padding: "4px 8px",
          background: active ? `${pri}10` : COLORS_UI.bg,
          color: active ? pri : COLORS_UI.text,
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

export default function Stats({
  exams,
  colorsUI,
  activeLecturer,
  setActiveLecturer,
  lecturers,
  activeYearFrom,
  setActiveYearFrom,
  activeYearTo,
  setActiveYearTo,
  years,
  studyMode,
  doneCount,
  labelCount,
  totalQuestions,
  resetProgress,
}) {
  const pri = primaryColor(colorsUI);
  const yearRange = exams.length
    ? `${Math.min(...exams.map((e) => e.year))}–${Math.max(...exams.map((e) => e.year))}`
    : "—";

  const stats = [
    [exams.length, "מבחנים"],
    [exams.reduce((s, e) => s + e.questions.length, 0), "שאלות"],
    [new Set(exams.flatMap((e) => e.questions.flatMap(questionTopics))).size, "נושאים"],
    [yearRange, "שנים"],
  ];

  return (
    <div className="stats-row" style={{ alignItems: "flex-end" }}>
      {stats.map(([value, label]) => (
        <div key={label}>
          <div className="stat-num">{value}</div>
          <div className="stat-label">{label}</div>
        </div>
      ))}

      <div style={{ marginRight: "auto", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        {years?.length > 1 && (
          <Filter
            label="משנה"
            value={activeYearFrom}
            onChange={setActiveYearFrom}
            options={years
              .filter((y) => !activeYearTo || y <= parseInt(activeYearTo))
              .map((y) => [String(y), String(y)])}
            allLabel="תחילה"
            pri={pri}
          />
        )}
        {years?.length > 1 && (
          <Filter
            label="עד שנה"
            value={activeYearTo}
            onChange={setActiveYearTo}
            options={years
              .filter((y) => !activeYearFrom || y >= parseInt(activeYearFrom))
              .map((y) => [String(y), String(y)])}
            allLabel="סוף"
            pri={pri}
          />
        )}
        {lecturers?.length > 1 && (
          <Filter
            label="מרצה"
            value={activeLecturer}
            onChange={setActiveLecturer}
            options={lecturers.map((l) => [l, l])}
            allLabel="כל המרצים"
            pri={pri}
          />
        )}
      </div>

      {studyMode && totalQuestions > 0 && (
        <ProgressWidget
          doneCount={doneCount}
          labelCount={labelCount}
          totalQuestions={totalQuestions}
          resetProgress={resetProgress}
        />
      )}
    </div>
  );
}
