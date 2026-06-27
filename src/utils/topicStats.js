import { questionTopics } from "./questions";

// Per-year topic frequencies from `fromYear` onward, skipping excluded topics:
// { [year]: { [topic]: count } }. Feeds the year-over-year trend chart.
export function computeYearTopics(exams, fromYear, isExcluded) {
  const byYear = {};
  for (const e of exams) {
    if (e.year < fromYear) continue;
    if (!byYear[e.year]) byYear[e.year] = {};
    for (const q of e.questions) {
      for (const t of questionTopics(q)) {
        if (!isExcluded(t)) byYear[e.year][t] = (byYear[e.year][t] || 0) + 1;
      }
    }
  }
  return byYear;
}

// The `limit` most frequent (non-excluded) topics from `fromYear` onward,
// most-frequent first — the series the trend chart plots.
export function getTopTopics(exams, fromYear, isExcluded, limit = 15) {
  const counts = {};
  exams.forEach((e) => {
    if (e.year < fromYear) return;
    e.questions.forEach((q) => {
      questionTopics(q).forEach((t) => {
        if (!isExcluded(t)) counts[t] = (counts[t] || 0) + 1;
      });
    });
  });
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([t]) => t);
}
