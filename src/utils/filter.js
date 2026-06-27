import { examMatchesLecturer } from "./lecturers";
import { sortExams } from "./sorting";

// The lowercased text blob a free-text query is matched against: code, year,
// moed, lecturers and every question's summary + topics.
function examHaystack(exam) {
  return [
    exam.code,
    String(exam.year),
    exam.moed,
    ...(exam.lecturers ?? []),
    ...exam.questions.map((q) => q.summary ?? ""),
    ...exam.questions.flatMap((q) => q.topics ?? []),
  ]
    .join(" ")
    .toLowerCase();
}

// Applies every active filter to the exam list, then sorts the survivors.
// `query` is expected pre-normalized (trimmed + lowercased); empty means no
// text filter. `latestYear` drives the "hide latest" toggle.
export function filterAndSortExams(exams, filters) {
  const {
    yearFilter,
    moedFilter,
    semesterFilter,
    lecturerFilter,
    query,
    hideLatest,
    latestYear,
    sortBy,
    sortDir,
  } = filters;

  const pool = exams.filter((exam) => {
    if (yearFilter && String(exam.year) !== yearFilter) return false;
    if (moedFilter && exam.moed !== moedFilter) return false;
    if (semesterFilter && exam.semester !== semesterFilter) return false;
    if (lecturerFilter && !examMatchesLecturer(exam, lecturerFilter)) return false;
    if (hideLatest && exam.year === latestYear) return false;
    if (query && !examHaystack(exam).includes(query)) return false;
    return true;
  });

  return sortExams(pool, sortBy, sortDir);
}
