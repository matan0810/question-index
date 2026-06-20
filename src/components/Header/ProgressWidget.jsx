import { useState, useEffect, useRef } from "react";
import { COLORS_UI, FONTS } from "../../styles";
import ConfirmDialog from "../ConfirmDialog";

export default function ProgressWidget({ doneCount, totalQuestions, resetProgress }) {
  const [resetArmed, setResetArmed] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const armTimer = useRef(null);

  useEffect(() => () => clearTimeout(armTimer.current), []);

  function handleResetClick() {
    if (!resetArmed) {
      setResetArmed(true);
      armTimer.current = setTimeout(() => setResetArmed(false), 5000);
    } else {
      clearTimeout(armTimer.current);
      setResetArmed(false);
      setShowConfirm(true);
    }
  }

  function handleConfirmReset() {
    setShowConfirm(false);
    resetProgress();
  }

  const progressPct = totalQuestions > 0 ? Math.round((doneCount / totalQuestions) * 100) : 0;

  return (
    <div style={{ minWidth: 150 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 4,
        }}
      >
        <span style={{ fontSize: 11, color: COLORS_UI.subdued, fontWeight: 600 }}>
          {doneCount}/{totalQuestions} ({progressPct}%)
        </span>

        {doneCount > 0 && (
          <button
            onClick={handleResetClick}
            title={resetArmed ? "לחץ שוב לאיפוס" : "איפוס התקדמות"}
            style={{
              fontFamily: FONTS.sans,
              fontSize: 10,
              fontWeight: resetArmed ? 600 : 400,
              background: resetArmed ? "#c1440e0e" : "transparent",
              border: resetArmed ? "1px solid #c1440e60" : "none",
              color: resetArmed ? "#c1440e" : COLORS_UI.muted,
              cursor: "pointer",
              padding: resetArmed ? "2px 7px" : "1px 4px",
              opacity: resetArmed ? 1 : 0.45,
              transition: "all 0.2s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              if (!resetArmed) e.currentTarget.style.opacity = 0.85;
              else e.currentTarget.style.background = "#c1440e1c";
            }}
            onMouseLeave={(e) => {
              if (!resetArmed) e.currentTarget.style.opacity = 0.45;
              else e.currentTarget.style.background = "#c1440e0e";
            }}
          >
            {resetArmed ? "↺ איפוס" : "↺"}
          </button>
        )}
      </div>

      <div style={{ height: 4, background: COLORS_UI.barBg }}>
        <div
          style={{
            height: "100%",
            width: `${progressPct}%`,
            background: COLORS_UI.doneText,
            transition: "width 0.3s ease",
          }}
        />
      </div>

      {showConfirm && (
        <ConfirmDialog
          title="איפוס התקדמות"
          body="כל השאלות שסימנת כ-'הושלמו' יימחקו. פעולה זו אינה הפיכה."
          confirmLabel="איפוס הכל"
          onConfirm={handleConfirmReset}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}
