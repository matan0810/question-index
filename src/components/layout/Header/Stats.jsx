import { COLORS_UI, FONTS, primaryColor } from "../../../styles";
import { questionTopics } from "../../../utils/exam";
import ProgressWidget from "./ProgressWidget";

export default function Stats({
  exams,
  colorsUI,
  activeLecturer,
  setActiveLecturer,
  lecturers,
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

      {lecturers?.length > 1 && (
        <div style={{ marginRight: "auto", display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 11, color: COLORS_UI.muted }}>מרצה:</span>
          <select
            value={activeLecturer || ""}
            onChange={(e) => setActiveLecturer(e.target.value)}
            style={{
              fontFamily: FONTS.sans,
              fontSize: 11,
              border: `1px solid ${activeLecturer ? pri : COLORS_UI.border}`,
              padding: "4px 8px",
              background: activeLecturer ? `${pri}10` : COLORS_UI.bg,
              color: activeLecturer ? pri : COLORS_UI.text,
              outline: "none",
              cursor: "pointer",
              fontWeight: activeLecturer ? 700 : 400,
            }}
          >
            <option value="">כולם</option>
            {lecturers.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>
      )}

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
