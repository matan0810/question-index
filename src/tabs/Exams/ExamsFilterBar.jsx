import { SortControls } from "../../components";
import { inp, clearBtn, countBadge, FONTS } from "../../styles";
import { MOED_OPTIONS, SEMESTER_OPTIONS } from "../../utils";

export default function ExamsFilterBar({
  queryFilter,
  setQueryFilter,
  yearFilter,
  setYearFilter,
  years,
  moedFilter,
  setMoedFilter,
  semesterFilter,
  setSemesterFilter,
  lecturerFilter,
  setLecturerFilter,
  lecturers,
  sortBy,
  setSortBy,
  sortDir,
  setSortDir,
  hideLatest,
  setHideLatest,
  colorsUI,
  examCount,
  questionCount,
  hasActiveFilters,
  clearAll,
}) {
  return (
    <div className="ui-card filter-bar">
      <input
        type="text"
        value={queryFilter || ""}
        onChange={(e) => setQueryFilter(e.target.value)}
        placeholder="חיפוש חופשי..."
        style={{ ...inp, fontFamily: FONTS.sans, flex: 1, minWidth: 80 }}
      />
      <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)} style={inp}>
        <option value="">כל השנים</option>
        {years.map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
      <select value={moedFilter} onChange={(e) => setMoedFilter(e.target.value)} style={inp}>
        <option value="">כל המועדים</option>
        {MOED_OPTIONS.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
      <select value={semesterFilter} onChange={(e) => setSemesterFilter(e.target.value)} style={inp}>
        <option value="">כל הסמסטרים</option>
        {SEMESTER_OPTIONS.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
      {lecturers.length > 1 && (
        <select value={lecturerFilter} onChange={(e) => setLecturerFilter(e.target.value)} style={inp}>
          <option value="">כל המרצים</option>
          {lecturers.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      )}
      <SortControls
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortDir={sortDir}
        setSortDir={setSortDir}
        hideLatest={hideLatest}
        setHideLatest={setHideLatest}
        colorsUI={colorsUI}
      />
      <span style={{ display: "inline-flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
        <span style={countBadge}>
          {examCount} מבחנים · {questionCount} שאלות
        </span>
        {hasActiveFilters && (
          <button onClick={clearAll} style={clearBtn}>
            נקה סינון
          </button>
        )}
      </span>
    </div>
  );
}
