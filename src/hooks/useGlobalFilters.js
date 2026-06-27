import { useCallback, useMemo, useState } from "react";
import { useUrlParam } from "./useUrlParam";
import { examMatchesLecturer, buildLecturersList, examYears } from "../utils";

// localStorage sentinel: user explicitly chose no lower bound (distinguishes "never set" from "cleared").
const ALL_YEARS = "0";
const DEFAULT_LOOKBACK = 10;

const storageKeys = (courseId) => ({
  from: `yearFrom:${courseId}`,
  to: `yearTo:${courseId}`,
});

const readStorage = (key) => localStorage.getItem(key);
const writeStorage = (key, val) =>
  val != null ? localStorage.setItem(key, val) : localStorage.removeItem(key);

// Per-course header filters — lecturer + year range — that narrow every tab at once.
// Year bounds live only in localStorage; lecturer lives in the URL.
export function useGlobalFilters(params, setParams, exams, courseId) {
  const [activeLecturer, setActiveLecturer] = useUrlParam(params, setParams, "activeLecturer");

  const keys = storageKeys(courseId);

  const [yearFromStored, setYearFromStored] = useState(
    () => readStorage(keys.from) ?? String(new Date().getFullYear() - DEFAULT_LOOKBACK),
  );
  const [yearToStored, setYearToStored] = useState(() => readStorage(keys.to) ?? "");

  // Hide the sentinel from consumers: "" means no lower bound.
  const activeYearFrom = yearFromStored === ALL_YEARS ? "" : yearFromStored;
  const setActiveYearFrom = useCallback(
    (year) => {
      const v = year || ALL_YEARS;
      setYearFromStored(v);
      writeStorage(keys.from, v);
    },
    [keys.from],
  );

  const activeYearTo = yearToStored;
  const setActiveYearTo = useCallback(
    (year) => {
      setYearToStored(year || "");
      writeStorage(keys.to, year || null);
    },
    [keys.to],
  );

  // Sentinel for FROM so the default isn't re-applied next visit; TO is simply removed.
  const clearYearFilter = useCallback(() => {
    setYearFromStored(ALL_YEARS);
    setYearToStored("");
    writeStorage(keys.from, ALL_YEARS);
    writeStorage(keys.to, null);
  }, [keys.from, keys.to]);

  const yearFrom = activeYearFrom ? parseInt(activeYearFrom) : null;
  const yearTo = activeYearTo ? parseInt(activeYearTo) : null;

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
