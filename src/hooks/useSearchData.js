import { useMemo } from "react";
import {
  examMatchesLecturer,
  buildLecturersList,
  sortExams,
  latestExamYear,
  questionTopics,
  questionInSyllabus,
} from "../utils/exam";

// isDone and hasLabel are stable refs (see useProgress/useLabels).
// doneVersion / labelsVersion are integer counters that increment on every
// change — they trigger recomputation without creating new function references.
export function useSearchData(
  exams,
  filters,
  topicHe,
  isDone,
  doneVersion,
  hasLabel,
  labelsVersion,
) {
  const {
    query,
    topic,
    chapter,
    type,
    year,
    moed,
    semester,
    lecturer,
    progressFilter,
    sortBy,
    sortDir,
    hideLatest,
    hideExcluded,
    isExcluded,
  } = filters;

  const topicsByFrequency = useMemo(
    () =>
      Object.entries(
        exams.reduce((acc, exam) => {
          exam.questions.forEach((q) => {
            questionTopics(q).forEach((t) => {
              acc[t] = (acc[t] || 0) + 1;
            });
          });
          return acc;
        }, {}),
      ).sort((a, b) => b[1] - a[1]),
    [exams],
  );

  const years = useMemo(
    () => [...new Set(exams.map((e) => e.year))].sort(),
    [exams],
  );

  const lecturers = useMemo(() => buildLecturersList(exams), [exams]);

  const types = useMemo(
    () =>
      [...new Set(exams.flatMap((e) => e.questions.map((q) => q.type)))].sort(),
    [exams],
  );

  const results = useMemo(() => {
    const queryLower = query.toLowerCase();
    const latestYear = hideLatest ? latestExamYear(exams) : null;

    const examMatches = (exam) =>
      (!year || String(exam.year) === year) &&
      (!moed || exam.moed === moed) &&
      (!semester || exam.semester === semester) &&
      (!lecturer || examMatchesLecturer(exam, lecturer)) &&
      (latestYear === null || exam.year !== latestYear);

    const questionMatches = (q, exam) => {
      if (q.missing) return false;
      if (hideExcluded && isExcluded && !questionInSyllabus(q, isExcluded))
        return false;
      if (topic && !questionTopics(q).includes(topic)) return false;
      if (chapter && q.chapter !== chapter) return false;
      if (type && q.type !== type) return false;
      if (
        queryLower &&
        !(
          q.summary +
          questionTopics(q)
            .map((t) => topicHe[t] ?? "")
            .join(" ") +
          exam.code
        )
          .toLowerCase()
          .includes(queryLower)
      )
        return false;
      const qKey = `${exam.code}__${q.id}`;
      if (progressFilter === "done" && !isDone?.(qKey)) return false;
      if (progressFilter === "undone" && isDone?.(qKey)) return false;
      if (progressFilter === "hard" && !hasLabel?.(qKey, "hard")) return false;
      if (progressFilter === "later" && !hasLabel?.(qKey, "later")) return false;
      return true;
    };

    return sortExams(exams.filter(examMatches), sortBy || "date", sortDir || "desc")
      .flatMap((exam) =>
        exam.questions
          .filter((q) => questionMatches(q, exam))
          .sort((a, b) => (a.number ?? 0) - (b.number ?? 0))
          .map((question) => ({ exam, question })),
      );
  }, [
    exams,
    query,
    topic,
    chapter,
    type,
    year,
    moed,
    semester,
    lecturer,
    topicHe,
    progressFilter,
    sortBy,
    sortDir,
    hideLatest,
    hideExcluded,
    isExcluded,
    doneVersion,
    labelsVersion,
  ]);

  return { topicsByFrequency, years, lecturers, types, results };
}
