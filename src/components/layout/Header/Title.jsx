import { FONTS, primaryColor } from "../../../styles";
import FilterChip from "./FilterChip";

// Human-readable label for the active year range, or null when no year filter
// is set. activeYearFrom is already "" when there is no from-year.
function yearRangeLabel(activeYearFrom, activeYearTo) {
  if (activeYearFrom && activeYearTo) return `${activeYearFrom}–${activeYearTo}`;
  if (activeYearFrom) return `משנה ${activeYearFrom}`;
  if (activeYearTo) return `עד ${activeYearTo}`;
  return null;
}

export default function Title({
  course,
  colorsUI,
  activeLecturer,
  setActiveLecturer,
  activeYearFrom,
  setActiveYearFrom,
  activeYearTo,
  setActiveYearTo,
  clearYearFilter,
}) {
  const accent = primaryColor(colorsUI);
  const yearLabel = yearRangeLabel(activeYearFrom, activeYearTo);

  return (
    <>
      <div
        style={{
          fontFamily: FONTS.sans,
          fontWeight: 800,
          fontSize: 38,
          lineHeight: 1,
          letterSpacing: "-0.03em",
        }}
      >
        מדד שאלות <span style={{ color: accent }}>{course.shortName}</span>
      </div>

      {yearLabel && (
        <FilterChip
          label={`שנים: ${yearLabel}`}
          onClear={clearYearFilter}
          clearTitle="הסר סינון שנים"
          accent={accent}
        />
      )}

      {activeLecturer && (
        <FilterChip
          label={`מרצה: ${activeLecturer}`}
          onClear={() => setActiveLecturer("")}
          clearTitle="הסר סינון מרצה"
          accent={accent}
        />
      )}
    </>
  );
}
