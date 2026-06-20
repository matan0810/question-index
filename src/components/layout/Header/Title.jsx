import { COLORS_UI, FONTS, primaryColor } from "../../../styles";

export default function Title({ course, colorsUI, activeLecturer, setActiveLecturer }) {
  const pri = primaryColor(colorsUI);

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
        מדד שאלות{" "}
        <span style={{ color: pri }}>{course.shortName}</span>
      </div>

      {activeLecturer && (
        <div
          style={{
            marginTop: 8,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: `${pri}12`,
            border: `1px solid ${pri}44`,
            padding: "4px 12px",
            fontSize: 12,
            color: COLORS_UI.text,
          }}
        >
          <span style={{ fontWeight: 600 }}>מרצה: {activeLecturer}</span>
          <button
            onClick={() => setActiveLecturer("")}
            title="הסר סינון מרצה"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: COLORS_UI.muted,
              fontSize: 15,
              lineHeight: 1,
              padding: "0 2px",
            }}
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}
