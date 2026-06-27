import { useCallback, useEffect, useMemo } from "react";
import { useUrlParam } from "./useUrlParam";
import { examMatchesLecturer, buildLecturersList, examYears } from "../utils";

// URL sentinel for activeYearFrom meaning "user explicitly chose all years".
// Written instead of deleting the param so the default is not re-applied on reload.
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
// Both year bounds are persisted per course so switching courses restores each course's own filter.
export function useGlobalFilters(params, setParams, exams, courseId) {
  const [activeLecturer, setActiveLecturer] = useUrlParam(params, setParams, "activeLecturer");
  const [yearFromParam, setYearFromParam] = useUrlParam(params, setParams, "activeYearFrom");
  const [yearToParam, setYearToParam] = useUrlParam(params, setParams, "activeYearTo");

  const keys = storageKeys(courseId);

  // On mount, restore from localStorage when URL params are absent (e.g. after a course switch).
  // Both params are written in a single setParams call — two sequential calls would each receive
  // the same captured searchParams from react-router's closure and the second navigate would
  // overwrite the first.
  useEffect(() => {
    const needFrom = !params.has("activeYearFrom");
    const storedTo = readStorage(keys.to);
    const needTo = !params.has("activeYearTo") && storedTo;
    if (!needFrom && !needTo) return;
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (needFrom) {
          next.set(
            "activeYearFrom",
            readStorage(keys.from) ?? String(new Date().getFullYear() - DEFAULT_LOOKBACK),
          );
        }
        if (needTo) next.set("activeYearTo", storedTo);
        return next;
      },
      { replace: true },
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Hide the sentinel from consumers: "" means no lower bound.
  const activeYearFrom = yearFromParam === ALL_YEARS ? "" : yearFromParam;
  const setActiveYearFrom = useCallback(
    (year) => {
      const v = year || ALL_YEARS;
      setYearFromParam(v);
      writeStorage(keys.from, v);
    },
    [setYearFromParam, keys.from],
  );

  const activeYearTo = yearToParam;
  const setActiveYearTo = useCallback(
    (year) => {
      setYearToParam(year);
      writeStorage(keys.to, year || null);
    },
    [setYearToParam, keys.to],
  );

  // Clear the whole range: sentinel for FROM (so default isn't re-applied), remove TO entirely.
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
    writeStorage(keys.from, ALL_YEARS);
    writeStorage(keys.to, null);
  }, [setParams, keys.from, keys.to]);

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
