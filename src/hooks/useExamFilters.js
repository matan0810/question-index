import { useCallback } from "react";
import { useUrlParam } from "./useUrlParam";

// Keys cleared by "נקה סינון"; sort/view toggles persist.
const EXAM_FILTER_KEYS = ["examYear", "examMoed", "examSemester", "examLecturer"];

// ExamsTab's filters + sort state, bundled and keyed to the tab's prop names so
// the result can be spread straight onto <ExamsTab {...examFilters} />.
export function useExamFilters(params, setParams) {
  const [yearFilter, setYearFilter] = useUrlParam(params, setParams, "examYear");
  const [moedFilter, setMoedFilter] = useUrlParam(params, setParams, "examMoed");
  const [semesterFilter, setSemesterFilter] = useUrlParam(params, setParams, "examSemester");
  const [lecturerFilter, setLecturerFilter] = useUrlParam(
    params,
    setParams,
    "examLecturer",
  );
  const [sortBy, setSortBy] = useUrlParam(params, setParams, "examSort");
  const [sortDir, setSortDir] = useUrlParam(params, setParams, "examDir");
  const [hideLatest, setHideLatest] = useUrlParam(params, setParams, "examHideLatest");

  // Reset every filter key in a single history replace; sequential setters would
  // each read the same stale params snapshot and only the last would survive.
  const clearAll = useCallback(() => {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        EXAM_FILTER_KEYS.forEach((k) => next.delete(k));
        return next;
      },
      { replace: true },
    );
  }, [setParams]);

  return {
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
    hideLatest: hideLatest === "1",
    setHideLatest: (on) => setHideLatest(on ? "1" : ""),
    clearAll,
  };
}
