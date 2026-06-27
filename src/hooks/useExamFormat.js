import { useMemo } from "react";
import { normalizeLecturer, latestExamYear } from "../utils/exam";

// Presentation data tied to the globally-latest exam, independent of any active
// filter — so the format banner and "המבחן שלך!" badge always reflect the
// current exam format, not whatever the user happens to be filtering by.
// Returns the latest year (for the "hide latest" toggle + badge) and the exam
// format stamped with that exam's session, date and lecturer.
export function useExamFormat(exams, examFormat) {
  const globalLatestYear = useMemo(() => latestExamYear(exams), [exams]);

  const latestExam = useMemo(() => {
    if (!exams.length) return null;
    return [...exams].sort((a, b) =>
      b.year !== a.year ? b.year - a.year : b.moed > a.moed ? 1 : -1,
    )[0];
  }, [exams]);

  const derivedExamFormat = useMemo(() => {
    if (!examFormat || !latestExam) return examFormat;
    return {
      ...examFormat,
      latestSession: `${latestExam.year} מועד ${latestExam.moed}`,
      latestDate: latestExam.date ?? "",
      lecturer: latestExam.lecturers?.map(normalizeLecturer).join(" · ") ?? "",
    };
  }, [examFormat, latestExam]);

  return { globalLatestYear, derivedExamFormat };
}
