import { COLORS_UI } from "../../styles";
import { CardTitle, Badge } from "../../components";
import InsightRow from "./InsightRow";

export default function RareTopicsCard({
  rareTopics,
  exams,
  stats,
  topicHe,
  accent,
  onTopicClick,
}) {
  return (
    <div className="ui-card">
      <CardTitle emoji="❄️" title="פחות שכיח" sub="לחץ על נושא לחיפוש שאלות" />
      {rareTopics.map(([key, count]) => {
        const examCount = exams.filter((exam) => stats.examTopics[exam.code][key]).length;
        return (
          <InsightRow key={key} onClick={() => onTopicClick(key)} hoverBg={`${accent}12`}>
            <div className="insight-item">
              <Badge bg={COLORS_UI.barBg} color={COLORS_UI.text}>
                {count}
              </Badge>
              <div>
                <div className="topic-title">{topicHe[key]}</div>
                <div className="topic-sub">ב-{examCount} מבחנים בלבד</div>
              </div>
            </div>
          </InsightRow>
        );
      })}
    </div>
  );
}
