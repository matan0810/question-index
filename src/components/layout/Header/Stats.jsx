import { primaryColor } from "../../../styles";
import { questionTopics } from "../../../utils";
import ProgressWidget from "./ProgressWidget";
import GlobalFilters from "./GlobalFilters";

// The four headline numbers shown above the filters: exams, questions, distinct
// topics and the covered year range.
function summaryStats(exams) {
  if (!exams.length) {
    return [
      [0, "מבחנים"],
      [0, "שאלות"],
      [0, "נושאים"],
      ["—", "שנים"],
    ];
  }
  const years = exams.map((e) => e.year);
  const questionCount = exams.reduce((sum, e) => sum + e.questions.length, 0);
  const topicCount = new Set(exams.flatMap((e) => e.questions.flatMap(questionTopics))).size;
  return [
    [exams.length, "מבחנים"],
    [questionCount, "שאלות"],
    [topicCount, "נושאים"],
    [`${Math.min(...years)}–${Math.max(...years)}`, "שנים"],
  ];
}

export default function Stats({
  exams,
  colorsUI,
  activeLecturer,
  setActiveLecturer,
  lecturers,
  activeYearFrom,
  setActiveYearFrom,
  activeYearTo,
  setActiveYearTo,
  years,
  studyMode,
  doneCount,
  labelCount,
  totalQuestions,
  resetProgress,
}) {
  const accent = primaryColor(colorsUI);

  return (
    <div className="stats-row" style={{ alignItems: "flex-end" }}>
      {summaryStats(exams).map(([value, label]) => (
        <div key={label}>
          <div className="stat-num">{value}</div>
          <div className="stat-label">{label}</div>
        </div>
      ))}

      <GlobalFilters
        years={years}
        lecturers={lecturers}
        activeYearFrom={activeYearFrom}
        setActiveYearFrom={setActiveYearFrom}
        activeYearTo={activeYearTo}
        setActiveYearTo={setActiveYearTo}
        activeLecturer={activeLecturer}
        setActiveLecturer={setActiveLecturer}
        accent={accent}
      />

      {studyMode && totalQuestions > 0 && (
        <ProgressWidget
          doneCount={doneCount}
          labelCount={labelCount}
          totalQuestions={totalQuestions}
          resetProgress={resetProgress}
        />
      )}
    </div>
  );
}
