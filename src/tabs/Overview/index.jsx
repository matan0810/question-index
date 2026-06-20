import { useMemo, useState } from "react";
import { Bar, CardTitle, useTypeHelpers } from "../../components";
import { COLORS_UI } from "../../styles";
import { TOPICS_INITIAL } from "./constants";
import ShowMoreControls from "./ShowMoreControls";
import ExcludedSection from "./ExcludedSection";

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
        <CardTitle emoji="📊" title="דירוג נושאים" sub="לחץ על נושא לחיפוש שאלות" />
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
                  <span style={{ fontSize: 11, color: COLORS_UI.muted, marginRight: 8 }}>
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
              pct={Math.round(((stats.chapterCounts[key] || 0) / stats.total) * 100)}
              onClick={() => setSearchChapter(key)}
            />
          ))}
        </div>

        <div className="ui-card">
          <CardTitle emoji="🏷️" title="סוג שאלה" sub="לחץ על סוג לחיפוש שאלות" />
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
