import { useCallback } from "react";
import { useUrlParam } from "./useUrlParam";

// Keys cleared by "נקה סינון"; view toggles (hideLatest/showExcl) persist.
const SEARCH_KEYS = [
  "q",
  "topic",
  "chapter",
  "type",
  "year",
  "moed",
  "semester",
  "lecturer",
  "progress",
];

// SearchTab's full filter set, keyed to the tab's prop names for spreading onto
// <SearchTab {...searchFilters} />. clearAll resets every search key in a single
// history replace (two setParams calls would drop the first update).
export function useSearchFilters(params, setParams) {
  const [query, setQuery] = useUrlParam(params, setParams, "q");
  const [topic, setTopic] = useUrlParam(params, setParams, "topic");
  const [chapter, setChapter] = useUrlParam(params, setParams, "chapter");
  const [type, setType] = useUrlParam(params, setParams, "type");
  const [year, setYear] = useUrlParam(params, setParams, "year");
  const [moed, setMoed] = useUrlParam(params, setParams, "moed");
  const [semester, setSemester] = useUrlParam(params, setParams, "semester");
  const [lecturer, setLecturer] = useUrlParam(params, setParams, "lecturer");
  const [progressFilter, setProgressFilter] = useUrlParam(
    params,
    setParams,
    "progress",
  );
  const [sortBy, setSortBy] = useUrlParam(params, setParams, "sort");
  const [sortDir, setSortDir] = useUrlParam(params, setParams, "dir");
  const [hideLatest, setHideLatest] = useUrlParam(params, setParams, "hideLatest");
  // Out-of-syllabus ("לא בחומר") questions are hidden by default; the URL only
  // records the non-default state, so "showExcl=1" means "show them".
  const [showExcluded, setShowExcluded] = useUrlParam(params, setParams, "showExcl");

  const clearAll = useCallback(() => {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        SEARCH_KEYS.forEach((k) => next.delete(k));
        return next;
      },
      { replace: true },
    );
  }, [setParams]);

  return {
    query,
    setQuery,
    topic,
    setTopic,
    chapter,
    setChapter,
    type,
    setType,
    year,
    setYear,
    moed,
    setMoed,
    semester,
    setSemester,
    lecturer,
    setLecturer,
    progressFilter,
    setProgressFilter,
    sortBy,
    setSortBy,
    sortDir,
    setSortDir,
    hideLatest: hideLatest === "1",
    setHideLatest: (on) => setHideLatest(on ? "1" : ""),
    hideExcluded: showExcluded !== "1",
    setHideExcluded: (hide) => setShowExcluded(hide ? "" : "1"),
    clearAll,
  };
}
