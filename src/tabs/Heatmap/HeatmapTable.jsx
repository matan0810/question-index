import { COLORS_UI } from "../../styles";
import { ExcludedTag, excludedRowStyle } from "../../components";
import { examShortLabel, examSemesterLabel } from "../../utils/exam";

export default function HeatmapTable({
  sortedTopics,
  exams,
  stats,
  topicHe,
  isExcluded,
  setSearchTopic,
  latestYear,
  pri,
  heatColor,
}) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ borderCollapse: "collapse", fontSize: 11, minWidth: 1000 }}>
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
                  color: exam.year === latestYear ? pri : COLORS_UI.subdued,
                  fontWeight: exam.year === latestYear ? 800 : 500,
                  minWidth: 34,
                  whiteSpace: "nowrap",
                }}
              >
                {examShortLabel(exam)}
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
                style={excluded ? { ...excludedRowStyle, pointerEvents: "auto" } : {}}
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
                      onClick={() => { if (count > 0) setSearchTopic(topicKey); }}
                      title={count ? `${topicHe[topicKey]} · ${exam.year} ${examSemesterLabel(exam)} מועד ${exam.moed} · ${count} שאלות` : ""}
                      style={{
                        background: heatColor(count),
                        color: count > 2 ? "white" : count > 0 ? pri : "transparent",
                        textAlign: "center",
                        fontWeight: 800,
                        fontSize: 11,
                        padding: "3px 2px",
                        cursor: count > 0 ? "pointer" : "default",
                        border: exam.year === latestYear
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
  );
}
