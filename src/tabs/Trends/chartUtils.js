export function computeYearTopics(exams, fromYear, isExcluded) {
  const byYear = {};
  for (const e of exams) {
    if (e.year < fromYear) continue;
    if (!byYear[e.year]) byYear[e.year] = {};
    for (const q of e.questions) {
      if (!isExcluded(q.topic)) {
        byYear[e.year][q.topic] = (byYear[e.year][q.topic] || 0) + 1;
      }
    }
  }
  return byYear;
}

export function getTopTopics(exams, fromYear, isExcluded, limit = 15) {
  const counts = {};
  exams.forEach((e) => {
    if (e.year < fromYear) return;
    e.questions.forEach((q) => {
      if (!isExcluded(q.topic)) counts[q.topic] = (counts[q.topic] || 0) + 1;
    });
  });
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([t]) => t);
}
