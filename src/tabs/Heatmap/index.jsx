import { useMemo } from "react";
import { COLORS_UI, blendHex, darkenHex, primaryColor } from "../../styles";
import { CardTitle } from "../../components";
import { useTheme } from "../../context/ThemeContext";
import { makeTopicOrder } from "../../utils/exam";
import Trends from "../Trends";
import HeatmapTable from "./HeatmapTable";
import HeatmapLegend from "./HeatmapLegend";

export default function Heatmap({ stats, setSearchTopic, exams, topicHe, isExcluded, colorsUI, trendFromYear, colors }) {
  const pri = primaryColor(colorsUI);
  const { isDark } = useTheme();
  const heatBase = isDark ? "#1a1816" : "#ffffff";

  const heatColors = useMemo(() => [
    COLORS_UI.barBg,
    blendHex(heatBase, pri, 0.2),
    blendHex(heatBase, pri, 0.45),
    blendHex(heatBase, pri, 0.7),
    pri,
    darkenHex(pri),
  ], [pri, heatBase]);

  const legend = heatColors.map((bg, i) => ({
    bg,
    label: i < heatColors.length - 1 ? String(i) : "5+",
  }));

  function heatColor(count) {
    return heatColors[Math.min(count, heatColors.length - 1)];
  }

  // Rows follow the syllabus order (TOPIC_HE key order) so the map reads like the
  // course outline top-to-bottom; excluded topics drop to the bottom.
  const sortedTopics = useMemo(() => {
    const bySyllabus = makeTopicOrder(topicHe);
    const all = Object.entries(stats.topicCounts).sort((a, b) =>
      bySyllabus(a[0], b[0]),
    );
    return [
      ...all.filter(([key]) => !isExcluded(key)),
      ...all.filter(([key]) => isExcluded(key)),
    ];
  }, [stats, isExcluded, topicHe]);

  const latestYear = useMemo(
    () => (exams.length ? Math.max(...exams.map((e) => e.year)) : null),
    [exams],
  );

  if (!exams.length) return <div className="empty-state">אין נתונים</div>;

  return (
    <>
      <div className="ui-card">
        <CardTitle
          emoji="🗺️"
          title="מפת חום — נושאים × מבחנים"
          sub={`כהה יותר = יותר שאלות · לחץ על תא לחיפוש${latestYear ? ` · עמודת ${latestYear} מסומנת` : ""}`}
        />
        <HeatmapTable
          sortedTopics={sortedTopics}
          exams={exams}
          stats={stats}
          topicHe={topicHe}
          isExcluded={isExcluded}
          setSearchTopic={setSearchTopic}
          latestYear={latestYear}
          pri={pri}
          heatColor={heatColor}
        />
        <HeatmapLegend legend={legend} />
      </div>

      {trendFromYear && colors && (
        <Trends
          exams={exams}
          topicHe={topicHe}
          isExcluded={isExcluded}
          trendFromYear={trendFromYear}
          colorsUI={colorsUI}
          colors={colors}
        />
      )}
    </>
  );
}
