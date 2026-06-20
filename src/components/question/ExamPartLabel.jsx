import { COLORS_UI } from "../../styles";

// Compact, uniform label for the exam part (חלק) a question belonged to in the
// original exam, shown right next to the question number. `part` is the already
// normalized value from questionExamPartName, so every view renders the exact
// same wording. Renders nothing when the exam has a single part.
export default function ExamPartLabel({ part, style }) {
  if (!part) return null;
  return (
    <div
      style={{
        fontSize: 10,
        fontWeight: 600,
        color: COLORS_UI.muted,
        lineHeight: 1.2,
        ...style,
      }}
    >
      {part}
    </div>
  );
}
