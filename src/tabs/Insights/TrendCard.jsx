import { CardTitle, Badge } from "../../components";
import InsightRow from "./InsightRow";

export default function TrendCard({
  recentTrend,
  trendFromYear,
  maxYear,
  topicHe,
  accent,
  onTopicClick,
}) {
  return (
    <div className="ui-card">
      <CardTitle
        emoji="📈"
        title={`טרנד ${trendFromYear}–${maxYear}`}
        sub="לחץ על נושא לחיפוש שאלות"
      />
      {recentTrend.entries.map(([key, count]) => (
        <InsightRow key={key} onClick={() => onTopicClick(key)} hoverBg={`${accent}12`}>
          <div className="insight-item">
            <Badge>{count}</Badge>
            <div>
              <div className="topic-title">{topicHe[key]}</div>
              <div className="topic-sub">
                {Math.round((count / recentTrend.total) * 100)}% מהשאלות
              </div>
            </div>
          </div>
        </InsightRow>
      ))}
    </div>
  );
}
