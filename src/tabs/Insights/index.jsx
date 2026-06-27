import { useMemo } from "react";
import { primaryColor } from "../../styles";
import { questionTopics } from "../../utils";
import {
  CARD_TOP_N,
  RARE_MAX_COUNT,
  OVERDUE_MIN_APPEARANCES,
  OVERDUE_MIN_GAP_YEARS,
} from "./constants";
import TopTopicsCard from "./TopTopicsCard";
import TrapsCard from "./TrapsCard";
import TrendCard from "./TrendCard";
import OverdueTopicsCard from "./OverdueTopicsCard";
import RareTopicsCard from "./RareTopicsCard";

export default function Insights({
  stats,
  setSearchTopic,
  exams,
  topicHe,
  excludedTopics,
  traps,
  trendFromYear,
  colorsUI,
}) {
  const accent = primaryColor(colorsUI);

  const maxYear = useMemo(
    () => (exams.length ? Math.max(...exams.map((e) => e.year)) : 0),
    [exams],
  );

  const sortedTopics = useMemo(
    () =>
      Object.entries(stats.topicCounts)
        .filter(([key]) => !excludedTopics.has(key))
        .sort((a, b) => b[1] - a[1]),
    [stats, excludedTopics],
  );

  const overdueTopics = useMemo(() => {
    const lastSeen = {};
    const totalCount = {};
    exams.forEach((exam) => {
      exam.questions.forEach((q) => {
        questionTopics(q).forEach((t) => {
          totalCount[t] = (totalCount[t] || 0) + 1;
          if (!lastSeen[t] || exam.year > lastSeen[t]) lastSeen[t] = exam.year;
        });
      });
    });
    return Object.entries(totalCount)
      .filter(
        ([key, count]) =>
          !excludedTopics.has(key) &&
          count >= OVERDUE_MIN_APPEARANCES &&
          maxYear - (lastSeen[key] || 0) >= OVERDUE_MIN_GAP_YEARS,
      )
      .sort((a, b) => lastSeen[a[0]] - lastSeen[b[0]])
      .slice(0, CARD_TOP_N)
      .map(([key, count]) => ({ topic: key, count, last: lastSeen[key] }));
  }, [exams, excludedTopics, maxYear]);

  const recentTrend = useMemo(() => {
    const counts = {};
    let total = 0;
    exams
      .filter((e) => e.year >= trendFromYear)
      .forEach((exam) =>
        exam.questions.forEach((q) => {
          questionTopics(q).forEach((t) => {
            if (excludedTopics.has(t)) return;
            counts[t] = (counts[t] || 0) + 1;
            total++;
          });
        }),
      );
    return {
      entries: Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, CARD_TOP_N),
      total,
    };
  }, [exams, trendFromYear, excludedTopics]);

  const rareTopics = useMemo(
    () =>
      sortedTopics
        .filter(([, count]) => count <= RARE_MAX_COUNT)
        .slice(0, CARD_TOP_N),
    [sortedTopics],
  );

  const hasTrend = maxYear >= trendFromYear && recentTrend.total > 0;

  if (!exams.length) return <div className="empty-state">אין נתונים</div>;

  const hasAnyContent =
    sortedTopics.length > 0 ||
    traps.length > 0 ||
    hasTrend ||
    overdueTopics.length > 0 ||
    rareTopics.length > 0;

  if (!hasAnyContent) return <div className="empty-state">אין נתונים</div>;

  return (
    <div className="auto-grid">
      {sortedTopics.length > 0 && (
        <TopTopicsCard
          sortedTopics={sortedTopics}
          exams={exams}
          stats={stats}
          topicHe={topicHe}
          accent={accent}
          onTopicClick={setSearchTopic}
        />
      )}
      {traps.length > 0 && <TrapsCard traps={traps} accent={accent} />}
      {hasTrend && (
        <TrendCard
          recentTrend={recentTrend}
          trendFromYear={trendFromYear}
          maxYear={maxYear}
          topicHe={topicHe}
          accent={accent}
          onTopicClick={setSearchTopic}
        />
      )}
      {overdueTopics.length > 0 && (
        <OverdueTopicsCard
          overdueTopics={overdueTopics}
          maxYear={maxYear}
          topicHe={topicHe}
          accent={accent}
          onTopicClick={setSearchTopic}
        />
      )}
      {rareTopics.length > 0 && (
        <RareTopicsCard
          rareTopics={rareTopics}
          exams={exams}
          stats={stats}
          topicHe={topicHe}
          accent={accent}
          onTopicClick={setSearchTopic}
        />
      )}
    </div>
  );
}
