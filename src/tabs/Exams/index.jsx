import { useMemo } from "react";
import { ShowMore, ExamCard } from "../../components";
import { usePagination } from "../../hooks";
import { COLORS_UI, primaryColor } from "../../styles";
import { buildLecturersList } from "../../utils/exam";
import { PAGE_SIZE, DEFAULT_SORT_BY, DEFAULT_SORT_DIR } from "./constants";
import { filterAndSortExams, countQuestions } from "./filtering";
import ExamsFilterBar from "./ExamsFilterBar";

export default function ExamsTab({
  yearFilter,
  setYearFilter,
  moedFilter,
  setMoedFilter,
  semesterFilter,
  setSemesterFilter,
  lecturerFilter,
  setLecturerFilter,
  queryFilter,
  setQueryFilter,
  sortBy,
  setSortBy,
  sortDir,
  setSortDir,
  hideLatest,
  setHideLatest,
  clearAll,
  globalLatestYear,
  setSearchTopic,
  setSearchChapter,
  setSearchType,
  exams,
  topicHe,
  isExcluded,
  colorsUI,
  studyMode,
  isDone,
  toggleDone,
  hasLabel,
  toggleLabel,
  doneVersion,
  labelsVersion,
}) {
  const accent = primaryColor(colorsUI);
  const secondary = colorsUI?.secondary ?? COLORS_UI.secondary;

  const years = useMemo(
    () => [...new Set(exams.map((e) => e.year))].sort(),
    [exams],
  );
  const lecturers = useMemo(() => buildLecturersList(exams), [exams]);

  // Prefer the globally-computed latest year so "hide latest" and "המבחן שלך!"
  // stay consistent regardless of which years are currently filtered.
  const filteredLatestYear = useMemo(
    () => (exams.length ? Math.max(...exams.map((e) => e.year)) : null),
    [exams],
  );
  const latestYear = globalLatestYear ?? filteredLatestYear;

  const effectiveSortBy = sortBy || DEFAULT_SORT_BY;
  const effectiveSortDir = sortDir || DEFAULT_SORT_DIR;
  const normalizedQuery = queryFilter?.trim().toLowerCase() ?? "";

  const filteredExams = useMemo(
    () =>
      filterAndSortExams(exams, {
        yearFilter,
        moedFilter,
        semesterFilter,
        lecturerFilter,
        query: normalizedQuery,
        hideLatest,
        latestYear,
        sortBy: effectiveSortBy,
        sortDir: effectiveSortDir,
      }),
    [
      exams,
      yearFilter,
      moedFilter,
      semesterFilter,
      lecturerFilter,
      normalizedQuery,
      hideLatest,
      latestYear,
      effectiveSortBy,
      effectiveSortDir,
    ],
  );

  const hasActiveFilters =
    yearFilter || moedFilter || semesterFilter || lecturerFilter || queryFilter;

  // Render exam cards a page at a time; reset when filters/sort change.
  const resetKey = `${yearFilter}|${moedFilter}|${semesterFilter}|${lecturerFilter}|${queryFilter}|${hideLatest}|${effectiveSortBy}|${effectiveSortDir}`;
  const page = usePagination(filteredExams.length, { pageSize: PAGE_SIZE, resetKey });

  return (
    <div>
      <ExamsFilterBar
        queryFilter={queryFilter}
        setQueryFilter={setQueryFilter}
        yearFilter={yearFilter}
        setYearFilter={setYearFilter}
        years={years}
        moedFilter={moedFilter}
        setMoedFilter={setMoedFilter}
        semesterFilter={semesterFilter}
        setSemesterFilter={setSemesterFilter}
        lecturerFilter={lecturerFilter}
        setLecturerFilter={setLecturerFilter}
        lecturers={lecturers}
        sortBy={effectiveSortBy}
        setSortBy={setSortBy}
        sortDir={effectiveSortDir}
        setSortDir={setSortDir}
        hideLatest={hideLatest}
        setHideLatest={setHideLatest}
        colorsUI={colorsUI}
        examCount={filteredExams.length}
        questionCount={countQuestions(filteredExams)}
        hasActiveFilters={hasActiveFilters}
        clearAll={clearAll}
      />

      {filteredExams.length === 0 && (
        <div className="empty-state">אין נתונים</div>
      )}

      <div className="auto-grid">
        {filteredExams.slice(0, page.visible).map((exam) => (
          <ExamCard
            key={exam.code}
            exam={exam}
            isLatest={exam.year === latestYear}
            topicHe={topicHe}
            isExcluded={isExcluded}
            pri={accent}
            sec={secondary}
            studyMode={studyMode}
            setSearchTopic={setSearchTopic}
            setSearchChapter={setSearchChapter}
            setSearchType={setSearchType}
            isDone={isDone}
            toggleDone={toggleDone}
            hasLabel={hasLabel}
            toggleLabel={toggleLabel}
            doneVersion={doneVersion}
            labelsVersion={labelsVersion}
          />
        ))}
      </div>

      <ShowMore
        visible={page.visible}
        total={filteredExams.length}
        remaining={page.remaining}
        step={PAGE_SIZE}
        unit="מבחנים"
        onMore={page.showMore}
        onAll={page.showAll}
      />
    </div>
  );
}
