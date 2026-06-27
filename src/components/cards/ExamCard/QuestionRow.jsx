import QuestionChips from "../../question/QuestionChips";
import ExamPartLabel from "../../question/ExamPartLabel";
import ActiveLabelChips from "../../question/ActiveLabelChips";
import { ExcludedMark, strikeIfExcluded } from "../../question/ExcludedTag";
import StudyControls from "../../question/StudyControls";
import QuestionSummary from "../../question/QuestionSummary";
import { COLORS_UI, FONTS } from "../../../styles";
import { questionExamPartName, questionDisplayNumber } from "../../../utils";

export default function QuestionRow({
  q,
  exam,
  topicHe,
  pri,
  sec,
  studyMode,
  setSearchTopic,
  setSearchChapter,
  setSearchType,
  isExcluded,
  isDone,
  toggleDone,
  hasLabel,
  toggleLabel,
}) {
  if (q.missing) {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "28px 1fr",
          gap: 8,
          padding: "6px 0",
          borderBottom: `1px solid ${COLORS_UI.rowDivider}`,
          alignItems: "center",
          opacity: 0.6,
        }}
      >
        <div style={{ fontFamily: FONTS.serif, fontWeight: 900, fontSize: 16, color: COLORS_UI.muted, textAlign: "center" }}>
          {questionDisplayNumber(q)}
        </div>
        <div style={{ fontSize: 12, fontStyle: "italic", color: COLORS_UI.muted }}>
          תוכן השאלה אבד ואינו זמין במקורות שלנו
        </div>
      </div>
    );
  }

  const excluded = isExcluded(q.topic);
  const examPart = questionExamPartName(exam, q.id);
  const questionKey = `${exam.code}__${q.id}`;
  const done = isDone?.(questionKey) ?? false;

  return (
    <div
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
          <QuestionChips
            question={q}
            onChapterClick={setSearchChapter}
            onTypeClick={setSearchType}
          />
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
            {excluded && <ExcludedMark />}
            <span style={strikeIfExcluded(excluded)}>{topicHe[q.topic] || q.topic}</span>
          </span>
        </div>
        <div style={{ fontSize: 12, lineHeight: 1.4, color: COLORS_UI.text }}>
          <QuestionSummary summary={q.summary} />
        </div>
        <ActiveLabelChips questionKey={questionKey} hasLabel={hasLabel} />
      </div>

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
}
