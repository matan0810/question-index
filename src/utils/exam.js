export const UNKNOWN_LECTURER = "לא ידוע";

export const MOED_OPTIONS = [
  { value: "א", label: "מועד א" },
  { value: "ב", label: "מועד ב" },
];

// Chronological order of the real exam sessions within a year. Any session not
// listed here (e.g. a mislabeled "sample") is treated as exceptional.
export const MOED_ORDER = { א: 0, ב: 1, ג: 2 };

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

export const questionExamPartName = (exam, questionId) => {
  const parts = exam?.parts ?? [];
  if (parts.length <= 1) return null;
  const raw = parts.find((p) => p.from?.includes(questionId))?.name;
  return raw ? normalizeExamPart(raw) : null;
};

export const questionDisplayNumber = (q) => q.number ?? q.id.replace(/^[^\d]+/, "");

// Hebrew ordinals tried first; numeric fallback covers "(1)…(2)…" style.
const PART_ORDINALS = ["א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט"];
const PART_NUMBERS = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

// Markers inside $…$ math spans are skipped so "(1)" in "$\det(A)=20$" isn't treated as a part.
const mathSpans = (s) => {
  const spans = [];
  const re = /\$[^$]*\$/g;
  let m;
  while ((m = re.exec(s))) spans.push([m.index, m.index + m[0].length]);
  return spans;
};

const findMarker = (summary, label, from, spans) => {
  const re = new RegExp(`\\(?${label}[).]`, "g");
  re.lastIndex = from;
  let m;
  while ((m = re.exec(summary))) {
    if (!spans.some(([a, b]) => m.index >= a && m.index < b)) return m;
  }
  return null;
};

const collectMarkers = (summary, labels, spans) => {
  const markers = [];
  let from = 0;
  for (const label of labels) {
    const m = findMarker(summary, label, from, spans);
    if (!m) break;
    markers.push({ label, start: m.index, textStart: m.index + m[0].length });
    from = m.index + m[0].length;
  }
  return markers.length >= 2 ? markers : null;
};

export const splitSummaryParts = (summary) => {
  if (typeof summary !== "string" || !summary.trim()) return null;

  const spans = mathSpans(summary);
  const markers =
    collectMarkers(summary, PART_ORDINALS, spans) ??
    collectMarkers(summary, PART_NUMBERS, spans);
  if (!markers) return null;

  const stem = summary
    .slice(0, markers[0].start)
    .trim()
    .replace(/[:：\-–—]\s*$/, "")
    .trim();

  const parts = markers.map((mk, i) => {
    const end = i + 1 < markers.length ? markers[i + 1].start : summary.length;
    const text = summary
      .slice(mk.textStart, end)
      .replace(/^[\s):]+/, "")
      .replace(/[\s;·,]+$/, "")
      .trim();
    return { label: mk.label, text };
  });

  return { stem, parts };
};

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

// Every distinct question type a question covers, primary first: its headline
// `type` plus the `type` of each subpart. Deduped, preserving order. Mirrors
// questionTopics so a multi-part question (e.g. a computation followed by a
// proof) surfaces under each of its types in the chips, type filter and stats —
// replacing the old catch-all "mixed" type.
export const questionTypes = (q) => {
  const out = [];
  const seen = new Set();
  const add = (t) => {
    if (t && !seen.has(t)) {
      seen.add(t);
      out.push(t);
    }
  };
  add(q.type);
  (q.subparts ?? []).forEach((sp) => add(sp.type));
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
