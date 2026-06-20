export const UNKNOWN_LECTURER = "לא ידוע";

// Exam session (מועד) options for the filter dropdowns.
export const MOED_OPTIONS = [
  { value: "א", label: "מועד א" },
  { value: "ב", label: "מועד ב" },
];

// Chronological order of the real exam sessions within a year. Any session not
// listed here (e.g. a mislabeled "sample") is treated as exceptional.
export const MOED_ORDER = { א: 0, ב: 1, ג: 2 };

// A session not in MOED_ORDER (e.g. "sample") — sorted to the end of the list.
export const isExceptionalMoed = (moed) => !(moed in MOED_ORDER);

export const examMatchesLecturer = (exam, lecturer) =>
  exam.lecturers?.includes(lecturer) ||
  (!exam.lecturers?.length && lecturer === UNKNOWN_LECTURER);

export const examLecturerLabel = (exam) =>
  exam.lecturers?.join(", ") ?? UNKNOWN_LECTURER;

// Chronological comparison of two exams: by year, then session order.
// Exceptional sessions (e.g. a mislabeled "sample") rank last within their year.
export const examDateCompare = (a, b) =>
  a.year !== b.year
    ? a.year - b.year
    : (MOED_ORDER[a.moed] ?? 9) - (MOED_ORDER[b.moed] ?? 9);

// Return a sorted copy of `exams`. sortBy: "date" | "lecturer". sortDir:
// "asc" | "desc". Lecturer sort falls back to date for a stable tiebreak.
export const sortExams = (exams, sortBy = "date", sortDir = "desc") => {
  const dir = sortDir === "asc" ? 1 : -1;
  const compare =
    sortBy === "lecturer"
      ? (a, b) =>
          examLecturerLabel(a).localeCompare(examLecturerLabel(b), "he") ||
          examDateCompare(a, b)
      : examDateCompare;
  return [...exams].sort((a, b) => dir * compare(a, b));
};

// The most recent year present in the exam list, or null when empty.
export const latestExamYear = (exams) =>
  exams.length ? Math.max(...exams.map((e) => e.year)) : null;

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
