import { useMemo } from "react";
import { SortControls, ShowMore } from "../components";
import { usePagination } from "../hooks";
import { inp, COLORS_UI, clearBtn, countBadge, primaryColor } from "../styles";
import {
  MOED_OPTIONS,
  SEMESTER_OPTIONS,
  examMatchesLecturer,
  buildLecturersList,
  sortExams,
} from "../utils/exam";
import { ExamCard } from "../components";

const PAGE_SIZE = 6;

export default function ExamsTab({
  yearFilter,
  setYearFilter,
  moedFilter,
  setMoedFilter,
  semesterFilter,
  setSemesterFilter,
  lecturerFilter,
  setLecturerFilter,
  sortBy,
  setSortBy,
  sortDir,
  setSortDir,
  hideLatest,
  setHideLatest,
  clearAll,
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
  const pri = primaryColor(colorsUI);
  const sec = colorsUI?.secondary ?? COLORS_UI.secondary;

  const years = useMemo(
    () => [...new Set(exams.map((e) => e.year))].sort(),
    [exams],
  );

  const lecturers = useMemo(() => buildLecturersList(exams), [exams]);

  const latestYear = useMemo(() => Math.max(...exams.map((e) => e.year)), [exams]);

  const effectiveSortBy = sortBy || "date";
  const effectiveSortDir = sortDir || "desc";

  const filteredExams = useMemo(() => {
    const pool = exams.filter(
      (exam) =>
        (!yearFilter || String(exam.year) === yearFilter) &&
        (!moedFilter || exam.moed === moedFilter) &&
        (!semesterFilter || exam.semester === semesterFilter) &&
        (!lecturerFilter || examMatchesLecturer(exam, lecturerFilter)) &&
        (!hideLatest || exam.year !== latestYear),
    );
    return sortExams(pool, effectiveSortBy, effectiveSortDir);
  }, [
    exams,
    yearFilter,
    moedFilter,
    semesterFilter,
    lecturerFilter,
    hideLatest,
    latestYear,
    effectiveSortBy,
    effectiveSortDir,
  ]);

  const hasActiveFilters = yearFilter || moedFilter || semesterFilter || lecturerFilter;

  // Render exam cards a page at a time; reset when filters/sort change.
  const resetKey = `${yearFilter}|${moedFilter}|${semesterFilter}|${lecturerFilter}|${hideLatest}|${effectiveSortBy}|${effectiveSortDir}`;
  const page = usePagination(filteredExams.length, { pageSize: PAGE_SIZE, resetKey });

  return (
    <div>
      {/* Filter bar */}
      <div className="ui-card filter-bar">
        <select
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          style={inp}
        >
          <option value="">כל השנים</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        <select
          value={moedFilter}
          onChange={(e) => setMoedFilter(e.target.value)}
          style={inp}
        >
          <option value="">כל המועדים</option>
          {MOED_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <select
          value={semesterFilter}
          onChange={(e) => setSemesterFilter(e.target.value)}
          style={inp}
        >
          <option value="">כל הסמסטרים</option>
          {SEMESTER_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {lecturers.length > 1 && (
          <select
            value={lecturerFilter}
            onChange={(e) => setLecturerFilter(e.target.value)}
            style={inp}
          >
            <option value="">כל המרצים</option>
            {lecturers.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        )}
        <SortControls
          sortBy={effectiveSortBy}
          setSortBy={setSortBy}
          sortDir={effectiveSortDir}
          setSortDir={setSortDir}
          hideLatest={hideLatest}
          setHideLatest={setHideLatest}
          colorsUI={colorsUI}
        />
        <span style={countBadge}>
          {filteredExams.length} מבחנים ·{" "}
          {filteredExams.reduce((s, e) => s + e.questions.length, 0)} שאלות
        </span>
        {hasActiveFilters && (
          <button onClick={clearAll} style={clearBtn}>
            נקה סינון
          </button>
        )}
      </div>

      {/* Exam cards */}
      <div className="auto-grid">
        {filteredExams.slice(0, page.visible).map((exam) => (
          <ExamCard
            key={exam.code}
            exam={exam}
            isLatest={exam.year === latestYear}
            topicHe={topicHe}
            isExcluded={isExcluded}
            pri={pri}
            sec={sec}
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
