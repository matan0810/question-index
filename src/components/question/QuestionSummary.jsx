import MathText from "./MathText";
import { COLORS_UI } from "../../styles";
import { splitSummaryParts } from "../../utils/exam";

export default function QuestionSummary({ summary }) {
  const parsed = splitSummaryParts(summary);
  if (!parsed) return <MathText>{summary}</MathText>;

  const { stem, parts } = parsed;
  return (
    <div>
      {stem && (
        <div style={{ marginBottom: 4 }}>
          <MathText>{stem}</MathText>
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {parts.map((p) => (
          <div key={p.label} style={{ display: "flex", gap: 6, alignItems: "baseline" }}>
            <span style={{ fontWeight: 800, color: COLORS_UI.muted, flexShrink: 0 }}>
              {p.label})
            </span>
            <span style={{ flex: 1 }}>
              <MathText>{p.text}</MathText>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
