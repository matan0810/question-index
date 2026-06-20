import { useTypeHelpers, SortControls } from "../../components";
import { inp, clearBtn, countBadge } from "../../styles";
import { MOED_OPTIONS } from "../../utils/exam";

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
  lecturer, setLecturer,
  progressFilter, setProgressFilter,
  sortBy, setSortBy,
  sortDir, setSortDir,
  hideLatest, setHideLatest,
  clearAll,
  topicsByFrequency,
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

  return (
    <div className="ui-card filter-bar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="חפש שאלה, נוסחה, נושא..."
        style={{ ...inp, minWidth: 220 }}
      />
      <select value={topic} onChange={(e) => setTopic(e.target.value)} style={inp}>
        <option value="">כל הנושאים</option>
        {topicsByFrequency.map(([key]) => (
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
      <SortControls
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortDir={sortDir}
        setSortDir={setSortDir}
        hideLatest={hideLatest}
        setHideLatest={setHideLatest}
        colorsUI={colorsUI}
      />
      <span style={countBadge}>{resultCount} תוצאות</span>
      {hasActiveFilters && (
        <button onClick={clearAll} style={clearBtn}>נקה סינון</button>
      )}
    </div>
  );
}
