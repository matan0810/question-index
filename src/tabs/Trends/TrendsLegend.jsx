import { COLORS_UI } from "../../styles";

export default function TrendsLegend({ selected, topTopics, topicColors, topicHe, pri }) {
  if (selected.size === 0) return null;
  return (
    <div
      style={{
        marginTop: 10,
        paddingTop: 10,
        borderTop: `1px solid ${COLORS_UI.rowDivider}`,
        display: "flex",
        gap: 14,
        flexWrap: "wrap",
      }}
    >
      {[...selected].map((topic) => {
        const ti = topTopics.indexOf(topic);
        const color = ti >= 0 ? topicColors[ti] : pri;
        return (
          <span
            key={topic}
            style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: COLORS_UI.text }}
          >
            <span
              style={{
                width: 18,
                height: 3,
                background: color,
                display: "inline-block",
                borderRadius: 2,
                flexShrink: 0,
              }}
            />
            {topicHe[topic] || topic}
          </span>
        );
      })}
    </div>
  );
}
