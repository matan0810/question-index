// Exam sessions (מועדים) and semesters: the constants, labels and ordering that
// describe *when* an exam was held.

export const MOED_OPTIONS = [
  { value: "א", label: "מועד א" },
  { value: "ב", label: "מועד ב" },
];

// Chronological order of the real exam sessions within a year. Any session not
// listed here (e.g. a mislabeled "sample") is treated as exceptional.
export const MOED_ORDER = { א: 0, ב: 1, ג: 2 };

export const isExceptionalMoed = (moed) => !(moed in MOED_ORDER);

// A calendar year can hold both a winter-semester course (סמסטר א', חורף; exams
// in Feb–Mar) and a spring-semester one (סמסטר ב', אביב; exams held in Jul–Sep,
// after a spring term), sometimes sharing a מועד. The `semester` field is the
// source of truth; helpers here and in sorting.js let labels and sorting
// tell the two apart.
export const SEMESTER_HE = { winter: "חורף", spring: "אביב", summer: "קיץ" };
export const SEMESTER_OPTIONS = [
  { value: "winter", label: "חורף" },
  { value: "spring", label: "אביב" },
  { value: "summer", label: "קיץ" },
];
export const examSemesterLabel = (exam) => SEMESTER_HE[exam.semester] ?? "";

// Compact label for axes/columns. Winter is marked "ח".
export const examShortLabel = (exam) => {
  const prefix = `${exam.year}${exam.semester === "winter" ? "ח" : ""}`;
  return `${prefix}/${exam.moed}`;
};
