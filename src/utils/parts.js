// Exam parts: the named sections of an exam (חלק א/ב…) — both the part a given
// question belongs to (from the exam's `parts` metadata) and the parts parsed
// out of a single question's summary text.

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
