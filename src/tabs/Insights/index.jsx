import { useMemo, useState } from "react";
import { COLORS_UI, primaryColor } from "../../styles";
import { CardTitle, Badge, MathText } from "../../components";
import InsightRow from "./InsightRow";

export default function Insights({
  stats,
  setSearchTopic,
  exams,
  topicHe,
  excludedTopics,
  traps,
  trendFromYear,
  colorsUI,
}) {
  const pri = primaryColor(colorsUI);
  const maxYear = useMemo(() => Math.max(...exams.map((e) => e.year)), [exams]);

  const nav = (key) => setSearchTopic(key);
  const [openTrap, setOpenTrap] = useState(null);

  const sortedTopics = useMemo(
    () =>
      Object.entries(stats.topicCounts)
        .filter(([key]) => !excludedTopics.has(key))
        .sort((a, b) => b[1] - a[1]),
    [stats, excludedTopics],
  );

  const overdueTopics = useMemo(() => {
    const lastSeen = {};
    const totalCount = {};
    exams.forEach((exam) => {
      exam.questions.forEach((q) => {
        totalCount[q.topic] = (totalCount[q.topic] || 0) + 1;
        if (!lastSeen[q.topic] || exam.year > lastSeen[q.topic])
          lastSeen[q.topic] = exam.year;
      });
    });
    return Object.entries(totalCount)
      .filter(
        ([key, count]) =>
          !excludedTopics.has(key) &&
          count >= 3 &&
          maxYear - (lastSeen[key] || 0) >= 3,
      )
      .sort((a, b) => lastSeen[a[0]] - lastSeen[b[0]])
      .slice(0, 6)
      .map(([key, count]) => ({ topic: key, count, last: lastSeen[key] }));
  }, [exams, excludedTopics, maxYear]);

  const recentTrend = useMemo(() => {
    const counts = {};
    let total = 0;
    exams.filter((e) => e.year >= trendFromYear).forEach((exam) =>
      exam.questions.forEach((q) => {
        if (excludedTopics.has(q.topic)) return;
        counts[q.topic] = (counts[q.topic] || 0) + 1;
        total++;
      }),
    );
    return {
      entries: Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6),
      total,
    };
  }, [exams, trendFromYear, excludedTopics]);

  return (
    <div className="auto-grid">
      <div className="ui-card">
        <CardTitle emoji="🔥" title="חובה ללמוד" sub="לחץ על נושא לחיפוש שאלות" />
        {sortedTopics.slice(0, 5).map(([key, count]) => {
          const examCount = exams.filter(
            (exam) => stats.examTopics[exam.code][key],
          ).length;
          return (
            <InsightRow key={key} onClick={() => nav(key)} hoverBg={`${pri}12`}>
              <div className="insight-item">
                <Badge>{count}</Badge>
                <div>
                  <div className="topic-title" style={{ color: pri }}>
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

      <div className="ui-card">
        <CardTitle
          emoji="⚠️"
          title="מלכודות חוזרות"
          sub="שאלות כמעט זהות שחזרו מספר פעמים"
        />
        {traps.map((trap, i) => (
          <InsightRow
            key={i}
            onClick={() => setOpenTrap(openTrap === i ? null : i)}
            hoverBg={`${pri}0d`}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
              <div className="topic-title" style={{ color: pri, flex: 1 }}>
                <MathText>{trap.t}</MathText>
              </div>
              <span style={{ color: COLORS_UI.muted, fontSize: 12, flexShrink: 0, marginTop: 2 }}>
                {openTrap === i ? "▲" : "▼"}
              </span>
            </div>
            {openTrap === i && (
              <div
                className="topic-sub"
                style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${COLORS_UI.rowDivider}` }}
              >
                <MathText>{trap.n}</MathText>
              </div>
            )}
          </InsightRow>
        ))}
      </div>

      <div className="ui-card">
        <CardTitle
          emoji="📈"
          title={`טרנד ${trendFromYear}–${maxYear}`}
          sub="לחץ על נושא לחיפוש שאלות"
        />
        {recentTrend.entries.map(([key, count]) => (
          <InsightRow key={key} onClick={() => nav(key)} hoverBg={`${pri}12`}>
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

      <div className="ui-card">
        <CardTitle emoji="🎯" title="צפוי לבוא" sub="לחץ על נושא לחיפוש שאלות" />
        {overdueTopics.length === 0 ? (
          <div className="topic-sub" style={{ fontStyle: "italic" }}>אין נושאים כאלה</div>
        ) : (
          overdueTopics.map(({ topic, count, last }) => (
            <InsightRow key={topic} onClick={() => nav(topic)} hoverBg={`${pri}12`}>
              <div className="insight-item">
                <Badge bg={pri}>{count}×</Badge>
                <div>
                  <div className="topic-title">{topicHe[topic] || topic}</div>
                  <div className="topic-sub">
                    נראה לאחרונה {last} · {maxYear - last} שנים ללא הופעה
                  </div>
                </div>
              </div>
            </InsightRow>
          ))
        )}
      </div>

      <div className="ui-card">
        <CardTitle emoji="❄️" title="פחות שכיח" sub="לחץ על נושא לחיפוש שאלות" />
        {sortedTopics
          .filter(([, count]) => count <= 3)
          .map(([key, count]) => {
            const examCount = exams.filter(
              (exam) => stats.examTopics[exam.code][key],
            ).length;
            return (
              <InsightRow key={key} onClick={() => nav(key)} hoverBg={`${pri}12`}>
                <div className="insight-item">
                  <Badge bg={COLORS_UI.barBg} color={COLORS_UI.text}>{count}</Badge>
                  <div>
                    <div className="topic-title">{topicHe[key]}</div>
                    <div className="topic-sub">ב-{examCount} מבחנים בלבד</div>
                  </div>
                </div>
              </InsightRow>
            );
          })}
      </div>
    </div>
  );
}
