import { MOED_ORDER } from "./sessions";
import { examLecturerLabel } from "./lecturers";

// Rank for an unknown/exceptional מועד: it sorts after every known session.
// Must be finite (not Infinity) so two unknown moedים compare equal instead of
// producing Infinity − Infinity = NaN, which would scramble their order.
const UNKNOWN_MOED_RANK = 9;

const parseExamDate = (date) => {
  const m = /^(\d{2})\.(\d{2})\.\d{2}$/.exec(date ?? "");
  if (!m) return null;
  const day = +m[1];
  const mon = +m[2];
  return day && mon ? { mon, day } : null;
};

// Chronological comparison: by calendar year, then by the real exam date within
// the year — so a winter session (Feb/Mar) precedes a spring one (Jul/Aug) even
// when they share a מועד — falling back to session order when a date is unknown.
export const examDateCompare = (a, b) => {
  if (a.year !== b.year) return a.year - b.year;
  const da = parseExamDate(a.date);
  const db = parseExamDate(b.date);
  if (da && db && (da.mon !== db.mon || da.day !== db.day))
    return da.mon - db.mon || da.day - db.day;
  return (
    (MOED_ORDER[a.moed] ?? UNKNOWN_MOED_RANK) -
    (MOED_ORDER[b.moed] ?? UNKNOWN_MOED_RANK)
  );
};

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
