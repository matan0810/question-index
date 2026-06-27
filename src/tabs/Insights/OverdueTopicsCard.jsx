import { CardTitle, Badge } from "../../components";
import InsightRow from "./InsightRow";

export default function OverdueTopicsCard({
  overdueTopics,
  maxYear,
  topicHe,
  accent,
  onTopicClick,
}) {
  return (
    <div className="ui-card">
      <CardTitle emoji="🎯" title="צפוי לבוא" sub="לחץ על נושא לחיפוש שאלות" />
      {overdueTopics.map(({ topic, count, last }) => (
        <InsightRow key={topic} onClick={() => onTopicClick(topic)} hoverBg={`${accent}12`}>
          <div className="insight-item">
            <Badge bg={accent}>{count}×</Badge>
            <div>
              <div className="topic-title">{topicHe[topic] || topic}</div>
              <div className="topic-sub">
                נראה לאחרונה {last} · {maxYear - last} שנים ללא הופעה
              </div>
            </div>
          </div>
        </InsightRow>
      ))}
    </div>
  );
}
