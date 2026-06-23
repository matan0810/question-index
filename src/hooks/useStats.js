import { useMemo } from "react";
import { questionTopics } from "../utils/exam";

export function useStats(exams) {
  return useMemo(() => {
    const topicCounts = {};
    const chapterCounts = {};
    const typeCounts = {};
    const examTopics = {};
    let total = 0;

    exams.forEach((exam) => {
      examTopics[exam.code] = {};
      exam.questions.forEach((q) => {
        if (q.missing) return;
        total++;
        // Counted under every topic it touches (primary + secondary + subparts),
        // so topicCounts/examTopics may sum past `total`.
        questionTopics(q).forEach((t) => {
          topicCounts[t] = (topicCounts[t] || 0) + 1;
          examTopics[exam.code][t] = (examTopics[exam.code][t] || 0) + 1;
        });
        chapterCounts[q.chapter] = (chapterCounts[q.chapter] || 0) + 1;
        typeCounts[q.type] = (typeCounts[q.type] || 0) + 1;
      });
    });

    return { topicCounts, chapterCounts, typeCounts, examTopics, total };
  }, [exams]);
}
