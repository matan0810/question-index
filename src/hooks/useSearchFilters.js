import { useCallback } from "react";
import { useUrlParam } from "./useUrlParam";

// Every URL key the search tab owns — used by clearAll to wipe them in one go.
const SEARCH_KEYS = [
  "q",
  "topic",
  "chapter",
  "type",
  "year",
  "moed",
  "lecturer",
  "progress",
  "hideLatest",
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
  const [lecturer, setLecturer] = useUrlParam(params, setParams, "lecturer");
  const [progressFilter, setProgressFilter] = useUrlParam(
    params,
    setParams,
    "progress",
  );
  const [sortBy, setSortBy] = useUrlParam(params, setParams, "sort");
  const [sortDir, setSortDir] = useUrlParam(params, setParams, "dir");
  const [hideLatest, setHideLatest] = useUrlParam(params, setParams, "hideLatest");

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
    clearAll,
  };
}
