import { useNavigate } from "react-router-dom";
import { COLORS_UI, FONTS, primaryColor } from "../../styles";
import DarkToggle from "../DarkToggle";

export default function TopRow({ course, colorsUI, studyMode, toggleStudyMode }) {
  const pri = primaryColor(colorsUI);
  const navigate = useNavigate();

  return (
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
  );
}
