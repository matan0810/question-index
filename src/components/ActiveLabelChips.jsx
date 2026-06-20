import { LABEL_DEFS } from "../hooks/useLabels";

// The user's study labels (e.g. "important", "review") active on a question,
// rendered as small chips. Shared by the exams list and search results.
export default function ActiveLabelChips({ questionKey, hasLabel }) {
  const active = LABEL_DEFS.filter((def) => hasLabel?.(questionKey, def.key));
  if (active.length === 0) return null;
  return (
    <div style={{ marginTop: 4, display: "flex", gap: 4, flexWrap: "wrap" }}>
      {active.map((def) => (
        <span
          key={def.key}
          style={{
            fontSize: 10,
            padding: "1px 6px",
            background: def.bg,
            color: def.color,
            border: `1px solid ${def.color}55`,
            fontWeight: 700,
          }}
        >
          {def.icon} {def.label}
        </span>
      ))}
    </div>
  );
}
