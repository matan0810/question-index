import Chip from "../../ui/Chip";
import { COLORS_UI, FONTS } from "../../../styles";
import { examLecturerLabel, examSemesterLabel } from "../../../utils/exam";

export default function ExamHeader({ exam, isLatest, pri }) {
  return (
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
        <div style={{ fontSize: 12, color: COLORS_UI.muted }}>
          {examSemesterLabel(exam)}
        </div>
        {isLatest && <Chip kind="hot">המבחן שלך!</Chip>}
      </div>
      <div style={{ fontSize: 11, color: COLORS_UI.muted, marginTop: 3 }}>
        {exam.questions.length} שאלות · {examLecturerLabel(exam)}
      </div>
    </div>
  );
}
