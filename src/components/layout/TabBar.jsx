import { useCourse } from "../../context/CourseContext";
import { COLORS_UI } from "../../styles";

const TABS = [
  { id: "overview", l: "📊 סקירה" },
  { id: "heatmap",  l: "🔥 מפת חום" },
  { id: "exams",    l: "📜 מבחנים" },
  { id: "search",   l: "🔍 חיפוש" },
  { id: "insights", l: "💡 תובנות" },
];

export default function TabBar({ tab, setTab }) {
  const { colorsUI } = useCourse();

  return (
    <div className="tab-bar">
      {TABS.map((t) => (
        <button
          key={t.id}
          onClick={() => setTab(t.id)}
          style={{
            padding: "9px 15px",
            fontWeight: 700,
            fontSize: 13,
            background: tab === t.id ? COLORS_UI.barBg : "transparent",
            border: "none",
            cursor: "pointer",
            color: tab === t.id ? colorsUI.primary : COLORS_UI.subdued,
            borderBottom: tab === t.id
              ? `3px solid ${colorsUI.primary}`
              : "3px solid transparent",
            marginBottom: -2,
            transition: "color 0.15s, background 0.15s",
          }}
        >
          {t.l}
        </button>
      ))}
    </div>
  );
}
