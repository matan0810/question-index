import { useTheme } from "../../context/ThemeContext";
import { COLORS_UI } from "../../styles";

export default function DarkToggle() {
  const { isDark, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      title={isDark ? "עבור למצב יום" : "עבור למצב לילה"}
      style={{
        background: isDark ? COLORS_UI.barBg : "transparent",
        border: `1px solid ${isDark ? COLORS_UI.subdued : COLORS_UI.border}`,
        color: isDark ? COLORS_UI.text : COLORS_UI.muted,
        cursor: "pointer",
        fontSize: 11,
        fontWeight: 600,
        padding: "4px 10px",
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        transition: "background 0.15s, border-color 0.15s, color 0.15s",
        lineHeight: 1,
        userSelect: "none",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = COLORS_UI.subdued;
        e.currentTarget.style.color = COLORS_UI.text;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = isDark ? COLORS_UI.subdued : COLORS_UI.border;
        e.currentTarget.style.color = isDark ? COLORS_UI.text : COLORS_UI.muted;
      }}
    >
      {isDark ? "☾ לילה" : "☼ יום"}
    </button>
  );
}
