import { useMemo, useState } from "react";
import { Bar, CardTitle, ExcludedTag, excludedRowStyle, useTypeHelpers } from "../components";
import { COLORS_UI, FONTS } from "../styles";

const EXCLUDED_LABEL = COLORS_UI.muted;
const TOPICS_INITIAL = 14;
const TOPICS_INCREMENT = 7;

function ShowMoreControls({ active, visibleCount, setVisibleCount }) {
  const remaining = active.length - visibleCount;
  const showingAll = visibleCount >= active.length;

  return (
    <div style={{ marginTop: 14 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: showingAll ? 0 : 8,
        }}
      >
        <span style={{ fontSize: 11, color: COLORS_UI.muted, fontWeight: 600 }}>
          {Math.min(visibleCount, active.length)}/{active.length} נושאים
        </span>
        {visibleCount > TOPICS_INITIAL && (
          <button
            onClick={() => setVisibleCount(TOPICS_INITIAL)}
            style={{
              background: "transparent",
              border: "none",
              color: COLORS_UI.muted,
              cursor: "pointer",
              fontSize: 11,
              padding: "2px 6px",
              fontFamily: FONTS.sans,
              textDecoration: "underline",
              textDecorationStyle: "dotted",
            }}
          >
            ▲ צמצם
          </button>
        )}
      </div>

      {!showingAll && (
        <button
          onClick={() =>
            setVisibleCount((v) => Math.min(v + TOPICS_INCREMENT, active.length))
          }
          style={{
            width: "100%",
            background: "transparent",
            border: `1px solid ${COLORS_UI.border}`,
            color: COLORS_UI.subdued,
            cursor: "pointer",
            fontSize: 12,
            padding: "7px 14px",
            fontFamily: FONTS.sans,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            transition: "background 0.12s, color 0.12s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = COLORS_UI.barBg;
            e.currentTarget.style.color = COLORS_UI.text;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = COLORS_UI.subdued;
          }}
        >
          <span>▼ עוד {Math.min(remaining, TOPICS_INCREMENT)} נושאים</span>
          {remaining > TOPICS_INCREMENT && (
            <span style={{ fontSize: 11, opacity: 0.6 }}>נותרו {remaining}</span>
          )}
        </button>
      )}
    </div>
  );
}

function ExcludedSection({ excluded, showExcluded, setShowExcluded, maxTopicCount, stats, topicHe }) {
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
          <div key={topicKey} style={excludedRowStyle}>
            <Bar
              label={
                <span>
                  <ExcludedTag />
                  {topicHe[topicKey] || topicKey}
                </span>
              }
              val={count}
              max={maxTopicCount}
              color={EXCLUDED_LABEL}
              pct={Math.round((count / stats.total) * 100)}
            />
          </div>
        ))}
    </>
  );
}

export default function Overview({
  stats,
  setSearchTopic,
  setSearchChapter,
  setSearchType,
  exams,
  topicHe,
  colors,
  isExcluded,
  chapters,
}) {
  const { typeToLabel } = useTypeHelpers();
  const [visibleCount, setVisibleCount] = useState(TOPICS_INITIAL);
  const [showExcluded, setShowExcluded] = useState(false);

  const { active, excluded } = useMemo(() => {
    const all = Object.entries(stats.topicCounts).sort((a, b) => b[1] - a[1]);
    return {
      active: all.filter(([key]) => !isExcluded(key)),
      excluded: all.filter(([key]) => isExcluded(key)),
    };
  }, [stats, isExcluded]);

  const maxTopicCount = active[0]?.[1] || 1;
  const maxChapterCount = Math.max(...Object.values(stats.chapterCounts));
  const maxTypeCount = Object.values(stats.typeCounts).sort((a, b) => b - a)[0];

  return (
    <div className="auto-grid">
      <div className="ui-card">
        <CardTitle
          emoji="📊"
          title="דירוג נושאים"
          sub="לחץ על נושא לחיפוש שאלות"
        />
        {active.slice(0, visibleCount).map(([topicKey, count], i) => {
          const examCount = exams.filter(
            (exam) => exam.questions.some((q) => q.topic === topicKey),
          ).length;
          return (
            <Bar
              key={topicKey}
              label={
                <span>
                  {topicHe[topicKey] || topicKey}
                  <span
                    style={{
                      fontSize: 11,
                      color: COLORS_UI.muted,
                      marginRight: 8,
                    }}
                  >
                    {examCount}/{exams.length} מבחנים
                  </span>
                </span>
              }
              val={count}
              max={maxTopicCount}
              color={colors[i % colors.length]}
              pct={Math.round((count / (stats.total || 1)) * 100)}
              onClick={() => setSearchTopic(topicKey)}
            />
          );
        })}
        {active.length > TOPICS_INITIAL && (
          <ShowMoreControls
            active={active}
            visibleCount={visibleCount}
            setVisibleCount={setVisibleCount}
          />
        )}
        {excluded.length > 0 && (
          <ExcludedSection
            excluded={excluded}
            showExcluded={showExcluded}
            setShowExcluded={setShowExcluded}
            maxTopicCount={maxTopicCount}
            stats={stats}
            topicHe={topicHe}
          />
        )}
      </div>

      <div>
        <div className="ui-card">
          <CardTitle emoji="📚" title="פרקים" sub="לחץ על פרק לחיפוש שאלות" />
          {chapters.map(({ key, label, color }) => (
            <Bar
              key={key}
              label={label}
              val={stats.chapterCounts[key] || 0}
              max={maxChapterCount}
              color={color}
              pct={Math.round(
                ((stats.chapterCounts[key] || 0) / stats.total) * 100,
              )}
              onClick={() => setSearchChapter(key)}
            />
          ))}
        </div>

        <div className="ui-card">
          <CardTitle
            emoji="🏷️"
            title="סוג שאלה"
            sub="לחץ על סוג לחיפוש שאלות"
          />
          {Object.entries(stats.typeCounts)
            .sort((a, b) => b[1] - a[1])
            .map(([type, count], i) => (
              <Bar
                key={type}
                label={typeToLabel(type)}
                val={count}
                max={maxTypeCount}
                color={colors[i % colors.length]}
                pct={Math.round((count / stats.total) * 100)}
                onClick={() => setSearchType(type)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
