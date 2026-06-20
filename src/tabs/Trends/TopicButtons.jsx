import { COLORS_UI } from "../../styles";

export default function TopicButtons({ topTopics, selected, topicColors, topicHe, toggleTopic }) {
  return (
    <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
      {topTopics.map((t, i) => {
        const isActive = selected.has(t);
        const color = topicColors[i];
        return (
          <button
            key={t}
            onClick={() => toggleTopic(t)}
            style={{
              padding: "4px 11px",
              fontSize: 11,
              fontWeight: isActive ? 700 : 400,
              cursor: "pointer",
              background: isActive ? color + "1a" : "transparent",
              color: isActive ? color : COLORS_UI.muted,
              border: `1px solid ${isActive ? color + "88" : COLORS_UI.border}`,
              borderRadius: 2,
              fontFamily: "inherit",
              transition: "color 0.12s, background 0.12s, border-color 0.12s",
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            {isActive && (
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: color,
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
            )}
            {topicHe[t] || t}
          </button>
        );
      })}
    </div>
  );
}
