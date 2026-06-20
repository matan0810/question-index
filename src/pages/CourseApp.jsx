import { useCallback, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
  useStats,
  useProgress,
  useLabels,
  useUrlParam,
  useTabNavigation,
  useExamFilters,
  useSearchFilters,
} from "../hooks";
import { Header, FormatBanner, TabBar, Footer, ScrollProgress } from "../components";
import { Overview, Heatmap, ExamsTab, SearchTab, Insights } from "../tabs";
import { useCourse } from "../context/CourseContext";
import { examMatchesLecturer, buildLecturersList } from "../utils/exam";

export default function CourseApp() {
  const {
    COURSE,
    CHAPTERS,
    EXCLUDED_TOPICS,
    TREND_FROM_YEAR,
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
    useTabNavigation(searchParams, setSearchParams);

  // Global lecturer mode
  const [activeLecturer, setActiveLecturer] = useUrlParam(
    searchParams,
    setSearchParams,
    "activeLecturer",
  );

  const examFilters = useExamFilters(searchParams, setSearchParams);
  const searchFilters = useSearchFilters(searchParams, setSearchParams);

  // When activeLecturer is set, all tabs see only that lecturer's exams
  const displayExams = useMemo(
    () =>
      activeLecturer
        ? EXAMS.filter((e) => examMatchesLecturer(e, activeLecturer))
        : EXAMS,
    [EXAMS, activeLecturer],
  );

  const lecturers = useMemo(() => buildLecturersList(EXAMS), [EXAMS]);

  // Totals for the header/footer — single pass over the (memoized) exam list.
  const { totalQuestions, minYear, maxYear } = useMemo(() => {
    if (!displayExams.length) return { totalQuestions: 0, minYear: 0, maxYear: 0 };
    let total = 0;
    let min = Infinity;
    let max = -Infinity;
    for (const exam of displayExams) {
      total += exam.questions.length;
      if (exam.year < min) min = exam.year;
      if (exam.year > max) max = exam.year;
    }
    return { totalQuestions: total, minYear: min, maxYear: max };
  }, [displayExams]);

  useEffect(() => {
    document.title = `מדד שאלות - ${COURSE.name} · ${COURSE.number}`;
  }, [COURSE]);

  const stats = useStats(displayExams);

  // Derive format banner info from the actual latest exam (not hardcoded config)
  const latestExam = useMemo(() => {
    if (!EXAMS.length) return null;
    return [...EXAMS].sort((a, b) =>
      b.year !== a.year ? b.year - a.year : b.moed > a.moed ? 1 : -1,
    )[0];
  }, [EXAMS]);

  const derivedExamFormat = useMemo(() => {
    if (!EXAM_FORMAT || !latestExam) return EXAM_FORMAT;
    return {
      ...EXAM_FORMAT,
      latestSession: `${latestExam.year} מועד ${latestExam.moed}`,
      latestDate: latestExam.date ?? "",
      lecturer: latestExam.lecturers?.[0] ?? "",
    };
  }, [EXAM_FORMAT, latestExam]);

  // Progress + label callbacks — only wired through when study mode is on
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
          exams={displayExams}
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
