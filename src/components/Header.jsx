import { useNavigate } from "react-router-dom";
import { COLORS_UI, FONTS } from "../styles";
import DarkToggle from "./DarkToggle";

export default function Header({
  course,
  exams,
  colorsUI,
  doneCount,
  totalQuestions,
  resetProgress,
  studyMode,
  toggleStudyMode,
  activeLecturer,
  setActiveLecturer,
  lecturers,
}) {
  const pri = colorsUI?.primary ?? COLORS_UI.primary;
  const navigate = useNavigate();
  const progressPct =
    totalQuestions > 0 ? Math.round((doneCount / totalQuestions) * 100) : 0;

  const yearRange =
    exams.length
      ? `${Math.min(...exams.map((e) => e.year))}–${Math.max(...exams.map((e) => e.year))}`
      : "—";

  return (
    <div
      style={{
        borderTop: `4px solid ${COLORS_UI.dark}`,
        borderBottom: `1px solid ${COLORS_UI.dark}`,
        paddingTop: 6,
        paddingBottom: 20,
        marginBottom: 20,
      }}
    >
      {/* Top row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <div style={{ fontFamily: FONTS.sans, fontSize: 12, color: COLORS_UI.muted }}>
          {course.name} · קורס {course.number}
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <DarkToggle />

          {/* Study mode toggle */}
          <button
            onClick={toggleStudyMode}
            title={studyMode ? "כבה מצב למידה" : "הפעל מצב למידה לסימון שאלות"}
            style={{
              background: studyMode ? COLORS_UI.doneBg : "transparent",
              border: `1px solid ${studyMode ? COLORS_UI.doneText : COLORS_UI.border}`,
              color: studyMode ? COLORS_UI.doneText : COLORS_UI.muted,
              cursor: "pointer",
              fontFamily: FONTS.sans,
              fontSize: 11,
              fontWeight: 600,
              padding: "4px 10px",
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              transition: "background 0.15s, border-color 0.15s, color 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = studyMode ? COLORS_UI.doneText : COLORS_UI.subdued;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = studyMode ? COLORS_UI.doneText : COLORS_UI.border;
            }}
          >
            {studyMode ? "✓ מצב למידה" : "◎ מצב למידה"}
          </button>

          {/* Back */}
          <button
            onClick={() => navigate("/")}
            style={{
              background: `${pri}18`,
              border: `1px solid ${pri}55`,
              borderRadius: 3,
              cursor: "pointer",
              fontFamily: FONTS.sans,
              fontSize: 12,
              fontWeight: 600,
              color: pri,
              padding: "4px 14px",
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              transition: "background 0.15s, border-color 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `${pri}28`;
              e.currentTarget.style.borderColor = `${pri}99`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = `${pri}18`;
              e.currentTarget.style.borderColor = `${pri}55`;
            }}
          >
            ← כל הקורסים
          </button>
        </div>
      </div>

      {/* Title */}
      <div
        style={{
          fontFamily: FONTS.sans,
          fontWeight: 800,
          fontSize: 38,
          lineHeight: 1,
          letterSpacing: "-0.03em",
        }}
      >
        מדד שאלות{" "}
        <span style={{ color: pri }}>{course.shortName}</span>
      </div>

      {/* Active lecturer badge */}
      {activeLecturer && (
        <div
          style={{
            marginTop: 8,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: `${pri}12`,
            border: `1px solid ${pri}44`,
            padding: "4px 12px",
            fontSize: 12,
            color: COLORS_UI.text,
          }}
        >
          <span style={{ fontWeight: 600 }}>מרצה: {activeLecturer}</span>
          <button
            onClick={() => setActiveLecturer("")}
            title="הסר סינון מרצה"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: COLORS_UI.muted,
              fontSize: 15,
              lineHeight: 1,
              padding: "0 2px",
            }}
          >
            ×
          </button>
        </div>
      )}

      {/* Stats row */}
      <div className="stats-row" style={{ alignItems: "flex-end" }}>
        {[
          [exams.length, "מבחנים"],
          [exams.reduce((s, e) => s + e.questions.length, 0), "שאלות"],
          [
            new Set(exams.flatMap((e) => e.questions.map((q) => q.topic))).size,
            "נושאים",
          ],
          [yearRange, "שנים"],
        ].map(([value, label]) => (
          <div key={label}>
            <div className="stat-num">{value}</div>
            <div className="stat-label">{label}</div>
          </div>
        ))}

        {/* Global lecturer selector */}
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
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Progress (study mode only) */}
        {studyMode && totalQuestions > 0 && (
          <div style={{ minWidth: 150 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 4,
              }}
            >
              <span style={{ fontSize: 11, color: COLORS_UI.subdued, fontWeight: 600 }}>
                {doneCount}/{totalQuestions} ({progressPct}%)
              </span>
              {doneCount > 0 && (
                <button
                  onClick={resetProgress}
                  title="אפס התקדמות"
                  style={{
                    fontSize: 10,
                    background: "transparent",
                    border: "none",
                    color: COLORS_UI.muted,
                    cursor: "pointer",
                    padding: "1px 4px",
                    opacity: 0.55,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.55)}
                >
                  ↺ אפס
                </button>
              )}
            </div>
            <div style={{ height: 4, background: COLORS_UI.barBg }}>
              <div
                style={{
                  height: "100%",
                  width: `${progressPct}%`,
                  background: COLORS_UI.doneText,
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
