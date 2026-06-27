import { useTypeHelpers, SortControls } from "../../components";
import { inp, clearBtn, countBadge, primaryColor, toggleChip } from "../../styles";
import { MOED_OPTIONS, SEMESTER_OPTIONS } from "../../utils";

const PROGRESS_OPTIONS = [
  { value: "done",   label: "✓ בוצע" },
  { value: "undone", label: "○ לא בוצע" },
  { value: "hard",   label: "★ קשה" },
  { value: "later",  label: "◎ להמשך" },
];

export default function SearchFilterBar({
  query, setQuery,
  topic, setTopic,
  chapter, setChapter,
  type, setType,
  year, setYear,
  moed, setMoed,
  semester, setSemester,
  lecturer, setLecturer,
  progressFilter, setProgressFilter,
  sortBy, setSortBy,
  sortDir, setSortDir,
  hideLatest, setHideLatest,
  hideExcluded, setHideExcluded,
  clearAll,
  topicOptions,
  topicHe,
  chapters,
  years,
  lecturers,
  types,
  resultCount,
  hasActiveFilters,
  colorsUI,
  studyMode,
}) {
  const { typeToLabel } = useTypeHelpers();
  const accent = primaryColor(colorsUI);

  return (
    <div className="ui-card search-filters">
      {/* Free-text search — its own full-width row */}
      <input
        type="text"
        className="search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="חפש שאלה, נוסחה, נושא..."
        style={inp}
      />

      {/* Dropdown filters */}
      <div className="filter-group">
        <select value={topic} onChange={(e) => setTopic(e.target.value)} style={inp}>
          <option value="">כל הנושאים</option>
          {topicOptions.map((key) => (
            <option key={key} value={key}>{topicHe[key] || key}</option>
          ))}
        </select>
        <select value={chapter} onChange={(e) => setChapter(e.target.value)} style={inp}>
          <option value="">כל הפרקים</option>
          {chapters.map(({ key, label }) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
        <select value={type} onChange={(e) => setType(e.target.value)} style={inp}>
          <option value="">כל הסוגים</option>
          {types.map((t) => (
            <option key={t} value={t}>{typeToLabel(t)}</option>
          ))}
        </select>
        <select value={year} onChange={(e) => setYear(e.target.value)} style={inp}>
          <option value="">כל השנים</option>
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        <select value={moed} onChange={(e) => setMoed(e.target.value)} style={inp}>
          <option value="">כל המועדים</option>
          {MOED_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        <select value={semester} onChange={(e) => setSemester(e.target.value)} style={inp}>
          <option value="">כל הסמסטרים</option>
          {SEMESTER_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        {lecturers.length > 1 && (
          <select value={lecturer} onChange={(e) => setLecturer(e.target.value)} style={inp}>
            <option value="">כל המרצים</option>
            {lecturers.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        )}
        {studyMode && setProgressFilter && (
          <select value={progressFilter || ""} onChange={(e) => setProgressFilter(e.target.value)} style={inp}>
            <option value="">כל הסטטוסים</option>
            {PROGRESS_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        )}
      </div>

      {/* Sort, toggles, result count and clear — separated by a divider */}
      <div className="filter-controls">
        <SortControls
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortDir={sortDir}
          setSortDir={setSortDir}
          hideLatest={hideLatest}
          setHideLatest={setHideLatest}
          colorsUI={colorsUI}
        />
        <button
          type="button"
          onClick={() => setHideExcluded(!hideExcluded)}
          aria-pressed={hideExcluded}
          title="הסתר שאלות בנושאים שאינם בסילבוס הנוכחי"
          style={toggleChip(hideExcluded, accent)}
        >
          <span style={{ fontSize: 15, lineHeight: 1 }}>{hideExcluded ? "☑" : "☐"}</span>
          הסתר לא בחומר
        </button>
        <span className="controls-spacer" />
        <span style={countBadge}>{resultCount} תוצאות</span>
        {hasActiveFilters && (
          <button onClick={clearAll} style={clearBtn}>נקה סינון</button>
        )}
      </div>
    </div>
  );
}
