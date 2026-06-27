import FilterSelect from "./FilterSelect";

// The global filter row: year-from, year-to and lecturer dropdowns. Each one
// only renders when there is more than one value to choose from. The year
// dropdowns constrain each other so the range stays valid.
export default function GlobalFilters({
  years,
  lecturers,
  activeYearFrom,
  setActiveYearFrom,
  activeYearTo,
  setActiveYearTo,
  activeLecturer,
  setActiveLecturer,
  accent,
}) {
  const hasYears = years?.length > 1;
  const hasLecturers = lecturers?.length > 1;

  const yearOptions = (filter) =>
    years.filter(filter).map((y) => [String(y), String(y)]);

  return (
    <div
      style={{
        marginRight: "auto",
        display: "flex",
        alignItems: "center",
        gap: 12,
        flexWrap: "wrap",
      }}
    >
      {hasYears && (
        <FilterSelect
          label="משנה"
          value={activeYearFrom}
          onChange={setActiveYearFrom}
          options={yearOptions((y) => !activeYearTo || y <= parseInt(activeYearTo))}
          allLabel="תחילה"
          accent={accent}
        />
      )}
      {hasYears && (
        <FilterSelect
          label="עד שנה"
          value={activeYearTo}
          onChange={setActiveYearTo}
          options={yearOptions((y) => !activeYearFrom || y >= parseInt(activeYearFrom))}
          allLabel="סוף"
          accent={accent}
        />
      )}
      {hasLecturers && (
        <FilterSelect
          label="מרצה"
          value={activeLecturer}
          onChange={setActiveLecturer}
          options={lecturers.map((l) => [l, l])}
          allLabel="כל המרצים"
          accent={accent}
        />
      )}
    </div>
  );
}
