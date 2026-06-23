import { useSearchData, usePagination } from "../../hooks";
import { ShowMore } from "../../components";
import { SearchResultCard } from "../../components";
import SearchFilterBar from "./SearchFilterBar";

const PAGE_SIZE = 50;

export default function SearchTab({
  query, setQuery,
  topic, setTopic,
  chapter, setChapter,
  type, setType,
  year, setYear,
  moed, setMoed,
  semester, setSemester,
  lecturer, setLecturer,
  progressFilter, setProgressFilter,
  sortBy, setSortBy,
  sortDir, setSortDir,
  hideLatest, setHideLatest,
  hideExcluded, setHideExcluded,
  clearAll,
  goToTopic,
  goToChapter,
  goToType,
  exams,
  topicHe,
  isExcluded,
  chapters,
  colorsUI,
  studyMode,
  isDone,
  toggleDone,
  hasLabel,
  toggleLabel,
  doneVersion,
  labelsVersion,
}) {
  const effectiveSortBy = sortBy || "date";
  const effectiveSortDir = sortDir || "desc";
  const filters = { query, topic, chapter, type, year, moed, semester, lecturer, progressFilter };
  const { topicOptions, years, lecturers, types, results } = useSearchData(
    exams,
    {
      ...filters,
      sortBy: effectiveSortBy,
      sortDir: effectiveSortDir,
      hideLatest,
      hideExcluded,
      isExcluded,
    },
    topicHe,
    isDone,
    doneVersion,
    hasLabel,
    labelsVersion,
  );
  const hasActiveFilters = Object.values(filters).some(Boolean);

  const resetKey = `${query}|${topic}|${chapter}|${type}|${year}|${moed}|${semester}|${lecturer}|${progressFilter}|${effectiveSortBy}|${effectiveSortDir}|${hideLatest}|${hideExcluded}`;
  const page = usePagination(results.length, { pageSize: PAGE_SIZE, resetKey });

  return (
    <div>
      <SearchFilterBar
        query={query} setQuery={setQuery}
        topic={topic} setTopic={setTopic}
        chapter={chapter} setChapter={setChapter}
        type={type} setType={setType}
        year={year} setYear={setYear}
        moed={moed} setMoed={setMoed}
        semester={semester} setSemester={setSemester}
        lecturer={lecturer} setLecturer={setLecturer}
        progressFilter={progressFilter} setProgressFilter={setProgressFilter}
        sortBy={effectiveSortBy} setSortBy={setSortBy}
        sortDir={effectiveSortDir} setSortDir={setSortDir}
        hideLatest={hideLatest} setHideLatest={setHideLatest}
        hideExcluded={hideExcluded} setHideExcluded={setHideExcluded}
        clearAll={clearAll}
        topicOptions={topicOptions}
        topicHe={topicHe}
        chapters={chapters}
        years={years}
        lecturers={lecturers}
        types={types}
        resultCount={results.length}
        hasActiveFilters={hasActiveFilters}
        colorsUI={colorsUI}
        studyMode={studyMode}
      />

      {results.length === 0 && (
        <div className="empty-state">לא נמצאו שאלות</div>
      )}

      <div className="results-grid">
        {results.slice(0, page.visible).map(({ exam, question }) => (
          <SearchResultCard
            key={`${exam.code}__${question.id}`}
            exam={exam}
            question={question}
            topicHe={topicHe}
            isExcluded={isExcluded}
            setTopic={goToTopic}
            setChapter={goToChapter}
            setType={goToType}
            colorsUI={colorsUI}
            studyMode={studyMode}
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
        total={results.length}
        remaining={page.remaining}
        step={PAGE_SIZE}
        unit="תוצאות"
        onMore={page.showMore}
        onAll={page.showAll}
      />
    </div>
  );
}
