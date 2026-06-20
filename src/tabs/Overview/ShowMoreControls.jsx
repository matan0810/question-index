import { COLORS_UI, FONTS } from "../../styles";
import { TOPICS_INITIAL, TOPICS_INCREMENT } from "./constants";

export default function ShowMoreControls({ active, visibleCount, setVisibleCount }) {
  const remaining = active.length - visibleCount;
  const showingAll = visibleCount >= active.length;

  return (
    <div style={{ marginTop: 14 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: showingAll ? 0 : 8,
        }}
      >
        <span style={{ fontSize: 11, color: COLORS_UI.muted, fontWeight: 600 }}>
          {Math.min(visibleCount, active.length)}/{active.length} נושאים
        </span>
        {visibleCount > TOPICS_INITIAL && (
          <button
            onClick={() => setVisibleCount(TOPICS_INITIAL)}
            style={{
              background: "transparent",
              border: "none",
              color: COLORS_UI.muted,
              cursor: "pointer",
              fontSize: 11,
              padding: "2px 6px",
              fontFamily: FONTS.sans,
              textDecoration: "underline",
              textDecorationStyle: "dotted",
            }}
          >
            ▲ צמצם
          </button>
        )}
      </div>

      {!showingAll && (
        <button
          onClick={() => setVisibleCount((v) => Math.min(v + TOPICS_INCREMENT, active.length))}
          style={{
            width: "100%",
            background: "transparent",
            border: `1px solid ${COLORS_UI.border}`,
            color: COLORS_UI.subdued,
            cursor: "pointer",
            fontSize: 12,
            padding: "7px 14px",
            fontFamily: FONTS.sans,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            transition: "background 0.12s, color 0.12s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = COLORS_UI.barBg;
            e.currentTarget.style.color = COLORS_UI.text;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = COLORS_UI.subdued;
          }}
        >
          <span>▼ עוד {Math.min(remaining, TOPICS_INCREMENT)} נושאים</span>
          {remaining > TOPICS_INCREMENT && (
            <span style={{ fontSize: 11, opacity: 0.6 }}>נותרו {remaining}</span>
          )}
        </button>
      )}
    </div>
  );
}
