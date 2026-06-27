import { useState, useMemo } from "react";
import { COLORS_UI, primaryColor } from "../../styles";
import { CardTitle } from "../../components";
import { computeYearTopics, getTopTopics } from "../../utils";
import TopicButtons from "./TopicButtons";
import TrendsChart from "./TrendsChart";
import TrendsLegend from "./TrendsLegend";

export default function Trends({ exams, topicHe, isExcluded, trendFromYear, colorsUI, colors }) {
  const pri = primaryColor(colorsUI);

  const topTopics = useMemo(
    () => getTopTopics(exams, trendFromYear, isExcluded),
    [exams, trendFromYear, isExcluded],
  );

  const [selected, setSelected] = useState(
    () => new Set(getTopTopics(exams, trendFromYear, isExcluded, 5)),
  );

  const byYear = useMemo(
    () => computeYearTopics(exams, trendFromYear, isExcluded),
    [exams, trendFromYear, isExcluded],
  );

  const years = Object.keys(byYear).map(Number).sort();

  function toggleTopic(t) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(t)) {
        if (next.size > 1) next.delete(t);
      } else {
        next.add(t);
      }
      return next;
    });
  }

  const topicColors = topTopics.map((_, i) => colors[i % colors.length]);

  const maxVal = useMemo(() => {
    let m = 0;
    [...selected].forEach((topic) => {
      years.forEach((yr) => {
        m = Math.max(m, byYear[yr]?.[topic] || 0);
      });
    });
    return Math.max(m, 4);
  }, [selected, byYear, years]);

  const yTicks = useMemo(() => {
    const step = maxVal <= 6 ? 1 : maxVal <= 12 ? 2 : maxVal <= 20 ? 4 : 5;
    const ticks = [];
    for (let v = 0; v <= maxVal; v += step) ticks.push(v);
    if (ticks[ticks.length - 1] < maxVal) ticks.push(maxVal);
    return ticks;
  }, [maxVal]);

  if (years.length < 2) {
    return (
      <div className="ui-card">
        <CardTitle emoji="📈" title={`מגמות ${trendFromYear}+`} sub="אין מספיק נתונים להצגת גרף" />
        <div style={{ color: COLORS_UI.muted, fontSize: 12 }}>דרוש לפחות שנתיים של מבחנים</div>
      </div>
    );
  }

  return (
    <div className="ui-card">
      <CardTitle
        emoji="📈"
        title={`מגמות לפי שנה (${trendFromYear}–${years[years.length - 1]})`}
        sub="בחרו נושאים לצפייה — לחצו שוב להסרה"
      />
      <TopicButtons
        topTopics={topTopics}
        selected={selected}
        topicColors={topicColors}
        topicHe={topicHe}
        toggleTopic={toggleTopic}
      />
      <TrendsChart
        years={years}
        yTicks={yTicks}
        selected={selected}
        topTopics={topTopics}
        topicColors={topicColors}
        byYear={byYear}
        pri={pri}
        maxVal={maxVal}
        topicHe={topicHe}
      />
      <TrendsLegend
        selected={selected}
        topTopics={topTopics}
        topicColors={topicColors}
        topicHe={topicHe}
        pri={pri}
      />
    </div>
  );
}
