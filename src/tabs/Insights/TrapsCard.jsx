import { useState } from "react";
import { COLORS_UI } from "../../styles";
import { CardTitle, MathText } from "../../components";
import InsightRow from "./InsightRow";
import { CARD_TOP_N } from "./constants";

export default function TrapsCard({ traps, accent }) {
  const [openTrap, setOpenTrap] = useState(null);

  return (
    <div className="ui-card">
      <CardTitle
        emoji="⚠️"
        title="מלכודות חוזרות"
        sub="שאלות כמעט זהות שחזרו מספר פעמים"
      />
      {traps.slice(0, CARD_TOP_N).map((trap, i) => (
        <InsightRow
          key={i}
          onClick={() => setOpenTrap(openTrap === i ? null : i)}
          hoverBg={`${accent}0d`}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 8,
            }}
          >
            <div className="topic-title" style={{ color: accent, flex: 1 }}>
              <MathText>{trap.t}</MathText>
            </div>
            <span
              style={{
                color: COLORS_UI.muted,
                fontSize: 12,
                flexShrink: 0,
                marginTop: 2,
              }}
            >
              {openTrap === i ? "▲" : "▼"}
            </span>
          </div>
          {openTrap === i && (
            <div
              className="topic-sub"
              style={{
                marginTop: 8,
                paddingTop: 8,
                borderTop: `1px solid ${COLORS_UI.rowDivider}`,
              }}
            >
              <MathText>{trap.n}</MathText>
            </div>
          )}
        </InsightRow>
      ))}
    </div>
  );
}
