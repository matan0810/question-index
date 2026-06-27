// Per-question helpers: which topics/types a question covers, its syllabus
// membership, its display number, and topic ordering.

// Truthy values in first-seen order, deduped — the shape both aggregators below
// need so a multi-part question surfaces under each distinct topic/type it
// covers, headline value first.
const distinct = (values) => [...new Set(values.filter(Boolean))];

// Every distinct topic a question touches, primary first: its main `topic`, any
// secondary `topics: []`, and the `topic` of each subpart (dual-topic questions).
// All topic aggregation (stats, trends, heatmap, search) goes through this so a
// question surfaces under each topic it covers, not only its headline topic.
export const questionTopics = (q) =>
  distinct([q.topic, ...(q.topics ?? []), ...(q.subparts ?? []).map((sp) => sp.topic)]);

// Every distinct question type a question covers, primary first: its headline
// `type` plus the `type` of each subpart. Mirrors questionTopics so a multi-part
// question (e.g. a computation followed by a proof) surfaces under each of its
// types in the chips, type filter and stats — replacing the old catch-all "mixed".
export const questionTypes = (q) =>
  distinct([q.type, ...(q.subparts ?? []).map((sp) => sp.type)]);

// True when a question still belongs to the syllabus — i.e. at least one of the
// topics it touches is not excluded. A question is "לא בחומר" only when every
// topic it covers has been dropped from the course.
export const questionInSyllabus = (q, isExcluded) =>
  questionTopics(q).some((t) => !isExcluded(t));

export const questionDisplayNumber = (q) => q.number ?? q.id.replace(/^[^\d]+/, "");

// Comparator that orders topic keys by their position in the course's topic map
// (TOPIC_HE), which is declared in syllabus order. Unknown keys sort to the end.
export const makeTopicOrder = (topicHe) => {
  const rank = new Map(Object.keys(topicHe).map((k, i) => [k, i]));
  return (a, b) => (rank.get(a) ?? Infinity) - (rank.get(b) ?? Infinity);
};
