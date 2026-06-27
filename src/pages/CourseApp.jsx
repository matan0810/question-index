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
import { examMatchesLecturer, buildLecturersList, normalizeLecturer } from "../utils/exam";

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

  // Global filters (header) — narrow every tab and the format banner at once.
  const [activeLecturer, setActiveLecturer] = useUrlParam(searchParams, setSearchParams, "activeLecturer");
  const [activeYearFrom, setActiveYearFrom] = useUrlParam(searchParams, setSearchParams, "activeYearFrom");
  const [activeYearTo, setActiveYearTo] = useUrlParam(searchParams, setSearchParams, "activeYearTo");

  // Apply per-course default year filter on first load only. "0" acts as an
  // explicit "show all" sentinel — set when the user removes the chip, so the
  // default is NOT re-applied on subsequent loads/reloads.
  useEffect(() => {
    if (!searchParams.has("activeYearFrom") && DEFAULT_YEAR_FROM) {
      setActiveYearFrom(String(DEFAULT_YEAR_FROM));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Clears the year range: sets activeYearFrom to sentinel "0" (meaning "all")
  // instead of deleting the param, so the per-course default is not re-applied
  // on subsequent page loads. Removes activeYearTo completely (it has no default).
  const clearYearFilter = useCallback(() => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set("activeYearFrom", "0");
        next.delete("activeYearTo");
        return next;
      },
      { replace: true },
    );
  }, [setSearchParams]);

  const examFilters = useExamFilters(searchParams, setSearchParams);
  const searchFilters = useSearchFilters(searchParams, setSearchParams);

  // "0" is the sentinel meaning "all years" (user explicitly cleared the filter).
  const effectiveYearFrom = activeYearFrom && activeYearFrom !== "0" ? parseInt(activeYearFrom) : null;

  // All tabs see only the globally-filtered exams (lecturer ∩ year-range).
  const displayExams = useMemo(() => {
    let list = EXAMS;
    if (activeLecturer) list = list.filter((e) => examMatchesLecturer(e, activeLecturer));
    if (effectiveYearFrom) list = list.filter((e) => e.year >= effectiveYearFrom);
    if (activeYearTo) list = list.filter((e) => e.year <= parseInt(activeYearTo));
    return list;
  }, [EXAMS, activeLecturer, effectiveYearFrom, activeYearTo]);

  const lecturers = useMemo(() => buildLecturersList(EXAMS), [EXAMS]);
  const years = useMemo(() => [...new Set(EXAMS.map((e) => e.year))].sort((a, b) => a - b), [EXAMS]);

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

  // globalLatestYear is always from the full unfiltered list — used for "hide
  // latest year" toggle and the "המבחן שלך!" badge so they stay consistent
  // regardless of the active year filter.
  const globalLatestYear = useMemo(
    () => (EXAMS.length ? Math.max(...EXAMS.map((e) => e.year)) : null),
    [EXAMS],
  );

  // Format banner and "המבחן שלך!" always reflect the globally latest exam,
  // not the filtered one — so the structure shown is always the current format.
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
      lecturer: latestExam.lecturers?.map(normalizeLecturer).join(" · ") ?? "",
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
