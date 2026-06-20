import { useMemo } from "react";
import { COLORS_UI, blendHex, darkenHex, primaryColor } from "../styles";
import { CardTitle, ExcludedTag, excludedRowStyle } from "../components";
import { useTheme } from "../context/ThemeContext";
import Trends from "./Trends";

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

  // Active topics first (sorted by frequency), excluded topics at the bottom
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

      <div style={{ overflowX: "auto" }}>
        <table
          style={{ borderCollapse: "collapse", fontSize: 11, minWidth: 1000 }}
        >
          <thead>
            <tr>
              <th
                style={{
                  padding: "4px 16px 4px 0",
                  textAlign: "right",
                  fontSize: 11,
                  fontWeight: 700,
                  color: COLORS_UI.text,
                  minWidth: 200,
                }}
              >
                נושא
              </th>
              {exams.map((exam) => (
                <th
                  key={exam.code}
                  style={{
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    padding: "6px 3px",
                    fontSize: 9,
                    color:
                      exam.year === latestYear
                        ? pri
                        : COLORS_UI.subdued,
                    fontWeight: exam.year === latestYear ? 800 : 500,
                    minWidth: 34,
                    whiteSpace: "nowrap",
                  }}
                >
                  {exam.year}/{exam.moed}
                </th>
              ))}
              <th
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: COLORS_UI.bg,
                  background: COLORS_UI.dark,
                  padding: "4px 8px",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                }}
              >
                סה״כ
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedTopics.map(([topicKey, totalCount]) => {
              const excluded = isExcluded(topicKey);
              return (
                <tr
                  key={topicKey}
                  style={
                    excluded
                      ? { ...excludedRowStyle, pointerEvents: "auto" }
                      : {}
                  }
                >
                  <td
                    style={{
                      padding: "5px 16px 5px 0",
                      textAlign: "right",
                      fontSize: 12,
                      fontWeight: 600,
                      color: excluded ? COLORS_UI.muted : COLORS_UI.dark,
                      borderLeft: `2px solid ${COLORS_UI.border}`,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {excluded && <ExcludedTag />}
                    {topicHe[topicKey] || topicKey}
                  </td>
                  {exams.map((exam) => {
                    const count = stats.examTopics[exam.code][topicKey] || 0;
                    return (
                      <td
                        key={exam.code}
                        onClick={() => {
                          if (count > 0 && !excluded) setSearchTopic(topicKey);
                        }}
                        title={
                          count
                            ? `${topicHe[topicKey]} · ${exam.year} מועד ${exam.moed} · ${count} שאלות`
                            : ""
                        }
                        style={{
                          background: heatColor(count),
                          color:
                            count > 2
                              ? "white"
                              : count > 0
                                ? pri
                                : "transparent",
                          textAlign: "center",
                          fontWeight: 800,
                          fontSize: 11,
                          padding: "3px 2px",
                          cursor:
                            count > 0 && !excluded ? "pointer" : "default",
                          border:
                            exam.year === latestYear
                              ? `2px solid ${pri}`
                              : `1px solid ${COLORS_UI.bg}`,
                          minWidth: 32,
                          height: 30,
                        }}
                      >
                        {count || ""}
                      </td>
                    );
                  })}
                  <td
                    style={{
                      textAlign: "center",
                      fontWeight: 800,
                      fontSize: 12,
                      background: COLORS_UI.dark,
                      color: COLORS_UI.bg,
                      padding: "3px 10px",
                    }}
                  >
                    {totalCount}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div
        style={{
          marginTop: 14,
          paddingTop: 12,
          borderTop: `1px solid ${COLORS_UI.rowDivider}`,
          display: "flex",
          gap: 6,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontSize: 11, color: COLORS_UI.subdued, marginLeft: 8 }}>
          מס׳ שאלות לפי מבחן:
        </span>
        {legend.map(({ bg, label }) => (
          <span
            key={bg}
            style={{ display: "flex", alignItems: "center", gap: 4 }}
          >
            <span
              style={{
                width: 20,
                height: 20,
                background: bg,
                display: "inline-block",
                border: `1px solid ${COLORS_UI.border}`,
              }}
            />
            <span
              style={{ fontSize: 11, fontWeight: 600, color: COLORS_UI.text }}
            >
              {label}
            </span>
          </span>
        ))}
      </div>
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
