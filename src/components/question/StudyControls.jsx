import { COLORS_UI, FONTS } from "../../styles";

const STATES = [
  { key: "none",  icon: "○", label: "ללא",    bg: COLORS_UI.cardBg, border: COLORS_UI.border, color: COLORS_UI.subdued },
  { key: "done",  icon: "✓", label: "בוצע",   bg: "var(--done-text)",  border: "var(--done-text)", color: "var(--card-bg)"  },
  { key: "hard",  icon: "★", label: "קשה",    bg: "#c1440e18", border: "#c1440e",       color: "#c1440e"         },
  { key: "later", icon: "◎", label: "להמשך", bg: "#2b416218", border: "#4a7aab",       color: "#4a7aab"         },
];

export default function StudyControls({ done, questionKey, toggleDone, hasLabel, toggleLabel }) {
  const isHard  = hasLabel?.(questionKey, "hard")  ?? false;
  const isLater = hasLabel?.(questionKey, "later") ?? false;

  let currentKey = "none";
  if (done)    currentKey = "done";
  else if (isHard)  currentKey = "hard";
  else if (isLater) currentKey = "later";

  const idx     = STATES.findIndex((s) => s.key === currentKey);
  const current = STATES[idx];
  const next    = STATES[(idx + 1) % STATES.length];

  function advance() {
    // Clear current, set next
    if (currentKey === "done")  toggleDone?.(questionKey);
    if (currentKey === "hard")  toggleLabel?.(questionKey, "hard");
    if (currentKey === "later") toggleLabel?.(questionKey, "later");

    if (next.key === "done")  toggleDone?.(questionKey);
    if (next.key === "hard")  toggleLabel?.(questionKey, "hard");
    if (next.key === "later") toggleLabel?.(questionKey, "later");
  }

  return (
    <button
      onClick={advance}
      title={`${current.label} ← לחץ`}
      style={{
        background: current.bg,
        border: `1.5px solid ${current.border}`,
        color: current.color,
        cursor: "pointer",
        fontFamily: FONTS.sans,
        fontSize: 14,
        width: 28,
        height: 28,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        transition: "background 0.15s, border-color 0.15s, color 0.15s",
      }}
    >
      {current.icon}
    </button>
  );
}
