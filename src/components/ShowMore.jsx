import { COLORS_UI, FONTS } from "../styles";

// "Show more / show all" control shown under a paginated list (see usePagination).
export default function ShowMore({ visible, total, remaining, step, unit, onMore, onAll }) {
  if (remaining <= 0) return null;

  const btn = {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: 600,
    padding: "7px 16px",
    cursor: "pointer",
    background: "transparent",
    border: `1px solid ${COLORS_UI.border}`,
    color: COLORS_UI.text,
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 14,
        marginTop: 16,
        flexWrap: "wrap",
      }}
    >
      <button onClick={onMore} style={btn}>
        ▼ עוד {Math.min(remaining, step)} {unit}
      </button>
      <span style={{ fontFamily: FONTS.sans, fontSize: 11, color: COLORS_UI.muted }}>
        מציג {visible} מתוך {total}
      </span>
      <button
        onClick={onAll}
        style={{
          ...btn,
          border: "none",
          color: COLORS_UI.muted,
          textDecoration: "underline",
          textDecorationStyle: "dotted",
        }}
      >
        הצג הכל
      </button>
    </div>
  );
}
