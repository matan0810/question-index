import { useCallback, useEffect, useMemo } from "react";
import { useUrlParam } from "./useUrlParam";
import { examMatchesLecturer, buildLecturersList, examYears } from "../utils/exam";

// URL value for activeYearFrom meaning "all years". Written (instead of deleting
// the param) when the user clears the year filter, so the per-course default
// year is NOT re-applied on later loads. Fully private to this hook: it never
// crosses the module boundary — consumers see "" for "no from-year".
const ALL_YEARS = "0";

// Global header filters — lecturer + year range — that narrow every tab and the
// format banner at once. Owns the URL state, the first-load default year, and
// the resulting exam list. The returned bundle is shaped for <Header /> props.
export function useGlobalFilters(params, setParams, exams, defaultYearFrom) {
  const [activeLecturer, setActiveLecturer] = useUrlParam(params, setParams, "activeLecturer");
  const [yearFromParam, setYearFromParam] = useUrlParam(params, setParams, "activeYearFrom");
  const [activeYearTo, setActiveYearTo] = useUrlParam(params, setParams, "activeYearTo");

  // Apply the per-course default year on first load only — never overrides an
  // explicit choice already in the URL (including the ALL_YEARS sentinel).
  useEffect(() => {
    if (!params.has("activeYearFrom") && defaultYearFrom) {
      setYearFromParam(String(defaultYearFrom));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Hide the sentinel from consumers: expose "" for "no from-year", and persist
  // a cleared from-year as the sentinel (not a deleted param) so the default
  // isn't re-applied next load.
  const activeYearFrom = yearFromParam === ALL_YEARS ? "" : yearFromParam;
  const setActiveYearFrom = useCallback(
    (year) => setYearFromParam(year || ALL_YEARS),
    [setYearFromParam],
  );

  // Clear the whole range: keep the from-year sentinel and drop activeYearTo,
  // which has no default.
  const clearYearFilter = useCallback(() => {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set("activeYearFrom", ALL_YEARS);
        next.delete("activeYearTo");
        return next;
      },
      { replace: true },
    );
  }, [setParams]);

  const yearFrom = activeYearFrom ? parseInt(activeYearFrom) : null;
  const yearTo = activeYearTo ? parseInt(activeYearTo) : null;

  // Every tab sees only the globally-filtered exams (lecturer ∩ year range).
  const displayExams = useMemo(
    () =>
      exams.filter((e) => {
        if (activeLecturer && !examMatchesLecturer(e, activeLecturer)) return false;
        if (yearFrom && e.year < yearFrom) return false;
        if (yearTo && e.year > yearTo) return false;
        return true;
      }),
    [exams, activeLecturer, yearFrom, yearTo],
  );

  const lecturers = useMemo(() => buildLecturersList(exams), [exams]);
  const years = useMemo(() => examYears(exams), [exams]);

  return {
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
  };
}
