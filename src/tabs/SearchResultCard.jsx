import { memo } from "react";
import {
  QuestionChips,
  ExamPartLabel,
  ActiveLabelChips,
  ExcludedTag,
  MathText,
  StudyControls,
} from "../components";
import { COLORS_UI, FONTS } from "../styles";
import {
  examLecturerLabel,
  questionExamPartName,
  questionDisplayNumber,
} from "../utils/exam";

function SearchResultCard({
  exam,
  question,
  topicHe,
  isExcluded,
  setTopic,
  colorsUI,
  isDone,
  toggleDone,
  studyMode,
  hasLabel,
  toggleLabel,
  doneVersion: _dv,
  labelsVersion: _lv,
}) {
  const pri = colorsUI?.primary ?? COLORS_UI.primary;
  const sec = colorsUI?.secondary ?? COLORS_UI.secondary;
  const excluded = isExcluded(question.topic);
  const examPart = questionExamPartName(exam, question.id);
  const questionKey = `${exam.code}__${question.id}`;
  const done = isDone?.(questionKey) ?? false;

  return (
    <div
      className="result-card"
      style={{
        background: done ? COLORS_UI.doneBg : COLORS_UI.cardBg,
        border: `1px solid ${done ? COLORS_UI.doneBorder : COLORS_UI.border}`,
        padding: 12,
        display: "grid",
        gridTemplateColumns: studyMode ? "110px 80px 1fr auto" : "110px 80px 1fr",
        gap: 12,
        alignItems: "start",
        fontSize: 13,
        opacity: done ? 0.8 : 1,
        transition: "background 0.15s, border-color 0.15s",
      }}
    >
      {/* col 1: exam info */}
      <div className="result-card-meta" style={{ lineHeight: 1.5 }}>
        <div style={{ fontWeight: 700, fontSize: 14 }}>{exam.year}</div>
        <div style={{ fontSize: 12, color: COLORS_UI.text }}>מועד {exam.moed}</div>
        <div style={{ fontSize: 11, color: COLORS_UI.muted, marginTop: 2 }}>
          {examLecturerLabel(exam)}
        </div>
        <div style={{ marginTop: 6 }}>
          <div style={{ fontSize: 10, color: COLORS_UI.muted, marginBottom: 1 }}>שאלה</div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: pri,
              fontFamily: FONTS.serif,
              lineHeight: 1,
            }}
          >
            {questionDisplayNumber(question)}
          </div>
          <ExamPartLabel part={examPart} style={{ marginTop: 2 }} />
        </div>
      </div>

      {/* col 2: chips */}
      <div className="result-card-chips">
        <QuestionChips question={question} />
      </div>

      {/* col 3: topic + summary + active label chips */}
      <div className="result-card-topic">
        <div
          onClick={() => setTopic(question.topic)}
          style={{
            fontSize: 12,
            color: excluded ? COLORS_UI.muted : sec,
            marginBottom: 4,
            fontWeight: 600,
            cursor: "pointer",
            textDecoration: "underline",
            display: "flex",
            alignItems: "center",
            gap: 4,
            flexWrap: "wrap",
          }}
        >
          {excluded && <ExcludedTag />}
          {topicHe[question.topic] || question.topic}
        </div>
        <div style={{ lineHeight: 1.5, fontSize: 13 }}>
          <MathText>{question.summary}</MathText>
        </div>
        <ActiveLabelChips questionKey={questionKey} hasLabel={hasLabel} />
      </div>

      {/* col 4: study controls (study mode only) */}
      {studyMode && (
        <div className="result-card-done">
          <StudyControls
            done={done}
            questionKey={questionKey}
            toggleDone={toggleDone}
            hasLabel={hasLabel}
            toggleLabel={toggleLabel}
          />
        </div>
      )}
    </div>
  );
}

export default memo(SearchResultCard);
