import { COLORS_UI } from "../styles";

// Shared page footer. Pass `stats` ({ exams, questions, minYear, maxYear }) to
// show the course summary line (course page); omit it on the landing page.
// `stickToBottom` pushes the footer to the bottom of a flex-column page.
export default function Footer({ stats, stickToBottom = false }) {
  return (
    <div
      style={{
        marginTop: stickToBottom ? "auto" : 28,
        paddingTop: stickToBottom ? 28 : 14,
        borderTop: `1px solid ${COLORS_UI.border}`,
        fontSize: 11,
        color: COLORS_UI.muted,
        display: "flex",
        alignItems: "center",
      }}
    >
      <span style={{ flex: 1 }}>
        סיווג ידני
        {stats &&
          ` · ${stats.exams} מבחנים · ${stats.questions} שאלות · ${stats.minYear}–${stats.maxYear}`}
      </span>
      <span style={{ flex: 2, textAlign: "center" }}>
        האפליקציה מיועדת לשימוש אישי בלבד לצורכי לימוד.
      </span>
      <span style={{ flex: 1, textAlign: "end" }}>v2.0</span>
    </div>
  );
}
