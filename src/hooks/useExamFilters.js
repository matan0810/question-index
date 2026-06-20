import { useUrlParam } from "./useUrlParam";

// ExamsTab's three filters, bundled and keyed to the tab's prop names so the
// result can be spread straight onto <ExamsTab {...examFilters} />.
export function useExamFilters(params, setParams) {
  const [yearFilter, setYearFilter] = useUrlParam(params, setParams, "examYear");
  const [moedFilter, setMoedFilter] = useUrlParam(params, setParams, "examMoed");
  const [lecturerFilter, setLecturerFilter] = useUrlParam(
    params,
    setParams,
    "examLecturer",
  );
  return {
    yearFilter,
    setYearFilter,
    moedFilter,
    setMoedFilter,
    lecturerFilter,
    setLecturerFilter,
  };
}
