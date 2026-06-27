import { useCallback, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
  useStats,
  useProgress,
  useLabels,
  useTabNavigation,
  useExamFilters,
  useSearchFilters,
  useGlobalFilters,
  useExamFormat,
} from "../hooks";
import { Header, FormatBanner, TabBar, Footer, ScrollProgress } from "../components";
import { Overview, Heatmap, ExamsTab, SearchTab, Insights } from "../tabs";
import { useCourse } from "../context/CourseContext";
import { examTotals } from "../utils";

export default function CourseApp() {
  const {
    COURSE,
    CHAPTERS,
    EXCLUDED_TOPICS,
    TREND_FROM_YEAR,
    DEFAULT_YEAR_FROM,
    TRAPS,
    EXAM_FORMAT,
    TOPIC_HE,
    COLORS,
    isExcluded,
    EXAMS,
    colorsUI,
  } = useCourse();

  const courseId = COURSE.number;

  const {
    isDone,
    toggleDone,
    resetProgress,
    doneCount,
    doneVersion,
    studyMode,
    toggleStudyMode,
  } = useProgress(courseId);

  const { hasLabel, toggleLabel, labelsVersion, resetLabels, labelCount } = useLabels(courseId);

  const resetAll = useCallback(() => {
    resetProgress();
    resetLabels();
  }, [resetProgress, resetLabels]);

  const [searchParams, setSearchParams] = useSearchParams();

  const { activeTab, setActiveTab, goToTopic, goToChapter, goToType } =
    useTabNavigation(searchParams, setSearchParams, isExcluded);

  // Global header filters (lecturer ∩ year range) — narrow every tab and the
  // format banner at once. `displayExams` is the filtered list every tab sees.
  const {
    activeLecturer,
    setActiveLecturer,
    activeYearFrom,
    setActiveYearFrom,
    activeYearTo,
    setActiveYearTo,
    clearYearFilter,
    displayExams,
    lecturers,
    years,
  } = useGlobalFilters(searchParams, setSearchParams, EXAMS, DEFAULT_YEAR_FROM);

  // Per-tab filter/sort state, spread straight onto each tab.
  const examFilters = useExamFilters(searchParams, setSearchParams);
  const searchFilters = useSearchFilters(searchParams, setSearchParams);

  const stats = useStats(displayExams);
  const { globalLatestYear, derivedExamFormat } = useExamFormat(EXAMS, EXAM_FORMAT);

  const { totalQuestions, minYear, maxYear } = useMemo(
    () => examTotals(displayExams),
    [displayExams],
  );

  useEffect(() => {
    document.title = `מדד שאלות - ${COURSE.name} · ${COURSE.number}`;
  }, [COURSE]);

  // Progress + label callbacks — only wired through when study mode is on.
  const studyProps = studyMode
    ? { isDone, toggleDone, hasLabel, toggleLabel }
    : {};

  return (
    <div className="course-page">
      <ScrollProgress color={colorsUI.primary} />
      <Header
        course={COURSE}
        exams={displayExams}
        colorsUI={colorsUI}
        doneCount={doneCount}
        labelCount={labelCount}
        totalQuestions={totalQuestions}
        resetProgress={resetAll}
        studyMode={studyMode}
        toggleStudyMode={toggleStudyMode}
        activeLecturer={activeLecturer}
        setActiveLecturer={setActiveLecturer}
        lecturers={lecturers}
        activeYearFrom={activeYearFrom}
        setActiveYearFrom={setActiveYearFrom}
        activeYearTo={activeYearTo}
        setActiveYearTo={setActiveYearTo}
        clearYearFilter={clearYearFilter}
        years={years}
      />
      <FormatBanner chapters={CHAPTERS} examFormat={derivedExamFormat} colorsUI={colorsUI} />
      <TabBar tab={activeTab} setTab={setActiveTab} />

      {activeTab === "overview" && (
        <Overview
          stats={stats}
          setSearchTopic={goToTopic}
          setSearchChapter={goToChapter}
          setSearchType={goToType}
          exams={displayExams}
          topicHe={TOPIC_HE}
          colors={COLORS}
          isExcluded={isExcluded}
          chapters={CHAPTERS}
        />
      )}
      {activeTab === "heatmap" && (
        <Heatmap
          stats={stats}
          setSearchTopic={goToTopic}
          exams={displayExams}
          topicHe={TOPIC_HE}
          isExcluded={isExcluded}
          colorsUI={colorsUI}
          trendFromYear={TREND_FROM_YEAR}
          colors={COLORS}
        />
      )}
      {activeTab === "exams" && (
        <ExamsTab
          {...examFilters}
          setSearchTopic={goToTopic}
          setSearchChapter={goToChapter}
          setSearchType={goToType}
          exams={displayExams}
          globalLatestYear={globalLatestYear}
          topicHe={TOPIC_HE}
          isExcluded={isExcluded}
          colorsUI={colorsUI}
          studyMode={studyMode}
          doneVersion={doneVersion}
          labelsVersion={labelsVersion}
          {...studyProps}
        />
      )}
      {activeTab === "search" && (
        <SearchTab
          {...searchFilters}
          goToTopic={goToTopic}
          goToChapter={goToChapter}
          goToType={goToType}
          exams={displayExams}
          topicHe={TOPIC_HE}
          isExcluded={isExcluded}
          chapters={CHAPTERS}
          colorsUI={colorsUI}
          studyMode={studyMode}
          doneVersion={doneVersion}
          labelsVersion={labelsVersion}
          {...studyProps}
        />
      )}
      {activeTab === "insights" && (
        <Insights
          stats={stats}
          setSearchTopic={goToTopic}
          exams={displayExams}
          topicHe={TOPIC_HE}
          excludedTopics={EXCLUDED_TOPICS}
          traps={TRAPS}
          trendFromYear={TREND_FROM_YEAR}
          colorsUI={colorsUI}
        />
      )}

      <Footer
        stats={{
          exams: displayExams.length,
          questions: totalQuestions,
          minYear,
          maxYear,
        }}
      />
    </div>
  );
}
