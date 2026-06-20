import { useCourse } from "../../context/CourseContext";
import { COLORS_UI } from "../../styles";

const STATIC_TYPE_COLORS = {
  proof: {
    background: COLORS_UI.dark,
    color: COLORS_UI.bg,
    border: `1px solid ${COLORS_UI.dark}`,
  },
  ts: {
    background: "#d4a017",
    color: COLORS_UI.dark,
    border: "1px solid #d4a017",
  },
  calc: { background: "#7a5aab", color: "white", border: "1px solid #7a5aab" },
};

// Returns { typeToLabel, typeToKind } functions bound to the current course's type config.
export function useTypeHelpers() {
  const { QUESTION_TYPES } = useCourse();
  return {
    typeToLabel: (type) => QUESTION_TYPES?.[type]?.label ?? type,
    typeToKind:  (type) => QUESTION_TYPES?.[type]?.kind  ?? "mixed",
  };
}

export default function Chip({ children, kind }) {
  const { CHAPTERS, colorsUI } = useCourse();

  const chapterStyles = Object.fromEntries(
    CHAPTERS.map((ch) => {
      const fg = ch.chipColor ?? ch.color;
      return [ch.key, { background: ch.chipBg, color: fg, border: `1px solid ${fg}66` }];
    }),
  );

  const dynamicTypeColors = {
    mixed: {
      background: CHAPTERS[1]?.chipColor ?? CHAPTERS[1]?.color ?? colorsUI.secondary,
      color: "white",
      border: `1px solid ${CHAPTERS[1]?.chipColor ?? CHAPTERS[1]?.color ?? colorsUI.secondary}`,
    },
    hot: {
      background: colorsUI.primary,
      color: "white",
      border: `1px solid ${colorsUI.primary}`,
    },
  };

  const styles = { ...chapterStyles, ...STATIC_TYPE_COLORS, ...dynamicTypeColors };

  const defaultStyle = {
    background: COLORS_UI.bg,
    color: COLORS_UI.dark,
    border: `1px solid ${COLORS_UI.border}`,
  };

  return (
    <span
      style={{
        ...(styles[kind] ?? defaultStyle),
        padding: "3px 8px",
        fontSize: 11,
        fontWeight: 700,
        display: "inline-block",
        marginLeft: 4,
      }}
    >
      {children}
    </span>
  );
}
