import { COLORS_UI } from "../../styles";
import TopRow from "./TopRow";
import Title from "./Title";
import Stats from "./Stats";

export default function Header({
  course,
  exams,
  colorsUI,
  doneCount,
  totalQuestions,
  resetProgress,
  studyMode,
  toggleStudyMode,
  activeLecturer,
  setActiveLecturer,
  lecturers,
}) {
  return (
    <div
      style={{
        borderTop: `4px solid ${COLORS_UI.dark}`,
        borderBottom: `1px solid ${COLORS_UI.dark}`,
        paddingTop: 6,
        paddingBottom: 20,
        marginBottom: 20,
      }}
    >
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
      />
      <Stats
        exams={exams}
        colorsUI={colorsUI}
        activeLecturer={activeLecturer}
        setActiveLecturer={setActiveLecturer}
        lecturers={lecturers}
        studyMode={studyMode}
        doneCount={doneCount}
        totalQuestions={totalQuestions}
        resetProgress={resetProgress}
      />
    </div>
  );
}
