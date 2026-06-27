import { CardTitle, Badge } from "../../components";
import InsightRow from "./InsightRow";
import { CARD_TOP_N } from "./constants";

export default function TopTopicsCard({
  sortedTopics,
  exams,
  stats,
  topicHe,
  accent,
  onTopicClick,
}) {
  return (
    <div className="ui-card">
      <CardTitle emoji="🔥" title="חובה ללמוד" sub="לחץ על נושא לחיפוש שאלות" />
      {sortedTopics.slice(0, CARD_TOP_N).map(([key, count]) => {
        const examCount = exams.filter((exam) => stats.examTopics[exam.code][key]).length;
        return (
          <InsightRow key={key} onClick={() => onTopicClick(key)} hoverBg={`${accent}12`}>
            <div className="insight-item">
              <Badge>{count}</Badge>
              <div>
                <div className="topic-title" style={{ color: accent }}>
                  {topicHe[key]}
                </div>
                <div className="topic-sub">
                  {examCount}/{exams.length} מבחנים ·{" "}
                  {Math.round((examCount / exams.length) * 100)}%
                </div>
              </div>
            </div>
          </InsightRow>
        );
      })}
    </div>
  );
}
