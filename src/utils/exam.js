export const UNKNOWN_LECTURER = "לא ידוע";

export const examMatchesLecturer = (exam, lecturer) =>
  exam.lecturers?.includes(lecturer) ||
  (!exam.lecturers?.length && lecturer === UNKNOWN_LECTURER);

export const examLecturerLabel = (exam) =>
  exam.lecturers?.join(", ") ?? UNKNOWN_LECTURER;

// The source data spells exam parts many inconsistent ways — "חלק א'", "חלק (א)",
// "פרק ג'", "חלק III", "חלק 1" — so we normalize them all to one uniform form:
// "חלק <X>" (no apostrophes/brackets, and "פרק" mapped to "חלק" so it never
// collides with the topic chip, which uses "פרק"). Non-part labels such as
// "חובה" are kept as-is.
const normalizeExamPart = (raw) => {
  const name = raw.trim();
  if (!/^(חלק|פרק)/.test(name)) return name;
  const token = name
    .replace(/^(חלק|פרק)\s*/, "")
    .replace(/['׳"().]/g, "")
    .trim();
  return token ? `חלק ${token}` : name;
};

// Name of the exam part (חלק) that contains the given question — normalized to a
// uniform spelling — or null when the exam isn't divided into multiple parts
// (e.g. "כל המבחן"). This reflects the real exam structure, as opposed to
// question.chapter which is a topic tag.
export const questionExamPartName = (exam, questionId) => {
  const parts = exam?.parts ?? [];
  if (parts.length <= 1) return null;
  const raw = parts.find((p) => p.from?.includes(questionId))?.name;
  return raw ? normalizeExamPart(raw) : null;
};

// The number to display for a question: its true exam-sequence position, falling
// back to the digits in its id for older data without an explicit number.
export const questionDisplayNumber = (q) => q.number ?? q.id.replace(/^[^\d]+/, "");

export const buildLecturersList = (exams) =>
  [
    ...new Set(
      exams.flatMap((e) =>
        e.lecturers?.length ? e.lecturers : [UNKNOWN_LECTURER],
      ),
    ),
  ].sort((a, b) => {
    if (a === UNKNOWN_LECTURER) return 1;
    if (b === UNKNOWN_LECTURER) return -1;
    return a.localeCompare(b);
  });
