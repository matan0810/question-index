import { useMemo } from "react";
import {
  examMatchesLecturer,
  buildLecturersList,
  sortExams,
  latestExamYear,
  questionTopics,
  questionTypes,
  questionInSyllabus,
  makeTopicOrder,
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

  // Topics present in the exams, ordered as they appear in the syllabus
  // (TOPIC_HE order) so the filter dropdown reads top-to-bottom like the course.
  const topicOptions = useMemo(() => {
    const present = new Set();
    exams.forEach((exam) =>
      exam.questions.forEach((q) =>
        questionTopics(q).forEach((t) => present.add(t)),
      ),
    );
    return [...present].sort(makeTopicOrder(topicHe));
  }, [exams, topicHe]);

  const years = useMemo(
    () => [...new Set(exams.map((e) => e.year))].sort(),
    [exams],
  );

  const lecturers = useMemo(() => buildLecturersList(exams), [exams]);

  const types = useMemo(
    () =>
      [
        ...new Set(exams.flatMap((e) => e.questions.flatMap(questionTypes))),
      ].sort(),
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
      if (type && !questionTypes(q).includes(type)) return false;
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

  return { topicOptions, years, lecturers, types, results };
}
