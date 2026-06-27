import { COLORS_UI } from "../../../styles";
import TopRow from "./TopRow";
import Title from "./Title";
import Stats from "./Stats";

const wrapperStyle = {
  borderTop: `4px solid ${COLORS_UI.dark}`,
  borderBottom: `1px solid ${COLORS_UI.dark}`,
  paddingTop: 6,
  paddingBottom: 20,
  marginBottom: 20,
};

export default function Header({
  course,
  exams,
  colorsUI,
  doneCount,
  labelCount,
  totalQuestions,
  resetProgress,
  studyMode,
  toggleStudyMode,
  activeLecturer,
  setActiveLecturer,
  lecturers,
  activeYearFrom,
  setActiveYearFrom,
  activeYearTo,
  setActiveYearTo,
  clearYearFilter,
  years,
}) {
  return (
    <div style={wrapperStyle}>
      <TopRow
        course={course}
        colorsUI={colorsUI}
        studyMode={studyMode}
        toggleStudyMode={toggleStudyMode}
      />
      <Title
        course={course}
        colorsUI={colorsUI}
        activeLecturer={activeLecturer}
        setActiveLecturer={setActiveLecturer}
        activeYearFrom={activeYearFrom}
        activeYearTo={activeYearTo}
        clearYearFilter={clearYearFilter}
      />
      <Stats
        exams={exams}
        colorsUI={colorsUI}
        activeLecturer={activeLecturer}
        setActiveLecturer={setActiveLecturer}
        lecturers={lecturers}
        activeYearFrom={activeYearFrom}
        setActiveYearFrom={setActiveYearFrom}
        activeYearTo={activeYearTo}
        setActiveYearTo={setActiveYearTo}
        years={years}
        studyMode={studyMode}
        doneCount={doneCount}
        labelCount={labelCount}
        totalQuestions={totalQuestions}
        resetProgress={resetProgress}
      />
    </div>
  );
}
