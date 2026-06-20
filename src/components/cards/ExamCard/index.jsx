import { memo, useMemo } from "react";
import { card, COLORS_UI } from "../../../styles";
import ExamHeader from "./ExamHeader";
import QuestionRow from "./QuestionRow";

function ExamCard({
  exam,
  isLatest,
  topicHe,
  isExcluded,
  pri,
  sec,
  studyMode,
  setSearchTopic,
  isDone,
  toggleDone,
  hasLabel,
  toggleLabel,
  doneVersion: _dv,
  labelsVersion: _lv,
}) {
  const questions = useMemo(
    () =>
      exam.questions[0]?.number != null
        ? [...exam.questions].sort((a, b) => (a.number ?? 0) - (b.number ?? 0))
        : exam.questions,
    [exam],
  );

  return (
    <div
      style={{
        ...card,
        border: isLatest ? `2px solid ${pri}` : `1px solid ${COLORS_UI.dark}`,
        background: isLatest ? `${pri}10` : COLORS_UI.cardBg,
        boxShadow: `3px 3px 0 ${COLORS_UI.dark}`,
      }}
    >
      <ExamHeader exam={exam} isLatest={isLatest} pri={pri} />

      {questions.map((q) => (
        <QuestionRow
          key={q.id}
          q={q}
          exam={exam}
          topicHe={topicHe}
          pri={pri}
          sec={sec}
          studyMode={studyMode}
          setSearchTopic={setSearchTopic}
          isExcluded={isExcluded}
          isDone={isDone}
          toggleDone={toggleDone}
          hasLabel={hasLabel}
          toggleLabel={toggleLabel}
        />
      ))}
    </div>
  );
}

export default memo(ExamCard);
