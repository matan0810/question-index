// Aggregates over a list of exams — for headers, footers, badges and dropdowns.

export const latestExamYear = (exams) =>
  exams.length ? Math.max(...exams.map((e) => e.year)) : null;

// Distinct exam years, oldest → newest — for the year-filter dropdowns.
export const examYears = (exams) =>
  [...new Set(exams.map((e) => e.year))].sort((a, b) => a - b);

// Total questions across a list of exams — for result-count badges.
export const countQuestions = (exams) =>
  exams.reduce((sum, exam) => sum + exam.questions.length, 0);

// Header/footer totals in a single pass: question count and the covered year
// range. Returns zeros for an empty list.
export const examTotals = (exams) => {
  if (!exams.length) return { totalQuestions: 0, minYear: 0, maxYear: 0 };
  let totalQuestions = 0;
  let minYear = Infinity;
  let maxYear = -Infinity;
  for (const exam of exams) {
    totalQuestions += exam.questions.length;
    if (exam.year < minYear) minYear = exam.year;
    if (exam.year > maxYear) maxYear = exam.year;
  }
  return { totalQuestions, minYear, maxYear };
};
