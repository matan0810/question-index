import { useMemo } from "react";
import { SortControls, ShowMore } from "../components";
import { usePagination } from "../hooks";
import { inp, COLORS_UI, clearBtn, countBadge, primaryColor, FONTS } from "../styles";
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
  queryFilter,
  setQueryFilter,
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

  const normalizedQuery = queryFilter?.trim().toLowerCase() ?? "";

  const filteredExams = useMemo(() => {
    const pool = exams.filter((exam) => {
      if (yearFilter && String(exam.year) !== yearFilter) return false;
      if (moedFilter && exam.moed !== moedFilter) return false;
      if (semesterFilter && exam.semester !== semesterFilter) return false;
      if (lecturerFilter && !examMatchesLecturer(exam, lecturerFilter)) return false;
      if (hideLatest && exam.year === latestYear) return false;
      if (normalizedQuery) {
        const hay = [
          exam.code,
          String(exam.year),
          exam.moed,
          ...(exam.lecturers ?? []),
          ...exam.questions.map((q) => q.summary ?? ""),
          ...exam.questions.flatMap((q) => q.topics ?? []),
        ]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(normalizedQuery)) return false;
      }
      return true;
    });
    return sortExams(pool, effectiveSortBy, effectiveSortDir);
  }, [
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
  ]);

  const hasActiveFilters = yearFilter || moedFilter || semesterFilter || lecturerFilter || queryFilter;

  // Render exam cards a page at a time; reset when filters/sort change.
  const resetKey = `${yearFilter}|${moedFilter}|${semesterFilter}|${lecturerFilter}|${queryFilter}|${hideLatest}|${effectiveSortBy}|${effectiveSortDir}`;
  const page = usePagination(filteredExams.length, { pageSize: PAGE_SIZE, resetKey });

  return (
    <div>
      {/* Filter bar */}
      <div className="ui-card filter-bar">
        <input
          type="text"
          value={queryFilter || ""}
          onChange={(e) => setQueryFilter(e.target.value)}
          placeholder="חיפוש חופשי..."
          style={{ ...inp, fontFamily: FONTS.sans, minWidth: 140 }}
        />
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
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, marginRight: "auto" }}>
          <span style={countBadge}>
            {filteredExams.length} מבחנים ·{" "}
            {filteredExams.reduce((s, e) => s + e.questions.length, 0)} שאלות
          </span>
          {hasActiveFilters && (
            <button onClick={clearAll} style={clearBtn}>
              נקה סינון
            </button>
          )}
        </span>
      </div>

      {filteredExams.length === 0 && (
        <div className="empty-state">אין נתונים</div>
      )}

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
