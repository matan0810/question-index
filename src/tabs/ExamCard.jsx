import { memo, useMemo } from "react";
import {
  Chip,
  QuestionChips,
  ExamPartLabel,
  ActiveLabelChips,
  ExcludedTag,
  MathText,
  StudyControls,
} from "../components";
import { card, COLORS_UI, FONTS } from "../styles";
import {
  examLecturerLabel,
  questionExamPartName,
  questionDisplayNumber,
} from "../utils/exam";

// One exam's card in the Exams tab. Memoized so sorting/filtering the list only
// reorders cards instead of re-rendering every question row. doneVersion /
// labelsVersion aren't read directly — they change on progress/label updates so
// memo lets the card re-render then (same pattern as SearchResultCard).
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
      <div
        style={{
          marginBottom: 10,
          paddingBottom: 8,
          borderBottom: `1px solid ${COLORS_UI.border}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <div style={{ fontFamily: FONTS.serif, fontWeight: 900, fontSize: 26, lineHeight: 1 }}>
            {exam.year}
          </div>
          <div style={{ fontWeight: 700, fontSize: 15 }}>מועד {exam.moed}</div>
          {isLatest && <Chip kind="hot">המבחן שלך!</Chip>}
        </div>
        <div style={{ fontSize: 11, color: COLORS_UI.muted, marginTop: 3 }}>
          מבנה {exam.chapter_structure} · {exam.questions.length} שאלות
          {` · ${examLecturerLabel(exam)}`}
        </div>
      </div>

      {questions.map((q) => {
        const excluded = isExcluded(q.topic);
        const examPart = questionExamPartName(exam, q.id);
        const questionKey = `${exam.code}__${q.id}`;
        const done = isDone?.(questionKey) ?? false;

        return (
          <div
            key={q.id}
            style={{
              display: "grid",
              gridTemplateColumns: studyMode ? "28px 1fr auto" : "28px 1fr",
              gap: 8,
              padding: "6px 0",
              borderBottom: `1px solid ${COLORS_UI.rowDivider}`,
              alignItems: "start",
              opacity: excluded ? 0.45 : 1,
              background: done ? COLORS_UI.doneBg : "transparent",
            }}
          >
            {/* Question number */}
            <div
              style={{
                fontFamily: FONTS.serif,
                fontWeight: 900,
                fontSize: 16,
                color: done ? COLORS_UI.doneText : pri,
                textAlign: "center",
                paddingTop: 2,
              }}
            >
              {questionDisplayNumber(q)}
              <ExamPartLabel part={examPart} style={{ marginTop: 2 }} />
            </div>

            {/* Content */}
            <div>
              <div
                style={{
                  display: "flex",
                  gap: 3,
                  flexWrap: "wrap",
                  alignItems: "center",
                  marginBottom: 2,
                }}
              >
                <QuestionChips question={q} />
                <span
                  onClick={() => setSearchTopic(q.topic)}
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: excluded ? COLORS_UI.muted : sec,
                    border: `1px dashed ${excluded ? COLORS_UI.border : sec}`,
                    padding: "1px 6px",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 3,
                  }}
                >
                  {excluded && <ExcludedTag />}
                  {topicHe[q.topic] || q.topic}
                </span>
              </div>
              <div style={{ fontSize: 12, lineHeight: 1.4, color: COLORS_UI.text }}>
                <MathText>{q.summary}</MathText>
              </div>
              <ActiveLabelChips questionKey={questionKey} hasLabel={hasLabel} />
            </div>

            {/* Study controls */}
            {studyMode && (
              <StudyControls
                done={done}
                questionKey={questionKey}
                toggleDone={toggleDone}
                hasLabel={hasLabel}
                toggleLabel={toggleLabel}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default memo(ExamCard);
