import { useUrlParam } from "./useUrlParam";

// ExamsTab's filters + sort state, bundled and keyed to the tab's prop names so
// the result can be spread straight onto <ExamsTab {...examFilters} />.
export function useExamFilters(params, setParams) {
  const [yearFilter, setYearFilter] = useUrlParam(params, setParams, "examYear");
  const [moedFilter, setMoedFilter] = useUrlParam(params, setParams, "examMoed");
  const [lecturerFilter, setLecturerFilter] = useUrlParam(
    params,
    setParams,
    "examLecturer",
  );
  const [sortBy, setSortBy] = useUrlParam(params, setParams, "examSort");
  const [sortDir, setSortDir] = useUrlParam(params, setParams, "examDir");
  const [hideLatest, setHideLatest] = useUrlParam(params, setParams, "examHideLatest");

  return {
    yearFilter,
    setYearFilter,
    moedFilter,
    setMoedFilter,
    lecturerFilter,
    setLecturerFilter,
    sortBy,
    setSortBy,
    sortDir,
    setSortDir,
    hideLatest: hideLatest === "1",
    setHideLatest: (on) => setHideLatest(on ? "1" : ""),
  };
}
