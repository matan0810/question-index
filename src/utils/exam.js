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

// A calendar year can hold both a winter-semester course (סמסטר א', חורף; exams
// in Feb–Mar) and a spring-semester one (סמסטר ב', אביב; exams held in Jul–Sep,
// after a spring term), sometimes sharing a מועד. The `semester` field is the
// source of truth; helpers below let sorting and labels tell the two apart.
export const SEMESTER_HE = { winter: "חורף", spring: "אביב" };
export const SEMESTER_OPTIONS = [
  { value: "winter", label: "חורף" },
  { value: "spring", label: "אביב" },
];
export const examSemesterLabel = (exam) => SEMESTER_HE[exam.semester] ?? "";

// Parse "dd.mm.yy" into { mon, day }, or null for unknown placeholders ("00.00.06").
const parseExamDate = (date) => {
  const m = /^(\d{2})\.(\d{2})\.\d{2}$/.exec(date ?? "");
  if (!m) return null;
  const day = +m[1];
  const mon = +m[2];
  return day && mon ? { mon, day } : null;
};

// Compact label for axes/columns. A winter exam shares its calendar year (and
// sometimes מועד) with a spring one, so it's marked "ח" to disambiguate.
export const examShortLabel = (exam) =>
  `${exam.year}${exam.semester === "winter" ? "ח" : ""}/${exam.moed}`;

// Chronological comparison: by calendar year, then by the real exam date within
// the year — so a winter session (Feb/Mar) precedes a spring one (Jul/Aug) even
// when they share a מועד — falling back to session order when a date is unknown.
export const examDateCompare = (a, b) => {
  if (a.year !== b.year) return a.year - b.year;
  const da = parseExamDate(a.date);
  const db = parseExamDate(b.date);
  if (da && db && (da.mon !== db.mon || da.day !== db.day))
    return da.mon - db.mon || da.day - db.day;
  return (MOED_ORDER[a.moed] ?? 9) - (MOED_ORDER[b.moed] ?? 9);
};

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

// Every distinct topic a question touches, primary first: its main `topic`, any
// secondary `topics: []`, and the `topic` of each subpart (dual-topic questions).
// Deduped, so a topic shared by the question and a subpart is counted once.
// All topic aggregation (stats, trends, heatmap, search) goes through this so a
// question surfaces under each topic it covers, not only its headline topic.
export const questionTopics = (q) => {
  const out = [];
  const seen = new Set();
  const add = (t) => {
    if (t && !seen.has(t)) {
      seen.add(t);
      out.push(t);
    }
  };
  add(q.topic);
  (q.topics ?? []).forEach(add);
  (q.subparts ?? []).forEach((sp) => add(sp.topic));
  return out;
};

// True when a question still belongs to the syllabus — i.e. at least one of the
// topics it touches is not excluded. A question is "לא בחומר" only when every
// topic it covers has been dropped from the course.
export const questionInSyllabus = (q, isExcluded) =>
  questionTopics(q).some((t) => !isExcluded(t));

// Comparator that orders topic keys by their position in the course's topic map
// (TOPIC_HE), which is declared in syllabus order. Unknown keys sort to the end.
export const makeTopicOrder = (topicHe) => {
  const rank = new Map(Object.keys(topicHe).map((k, i) => [k, i]));
  return (a, b) => (rank.get(a) ?? Infinity) - (rank.get(b) ?? Infinity);
};

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
