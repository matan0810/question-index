import { useMemo } from "react";
import { COLORS_UI, blendHex, darkenHex, primaryColor } from "../../styles";
import { CardTitle } from "../../components";
import { useTheme } from "../../context/ThemeContext";
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

  const sortedTopics = useMemo(() => {
    const all = Object.entries(stats.topicCounts).sort((a, b) => b[1] - a[1]);
    return [
      ...all.filter(([key]) => !isExcluded(key)),
      ...all.filter(([key]) => isExcluded(key)),
    ];
  }, [stats, isExcluded]);

  const latestYear = useMemo(() => Math.max(...exams.map((e) => e.year)), [exams]);

  return (
    <>
      <div className="ui-card">
        <CardTitle
          emoji="🗺️"
          title="מפת חום — נושאים × מבחנים"
          sub={`כהה יותר = יותר שאלות · לחץ על תא לחיפוש · עמודת ${latestYear} מסומנת`}
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
