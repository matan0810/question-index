import { Bar, ExcludedTag, excludedRowStyle } from "../../components";
import { COLORS_UI, FONTS } from "../../styles";

export default function ExcludedSection({ excluded, showExcluded, setShowExcluded, maxTopicCount, stats, topicHe, setSearchTopic }) {
  return (
    <>
      <button
        onClick={() => setShowExcluded((v) => !v)}
        style={{
          marginTop: 8,
          width: "100%",
          background: showExcluded ? COLORS_UI.barBg : COLORS_UI.cardBg,
          border: `1px solid ${COLORS_UI.border}`,
          borderStyle: "dashed",
          color: COLORS_UI.subdued,
          cursor: "pointer",
          fontSize: 11,
          fontWeight: 700,
          padding: "7px 12px",
          fontFamily: FONTS.sans,
          letterSpacing: "0.01em",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = COLORS_UI.barBg;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = showExcluded ? COLORS_UI.barBg : COLORS_UI.cardBg;
        }}
      >
        <span>{showExcluded ? "▲ הסתר נושאים שלא בחומר" : "▼ נושאים שלא בחומר"}</span>
        <span
          style={{
            background: COLORS_UI.border,
            color: COLORS_UI.text,
            fontSize: 10,
            fontWeight: 800,
            padding: "2px 7px",
          }}
        >
          {excluded.length}
        </span>
      </button>
      {showExcluded &&
        excluded.map(([topicKey, count]) => (
          // Dimmed like the rest of the excluded list, but still clickable — a
          // click jumps to search and reveals the out-of-syllabus results.
          <div key={topicKey} style={{ ...excludedRowStyle, pointerEvents: "auto" }}>
            <Bar
              label={
                <span style={{ display: "inline-flex", alignItems: "baseline", gap: 6 }}>
                  <ExcludedTag />
                  <bdi>{topicHe[topicKey] || topicKey}</bdi>
                </span>
              }
              val={count}
              max={maxTopicCount}
              color={COLORS_UI.muted}
              pct={Math.round((count / stats.total) * 100)}
              onClick={() => setSearchTopic(topicKey)}
            />
          </div>
        ))}
    </>
  );
}
